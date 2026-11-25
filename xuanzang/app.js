/* 《玄奘西行》数据契约 v1
 * 六轴 0-100，初始 50；资粮 0-100，初始 60；选项只经 collect 写入。
 */
var DATA = (function () {
  var AXES = [
    { k: 'ci', name: '慈悲', group: '佛' },
    { k: 'bo', name: '般若', group: '佛' },
    { k: 'qj', name: '清静', group: '道' },
    { k: 'fs', name: '方术', group: '道' },
    { k: 'zs', name: '忠恕', group: '儒' },
    { k: 'jq', name: '经权', group: '儒' }
  ];

  var BASE = {
    xuanzang: { ci: 82, bo: 94, qj: 76, fs: 58, zs: 64, jq: 70 },
    tang:     { ci: 85, bo: 35, qj: 45, fs: 20, zs: 80, jq: 25 }
  };

  var LINEAGE = [
    { id: 'lvs', name: '律师型', p: { ci: 90, bo: 70, qj: 70, fs: 30, zs: 70, jq: 45 }, tag: '以戒为师，宁慢不错' },
    { id: 'fashi', name: '法师型', p: { ci: 65, bo: 90, qj: 60, fs: 45, zs: 60, jq: 65 }, tag: '义学沙门，以理服人' },
    { id: 'chanshi', name: '禅师型', p: { ci: 70, bo: 85, qj: 90, fs: 25, zs: 45, jq: 40 }, tag: '独行求心，不立文字' },
    { id: 'yishi', name: '译师型', p: { ci: 75, bo: 92, qj: 70, fs: 75, zs: 65, jq: 68 }, tag: '文字般若，以译传法' },
    { id: 'xingzhe', name: '行者型', p: { ci: 85, bo: 55, qj: 85, fs: 40, zs: 55, jq: 30 }, tag: '苦行头陀，一路向西' },
    { id: 'guoshi', name: '国师型', p: { ci: 55, bo: 75, qj: 40, fs: 55, zs: 75, jq: 90 }, tag: '王庭法匠，借势弘法' }
  ];

  /* 16 页正史；stamp = 印章编号 */
  var SCENES = {
    P1: {
      id: 'P1', title: '案上的两种讲法', where: '贞观三年 · 长安', stamp: 1, stampName: '长安立意', stampNote: '长安立意：上表求法被拒',
      text: '你把两处讲义并在一案。一位法师这样讲，另一位从另一部经里引了相反的话。你遍访师门，疑处依旧。你与同伴上表求赴天竺，批复下来——“有诏不许”。城门开合有时限，公文没有说何时会有下一次准许。',
      notes: [{ tag: '实', text: '《慈恩传》卷一遍访师门，上表未准（“有诏不许”）' }, { tag: '推', text: '出走压成一晚，讲义与动作属演绎' }],
      options: [
        { id: 'A', text: '私发西行，向西求证', axes: { jq: 6, bo: 4 }, cai: -4, next: 'P2' },
        { id: 'B', text: '留在长安，等下一次准许', axes: { qj: 4 }, terminal: 2 }
      ]
    },
    P2: {
      id: 'P2', title: '凉州来的文书', where: '贞观三年 · 瓜州', stamp: 2, stampName: '瓜州毁牒', stampNote: '瓜州毁牒：李昌放行',
      text: '凉州发来的文书正在查缉你。州吏李昌核过身份，听罢来意，在灯下坐了很久。他把文书折起来，说你走吧——可你走出门时，他又叫住了你，说了一句“莫要回头”。',
      notes: [{ tag: '实', text: '凉州文书查缉，州吏李昌核身份后毁牒放行' }, { tag: '推', text: '对话细节无载，属推演' }],
      options: [
        { id: 'A', text: '如实相告，谢他放行', axes: { zs: 5, jq: 4 }, next: 'P3' },
        { id: 'B', text: '连夜绕道，不留姓名', axes: { jq: 6, zs: -4 }, cai: -6, flag: 'night', next: 'P3' }
      ]
    },
    P3: {
      id: 'P3', title: '胡人受戒', where: '贞观三年 · 瓜州城外', stamp: 3, stampName: '石槃陀', stampNote: '石槃陀：胡人受戒又辞去',
      text: '一个胡人少年在城下等了三天。你为他受了五戒，他答应送你过瓠芦河。夜里，你听见他的刀在鞘里响了一声。他没有说话，刀也没有拔出来。天亮时，他说家里有老母，不能再送了。',
      notes: [{ tag: '实', text: '《慈恩传》卷一：胡人受戒为弟子，随至瓠芦河，夜中拔刀，后辞去' }, { tag: '推', text: '“孙悟空原型”为假说，另有哈奴曼、无支祁诸说' }],
      options: [
        { id: 'A', text: '谢他一路，自己过河', axes: { zs: 4, ci: 3 }, next: 'P4' },
        { id: 'B', text: '留他多住一日，问个明白', axes: { jq: 5, zs: -3 }, next: 'P4' },
        { id: 'C', text: '当夜独行，不告而别', axes: { jq: 6 }, cai: -8, flag: 'night', terminal: 13 }
      ],
      myth: { id: 'guazhou', label: '跟他讲一个猴子护法的故事' }
    },
    P4: {
      id: 'P4', title: '水袋落了地', where: '贞观三年 · 莫贺延碛', stamp: 4, stampName: '莫贺延碛', stampNote: '莫贺延碛：失水东返十余里',
      text: '守第四烽的人给过你水。如今沙里没有路，你找不到野马泉，俯身时又失手倾翻水袋。你沿来路往东走了十余里。烽火台在那个方向，西北边什么也看不清。你原先想的是把水装满，眼下得先决定还要不要回去。',
      notes: [{ tag: '实', text: '《慈恩传》卷一：失水、东返十余里、念《心经》，后得水草' }, { tag: '推', text: '获救非必然，游戏不保证冒险必活' }],
      options: [
        { id: 'A', text: '掉转马头，向西北去', axes: { bo: 6, ci: 4, qj: 5 }, next: 'P5' },
        { id: 'B', text: '继续东返，先求补水', axes: {}, cai: -20, flag: 'east', terminal: 5 }
      ],
      myth: { id: 'mohe', label: '沙里有个声音，问你回头不回' }
    },
    P5: {
      id: 'P5', title: '伊吾的使者', where: '贞观三年 · 伊吾', stamp: 5, stampName: '伊吾', stampNote: '伊吾：高昌使者相迎',
      text: '你走出沙碛，到了伊吾。高昌王的使者已经等在城外，说王愿以弟子之礼相待，请你务必西去高昌。往南是西域南道，商队更多，也更远。',
      notes: [{ tag: '实', text: '《慈恩传》卷一：高昌王遣使迎玄奘' }, { tag: '推', text: '使者言辞属推演' }],
      options: [
        { id: 'A', text: '赴高昌，受王供养', axes: { zs: 4 }, next: 'P6' },
        { id: 'B', text: '绕行南道，避开王庭', axes: { jq: 6, fs: 4 }, next: 'P8' },
        { id: 'C', text: '先去集市变卖随身物，换足水粮', axes: { fs: 3, jq: 2 }, cai: -12, next: 'P6' }
      ]
    },
    P6: {
      id: 'P6', title: '王设席留客', where: '贞观三年 · 高昌', stamp: 6, stampName: '高昌受书', stampNote: '高昌受书：绝食明志',
      text: '高昌王请你常住，讲席、供养都能置办。你愿意讲经，却还未见到传授《瑜伽论》的师者。王不愿放你走，你也知道，下一段路所需的接引，凭你自己未必办得妥。',
      notes: [{ tag: '实', text: '《慈恩传》卷一：王留，玄奘绝食，王许行，结为兄弟，给资通书二十四国' }, { tag: '推', text: '席间细节属推演' }],
      options: [
        { id: 'A', text: '绝食明志，暂留讲经', axes: { ci: 4, zs: 6, bo: 3, jq: 4 }, next: 'P7' },
        { id: 'B', text: '接受供养，长住高昌', axes: { qj: -4 }, terminal: 4 },
        { id: 'C', text: '只求放行，不受馈赠', axes: { jq: 6, zs: -4 }, next: 'P7' }
      ]
    },
    P7: {
      id: 'P7', title: '火焰山道', where: '贞观三年 · 高昌西境', stamp: 7, stampName: '火焰山道', stampNote: '火焰山道：赤色山体',
      text: '赤色的山横在前面，热气从石缝里冒出来。水囊只剩一半，商队说再往前就是“火焰山”，白天走会死人。夜里走，路看不清，但风是凉的。',
      notes: [{ tag: '实', text: '高昌—阿耆尼一线确有赤色山体；玄奘经行此地' }, { tag: '推', text: '“火焰山”之名出于小说，非唐时地名' }],
      options: [
        { id: 'A', text: '夜行避热，慢慢走', axes: { jq: 4 }, cai: -6, next: 'P8' },
        { id: 'B', text: '昼行抢时间，赌一把', axes: { bo: -2 }, cai: -14, next: 'P8' },
        { id: 'C', text: '绕道三日，求稳', axes: { jq: 2 }, cai: -10, next: 'P8' },
        { id: 'D', text: '花钱请当地向导带路', axes: { jq: 4, zs: 2 }, cai: -16, next: 'P8' }
      ],
      myth: { id: 'huoyan', label: '去借一把芭蕉扇' }
    },
    P8: {
      id: 'P8', title: '龟兹辩经', where: '贞观三年 · 屈支', stamp: 8, stampName: '龟兹辩经', stampNote: '龟兹辩经：木叉毱多',
      text: '屈支的法师木叉毱多善讲小乘，听说东土来了个僧人，邀你入寺论义。寺中坐满了人，他先开口，问的是《俱舍》里一处难处。寺里的灯很暗，照不见他的脸。',
      notes: [{ tag: '实', text: '《慈恩传》卷二：屈支木叉毱多善小乘，与玄奘论义' }, { tag: '推', text: '辩辞为推演' }],
      options: [
        { id: 'A', text: '应辩，逐条破其执', axes: { bo: 8, jq: 5 }, flag: 'debate', next: 'P9' },
        { id: 'B', text: '只请教，不争胜负', axes: { bo: 6, ci: 3 }, next: 'P9' }
      ]
    },
    P9: {
      id: 'P9', title: '凌山七日', where: '贞观三年 · 凌山', stamp: 9, stampName: '凌山七日', stampNote: '凌山七日：同行死者十之三四',
      text: '山谷积雪，春夏合冻。暴风起来时，飞沙走石，同行的人一个接一个倒在雪里。向导说，把辎重丢了，人还能过去；不丢，谁都过不去。',
      notes: [{ tag: '实', text: '《慈恩传》卷二：七日出山，徒侣殒者十有三四' }, { tag: '推', text: '具体取舍属推演' }],
      options: [
        { id: 'A', text: '弃辎重，结绳同行', axes: { ci: 6 }, cai: -10, next: 'P10' },
        { id: 'B', text: '带着经卷硬闯', axes: { bo: 2 }, cai: -16, terminal: 6 },
        { id: 'C', text: '雇两名背夫分担辎重', axes: { ci: 3 }, cai: -14, next: 'P10' }
      ]
    },
    P10: {
      id: 'P10', title: '可汗帐前', where: '贞观三年 · 素叶', stamp: 10, stampName: '素叶可汗', stampNote: '素叶可汗：劝留不听',
      text: '突厥叶护可汗在帐中设宴，问东土僧人欲往何处。帐外兵马往来，帐内酒气很重。可汗说，留下讲法，我供养你；若要走，我可以给你一封书信。',
      notes: [{ tag: '实', text: '《慈恩传》卷二：见突厥叶护可汗，可汗劝留' }, { tag: '推', text: '帐中对话属推演' }],
      options: [
        { id: 'A', text: '留讲三日，求一封书信', axes: { zs: 4, jq: 6 }, next: 'P11' },
        { id: 'B', text: '辞行西去，不欠人情', axes: { bo: 3 }, cai: -4, next: 'P11' },
        { id: 'C', text: '就此折返东归', terminal: 9 }
      ]
    },
    P11: {
      id: 'P11', title: '拜火之城', where: '贞观三年 · 飒秣建', stamp: 11, stampName: '飒秣建', stampNote: '飒秣建：事火不信佛',
      text: '城中心的火坛不熄，两所佛寺破败，僧徒不知去向。王请你讲法，拜火祭司站在阶下，冷眼看着。城里的人说，这里已经很多年没有听过佛法了。',
      notes: [{ tag: '实', text: '《西域记》卷一：王及百姓不信佛法，以事火为道，二伽蓝僧徒绝少' }, { tag: '推', text: '王改信佛教见《慈恩传》，细节属推演' }],
      options: [
        { id: 'A', text: '先讲因果，不贬火教', axes: { ci: 4, bo: 5 }, next: 'P12' },
        { id: 'B', text: '当众斥火教为外道', axes: { jq: -4, zs: -4 }, next: 'P12' },
        { id: 'C', text: '只求通行文书，不涉教争', axes: { jq: 5, fs: 4 }, cai: 4, next: 'P12' }
      ],
      myth: { id: 'samejian', label: '跟祭司打一个赌：求雨' }
    },
    P12: {
      id: 'P12', title: '逐僧之令', where: '贞观三年 · 迦毕试', stamp: 12, stampName: '迦毕试', stampNote: '迦毕试：边王逐僧',
      text: '边王的兵围住质子伽蓝，说寺里藏着质子留下的珍宝。僧众跪在阶前，求你作证：寺中无宝。兵已经进了第一重门。你听见门轴转动的声音，一下，又一下。',
      notes: [{ tag: '实', text: '《西域记》卷一：质子伽蓝“近有边王……驱逐僧徒”' }, { tag: '推', text: '作证、携经等选择属推演' }],
      options: [
        { id: 'A', text: '出面作证，寺中无宝', axes: { ci: 6, zs: 5 }, cai: -6, next: 'P13' },
        { id: 'B', text: '连夜携经卷出城', axes: { jq: 6, ci: -2 }, next: 'P13' },
        { id: 'C', text: '以神通故事劝退边王', axes: { jq: 6, bo: -3 }, next: 'P13' }
      ],
      myth: { id: 'jiabishi', label: '请出护法神，吓退边王' }
    },
    P13: {
      id: 'P13', title: '东佛西佛', where: '贞观三年 · 梵衍那', stamp: 13, stampName: '梵衍那双佛', stampNote: '梵衍那双佛：东佛西佛',
      text: '王城东北山阿，立佛石像高百四五十尺，金色晃曜。东行至伽蓝，又有鍮石释迦立像，高百余尺，分身别铸，总合成立。城东伽蓝里，还有佛入涅槃卧像，长千余尺。',
      notes: [{ tag: '实', text: '《西域记》卷一：石佛高百四五十尺；伽蓝东鍮石释迦立像高百余尺；涅槃卧像长千余尺' }, { tag: '推', text: '测绘与抄录动作属推演' }],
      options: [
        { id: 'A', text: '测绘记录：高度、方位、材质', axes: { bo: 5, fs: 7 }, next: 'P14' },
        { id: 'B', text: '礼拜供养，绕行三匝', axes: { ci: 5, zs: 4 }, next: 'P14' },
        { id: 'C', text: '抄录“分身别铸”的工艺', axes: { fs: 6, bo: 3 }, next: 'P14' }
      ],
      myth: { id: 'fanyanna', label: '在佛前问一句：孙悟空是谁' }
    },
    P14: {
      id: 'P14', title: '商队说起女国', where: '贞观三年 · 雪山以南', stamp: 14, stampName: '女国传闻', stampNote: '女国传闻：玄奘未亲历',
      text: '客舍里，商队说起西边有个女国：以女为王，男子听命，国中多珍宝。你翻遍行囊，没有关于此国的记载。你没有去过那里——你只在传闻里听过。',
      notes: [{ tag: '实', text: '玄奘未至女国；东女国见《隋书》《旧唐书》' }, { tag: '推', text: '“西梁女国”为文学虚构，原型多指东女国/苏毗（假说）' }],
      options: [
        { id: 'A', text: '据闻录之，注明未亲历', axes: { bo: 4, zs: 3 }, next: 'P15' },
        { id: 'B', text: '不录，只记可信之事', axes: { qj: 5, ci: 3 }, next: 'P15' },
        { id: 'C', text: '绕道往访，去看个明白', flag: 'nvguo', terminal: 11 },
        { id: 'D', text: '弃法从商，随队西去', terminal: 12 }
      ],
      myth: { id: 'nvguo', label: '留下当国王' }
    },
    P15: {
      id: 'P15', title: '那烂陀', where: '贞观五年 · 摩揭陀', stamp: 15, stampName: '那烂陀', stampNote: '那烂陀：戒贤讲《瑜伽》',
      text: '那烂陀寺的戒贤法师已百余岁，为你开讲《瑜伽师地论》。寺中僧众数千，辩论之声日夜不绝。你也可以去王庭走动，那里有更多的供养与机会。',
      notes: [{ tag: '实', text: '《慈恩传》卷三：戒贤百余岁，为玄奘讲《瑜伽师地论》，留学五年' }, { tag: '推', text: '去留抉择属推演' }],
      options: [
        { id: 'A', text: '依戒贤学五年，不出寺门', axes: { bo: 8, qj: 4 }, next: 'P16' },
        { id: 'B', text: '广交王庭，为弘法铺路', axes: { jq: 7, bo: 3 }, next: 'P16' }
      ]
    },
    P16: {
      id: 'P16', title: '曲女城大会', where: '贞观十五年 · 曲女城', stamp: 16, stampName: '曲女城', stampNote: '曲女城：十八日无人能破',
      text: '戒日王在曲女城设无遮大会，请你去立论。十八日，无人能破。王请你留下，愿以国相待；那烂陀的僧人也劝你留在印度。你想起长安，想起那卷没有写完的稿。',
      notes: [{ tag: '实', text: '《慈恩传》卷五：戒日王设无遮大会，玄奘立论十八日无人能破，被尊“大乘天”' }, { tag: '推', text: '受王位之请属推演' }],
      options: [
        { id: 'A', text: '立论十八日，然后辞归', axes: { bo: 8, jq: 6 }, flag: 'great', terminal: 'auto' },
        { id: 'B', text: '不受王位，只求归国译经', axes: { zs: 5, qj: 5 }, terminal: 'auto' },
        { id: 'C', text: '受戒日王留用，留在印度', terminal: 8 },
        { id: 'D', text: '留那烂陀，不再东归', terminal: 3 }
      ]
    }
  };

  var ENDINGS = {
    1: { name: '求法大成', sub: '史实线', body: '你带着六百五十七部经论回到长安。太宗在洛阳召见，问你西域之事。你后来译经七十五部，一千三百三十五卷。那一年你四十四岁，往后还有十九年。' },
    2: { name: '译场终老', sub: '留守长安', body: '你没有西行。你在长安的译场里校勘旧经，把疑问留给下一代的僧人。你活到了很高的年纪，墓碑上只写“释门法师”。西行的事，别人做了。' },
    3: { name: '那烂陀不归', sub: '留在印度', body: '你留在那烂陀，讲《瑜伽》，辩因明。你的名字被刻在寺院的石上，东土来的僧人再没有见过你。长安的史书里，你只留了一行“西行不返”。' },
    4: { name: '高昌国师', sub: '受供养长住', body: '你留下做了高昌的国师。讲席、供养、王侯的礼敬都有了。很多年后，高昌被唐所灭，你的经卷散在火里。你想起过长安，但没有回去。' },
    5: { name: '沙碛枯骨', sub: '折返求水', body: '你向东走了很远。风把蹄印埋了，水没有找到。后来有人在那条路上看到一具枯骨，旁边有一只空水袋。没有人知道那是谁。' },
    6: { name: '凌山殒命', sub: '带着经卷硬闯', body: '暴风起来的时候，你把经卷抱在怀里。同行的向导说，放下吧。你没有放。雪停之后，路上多了几卷被风撕开的纸。' },
    7: { name: '辩经扬名', sub: '曲女城立论', body: '十八日，无人能破。戒日王为你设象舆，全城的人都来看这个东土僧人。你后来还是走了，但“大乘天”这个名字留在了印度的寺院里。' },
    8: { name: '卷入王庭', sub: '受戒日王留用', body: '你留下做了戒日王的顾问。你参与政事，也讲经。佛法借王权传得更远，你也再没有拿起过那卷竹简。有人说你成功了，你没有回答。' },
    9: { name: '空手东归', sub: '中途折返', body: '你回到了长安，两手空空。没有人责备你，也没有人再问你西边的事。你把一路的笔记收进箱底，后来箱子上落了灰。' },
    10: { name: '译经未竟', sub: '归国后力竭', body: '你回来了，带着经卷，也带着一身的病。译场开了又停，停了又开。你死在译经的案前，手边是一部没有译完的经。' },
    11: { name: '女国羁留', sub: '外史', body: '你绕道去了女国。女王留你讲法，也留你做了国师。你住了三年，又三年。雪山那边的路，你渐渐记不清了。' },
    12: { name: '商道余生', sub: '外史', body: '你跟着商队走了。驼铃、账目、沿途的关卡，比经卷更实在。你后来有了自己的商队，再也没有回过长安。' },
    13: { name: '戛然而止', sub: 'BAD END', body: '夜里的刀光比你的脚步快。第二天，瓜州的文书上多了一行：有僧西行，为盗所杀，无名。' }
  };

  /* 神话入口：8 个，各 1 页（选择后进入误读结局判定） */
  var MYTH = {
    guazhou: {
      title: '猴子护法', where: '准西游线 · 瓜州',
      text: '你讲了一个故事：有个石猴，被压在山下，等一个西行的人来揭帖。胡人少年听得入了神，忽然说：“我就是那个猴子。”他摸出一根铁棒，又缩了回去，说：“还没有到时候。”',
      choices: [
        { id: 'A', text: '与他结拜，同去取经', kind: 'fight' },
        { id: 'B', text: '只当他一时胡话，连夜过河', kind: 'flee' },
        { id: 'C', text: '为他念一遍《心经》，各走各路', kind: 'pray' }
      ]
    },
    mohe: {
      title: '深沙之影', where: '准西游线 · 莫贺延碛',
      text: '沙里立起一个人形，颈上挂着一串骷髅。它问你：“回头，还是往前？”你想起那卷没有写完的经。风把它的衣角吹起来，像一面破旗。',
      choices: [
        { id: 'A', text: '拔刀向前，喝退它', kind: 'fight' },
        { id: 'B', text: '绕开它，向东去', kind: 'flee' },
        { id: 'C', text: '坐下诵经，不理它', kind: 'pray' }
      ]
    },
    huoyan: {
      title: '芭蕉扇', where: '准西游线 · 火焰山',
      text: '山脚下有个女子，手里拿着一把芭蕉扇。她说借扇要过三关，第一关是“你从东土来做什么”。扇子一扇，火退了半尺。',
      choices: [
        { id: 'A', text: '与她斗法夺扇', kind: 'fight' },
        { id: 'B', text: '绕道而行，不与她纠缠', kind: 'flee' },
        { id: 'C', text: '讲明取经来意，求她借扇', kind: 'pray' }
      ]
    },
    samejian: {
      title: '求雨之赌', where: '准西游线 · 拜火之城',
      text: '祭司说，你若能求来一场雨，火坛就归你。你抬头看天，天很干净。人群围过来，等着看东土僧人出丑。',
      choices: [
        { id: 'A', text: '登坛作法，与天争一场雨', kind: 'fight' },
        { id: 'B', text: '不赌，转身出城', kind: 'flee' },
        { id: 'C', text: '只说法，不求雨', kind: 'pray' }
      ]
    },
    jiabishi: {
      title: '护法神', where: '准西游线 · 迦毕试',
      text: '你念动真言，伽蓝门前的神王像忽然睁眼。边王的兵退了一步，又退了一步。你听见自己心里有个声音说：这不是你的法力。',
      choices: [
        { id: 'A', text: '借神威，逼边王退兵', kind: 'fight' },
        { id: 'B', text: '趁乱携经出城', kind: 'flee' },
        { id: 'C', text: '收起神通，与边王讲理', kind: 'pray' }
      ]
    },
    fanyanna: {
      title: '佛前的问答', where: '准西游线 · 梵衍那',
      text: '你在东佛前站了很久。一个声音问你：“你问孙悟空是谁？”你说：“是石槃陀，是深沙神，是哈奴曼，是那只心猿。”声音笑了：“那你自己是谁？”',
      choices: [
        { id: 'A', text: '答：我是取经人', kind: 'fight' },
        { id: 'B', text: '答：我是玄奘', kind: 'flee' },
        { id: 'C', text: '不答，只礼拜', kind: 'pray' }
      ]
    },
    nvguo: {
      title: '女国之王', where: '准西游线 · 女国',
      text: '女王把王冠放在你面前，说：“留下，你就是国王。”殿外是雪山，殿内是暖炉。你想起长安的城门，也想起那卷没有写完的经。',
      choices: [
        { id: 'A', text: '戴上王冠，留下', kind: 'fight' },
        { id: 'B', text: '连夜出城，不告而别', kind: 'flee' },
        { id: 'C', text: '讲经三日，然后辞行', kind: 'pray' }
      ]
    },
    xindu: {
      title: '渡河失经', where: '准西游线 · 信度河',
      text: '船到中流，风把经卷吹落。水里有人伸手去捞，捞上来的是一卷无字的纸。船夫说：“这是河神在问你，取这些做什么。”',
      choices: [
        { id: 'A', text: '跳下水去，抢回经卷', kind: 'fight' },
        { id: 'B', text: '放弃经卷，保人性命', kind: 'flee' },
        { id: 'C', text: '在船头诵经，任它去留', kind: 'pray' }
      ]
    }
  };

  var MYTH_ENDINGS = {
    M1: { name: '另一个唐僧', sub: '误读结局 · 主', body: '你成了小说里的那个人：有徒弟，有神通，有八十一难。你取回了真经，也取回了无字的纸。史书里那个偷渡出境的人，你没有见过。' },
    M2: { name: '被压五行山', sub: '误读结局', body: '你被压在山下，等一个取经人来揭帖。五百年后，有人路过，看了一眼，走了。山上的草长了几茬，你已经记不清。' },
    M3: { name: '盘丝洞赘婿', sub: '误读结局', body: '你在盘丝洞住了下来。七个仙姑待你很好，只是不让你出门。你渐渐忘了长安的方向。窗外的蛛丝结了一层又一层。' },
    M4: { name: '雷音寺门口被劝返', sub: '误读结局', body: '你到了雷音寺，门口的人说：你要取的经，不在这里。你回头，来路上什么也没有。你在门口坐到天黑，寺里的灯一盏也没亮。' },
    M5: { name: '梦醒长安', sub: '误读结局', body: '你从案上醒来，讲义还摊着。窗外是长安的雪。你想了想，把“孙悟空”三个字从稿子上划掉了。你把那页纸折好，收进箱底。' }
  };


  var CHARACTERS = [
    { id: 'xuanzang', name: '玄奘', title: '三藏法师 · 602–664',
      note: '西安兴教寺玄奘像',
      bio: '洛州缑氏人。上表求法被拒，私发西行；往返十七年，取经六百五十七部，归国译经一千三百三十五卷。',
      credit: 'Wikimedia Commons · Public Domain',
      statue: 'assets/char/xuanzang_statue.jpg', restore: 'assets/char/xuanzang_restore.jpg' },
    { id: 'shilantu', name: '石槃陀', title: '胡人弟子 · 瓜州',
      note: '替代文物：唐三彩胡人俑',
      bio: '瓜州受戒为弟子，随玄奘渡瓠芦河；夜中拔刀，天明辞去。后世或以为孙悟空原型之一（假说）。',
      credit: 'Met Open Access · CC0',
      statue: 'assets/char/shilantu_statue.jpg', restore: 'assets/char/shilantu_restore.jpg' },
    { id: 'gaochang', name: '麴文泰', title: '高昌王 · ?–640',
      note: '替代文物：柏孜克里克供养人壁画',
      bio: '留玄奘长住，玄奘绝食明志；王与之结为兄弟，供给行资，通书沿途二十四国。',
      credit: 'Wikimedia Commons · CC BY 4.0',
      statue: 'assets/char/gaochang_statue.jpg', restore: 'assets/char/gaochang_restore.jpg' },
    { id: 'queen', name: '女国女王', title: '东女国 / 苏毗（传闻）',
      note: '替代文物：唐彩绘女俑',
      bio: '母系之国，以女为王。玄奘未亲历，《大唐西域记》未载；《隋书》《旧唐书》有《女国传》。',
      credit: 'Met Open Access · CC0',
      statue: 'assets/char/queen_statue.jpg', restore: 'assets/char/queen_restore.jpg' },
    { id: 'jiedi', name: '戒日王', title: '印度戒日王朝 · 590–647',
      note: '现代塑像（非同时代）',
      bio: '曲女城设无遮大会，玄奘立论十八日无人能破，被尊为"大乘天"。',
      credit: 'Wikimedia Commons · CC0',
      statue: 'assets/char/jiedi_statue.jpg', restore: 'assets/char/jiedi_restore.jpg' },
    { id: 'tang', name: '唐僧', title: '小说人物 · 对照项',
      note: '后世造像（非历史形象）',
      bio: '《西游记》中的取经人，原型即玄奘。软弱、依赖徒弟、奉命取经——与史实存在结构性偏差。',
      credit: 'Wikimedia Commons · CC BY-SA 4.0',
      statue: 'assets/char/tang_statue.jpg', restore: 'assets/char/tang_restore.jpg' }
  ];


  var MISREAD = [
    { novel: '奉旨取经、唐王御弟', fact: '上表被拒，“有诏不许”，私发西行；归国后太宗才召见', src: '《慈恩传》卷一', verdict: '你把一个偷渡出境的人，读成了奉旨钦差。' },
    { novel: '一路有徒弟保护', fact: '多段独行或随商队；石槃陀随至瓠芦河便辞去', src: '《慈恩传》卷一', verdict: '他的路，多数时候只有他自己。' },
    { novel: '软弱、遇险喊“悟空救我”', fact: '失水时“宁可就西而死，岂归东而生”；凌山同行死者十之三四仍前行', src: '《慈恩传》卷一、卷二', verdict: '他比小说里硬得多。' },
    { novel: '迂腐不辨、遇妖无策', fact: '曲女城立论十八日无人能破，被尊“大乘天”', src: '《慈恩传》卷五', verdict: '他不是不会辩，是懒得辩。' },
    { novel: '见佛就拜、遇塔扫塔', fact: '记录双佛高度、方位、材质（石像百四五十尺、鍮石像百余尺）', src: '《西域记》卷一', verdict: '他在测绘，不是朝圣。' },
    { novel: '取经为普度众生', fact: '主因是解义学分歧，求《十七地论》以断疑', src: '《慈恩传》卷一', verdict: '他先要弄明白，再谈度人。' },
    { novel: '取经十四年、八十一难', fact: '往返十七年，行程五万里', src: '《慈恩传》', verdict: '十七年，不是十四年。' },
    { novel: '无情无欲的圣僧', fact: '有乡愁；太宗劝其还俗，不从', src: '《慈恩传》卷六', verdict: '他没成佛，他成了译师。' }
  ];


  var PROTOTYPES = [
    { xi: '孙悟空', novel: '石猴护法，一路降妖', fact: '胡人少年受戒为弟子，随至瓠芦河；夜中拔刀，天明辞去', src: '《慈恩传》卷一', level: '假说', note: '“胡”与“猢狲”谐音说；另有哈奴曼、无支祁诸说' },
    { xi: '沙僧 / 流沙河', novel: '流沙河妖怪，颈挂骷髅', fact: '莫贺延碛失水，向东折返十余里，念《心经》后得水草', src: '《慈恩传》卷一；《取经诗话》', level: '假说', note: '“深沙神”见于宋人诗话，非唐代记载' },
    { xi: '火焰山', novel: '八百里火焰，铁扇公主', fact: '高昌—阿耆尼一线确有赤色山体，玄奘经行此地', src: '《慈恩传》卷一', level: '推演', note: '“火焰山”之名与铁扇公主均属文学创作' },
    { xi: '车迟国', novel: '三妖道，敬道灭僧', fact: '飒秣建国王与百姓事火，不信佛法，二伽蓝僧徒绝少', src: '《西域记》卷一', level: '假说', note: '玄奘说法后王改信佛教，见《慈恩传》' },
    { xi: '灭法国', novel: '国王杀僧，五千和尚', fact: '迦毕试质子伽蓝“近有边王……驱逐僧徒”', src: '《西域记》卷一', level: '假说', note: '逐僧夺宝之事西域屡见，非某一国专有' },
    { xi: '女儿国', novel: '西梁女国，女王招婿', fact: '玄奘未亲历；东女国以女为王，见《隋书》《旧唐书》', src: '《隋书·女国传》；《旧唐书·东女国》', level: '假说', note: '《大唐西域记》未载女国' },
    { xi: '通天河', novel: '灵感大王，唐僧落水', fact: '归国渡信度河遇风，经卷五十夹落水', src: '《慈恩传》卷五', level: '假说', note: '渡河失经为史实，灵感大王为文学' },
    { xi: '雷音寺 / 双佛', novel: '小雷音寺，假佛', fact: '梵衍那石佛高百四五十尺，鍮石释迦像百余尺，涅槃卧像千余尺', src: '《西域记》卷一', level: '史实', note: '双佛本身有明确记载，非小说虚构' }
  ];

  return { AXES: AXES, BASE: BASE, LINEAGE: LINEAGE, SCENES: SCENES, ENDINGS: ENDINGS, MYTH: MYTH, MYTH_ENDINGS: MYTH_ENDINGS, CHARACTERS: CHARACTERS, MISREAD: MISREAD, PROTOTYPES: PROTOTYPES };
})();


