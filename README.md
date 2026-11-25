# 史卷行迹（zhishiren-web）

> 历史互动叙事合集，同级收录 **《太史公》**（西汉）与 **《玄奘西行》**（大唐）两卷独立作品。
> 纯静态前端 + 零依赖 Node 本地服务（供课堂演示与《太史公》在线大模型自书），无构建步骤、无外部 CDN 依赖。

## 线上访问（GitHub Pages）

- **合集导航页**：https://pm-yanmao.github.io/zhishiren-web/
- **卷一 · 《太史公》直链**：https://pm-yanmao.github.io/zhishiren-web/taishigong/
- **卷二 · 《玄奘西行》直链**：https://pm-yanmao.github.io/zhishiren-web/xuanzang/

> 两卷彼此独立，进度与存档分别保存在当前浏览器的 `localStorage` 中，可直接分享任一子目录链接独立打开。

---

## 一、收录作品

### 1. 卷一 · 《太史公》（`taishigong/`）

> *一个人的史记，和一整个时代的选择。*

以司马迁的视角走过 **22 个场景节点**（壮游江淮 → 父丧受命 → 太史令任上 → 泰山封禅 → 朝中结交 → 李陵之祸 → 受刑/赴死/赎死/辞官/逢迎等分支）。由四维隐藏数值（坚韧、名节、财富、权谋）与六种史迹标记（直笔、上意、交游、伪饰、远行、罪证）共同决定 **7 条分支、13 个结局与 12 片图鉴**。

核心机制为 **「开放自书」**：在朝议、议罪、生死抉择、世态炎凉、武帝审查、任安之信六页，玩家可跳过既定选项，自己写下一行动作或态度（每局 5 笔，一行至多 60 字）。
- **自书只生成正文，不裁决状态**：节点推进、四维、结局与图鉴仍由确定性引擎按原剧本裁决，自书不点亮图鉴。
- **史实硬边界**：`taishigong/js/data/anchors.js` 固化时间轴、制度律令、人物状态与史料暗引白名单；`overreach.js` 定义越界类别，违背史实/制度的念头会被写回现实约束。
- **在线 / 离线自动降级**：接入本地服务并配置 API Key 时开放全部 6 页大模型流式生成；在 GitHub Pages 或未配 Key 时自动走 `genpack.js` 离线剧本包（开放朝议、生死抉择 2 页）。

### 2. 卷二 · 《玄奘西行》（`xuanzang/`）

> *你是一个僧人。你要去天竺问一件事。路上没有孙悟空。*

以贞观三年玄奘私发西行的史实为主线，包含 **六轴人格对照**（慈悲 / 般若 / 清静 / 方术 / 忠恕 / 经权）、**13 个正史结局 + 5 个《西游记》误读结局**、**16 站路线印章**、**人物档案**（文物造像与复原对照）、**误解纪念馆**、**西游原型考**、**史料交互地图**（`assets/map/atlas.html`）以及可导出 PNG 的**本局分享卡**。纯静态运行，不依赖后端接口。

---

## 二、快速开始（本机 / 课堂演示）

需要 **Node.js 18+**（仅使用 Node 内置模块，无需 `npm install`）。

### 1. 零配置离线启动

```bash
npm start          # 等价于 node server/start.mjs
# Windows 也可直接双击 start.bat
```

启动后访问：
- 导航页：http://localhost:8787/
- 《太史公》：http://localhost:8787/taishigong/
- 《玄奘西行》：http://localhost:8787/xuanzang/

未配置 API Key 时服务仍会正常托管两卷站点，《太史公》自动走离线剧本包。

### 2. 在线模式（为《太史公》接入大模型自书）

```bash
copy server\.env.example server\.env      # Windows
cp server/.env.example server/.env        # macOS / Linux
```

编辑 `server/.env`（已在 `.gitignore` 中，绝不会进 git）：

```ini
TSG_API_KEY=sk-...
TSG_MODEL=deepseek-chat        # 任何兼容 OpenAI chat/completions 的模型
TSG_API_URL=https://api.deepseek.com/chat/completions
```

重新运行 `npm start`，打开《太史公》页面「设置」应显示 `接口已连接`。**API Key 只保存在服务端 `.env`，浏览器永远拿不到。**

### 3. 多设备课堂与跨网段访问

在 `server/.env` 中追加：

```ini
TSG_HOST=0.0.0.0         # 允许局域网设备访问（默认 127.0.0.1 仅本机）
TSG_TOKEN=一串随机字符    # 可选。可信内网可留空，校园网/不可信网络建议设置
TSG_RATE_LIMIT=30        # 单 IP 每分钟最大生成次数（默认 30，0 = 不限）
TSG_LOG=off              # 可选：关闭 logs/*.jsonl 落盘（课后即焚）
```

课前可用自检命令探测本机网卡与路由器状态（不启动服务）：

```bash
npm run check            # = node server/start.mjs --check
```

