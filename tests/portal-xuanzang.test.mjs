/* ===== 导航页、《玄奘西行》与服务端白名单测试 =====
 * 零依赖（node:test），守住：
 *  1. 根目录导航页 index.html / portal.css 链接与封面/纹理资源齐全；
 *  2. xuanzang/ 无重复定义与残留单文件内联代码，73 张 JPG 与 WebP 一一成对；
 *  3. xuanzang/ 回归测试：排行榜多人回看索引、通关清理存档、坏存档兜底、返回栈不死循环；
 *  4. server/index.mjs 静态白名单只放行前端目录，不暴露 tests/tools/docs/package.json。
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { REPO_ROOT } from './helpers/load-browser-globals.mjs';

const readRepo = (rel) => fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
const existsRepo = (rel) => fs.existsSync(path.join(REPO_ROOT, rel));

function loadXuanzang() {
  const mem = new Map();
  const storage = {
    getItem: (k) => (mem.has(String(k)) ? mem.get(String(k)) : null),
    setItem: (k, v) => { mem.set(String(k), String(v)); },
    removeItem: (k) => { mem.delete(String(k)); },
    clear: () => mem.clear(),
  };
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    localStorage: storage,
    document: { getElementById: () => null, addEventListener() {}, querySelectorAll: () => [] },
    window: null,
  };
  sandbox.window = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext(readRepo('xuanzang/app.js'), ctx, { filename: 'xuanzang/app.js' });
  return { ctx, storage, eval: (expr) => vm.runInContext(expr, ctx) };
}

test('导航页：index.html 与 portal.css 指向两卷同级入口且静态资源齐全', () => {
  const html = readRepo('index.html');
  const css = readRepo('portal.css');
  assert.ok(html.includes('href="taishigong/"'), '导航页缺少 taishigong/ 入口');
  assert.ok(html.includes('href="xuanzang/"'), '导航页缺少 xuanzang/ 入口');
  assert.ok(html.includes('taishigong/assets/webp/title.webp'));
  assert.ok(html.includes('xuanzang/assets/webp/title.webp'));
  for (const rel of [
    'portal.css',
    'taishigong/index.html',
    'taishigong/assets/title.jpg',
    'taishigong/assets/webp/title.webp',
    'xuanzang/index.html',
    'xuanzang/assets/title.jpg',
    'xuanzang/assets/webp/title.webp',
    'xuanzang/assets/ui/paper.jpg',
    'xuanzang/assets/webp/ui/paper.webp',
  ]) {
    assert.ok(existsRepo(rel), `导航页依赖文件缺失：${rel}`);
  }
  assert.ok(css.includes('xuanzang/assets/webp/ui/paper.webp'), 'portal.css 应优先加载 WebP 纸纹');
});

test('玄奘西行：代码清理彻底（无重复 charsScreen、无残留 TSX_INLINE/data:image）', () => {
  const js = readRepo('xuanzang/app.js');
  const html = readRepo('xuanzang/index.html');
  const atlas = readRepo('xuanzang/assets/map/atlas.html');
  assert.equal((js.match(/function charsScreen\b/g) || []).length, 1, 'charsScreen 不应重复定义');
  assert.equal(js.includes('TSX_INLINE'), false, '不应残留单文件内联代码 TSX_INLINE');
  assert.equal(js.includes('data:image'), false, 'app.js 不应残留 data:image');
  assert.equal(atlas.includes('data:image'), false, 'atlas.html 不应残留 data:image');
  assert.ok(html.includes('rel="icon"'), 'xuanzang/index.html 应声明 favicon 避免 404');
});

test('玄奘西行：全部动态/静态图片资产与 WebP 映射齐全', () => {
  const { eval: run } = loadXuanzang();
  const dynamic = [];
  for (const v of Object.values(run('SCENE_ART'))) dynamic.push(`assets/bg/${v}.jpg`);
  for (const v of Object.values(run('MYTH_ART'))) dynamic.push(`assets/myth/${v}.jpg`);
  for (const v of Object.values(run('END_ART'))) dynamic.push(`assets/ending/${v}.jpg`);
  for (const v of Object.values(run('MYTH_END_ART'))) dynamic.push(`assets/myth_end/${v}.jpg`);
  for (const c of run('DATA.CHARACTERS')) {
    dynamic.push(c.statue, c.restore);
  }
  dynamic.push('assets/title.jpg', 'assets/stamp/map.jpg', 'assets/ui/paper.jpg');

  for (const rel of dynamic) {
    assert.ok(existsRepo(`xuanzang/${rel}`), `缺失原图：xuanzang/${rel}`);
    const wp = run(`webpOf(${JSON.stringify(rel)})`);
    assert.ok(wp && existsRepo(`xuanzang/${wp}`), `缺失 WebP：xuanzang/${wp}`);
  }

  // atlas.html 引用的 13 张独立图片都在
  const atlas = readRepo('xuanzang/assets/map/atlas.html');
  const mapImgs = [...new Set(atlas.match(/img\/img_\d+\.jpg/g) || [])];
  assert.equal(mapImgs.length, 13, 'atlas.html 应引用 13 张独立地图/实景图');
  for (const m of mapImgs) {
    assert.ok(existsRepo(`xuanzang/assets/map/${m}`), `缺失地图图片：${m}`);
  }

  // 纸纹纹理已优化至合理体积（< 50 KB）
  const paperSize = fs.statSync(path.join(REPO_ROOT, 'xuanzang/assets/ui/paper.jpg')).size;
  assert.ok(paperSize < 50 * 1024, `paper.jpg 体积过大：${paperSize} bytes`);
});

test('玄奘西行：boardScreen 多人排行榜 data-run 指向各玩家真实下标', () => {
  const { eval: run } = loadXuanzang();
  const html = run(`boardScreen({
    active: '甲',
    players: {
      '甲': { runs: [{ ending: 1, name: '低分', sim: 40, stamps: 4, at: 1700000000000 }] },
      '乙': { runs: [
        { ending: 2, name: '中分', sim: 60, stamps: 8, at: 1700000001000 },
        { ending: 3, name: '高分', sim: 95, stamps: 16, at: 1700000002000 }
      ] }
    }
  })`);
  // 排序后第一行应为 乙 的 runs[1]（高分），第二行应为 乙 的 runs[0]（中分），第三行应为 甲 的 runs[0]（低分）
  const rows = [...html.matchAll(/data-player="([^"]+)" data-run="(\d+)"/g)].map((m) => [m[1], Number(m[2])]);
  assert.deepEqual(rows, [['乙', 1], ['乙', 0], ['甲', 0]]);
});

test('玄奘西行：通关后清除未竟存档，坏存档/已终局存档自动回退新局', () => {
  const { storage, eval: run } = loadXuanzang();
  run('appBegin()');
  // 推进 1 步应产生未竟存档
  run('appChoose(DATA.SCENES[APP.s.node].options[0].id)');
  assert.equal(run('appHasSave()'), true);

  // 走完至终局后应清除 xz:save:v1
  let guard = 0;
  while (run('APP.screen') === 'scene' && guard++ < 40) {
    run('appChoose(DATA.SCENES[APP.s.node].options[0].id)');
  }
  assert.equal(run('APP.screen'), 'ending');
  assert.equal(run('appHasSave()'), false, '通关后不应保留未竟存档');
  assert.equal(storage.getItem('xz:save:v1'), null);

  // 注入坏存档与已终局存档：appHasSave 应为 false，appContinue 应安全新开
  storage.setItem('xz:save:v1', JSON.stringify({ s: { node: 'bad_node', endingId: 0 } }));
  assert.equal(run('appHasSave()'), false);
  run('appContinue()');
  assert.equal(run('APP.screen'), 'scene');
  assert.equal(run('APP.s.node'), 'P1');
});

test('玄奘西行：返回栈支持多层跳转且不会陷入循环', () => {
  const { eval: run } = loadXuanzang();
  run("APP.screen = 'start'; APP.history = [];");
  run("appNav('board')");
  run("appNav('replay')");
  run("appNav('board')");
  assert.equal(run('APP.screen'), 'board');
  run('appBack()');
  assert.equal(run('APP.screen'), 'replay');
  run('appBack()');
  assert.equal(run('APP.screen'), 'board');
  run('appBack()');
  assert.equal(run('APP.screen'), 'start');
});

test('服务端安全：server/index.mjs 静态白名单仅放行前端入口与双卷目录', () => {
  const src = readRepo('server/index.mjs');
  const m = src.match(/ALLOWED_TOP\s*=\s*new Set\(\[([^\]]+)\]\)/);
  assert.ok(m, 'server/index.mjs 应使用 ALLOWED_TOP 白名单');
  const allowed = [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
  assert.deepEqual(allowed.sort(), ['index.html', 'portal.css', 'taishigong', 'xuanzang']);
  for (const forbidden of ['server', 'logs', 'tests', 'tools', 'docs', 'package.json']) {
    assert.equal(allowed.includes(forbidden), false, `不应暴露 ${forbidden}`);
  }
});