/* 《玄奘西行》引擎：状态唯一真值，所有变更只经 applyOption */
var ENGINE = (function () {
  var AX = DATA.AXES;

  function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

  function startState() {
    var axes = {};
    AX.forEach(function (a) { axes[a.k] = 50; });
    return { node: 'P1', axes: axes, cai: 60, flags: {}, stamps: [], steps: [], M: 0, mythId: null, mythChoices: [] };
  }

  function applyOption(state, opt) {
    var s = {
      node: state.node, axes: Object.assign({}, state.axes), cai: state.cai,
      flags: Object.assign({}, state.flags), stamps: state.stamps.slice(),
      steps: state.steps.slice(), M: state.M, mythId: null, mythChoices: []
    };
    if (opt.axes) for (var k in opt.axes) s.axes[k] = clamp(s.axes[k] + opt.axes[k]);
    if (opt.cai) s.cai = clamp(s.cai + opt.cai);
    if (opt.flag) s.flags[opt.flag] = (s.flags[opt.flag] || 0) + 1;
    if (opt.stamp) { /* 印章按到达节点给，不按选项 */ }
    var node = DATA.SCENES[s.node];
    if (node && node.stamp && s.stamps.indexOf(node.stamp) < 0) s.stamps.push(node.stamp);
    s.steps.push({ node: s.node, opt: opt.id });
    // 误读证据
    if (opt.flag === 'night') s.M += 6;
    if (opt.flag === 'east') s.M += 6;
    if (opt.flag === 'nvguo') s.M += 6;
    if (opt.misread) s.M += 4;
    s.M = Math.min(100, s.M);

    if (opt.terminal && opt.terminal !== 'auto') { s.endingId = opt.terminal; return s; }
    if (opt.terminal === 'auto') { s.endingId = judge(s); return s; }
    if (opt.next) s.node = opt.next;
    return s;
  }

  /* 正史结局：特异性优先 + 兜底 */
  function judge(s) {
    if (s.endingId) return s.endingId;
    var a = s.axes;
    if (s.flags.great && a.jq >= 70) return 7;
    if (a.bo >= 80 && a.zs >= 65) return 1;
    if (a.zs >= 75 && a.jq < 60) return 2;
    if (s.cai < 40) return 10;
    return 1;
  }

  /* 神话结局 */
  function mythJudge(kind, s) {
    var a = s.axes;
    if (kind === 'fight') return (a.bo + a.jq >= 130) ? 'M1' : 'M2';
    if (kind === 'flee') return (a.zs >= 65) ? 'M5' : 'M3';
    if (kind === 'pray') return (a.bo >= 70) ? 'M4' : 'M5';
    return 'M1';
  }

  function sim(a, b) {
    var sum = 0;
    AX.forEach(function (x) { sum += Math.abs(a[x.k] - b[x.k]); });
    return Math.round(100 - sum / AX.length);
  }

  function lineageOf(a) {
    var best = null, bestS = -1;
    DATA.LINEAGE.forEach(function (l) {
      var s = sim(a, l.p);
      if (s > bestS) { bestS = s; best = l; }
    });
    return { id: best.id, name: best.name, tag: best.tag, score: bestS };
  }

  function compare(s) {
    var a = s.axes, xz = DATA.BASE.xuanzang, ts = DATA.BASE.tang;
    var dXZ = sim(a, xz), dTS = sim(a, ts), dXT = sim(xz, ts);
    var diff = AX.map(function (x) {
      return { k: x.k, name: x.name, group: x.group, me: a[x.k], xz: xz[x.k], ts: ts[x.k], delta: Math.abs(a[x.k] - xz[x.k]) };
    }).sort(function (p, q) { return q.delta - p.delta; }).slice(0, 2);
    var overlaps = AX.filter(function (x) { return Math.min(a[x.k], ts[x.k]) >= 40; })
      .map(function (x) { return { name: x.name, me: a[x.k], ts: ts[x.k] }; });
    return {
      dXZ: dXZ, dTS: dTS, dXT: dXT, diff: diff, overlaps: overlaps,
      lineage: lineageOf(a),
      misread: dTS > dXZ,
      M: s.M
    };
  }

  function verdict(c) {
    if (!c.misread) return '你比小说里的唐僧更接近史实；但你与玄奘之间仍有裂口。';
    return '你与玄奘的裂口，正好是小说替唐僧垫低的那两轴——你把一个偷渡出境的人，读成了奉旨钦差。';
  }

  return {
    startState: startState, applyOption: applyOption, judge: judge,
    mythJudge: mythJudge, sim: sim, lineageOf: lineageOf, compare: compare, verdict: verdict, clamp: clamp
  };
})();