- **同局域网**：把 `http://<教师机LAN IP>:8787/` 或 `http://<IP>:8787/taishigong/` 发给学生；如设了 `TSG_TOKEN`，链接末尾带 `?token=<口令>`（根导航页会自动透传到 `taishigong/`，进入后自动存入当前标签页 `sessionStorage` 并抹掉地址栏参数）。
- **跨网段（如路由器后 / 校园网 10.x）**：在路由器做 `TCP 8787 → 教师机 LAN IP:8787` 端口映射；路由器支持 UPnP 时可直接用：

```bash
node tools/upnp-map.mjs list     # 查看现有映射与路由器 WAN IP
node tools/upnp-map.mjs add      # 映射 TCP 8787
node tools/upnp-map.mjs remove   # 下课后立即删除
```

> 注意：多数路由器不支持 NAT 回环，教师机自己访问 WAN IP 可能打不开，请用手机连校园网验证。**下课后请停止服务、删除 UPnP 映射并将 `TSG_HOST` 改回 `127.0.0.1`。**

---

## 三、目录结构

```text
zhishiren-web/
├── index.html                  # 根目录导航页《史卷行迹》（透传 ?token=、展示未竟记录提示）
├── portal.css                  # 导航页样式（墨底 / 宣纸 / 古金视觉语言）
├── .nojekyll                   # 禁用 GitHub Pages Jekyll 解析
├── package.json                # 脚本入口（start / check / test）
├── start.bat                   # Windows 一键启动
│
├── taishigong/                 # 卷一 · 《太史公》（经典 <script>，零构建）
│   ├── index.html              # 按固定依赖顺序加载全部脚本（含加载期自检）
│   ├── config.js               # 站点配置（同源 /api、?token= 读取、引用 freewrite.js）
│   ├── css/style.css           # 全部样式
│   ├── js/
│   │   ├── engine.js           # 三层确定性引擎：resolve / collect / settle
│   │   ├── app.js              # 路由、事件、自书流程与攻略浮层
│   │   ├── client.js           # /api/health、/api/generate、/api/generate-stream 客户端
│   │   ├── guard.js            # 史官校验（长度、OOC、史料白名单、JSON 信封）
│   │   ├── intent.js           # 意图归一：一行自书 → 1–3 条既有选项候选
│   │   ├── compose.js          # 离线剧本包正文拼装与越界否定段
│   │   ├── store.js            # localStorage 多人分桶存档（tsg:records:v1）与 JSON 导入导出
│   │   ├── ui/                 # screens.js（界面模板）、radar.js（四维雷达图 SVG）
│   │   └── data/               # scenes.p1/p2/scenes、endings、characters、freewrite、anchors、overreach、genpack、scene-art
│   └── assets/                 # bg/、char/、ending/、scene/（6/22 已就位）及对应的 webp/
│
├── xuanzang/                   # 卷二 · 《玄奘西行》（常规静态资源目录）
│   ├── index.html              # 入口页
│   ├── style.css               # 样式（含 WebP image-set 纹理与响应式适配）
│   ├── app.js                  # 剧本数据、六轴引擎、页面渲染、分享卡绘制与本地存档
│   └── assets/
│       ├── bg/ char/ ending/ myth/ myth_end/ stamp/ ui/ title.jpg
│       ├── map/                # atlas.html（交互史料地图，支持 ?q= 自动聚焦）与 img/ 13 张图片
│       └── webp/               # 全量 73 张图片的 WebP 映射（自动优先加载，JPG 兜底）
│
├── server/                     # 零依赖本地服务（原生 ESM）
│   ├── index.mjs               # HTTP 静态白名单托管 + /api/* 接口 + 限流/口令/安全头
│   ├── start.mjs               # 启动器：Node 版本校验、网卡与 UPnP 探测
│   ├── scenes.mjs              # 与前端同源读取 taishigong/js/data/scenes*.js
│   ├── guard.mjs               # 复用前端规则 + 服务端场景级禁项与引文规范化
│   ├── prompt.mjs              # 系统提示词与用户消息组装
│   ├── session.mjs             # 会话滚动记忆与 logs/*.jsonl 审计日志
│   └── .env.example            # 环境变量模板
│
├── tools/                      # 开发期与课堂运维脚本（运行时不依赖）
│   ├── art_pipeline.py         # 《太史公》美术管线（校验 / 归一化 / WebP / 清单生成）
│   ├── art_grade.py            # 批量调色（配合 art-batch-map.json）
│   └── upnp-map.mjs            # 课堂 UPnP 端口映射工具
│
├── tests/                      # 零依赖 node:test 自动化测试（npm test）
│   ├── helpers/load-browser-globals.mjs
│   ├── data.test.mjs           # 《太史公》剧本/结局/图鉴可达性校验
│   ├── engine.test.mjs         # 引擎契约与边界测试
│   ├── content.test.mjs        # 文案字数与标点规范校验
│   ├── freewrite.test.mjs      # 自书单点源与前后端同源校验
│   ├── genpack.test.mjs        # 离线剧本包与意图帧测试
│   ├── art.test.mjs            # 《太史公》美术清单、WebP 与前端接入校验
│   ├── server.test.mjs         # 服务端校验、引文规范化、提示词与会话测试
│   └── portal-xuanzang.test.mjs # 导航页、《玄奘西行》资产/WebP/回归测试与服务端白名单测试
│
├── docs/                       # 历史考据、美术规范与审查归档
│   ├── history-factcheck.md    # 《太史公》史实逐条考据报告
│   ├── art-brief.md            # 22 张场景图与杨恽立绘提示词与验收规范
│   └── review-2026-11.md       # 早期代码审查快照
└── logs/                       # 运行期审计日志（已 gitignore，仅保留 .gitkeep）
```

