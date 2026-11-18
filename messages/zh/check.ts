import type { CheckMessages } from "../en/check";

const check: CheckMessages = {
  controllers: "手柄",
  status: {
    example: "示例",
    idle: "等待手柄",
    known: "已识别",
    unknown: "已连接，不在列表中",
    xinput: "已作为 Xbox 手柄连接",
    anon: "已连接，未显示型号",
  },
  pressed: "已按下",
  extra: "· 额外",
  pressExample: "点击图中的按键试试。",
  pressIdle: "按下按键时，这里会亮起对应的按键。",
  pressAny: "按任意键，推动摇杆，扣动扳机。",
  idle: {
    title: "连接手柄，然后按任意键。",
    body: "数据线或蓝牙都可以。你会看到它的名称，以及 OpenController 能为它做什么。",
    brave: "Brave 会向网站隐藏手柄。请用 Chrome 或 Edge 打开本页，或试试下面的示例。",
    unsupported: "此浏览器无法读取手柄。请用 Chrome 或 Edge 打开本页，或试试下面的示例。",
    helpTitle: "没有显示？",
    help: [
      "先点击一下页面，再按一个键。浏览器要在按键之后才会显示手柄。",
      "Brave 和部分广告拦截插件会隐藏手柄。请使用 Chrome 或 Edge，或对本页关闭拦截。",
      "蓝牙手柄请先在系统设置中完成配对。",
      "如果 OpenController 已打开且开启了隐藏原始手柄，浏览器看到的是它创建的 Xbox 手柄，而不是你的手柄。退出 OpenController 再测试。",
    ],
  },
  verdict: {
    dinput: "在 Xbox 模式下，它直接就能在游戏中使用。要使用额外按键和体感瞄准，请按下方说明切换到 D-input 模式。",
    unsupported: "当前版本还无法读取它。",
    handheld: "游戏已经可以使用内置手柄。在 Windows 上，OpenController 还能映射它的额外按键。",
    passthrough: "游戏本身已经支持它，所以 OpenController 保持原样。",
    mac: "在 Mac 上，游戏本身就能使用它。OpenController 增加额外按键、灯光和电量显示。",
    works: "在游戏中作为独立玩家使用，重新连接后玩家编号不变。",
  },
  copied: "名称和你的不一样？很多手柄使用 {name} 的芯片，并自称是它，所以你的手柄用起来也一样。",
  lookalike: "如果你的是 {names}，请在应用中该手柄的“信息”页，在“型号”里选择它。",
  caps: {
    extras: "额外按键",
    motion: "体感瞄准",
    light: "灯条",
    touchpad: "触摸板当按键",
    none: "无",
    yes: "是",
    no: "否",
    dinput: "是，需 D-input 模式",
    lightYes: "玩家颜色、自定义颜色或电量",
    touchpadYes: "是，作为额外按键",
  },
  mapping: "你的浏览器不认识这个按键布局，所以图中亮起的按键可能不对。OpenController 直接读取手柄，不受影响。",
  seeFamily: "查看所有同类手柄",
  unknown: "还不在我们的列表中，但很可能可以用。<a>申请添加</a>，浏览器刚读取到的 ID 会随申请一起发送。",
  xinput:
    "可以使用，游戏会把它当作 Xbox 手柄。Windows 不会告诉浏览器具体型号。8BitDo 等手柄在 Xbox 模式下会隐藏额外按键：请切换到 D-input（8BitDo 按住 B 开机），或使用蓝牙。如果 OpenController 已打开，这可能是它提供给游戏的 Xbox 手柄。",
  anon: "你的浏览器没有说明这是哪款手柄，Safari 从来不会说明。请用 Chrome 或 Edge 打开本页查看详情。",
  tryOne: "手边没有手柄？试试这些：",
};

export default check;