/* 界面：只渲染，不持状态 */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
  });
}

var AX = DATA.AXES;

var SCENE_ART = {
  P1: 'p01_changan', P2: 'p02_liangzhou', P3: 'p03_guazhou', P4: 'p04_mohe',
  P5: 'p05_yiwu', P6: 'p06_gaochang', P7: 'p07_huoyan', P8: 'p08_qiuci',
  P9: 'p09_lingshan', P10: 'p10_suye', P11: 'p11_samejian', P12: 'p12_jiabishi',
  P13: 'p13_fanyanna', P14: 'p14_nvguo', P15: 'p15_nalanda', P16: 'p16_quyu'
};
var MYTH_ART = {
  guazhou: 'm01_guazhou', mohe: 'm02_mohe', huoyan: 'm03_huoyan', samejian: 'm04_samejian',
  jiabishi: 'm05_jiabishi', fanyanna: 'm06_fanyanna', nvguo: 'm07_nvguo', xindu: 'm08_xindu'
};
var END_ART = {
  1: 'e01_qiufa', 2: 'e02_yichang', 3: 'e03_nalanda', 4: 'e04_gaochang', 5: 'e05_shamo',
  6: 'e06_lingshan', 7: 'e07_bianjing', 8: 'e08_wangting', 9: 'e09_kongshou',
  10: 'e10_weijing', 11: 'e11_nvguo', 12: 'e12_shangdao', 13: 'e13_bad'
};
var MYTH_END_ART = { M1: 'M1_another', M2: 'M2_wuxing', M3: 'M3_pansi', M4: 'M4_leiyin', M5: 'M5_wake' };