---

## 四、核心架构与接口说明

### 1. 《太史公》三层引擎（`taishigong/js/engine.js`）

| 函数 | 职责 | 副作用 |
| --- | --- | --- |
| `resolve(scenes, state, nodeId, optionId)` | 判定下一节点、是否终局、门槛是否通过 | 纯函数 |
| `collect(state, effect)` | 四维 0–100 夹取、标记累加、图鉴碎片、分支切换、历史记录 | 返回新 `state` |
| `settle(state)` | 按 `route` 判定结局、雷达图、人格相似度、图鉴进度 | 纯函数 |

### 2. 本地服务接口（`server/index.mjs`）

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/api/health` | 返回 `{ok, model, hasKey, hasToken, anchors, nodeVersion, freeNodes, freeLimit, maxChars}` |
| `POST` | `/api/generate` | 非流式自书生成，返回 `{ok: true, data}` 或 `{ok: false, error}` |
| `POST` | `/api/generate-stream` | SSE 流式生成（`delta` / `retry` / `done` / `fallback`） |

静态文件服务采用**显式前端白名单**（只放行 `index.html`、`portal.css`、`taishigong/`、`xuanzang/`），并对空字节、反斜杠、`..` 越界、点开头路径与软链接真实路径做多重校验；`server/`、`logs/`、`tests/`、`tools/`、`docs/`、`package.json` 一律返回 `403`。

### 3. 本地存档键

- **《太史公》**：`tsg:records:v1`（多人按 ID 分桶，图鉴取全设备并集；可在「设置 → 清除本机记录」一键清空）
- **《玄奘西行》**：`xz:db:v1`（玩家与排行记录）、`xz:save:v1`（未完成对局进度，通关后自动清理）、`xz:endings:v1`（已解锁结局）

---

## 五、测试与美术管线

### 运行自动化测试

```bash
npm test                # 单进程模式（兼容受限/沙箱环境）
npm run test:isolated   # Node 多进程隔离模式
```

### 《太史公》增量替换场景图（开发期，需 Python + Pillow）

```bash
python3 tools/art_grade.py --install
python3 tools/art_pipeline.py --normalize --scan --optimize --report
```

脚本会自动归一化分辨率（1920×1080）、生成对应 WebP 并重写 `taishigong/js/data/scene-art.js`，未就位节点自动回退 `assets/bg/` 共用背景。

---

## 六、隐私与课堂安全

- **密钥隔离**：`TSG_API_KEY` 只存放在 `server/.env`（已 gitignore），切勿提交或随课件打包。
- **审计日志**：在线自书会向 `logs/generate-*.jsonl` 与 `logs/fallback-*.jsonl` 记录玩家原文与生成正文，方便课后抽查；公开分发前请清理 `logs/`，或设 `TSG_LOG=off`。
- **网络暴露**：默认仅监听 `127.0.0.1`、CORS 关闭；在校园网等不可信网络开启 `TSG_HOST=0.0.0.0` 时务必设置 `TSG_TOKEN`，且不要长期保留公网端口映射。
- **零追踪**：两卷页面均不含第三方统计脚本或外部 CDN 请求。

---

## 七、版本演进

- **v1.1（2026-11）**：接手安全与引擎修复（畸形 URL/反斜杠路径穿越修复、CORS 收紧与限流/口令、续玩存档修复、坏存档清洗、时间线校正、建立 `tests/` 套件）。
- **v1.2（2026-11）**：文案统一与史实逐条考据；自书扩展至 6 页 / 每局 5 笔 / 60 字，多候选落点交由玩家选择，服务端同源读取剧本。
- **v1.3（2026-11）**：建立 `art_grade.py` + `art_pipeline.py` 美术资产管线，首批 6 张场景图与杨恽立绘入库，全量生成 WebP（省 57.1%）。
- **v1.4（2026-11）**：仓库更名为 `zhishiren-web`；新增合集导航页并将 `taishigong/` 与 `xuanzang/` 调整为同级目录；将《玄奘西行》37.2 MB 单文件拆解为常规静态目录并全量 WebP 化（首屏加载体积缩减约 80 倍），修复排行榜多人回看索引、分享卡底图绘制、通关存档清理与返回栈循环，并加固服务端前端静态白名单与新增全仓自动化测试。

---

*史卷行迹（zhishiren-web）· 历史互动叙事课堂演示合集*