function asset(p) {
  return (typeof window !== 'undefined' && window.TSX_INLINE && window.TSX_INLINE[p]) || p;
}
function bgLayer(p) {
  return '<div class="art"><img src="' + esc(asset(p)) + '" alt=""></div>';
}

function pt(a, v, R, C) {
  var r = (a - 90) * Math.PI / 180;
  return [C + Math.cos(r) * R * v / 100, C + Math.sin(r) * R * v / 100];
}

function radar(player, base, size) {
  var R = size * 0.34, C = size / 2, s = '';
  var n = AX.length;
  for (var p = 20; p <= 100; p += 20) {
    var pts = [];
    for (var i = 0; i < n; i++) pts.push(pt(i * 360 / n, p, R, C).join(','));
    s += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="rgba(232,224,207,.13)"' + (p < 100 ? ' stroke-dasharray="3 5"' : '') + '/>';
  }
  for (var j = 0; j < n; j++) {
    var e = pt(j * 360 / n, 100, R, C);
    s += '<line x1="' + C + '" y1="' + C + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="rgba(232,224,207,.16)"/>';
  }
  var bp = [], pp = [];
  for (var k = 0; k < n; k++) {
    bp.push(pt(k * 360 / n, base[AX[k].k], R, C).join(','));
    pp.push(pt(k * 360 / n, player[AX[k].k], R, C).join(','));
  }
  s += '<polygon points="' + bp.join(' ') + '" fill="rgba(200,195,180,.05)" stroke="rgba(210,205,190,.5)" stroke-dasharray="7 5"/>';
  s += '<polygon points="' + pp.join(' ') + '" fill="rgba(211,169,79,.16)" stroke="#d3a94f" stroke-width="2"/>';
  for (var m = 0; m < n; m++) {
    var q = pt(m * 360 / n, player[AX[m].k], R, C);
    s += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="3" fill="#d3a94f"/>';
    var lp = pt(m * 360 / n, 120, R, C);
    s += '<text x="' + lp[0] + '" y="' + lp[1] + '" fill="#c9bfa6" font-size="12" text-anchor="middle" font-family="serif">' + AX[m].name + '</text>';
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">' + s + '</svg>';
}

function compareSVG(c, player, size) {
  var R = size * 0.33, C = size / 2, s = '', n = 6;
  for (var p = 20; p <= 100; p += 20) {
    var pts = [];
    for (var i = 0; i < n; i++) pts.push(pt(i * 60, p, R, C).join(','));
    s += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="rgba(232,224,207,.12)"' + (p < 100 ? ' stroke-dasharray="3 5"' : '') + '/>';
  }
  for (var j = 0; j < n; j++) {
    var e = pt(j * 60, 100, R, C);
    s += '<line x1="' + C + '" y1="' + C + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="rgba(232,224,207,.14)"/>';
  }
  // 差异轴光束
  c.diff.forEach(function (d) {
    var idx = -1;
    for (var i = 0; i < n; i++) if (AX[i].k === d.k) idx = i;
    if (idx < 0) return;
    var e = pt(idx * 60, 100, R, C);
    s += '<line x1="' + C + '" y1="' + C + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="#c05a44" stroke-width="8" opacity=".18" filter="url(#blur)"/>';
    s += '<line x1="' + C + '" y1="' + C + '" x2="' + e[0] + '" y2="' + e[1] + '" stroke="#e08a6a" stroke-width="1.2" stroke-dasharray="2 4"/>';
  });
  function poly(src, stroke, fill, dash) {
    var arr = [];
    for (var i = 0; i < n; i++) arr.push(pt(i * 60, src[AX[i].k], R, C).join(','));
    return '<polygon points="' + arr.join(' ') + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  }
  s += poly(DATA.BASE.xuanzang, 'rgba(210,205,190,.55)', 'rgba(200,195,180,.04)', '7 5');
  s += poly(DATA.BASE.tang, 'rgba(110,180,170,.55)', 'rgba(79,138,131,.06)', '4 4');
  s += poly(player, '#d3a94f', 'rgba(211,169,79,.16)', '');
  for (var m = 0; m < n; m++) {
    var lp = pt(m * 60, 118, R, C);
    s += '<text x="' + lp[0] + '" y="' + lp[1] + '" fill="#c9bfa6" font-size="12" text-anchor="middle" font-family="serif">' + AX[m].name + '</text>';
  }
  return '<svg viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '">' +
    '<defs><filter id="blur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter></defs>' + s + '</svg>';
}

function hud(s) {
  return '<div class="hud"><span>资粮 <b>' + s.cai + '</b></span>' +
    '<button class="hud-link" data-act="stamps">印章 <b>' + s.stamps.length + ' / 16</b></button></div>';
}

function startScreen() {
  return '<section class="screen start">' + bgLayer('assets/title.jpg') + '<div class="inner">' +
    '<p class="kicker">贞观三年 · 长安</p>' +
    '<h1>玄奘西行</h1>' +
    '<p class="lead">你是一个僧人。你要去天竺问一件事。<br>路上没有孙悟空。</p>' +
    '<div class="row">' + (typeof appHasSave === "function" && appHasSave() ? '<button class="btn" data-act="continue">继续上次</button>' : '') + '<button class="btn primary" data-act="begin">入史</button>' +
    '<button class="btn" data-act="stamps">路线印章</button>' +
    '<button class="btn" data-act="chars">人物档案</button>' +
    '<button class="btn" data-act="board">排行榜</button>' +
    '<button class="btn" data-act="endings">结局图鉴</button>' +
    '<button class="btn" data-act="player">记录者</button>' +
    '<button class="btn" data-act="museum">误解纪念馆</button>' +
    '<button class="btn" data-act="prototypes">原型考</button>' +
    '<button class="btn" data-act="atlas">史料地图</button>' +
    '<button class="btn" data-act="about">说明</button></div>' +
    '</div></section>';
}

function sceneScreen(s) {
  var node = DATA.SCENES[s.node];
  var opts = node.options.map(function (o, i) {
    return '<button class="opt" data-act="choose" data-opt="' + o.id + '">' +
      '<span class="num">' + (i + 1) + '</span><span>' + esc(o.text) + '</span></button>';
  }).join('');
  var myth = '';
  if (node.myth) {
    var m = DATA.MYTH[node.myth.id];
    myth = '<div class="myth-entry"><button class="myth-btn" data-act="myth" data-myth="' + node.myth.id + '">〔神话〕' + esc(node.myth.label) + '</button>' +
      '<p class="tiny">此选项将离开史实线，进入《西游记》式的可能。</p></div>';
  }
  return '<section class="screen scene">' + bgLayer('assets/bg/' + SCENE_ART[s.node] + '.jpg') + hud(s) +
    '<div class="inner">' +
    '<p class="where">' + esc(node.where) + '</p>' +
    '<h2>' + esc(node.title) + '</h2>' +
    '<div class="prose">' + node.text.split('\n').map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
    notesBlock(node) + '<div class="opts">' + opts + '</div>' + myth + mapLink(node) +
    '</div></section>';
}

function mythScreen(s, m) {
  var opts = m.choices.map(function (o, i) {
    return '<button class="opt" data-act="myth-choose" data-kind="' + o.kind + '">' +
      '<span class="num">' + (i + 1) + '</span><span>' + esc(o.text) + '</span></button>';
  }).join('');
  return '<section class="screen myth">' + bgLayer('assets/myth/' + MYTH_ART[APP.mythId] + '.jpg') +
    '<div class="seal">戏说 · 非史实</div>' +
    '<div class="inner"><p class="where">' + esc(m.where) + '</p><h2>' + esc(m.title) + '</h2>' +
    '<div class="prose"><p>' + esc(m.text) + '</p></div>' +
    '<div class="opts">' + opts + '</div>' +
    '<p class="tiny">选择后进入误读结局，并生成一份"误读诊断书"。</p></div></section>';
}

function endingScreen(id, s) {
  var e = DATA.ENDINGS[id];
  var c = ENGINE.compare(s);
  var radarHTML = radar(s.axes, DATA.BASE.xuanzang, 420);
  return '<section class="screen ending">' + bgLayer('assets/ending/' + END_ART[id] + '.jpg') + '<div class="inner">' +
    '<p class="where">' + esc(e.sub) + '</p><h1>' + esc(e.name) + '</h1>' +
    '<div class="prose">' + e.body.split('\n').map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>' +
    '<div class="compare">' + radarHTML +
    '<div class="stats"><p>与玄奘相似 <b>' + c.dXZ + '</b></p>' +
    '<p>谱系 <b>' + c.lineage.name + '</b> · ' + c.lineage.tag + '</p>' +
    '<p>印章 <b>' + s.stamps.length + ' / 16</b></p></div></div>' +
    routeBlock(s) + '<button class="btn" data-act="card">生成本局分享卡</button>' +
    '<div class="row"><button class="btn primary" data-act="restart">重走西行</button>' +
    '<button class="btn" data-act="stamps">路线印章</button>' +
    '<button class="btn" data-act="museum">误解纪念馆</button>' +
    '<button class="btn" data-act="prototypes">原型考</button></div>' +
    '</div></section>';
}

function mythEndingScreen(key, s) {
  var e = DATA.MYTH_ENDINGS[key];
  var c = ENGINE.compare(s);
  var rows = c.diff.map(function (d) {
    return '<p>· ' + d.name + ' −' + d.delta + '（你 ' + d.me + ' / 玄奘 ' + d.xz + ' / 唐僧 ' + d.ts + '）</p>';
  }).join('');
  var ov = c.overlaps.map(function (o) { return '<p>· ' + o.name + '（你 ' + o.me + ' / 唐僧 ' + o.ts + '）</p>'; }).join('');
  return '<section class="screen myth-ending">' + bgLayer('assets/myth_end/' + MYTH_END_ART[key] + '.jpg') + '<div class="seal">误读结局</div><div class="inner">' +
    '<p class="where">' + esc(e.sub) + '</p><h1>' + esc(e.name) + '</h1>' +
    '<div class="prose"><p>' + esc(e.body) + '</p></div>' +
    '<h3 class="ch">误读诊断书</h3>' +
    '<div class="compare">' + compareSVG(c, s.axes, 500) +
    '<div class="stats">' +
    '<p>你 ↔ 玄奘 <b>' + c.dXZ + '</b></p><p>你 ↔ 唐僧 <b>' + c.dTS + '</b></p><p>玄奘 ↔ 唐僧 <b>' + c.dXT + '</b></p>' +
    '<p class="hit">' + (c.misread ? '判定：误读态' : '判定：尚未完全误读') + '</p>' +
    '<h4>差异轴（你与玄奘裂口）</h4>' + rows +
    '<h4>与唐僧重合</h4>' + (ov || '<p>· 无</p>') +
    '<p class="verdict">' + esc(ENGINE.verdict(c)) + '</p>' +
    '</div></div>' +
    '<div class="row"><button class="btn primary" data-act="restart">梦醒，重走</button>' +
    '<button class="btn" data-act="stamps">路线印章</button>' +
    '<button class="btn" data-act="museum">误解纪念馆</button>' +
    '<button class="btn" data-act="prototypes">原型考</button></div>' +
    '</div></section>';
}

var STAMP_LONLAT = {
  1: [108.94, 34.27], 2: [102.64, 37.93], 3: [95.78, 40.52], 4: [94.0, 42.0],
  5: [93.5, 43.0], 6: [89.5, 42.9], 7: [89.2, 42.95], 8: [82.9, 41.7],
  9: [78.5, 42.0], 10: [75.2, 42.8], 11: [66.96, 39.65], 12: [69.2, 34.95],
  13: [67.8, 34.82], 14: [102.0, 31.0], 15: [85.44, 25.13], 16: [79.92, 26.93]
};

var STAMP_POS = {
  1: [84, 64], 2: [76, 56], 3: [69, 50], 4: [62, 45], 5: [56, 42], 6: [50, 46],
  7: [46, 50], 8: [40, 48], 9: [34, 42], 10: [28, 36], 11: [22, 38], 12: [18, 44],
  13: [14, 49], 14: [24, 58], 15: [13, 64], 16: [9, 69]
};

function stampName(i) {
  for (var id in DATA.SCENES) if (DATA.SCENES[id].stamp === i) return DATA.SCENES[id].stampName;
  return '';
}
function stampNoteOf(i) {
  for (var id in DATA.SCENES) if (DATA.SCENES[id].stamp === i) return DATA.SCENES[id].stampNote || '';
  return '';
}

function stampsScreen(s, sel) {
  var pins = '';
  for (var i = 1; i <= 16; i++) {
    var lit = s.stamps.indexOf(i) >= 0;
    var pos = STAMP_POS[i] || [50, 50];
    pins += '<button class="pin' + (lit ? ' lit' : '') + (sel === i ? ' sel' : '') + '"' +
      ' style="left:' + pos[0] + '%;top:' + pos[1] + '%"' +
      ' data-act="stamp" data-id="' + i + '" title="' + esc(stampName(i)) + '">' +
      '<span class="pin-no">' + i + '</span>' +
      (lit ? '<span class="pin-nm">' + esc(stampName(i)) + '</span>' : '') +
      '</button>';
  }
  var detail = '';
  if (sel) {
    var lit2 = s.stamps.indexOf(sel) >= 0;
    detail = '<div class="stamp-detail">' +
      '<h3>' + sel + ' · ' + esc(stampName(sel)) + '　<span class="' + (lit2 ? 'on' : 'off') + '">' + (lit2 ? '已盖' : '未盖') + '</span></h3>' +
      '<p>' + esc(stampNoteOf(sel)) + '</p>' +
      (lit2 ? '' : '<p class="tiny">走到这一站、做出选择后自动盖印。</p>') +
      '<div class="row"><button class="btn" data-act="atlas-focus" data-q="' + esc(stampName(sel)) + '">看地图 · 这一站</button></div>' +
      '</div>';
  }
  return '<section class="screen stamps">' + bgLayer('assets/stamp/map.jpg') + '<div class="inner">' +
    '<h2>路线印章</h2><p class="tiny">已盖 ' + s.stamps.length + ' / 16。点任意站点看该站史实。</p>' +
    '<div class="stamp-map">' + pins + '</div>' + detail +
    '<div class="row"><button class="btn" data-act="back">返回</button>' +
    '<button class="btn" data-act="atlas">史料地图</button>' +
    '<button class="btn" data-act="chars">人物档案</button></div></div></section>';
}

function aboutScreen() {
  return '<section class="screen about"><div class="inner">' +
    '<h2>说明</h2><div class="prose">' +
    '<p>这是一个关于玄奘的短游戏。六轴（慈悲/般若/清静/方术/忠恕/经权）记录你像不像他。</p>' +
    '<p>每个原型节点藏着一个〔神话〕选项：选了它，就进入《西游记》式的可能，最后会给你一份"误读诊断书"——用你、唐僧、玄奘三块面板解释你为什么走错。</p>' +
    '<p>十六站可盖十六枚印；八条误解收在纪念馆（后续版本）。</p></div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
}

function charsScreen() {
  var cards = DATA.CHARACTERS.map(function (c) {
    return '<article class="char-card">' +
      '<div class="char-pair">' +
      '<figure><img src="' + esc(asset(c.statue)) + '" alt="" onerror="this.parentNode.classList.add(\'missing\')"><figcaption>真实造像</figcaption>' + (c.note ? '<span class="char-note">' + esc(c.note) + '</span>' : '') + '</figure>' +
      '<figure><img src="' + esc(asset(c.restore)) + '" alt=""><figcaption>复原形象</figcaption></figure>' +
      '</div>' +
      '<h3>' + esc(c.name) + '</h3><p class="char-title">' + esc(c.title) + '</p>' +
      '<p class="char-bio">' + esc(c.bio) + '</p>' +
      '<p class="char-credit">造像来源：' + esc(c.credit || '待补') + '</p></article>';
  }).join('');
  return '<section class="screen chars"><div class="inner"><h2>人物档案</h2>' +
    '<p class="tiny">左为真实造像（石像/壁画/文物），右为复原形象。空缺者待补。</p>' +
    '<div class="char-grid">' + cards + '</div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
}

function atlasHTML() {
  var k = 'assets/map/atlas.html';
  if (typeof window !== 'undefined' && window.TSX_INLINE_HTML && window.TSX_INLINE_HTML[k]) {
    if (!window.__tsxAtlasHTML) {
      var b64 = String(window.TSX_INLINE_HTML[k]).split(',')[1] || '';
      var bin = atob(b64);
      var arr = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      window.__tsxAtlasHTML = new TextDecoder('utf-8').decode(arr);
    }
    return window.__tsxAtlasHTML;
  }
  return null;
}

function escAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function atlasFocus(html, q) {
  var js = '';
  if (q) {
    js += '<script>window.addEventListener("load",function(){setTimeout(function(){try{' +
      'var q=' + JSON.stringify(q) + ';var els=[].slice.call(document.querySelectorAll("button,a,li,[role=button],.event,.timeline-item"));' +
      'var hit=els.filter(function(x){return x.textContent&&x.textContent.trim().indexOf(q)>=0;})[0];' +
      'if(hit&&hit.click)hit.click();}catch(e){}},900);});<\/script>';
  }
  var lit = (typeof APP !== 'undefined' && APP.s && APP.s.stamps) ? APP.s.stamps : [];
  var spots = [];
  for (var i = 1; i <= 16; i++) {
    var ll = STAMP_LONLAT[i]; if (!ll) continue;
    spots.push([ll[0], ll[1], lit.indexOf(i) >= 0 ? 1 : 0, i]);
  }
  js += '<script>window.XZ_STAMPS=' + JSON.stringify(spots) + ';<\/script>';
  var k = html.lastIndexOf('</body>');
  return k >= 0 ? html.slice(0, k) + js + html.slice(k) : html + js;
}

function atlasScreen(q) {
  var html = atlasHTML();
  var url = 'assets/map/atlas.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  var src = html ? 'srcdoc="' + escAttr(atlasFocus(html, q)) + '"' : 'src="' + escAttr(url) + '"';
  return '<section class="screen atlas">' +
    '<div class="atlas-bar"><button class="btn" data-act="back">返回</button>' +
    '<span>玄奘西行 · 史料地图</span>' + '<span class="atlas-stamp-info">已盖 ' + ((typeof APP !== 'undefined' && APP.s) ? APP.s.stamps.length : 0) + ' / 16</span></div>' +
    atlasStrip() +
    '<iframe ' + src + ' title="史料地图"></iframe>' +
    '</section>';
}

function charsScreen() {
  var cards = DATA.CHARACTERS.map(function (c) {
    return '<article class="char-card">' +
      '<div class="char-pair">' +
      '<figure><img src="' + esc(asset(c.statue)) + '" alt="" onerror="this.parentNode.classList.add(\'missing\')"><figcaption>真实造像</figcaption>' + (c.note ? '<span class="char-note">' + esc(c.note) + '</span>' : '') + '</figure>' +
      '<figure><img src="' + esc(asset(c.restore)) + '" alt=""><figcaption>复原形象</figcaption></figure>' +
      '</div>' +
      '<h3>' + esc(c.name) + '</h3><p class="char-title">' + esc(c.title) + '</p>' +
      '<p class="char-bio">' + esc(c.bio) + '</p>' +
      '<p class="char-credit">造像来源：' + esc(c.credit || '待补') + '</p></article>';
  }).join('');
  return '<section class="screen chars"><div class="inner"><h2>人物档案</h2>' +
    '<p class="tiny">左为真实造像（石像/壁画/文物），右为复原形象。空缺者待补。</p>' +
    '<div class="char-grid">' + cards + '</div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
}

function notesBlock(node) {
  if (!node.notes || !node.notes.length) return '';
  var items = node.notes.map(function (n) {
    var cls = n.tag === '实' ? 'real' : (n.tag === '假' ? 'guess' : 'infer');
    return '<p class="note-item"><span class="note-tag ' + cls + '">' + esc(n.tag) + '</span>' + esc(n.text) + '</p>';
  }).join('');
  return '<details class="notes"><summary>史料与本页推演</summary>' + items + '</details>';
}

function routeBlock(s) {
  var seq = [];
  (s.steps || []).forEach(function (st) {
    var sc = DATA.SCENES[st.node];
    if (sc && sc.stamp && seq.indexOf(sc.stamp) < 0) seq.push(sc.stamp);
  });
  if (!seq.length) return '';
  var pts = seq.map(function (i) { return STAMP_POS[i]; });
  var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + (p[0] * 3).toFixed(1) + ' ' + (p[1] * 2).toFixed(1); }).join(' ');
  var dots = pts.map(function (p, i) {
    return '<circle cx="' + (p[0] * 3).toFixed(1) + '" cy="' + (p[1] * 2).toFixed(1) + '" r="2.2" fill="#d3a94f"/>' +
      '<text x="' + (p[0] * 3).toFixed(1) + '" y="' + (p[1] * 2 - 4).toFixed(1) + '" fill="#c9bfa6" font-size="6" text-anchor="middle" font-family="serif">' + seq[i] + '</text>';
  }).join('');
  return '<div class="route"><h3 class="ch">本局路线</h3>' +
    '<svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet" class="route-svg">' +
    '<image href="' + esc(asset('assets/stamp/map.jpg')) + '" x="0" y="0" width="300" height="200" opacity=".5" preserveAspectRatio="xMidYMid slice"/>' +
    '<path d="' + d + '" fill="none" stroke="#e0b75a" stroke-width="1.4" stroke-dasharray="4 3"/>' + dots + '</svg></div>';
}

function museumScreen() {
  var cards = DATA.MISREAD.map(function (m, i) {
    return '<article class="mis-card">' +
      '<div class="mis-no">' + (i + 1) + '</div>' +
      '<p class="mis-novel">小说：' + esc(m.novel) + '</p>' +
      '<p class="mis-fact">史实：' + esc(m.fact) + '</p>' +
      '<p class="mis-src">' + esc(m.src) + '</p>' +
      '<p class="mis-verdict">' + esc(m.verdict) + '</p></article>';
  }).join('');
  return '<section class="screen museum"><div class="inner"><h2>误解纪念馆</h2>' +
    '<p class="tiny">《西游记》流传四百年，最容易被当成史实的八件事。每条都给原文出处。</p>' +
    '<div class="mis-grid">' + cards + '</div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button>' +
    '<button class="btn" data-act="atlas">史料地图</button></div></div></section>';
}

function mapLink(node) {
  return '<div class="maplink"><button class="btn" data-act="atlas-focus" data-q="' + esc(node.stampName || '') + '">看地图 · 这一站</button></div>';
}

function playerScreen(db) {
  var cur = (db && db.active) || '访客';
  var ids = db && db.players ? Object.keys(db.players) : [];
  var list = ids.map(function (id) {
    return '<button class="chip' + (id === cur ? ' on' : '') + '" data-act="switch-player" data-id="' + esc(id) + '">' + esc(id) + '</button>';
  }).join('');
  return '<section class="screen player"><div class="inner"><h2>记录者</h2>' +
    '<p class="tiny">本机多人轮流：输入名字开始，记录只存在这台设备上。</p>' +
    '<input id="player-input" maxlength="12" placeholder="名字（2–12 字）" value="' + esc(cur) + '">' +
    '<div class="row"><button class="btn primary" data-act="set-player">用这个名字</button>' +
    '<button class="btn" data-act="back">返回</button></div>' +
    (list ? '<div class="chips">' + list + '</div>' : '') +
    '</div></section>';
}

function boardScreen(db) {
  var rows = [];
  if (db && db.players) {
    Object.keys(db.players).forEach(function (id) {
      (db.players[id].runs || []).forEach(function (r) { rows.push({ id: id, r: r }); });
    });
  }
  rows.sort(function (a, b) { return b.r.sim - a.r.sim; });
  var html = rows.slice(0, 50).map(function (x, i) {
    var d = new Date(x.r.at);
    return '<tr class="rowlink" data-act="replay" data-player="' + esc(x.id) + '" data-run="' + i + '">' +
      '<td class="num">' + (i + 1) + '</td><td>' + esc(x.id) + '</td>' +
      '<td>' + esc(x.r.name || ('结局 ' + x.r.ending)) + '</td>' +
      '<td class="num">' + x.r.sim + '</td><td class="num">' + x.r.stamps + '/16</td>' +
      '<td class="date">' + (d.getMonth() + 1) + '/' + d.getDate() + '</td></tr>';
  }).join('');
  if (!html) html = '<tr><td colspan="6" class="empty">还没有记录。玩一局吧。</td></tr>';
  return '<section class="screen board"><div class="inner"><h2>排行榜</h2>' +
    '<p class="tiny">按与玄奘的相似度排序，本机记录。</p>' +
    '<table class="table"><thead><tr><th>#</th><th>记录者</th><th>结局</th><th>相似度</th><th>印章</th><th>日期</th></tr></thead>' +
    '<tbody>' + html + '</tbody></table>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
}

function cardScreen() {
  return '<section class="screen card"><div class="inner"><h2>本局分享卡</h2>' +
    '<p class="tiny">已生成，可长按/右键保存，或点下面按钮下载。</p>' +
    '<canvas id="share" width="1080" height="1440" style="width:100%;max-width:540px;height:auto;border:1px solid rgba(211,169,79,.2)"></canvas>' +
    '<div class="row"><button class="btn primary" data-act="download-card">下载 PNG</button>' +
    '<button class="btn" data-act="back">返回</button></div></div></section>';
}

function drawCard(endingId, s) {
  var cv = document.getElementById('share');
  if (!cv || !cv.getContext) return;
  var ctx = cv.getContext('2d');
  var W = 1080, H = 1440;
  ctx.fillStyle = '#12110f'; ctx.fillRect(0, 0, W, H);
  var e = DATA.ENDINGS[endingId] || { name: '', body: '' };
  var c = ENGINE.compare(s);
  var art = new Image();
  var map = new Image();
  var pending = 2;
  function done() {
    if (--pending > 0) return;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(18,17,15,.55)'); g.addColorStop(1, 'rgba(18,17,15,.96)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#d3a94f'; ctx.font = '22px "Songti SC",serif'; ctx.textAlign = 'center';
    ctx.fillText('玄 奘 西 行 · 本 局', W / 2, 120);
    ctx.fillStyle = '#f0e6d2'; ctx.font = '64px "Songti SC",serif';
    ctx.fillText(e.name || '', W / 2, 220);
    ctx.fillStyle = '#a99f8a'; ctx.font = '24px "Songti SC",serif';
    ctx.fillText((e.sub || '') + '　·　与玄奘相似 ' + c.dXZ + ' / 谱系 ' + c.lineage.name, W / 2, 268);
    // 雷达
    var CX = W / 2, CY = 560, R = 170;
    function pt2(i, v) { var a = (i * 60 - 90) * Math.PI / 180; return [CX + Math.cos(a) * R * v / 100, CY + Math.sin(a) * R * v / 100]; }
    ctx.strokeStyle = 'rgba(232,224,207,.15)';
    for (var ring = 1; ring <= 5; ring++) {
      ctx.beginPath();
      for (var i = 0; i < 6; i++) { var p = pt2(i, ring * 20); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
      ctx.closePath(); ctx.stroke();
    }
    var base = DATA.BASE.xuanzang;
    ctx.beginPath();
    for (var j = 0; j < 6; j++) { var pb = pt2(j, base[AX[j].k]); j ? ctx.lineTo(pb[0], pb[1]) : ctx.moveTo(pb[0], pb[1]); }
    ctx.closePath(); ctx.strokeStyle = 'rgba(210,205,190,.45)'; ctx.setLineDash([7, 5]); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath();
    for (var k = 0; k < 6; k++) { var pp = pt2(k, s.axes[AX[k].k]); k ? ctx.lineTo(pp[0], pp[1]) : ctx.moveTo(pp[0], pp[1]); }
    ctx.closePath(); ctx.fillStyle = 'rgba(211,169,79,.18)'; ctx.fill();
    ctx.strokeStyle = '#d3a94f'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#a99f8a'; ctx.font = '18px "Songti SC",serif';
    for (var m = 0; m < 6; m++) { var pl = pt2(m, 118); ctx.fillText(AX[m].name, pl[0], pl[1]); }
    // 路线
    var RX = 90, RY = 860, RW = 900, RH = 420;
    ctx.globalAlpha = .5; ctx.drawImage(map, RX, RY, RW, RH); ctx.globalAlpha = 1;
    var seq = [];
    (s.steps || []).forEach(function (st) { var sc = DATA.SCENES[st.node]; if (sc && sc.stamp && seq.indexOf(sc.stamp) < 0) seq.push(sc.stamp); });
    ctx.strokeStyle = '#e0b75a'; ctx.beginPath();
    seq.forEach(function (id, idx) {
      var pos = STAMP_POS[id]; var x = RX + RW * pos[0] / 100, y = RY + RH * pos[1] / 100;
      idx ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = '#d3a94f';
    seq.forEach(function (id) { var pos = STAMP_POS[id]; var x = RX + RW * pos[0] / 100, y = RY + RH * pos[1] / 100; ctx.beginPath(); ctx.arc(x, y, 5, 0, 6.3); ctx.fill(); });
    ctx.fillStyle = '#a99f8a'; ctx.font = '20px "Songti SC",serif'; ctx.textAlign = 'center';
    ctx.fillText('印章 ' + s.stamps.length + ' / 16　·　' + new Date().toLocaleDateString(), W / 2, H - 70);
    window.__cardReady = true;
  }
  art.onload = done; art.onerror = done; art.src = asset('assets/ending/' + END_ART[endingId] + '.jpg');
  map.onload = done; map.onerror = done; map.src = asset('assets/stamp/map.jpg');
}

function replayScreen(run) {
  if (!run) return '<section class="screen replay"><div class="inner"><h2>回看</h2><p class="tiny">没有记录。</p>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
  var steps = (run.steps || []).map(function (st) {
    var sc = DATA.SCENES[st.node] || {};
    var opt = null;
    (sc.options || []).forEach(function (o) { if (o.id === st.opt) opt = o; });
    return '<li><b>' + esc(sc.title || st.node) + '</b>　' + esc(opt ? opt.text : st.opt) + '</li>';
  }).join('');
  return '<section class="screen replay"><div class="inner">' +
    '<h2>回看 · ' + esc(run.name || ('结局 ' + run.ending)) + '</h2>' +
    '<p class="tiny">相似度 ' + run.sim + '　·　印章 ' + run.stamps + ' / 16　·　' +
    new Date(run.at).toLocaleDateString() + '</p>' +
    routeBlock({ steps: run.steps || [] }) +
    '<h3 class="ch">选择记录</h3><ol class="steplist">' + (steps || '<li>无</li>') + '</ol>' +
    '<div class="row"><button class="btn" data-act="back">返回</button>' +
    '<button class="btn" data-act="board">排行榜</button></div></div></section>';
}

function endingsScreen(db) {
  var got = {};
  try { (JSON.parse(localStorage.getItem('xz:endings:v1')) || []).forEach(function (x) { got[x] = 1; }); } catch (e) {}
  var canon = Object.keys(DATA.ENDINGS).map(function (id) {
    var e = DATA.ENDINGS[id], on = !!got['E' + id];
    return '<article class="end-card' + (on ? ' on' : '') + '">' +
      '<div class="end-no">' + id + '</div>' +
      '<h3>' + (on ? esc(e.name) : '？？') + '</h3>' +
      '<p>' + (on ? esc(e.sub) : '未解锁') + '</p></article>';
  }).join('');
  var myth = Object.keys(DATA.MYTH_ENDINGS).map(function (k) {
    var e = DATA.MYTH_ENDINGS[k], on = !!got[k];
    return '<article class="end-card myth' + (on ? ' on' : '') + '">' +
      '<div class="end-no">' + k + '</div>' +
      '<h3>' + (on ? esc(e.name) : '？？') + '</h3>' +
      '<p>' + (on ? '误读结局' : '未解锁') + '</p></article>';
  }).join('');
  return '<section class="screen endings"><div class="inner"><h2>结局图鉴</h2>' +
    '<p class="tiny">正史 13 个 · 误读 5 个。走过的结局会点亮。</p>' +
    '<div class="end-grid">' + canon + '</div>' +
    '<h3 class="ch">误读结局</h3><div class="end-grid">' + myth + '</div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button></div></div></section>';
}

function atlasStrip() {
  var lit = (typeof APP !== 'undefined' && APP.s && APP.s.stamps) ? APP.s.stamps : [];
  if (!lit.length) return '<div class="atlas-strip"><span class="dim">还没有盖印</span></div>';
  var chips = lit.slice().sort(function (a, b) { return a - b; }).map(function (id) {
    var nm = '';
    for (var k in DATA.SCENES) if (DATA.SCENES[k].stamp === id) nm = DATA.SCENES[k].stampName;
    return '<button class="atlas-chip" data-act="atlas-focus" data-q="' + esc(nm) + '">' + id + ' · ' + esc(nm) + '</button>';
  }).join('');
  return '<div class="atlas-strip">' + chips + '</div>';
}

function prototypesScreen() {
  var cards = DATA.PROTOTYPES.map(function (p) {
    var cls = p.level === '史实' ? 'real' : (p.level === '假说' ? 'guess' : 'infer');
    return '<article class="pro-card">' +
      '<header><span class="pro-xi">西游：' + esc(p.xi) + '</span>' +
      '<span class="note-tag ' + cls + '">' + esc(p.level) + '</span></header>' +
      '<p class="pro-novel">' + esc(p.novel) + '</p>' +
      '<p class="pro-fact">' + esc(p.fact) + '</p>' +
      '<p class="pro-src">' + esc(p.src) + '</p>' +
      '<p class="pro-note">' + esc(p.note) + '</p></article>';
  }).join('');
  return '<section class="screen prototypes"><div class="inner"><h2>西游记原型考</h2>' +
    '<p class="tiny">八条对照：小说怎么写、史实怎么样、出处在哪、可信度多少。假说一律标注，不当事实讲。</p>' +
    '<div class="pro-grid">' + cards + '</div>' +
    '<div class="row"><button class="btn" data-act="back">返回</button>' +
    '<button class="btn" data-act="museum">误解纪念馆</button></div></div></section>';
}


/* 路由与状态 */
var APP = { screen: 'start', s: null, endingId: 0, mythId: null, mythEnding: null, prev: 'start', stampSel: 0, player: '', db: null };

function appRender() {
  var host = document.getElementById('app');
  var html = '';
  try {
    if (APP.screen === 'start') html = startScreen();
    else if (APP.screen === 'scene') html = sceneScreen(APP.s);
    else if (APP.screen === 'myth') html = mythScreen(APP.s, DATA.MYTH[APP.mythId]);
    else if (APP.screen === 'ending') html = endingScreen(APP.endingId, APP.s);
    else if (APP.screen === 'mythEnding') html = mythEndingScreen(APP.mythEnding, APP.s);
    else if (APP.screen === 'stamps') html = stampsScreen(APP.s || ENGINE.startState(), APP.stampSel);
    else if (APP.screen === 'about') html = aboutScreen();
    else if (APP.screen === 'chars') html = charsScreen();
    else if (APP.screen === 'atlas') html = atlasScreen(APP.atlasQuery);
    else if (APP.screen === 'museum') html = museumScreen();
    else if (APP.screen === 'prototypes') html = prototypesScreen();
    else if (APP.screen === 'player') html = playerScreen(APP.db);
    else if (APP.screen === 'board') html = boardScreen(APP.db);
    else if (APP.screen === 'replay') html = replayScreen(APP.replayRun);
    else if (APP.screen === 'endings') html = endingsScreen(APP.db);
    else if (APP.screen === 'card') { html = cardScreen(); setTimeout(function () { drawCard(APP.endingId, APP.s); }, 30); }
    else html = startScreen();
  } catch (e) {
    html = '<section class="screen"><div class="inner"><h2>出了点问题</h2><p class="tiny">' + esc(e.message) + '</p>' +
      '<div class="row"><button class="btn" data-act="home">回到开始</button></div></div></section>';
  }
  host.innerHTML = html;
  window.scrollTo(0, 0);
}

function appChoose(optId) {
  var node = DATA.SCENES[APP.s.node];
  var opt = null;
  node.options.forEach(function (o) { if (o.id === optId) opt = o; });
  if (!opt) return;
  APP.s = ENGINE.applyOption(APP.s, opt);
  appSave();
  if (APP.s.endingId) { APP.endingId = APP.s.endingId; APP.screen = 'ending'; appRecord(APP.s.endingId); }
  else APP.screen = 'scene';
  appRender();
}

function appMyth(id) {
  APP.mythId = id;
  APP.s.mythId = id;
  APP.screen = 'myth';
  appRender();
}

function appMythChoose(kind) {
  APP.s.mythChoices.push(kind);
  APP.s.M += 10;
  APP.mythEnding = ENGINE.mythJudge(kind, APP.s);
  unlock(APP.mythEnding);
  appSave();
  APP.screen = 'mythEnding';
  appRender();
}

function appBegin() {
  if (!APP.player) APP.player = appDb().active || '访客';
  APP.s = ENGINE.startState();
  APP.screen = 'scene';
  appRender();
}

function appClick(e) {
  var el = e.target && e.target.closest ? e.target.closest('[data-act]') : null;
  if (!el) return;
  var act = el.getAttribute('data-act');
  if (act === 'begin' || act === 'restart') return appBegin();
  if (act === 'choose') return appChoose(el.getAttribute('data-opt'));
  if (act === 'myth') return appMyth(el.getAttribute('data-myth'));
  if (act === 'myth-choose') return appMythChoose(el.getAttribute('data-kind'));
  if (act === 'stamps') { APP.prev = APP.screen; APP.screen = 'stamps'; return appRender(); }
  if (act === 'about') { APP.prev = APP.screen; APP.screen = 'about'; return appRender(); }
  if (act === 'chars') { APP.prev = APP.screen; APP.screen = 'chars'; return appRender(); }
  if (act === 'stamp') { APP.stampSel = Number(el.getAttribute('data-id')); return appRender(); }
  if (act === 'atlas') { APP.atlasQuery = ''; APP.prev = APP.screen; APP.screen = 'atlas'; return appRender(); }
  if (act === 'atlas-focus') { APP.atlasQuery = el.getAttribute('data-q') || ''; if (APP.screen !== 'atlas') APP.prev = APP.screen; APP.screen = 'atlas'; return appRender(); }
  if (act === 'museum') { APP.prev = APP.screen; APP.screen = 'museum'; return appRender(); }
  if (act === 'prototypes') { APP.prev = APP.screen; APP.screen = 'prototypes'; return appRender(); }
  if (act === 'board') { APP.prev = APP.screen; APP.screen = 'board'; return appRender(); }
  if (act === 'endings') { APP.prev = APP.screen; APP.screen = 'endings'; return appRender(); }
  if (act === 'replay') {
    var pid = el.getAttribute('data-player');
    var rid = Number(el.getAttribute('data-run') || 0);
    var db2 = appDb();
    APP.replayRun = (db2.players[pid] && db2.players[pid].runs[rid]) || null;
    APP.prev = APP.screen; APP.screen = 'replay'; return appRender();
  }
  if (act === 'player') { APP.prev = APP.screen; APP.screen = 'player'; return appRender(); }
  if (act === 'set-player') {
    var el2 = document.getElementById('player-input');
    var nm = el2 ? String(el2.value || '').trim().slice(0, 12) : '';
    if (!nm) return;
    APP.player = nm; appDb().active = nm; appSaveDb(); APP.screen = 'start'; return appRender();
  }
  if (act === 'switch-player') { APP.player = el.getAttribute('data-id') || '访客'; appDb().active = APP.player; appSaveDb(); return appRender(); }
  if (act === 'card') { APP.prev = APP.screen; APP.screen = 'card'; return appRender(); }
  if (act === 'download-card') {
    var cv = document.getElementById('share');
    if (cv) { var a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = '玄奘西行-本局.png'; a.click(); }
    return;
  }
  if (act === 'continue') return appContinue();
  if (act === 'back') { APP.screen = APP.prev === 'stamps' || APP.prev === 'about' ? 'start' : APP.prev; return appRender(); }
  if (act === 'home') { APP.screen = 'start'; return appRender(); }
}

function appKey(e) {
  if (APP.screen !== 'scene' && APP.screen !== 'myth') return;
  if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
  var n = parseInt(e.key, 10);
  if (!n) return;
  var btns = document.querySelectorAll('.opt');
  if (btns[n - 1]) btns[n - 1].click();
}

function appBoot() {
  APP.db = appDb();
  APP.player = APP.db.active || APP.player;
  document.addEventListener('click', appClick);
  document.addEventListener('keydown', appKey);
  appRender();
}

function appSave() {
  try { localStorage.setItem('xz:save:v1', JSON.stringify({ s: APP.s, at: Date.now() })); } catch (e) {}
}
function appContinue() {
  try {
    var raw = localStorage.getItem('xz:save:v1');
    if (!raw) return appBegin();
    var o = JSON.parse(raw);
    if (!o || !o.s) return appBegin();
    APP.s = o.s; APP.screen = 'scene'; appRender();
  } catch (e) { appBegin(); }
}
function unlock(k) {
  try {
    var arr = JSON.parse(localStorage.getItem('xz:endings:v1')) || [];
    if (arr.indexOf(k) < 0) { arr.push(k); localStorage.setItem('xz:endings:v1', JSON.stringify(arr)); }
  } catch (e) {}
}

function appRecord(id) {
  try {
    var db = appDb();
    var who = APP.player || '访客';
    if (!db.players[who]) db.players[who] = { runs: [] };
    db.players[who].runs.push({
      ending: id, name: (DATA.ENDINGS[id] || {}).name || '',
      sim: ENGINE.compare(APP.s).dXZ, stamps: APP.s.stamps.length, at: Date.now(),
      steps: (APP.s.steps || []).slice()
    });
    db.players[who].runs = db.players[who].runs.slice(-30);
    db.active = who;
    appSaveDb();
    unlock('E' + id);
  } catch (e) {}
}

function appDb() {
  if (APP.db) return APP.db;
  try {
    var raw = localStorage.getItem('xz:db:v1');
    APP.db = raw ? JSON.parse(raw) : { active: '', players: {} };
  } catch (e) { APP.db = { active: '', players: {} }; }
  if (!APP.db.players) APP.db.players = {};
  if (APP.db.active && !APP.player) APP.player = APP.db.active;
  return APP.db;
}
function appSaveDb() {
  try { localStorage.setItem('xz:db:v1', JSON.stringify(APP.db)); } catch (e) {}
}
function appHasSave() {
  try { return !!localStorage.getItem('xz:save:v1'); } catch (e) { return false; }
}
