import type { HomeMessages } from "../en/home";

const home: HomeMessages = {
  meta: {
    title: "OpenController：任何手柄都能玩电脑游戏，免费",
    description:
      "在电脑游戏中使用 PlayStation、Switch、8BitDo 等数百款手柄，单人或和朋友一起玩。免费开源，支持 Windows、Linux 和 Mac。",
    features: [
      "PlayStation、Switch、8BitDo 等手柄在游戏中显示为 Xbox 360 手柄",
      "同时连接多个手柄，各自拥有玩家编号",
      "任意按键可设为一个或多个按键、键盘按键或宏，并可按游戏保存配置方案",
      "陀螺仪瞄准",
      "摇杆死区、响应曲线和漂移校正",
      "手柄灯光和电量",
    ],
  },

  hero: {
    tagline: "你的手柄，畅玩所有电脑游戏。",
    lead: "在电脑游戏中使用 PlayStation、Switch、8BitDo 等手柄，单人或和朋友一起玩。",
    test: "测试你的手柄",
    video: "OpenController 应用实时显示正在使用的 DualSense、两只 Joy-Con、飞行摇杆和赛车方向盘，最后五个设备同时显示。",
    facts: [
      { k: "支持系统", v: "Windows、Linux 和 Mac" },
      { k: "支持手柄", v: "数百款" },
      { k: "价格", v: "免费，开源软件" },
      { k: "上传", v: "不上传任何个人信息" },
    ],
  },

  check: {
    label: "测试你的手柄",
    title: "在这里测试你的手柄。",
  },

  features: {
    label: "功能",
    title: "插上就能玩。",
    body: "大多数电脑游戏是为 Xbox 手柄设计的。OpenController 让你的手柄也能用。",
    games: {
      title: "游戏中直接可用",
      body: "Xbox 手柄本来就能用，所以不做处理。如果游戏原本就支持你的手柄，打开“原生模式”，游戏就会读取手柄本身。",
      steps: ["连接手柄", "打开游戏", "开始玩"],
    },
    friends: {
      title: "和朋友一起玩",
      body: "短暂断开后，仍是同一个玩家。",
      hint: "试试看：把一个拖到另一个上交换玩家，或依次点两个。",
    },
    custom: {
      title: "随你设置",
      body: "修改任意按键的功能，用陀螺仪瞄准，修正漂移的摇杆，还能为每个游戏保存一套设置，游戏打开时自动启用。“手柄实验室”为 DualSense 提供扳机效果，在 Windows 上还有 Flick Stick 和触摸板鼠标。",
      setups: { default: "默认", racing: "赛车游戏", shooter: "射击游戏" },
      inUse: "使用中",
    },
    updates: {
      title: "始终保持最新",
      body: "在 Windows 上，一键即可安装，设置保持不变。",
      notice: "新版本已发布。",
      button: "立即更新",
    },
  },

  swap: {
    players: "玩家",
    player: "玩家 {n}",
    pad: "{name}，玩家 {n}",
    receiver: "接收器",
    swapped: "{a} 现在是玩家 {i}，{b} 是玩家 {j}。",
  },

  performance: {
    label: "性能",
    title: "后台几乎不占资源。",
    memory: "内存占用",
    games: "游戏中",
    measures: [
      { k: "为手柄增加的延迟", v: "通常不到 1 毫秒" },
      { k: "处理器占用（未连接手柄）", v: "0 %" },
    ],
    bars: {
      summary: "关闭窗口时最多 {closed} MB，打开时约 {open} MB。",
      open: "窗口打开：{n} MB",
      closed: "关闭窗口后<b>最多 {n} MB</b>。",
    },
  },

  controllers: {
    label: "手柄",
    title: "找到你的手柄。",
  },

  platforms: {
    label: "平台",
    title: "下载 Windows、Linux 或 Mac 版。",
    caption: "各系统支持的功能",
    feature: "功能",
    yes: "是",
    no: "否",
    rows: {
      games: { label: "游戏中直接可用", mac: "macOS 自带" },
      players: { label: "每位朋友保持同一个玩家", mac: "" },
      remap: { label: "按键重新映射和按游戏设置", mac: "额外按键映射为键盘按键" },
      light: { label: "手柄灯光和电量", mac: "" },
    },
    windows: {
      title: "Windows 10、11",
      body: [
        "无需管理员权限即可安装，更新无需重装。一键安装所需的两个免费驱动。",
        "用于隐藏原始手柄的驱动 HidHide 还没有 ARM 版本。在 ARM 电脑上，同时读取原始手柄的游戏可能会识别到两次。",
        "安装程序还没有签名，第一次运行时 Windows 可能显示“Windows 已保护你的电脑”。点击“更多信息”，再点击“仍要运行”。",
      ],
    },
    linux: {
      title: "Linux",
      body: [
        "需要 Ubuntu 22.04、Debian 12、Fedora 36 或更新版本，或任何 glibc 2.35 及以上的发行版。原生游戏和 Proton、Wine 都能用。",
        "安装程序会请求输入一次密码，让应用能访问手柄。在 Steam Deck 上，请先在 Konsole 中运行 passwd 设置密码。",
      ],
    },
    mac: {
      title: "macOS 13+",
      body: [
        "一个应用同时支持 Apple 芯片和 Intel 的 Mac。在 Mac 上，游戏本身就支持 PlayStation、Xbox 和 Switch Pro 手柄，而且 macOS 不允许应用添加手柄。",
        "额外按键映射为键盘按键需要“辅助功能”权限，窗口会提示你授权。",
        "第一次打开时 macOS 会阻止它。先打开一次，然后前往“系统设置”中的“隐私与安全性”，点击“仍要打开”。",
      ],
    },
  },

  download: {
    for: "下载 {os} 版",
    any: "下载 Windows、Linux 或 Mac 版",
    github: "从 GitHub 下载",
    githubDown: "GitHub 暂时没有响应。发布页面有所有版本的安装包。",
    missing: "{version} 没有 {os} 版本",
    build: "自行编译",
    releases: "所有版本",
    whatsNew: "更新内容",
    phone: "OpenController 在电脑上运行。请在电脑上打开本页，下载对应的版本。",
    platforms: {
      "windows-x64": { name: "Windows", ask: "Intel 或 AMD 电脑？" },
      "windows-arm64": { name: "Windows on ARM", ask: "ARM 电脑？" },
      "linux-x64": { name: "Linux", ask: "Intel 或 AMD 电脑？" },
      "linux-arm64": { name: "Linux（ARM）", ask: "ARM 电脑？" },
      "macos-universal": { name: "Mac", ask: "Mac？" },
      "macos-arm64": { name: "Mac，Apple 芯片", ask: "Apple 芯片的 Mac？" },
      "macos-x64": { name: "Mac，Intel", ask: "Intel 芯片的 Mac？" },
    },
  },

  faq: {
    label: "问题",
    title: "常见问题。",
    search: "搜索问题",
    clear: "清除搜索",
    placeholder: "试试 Linux、宏或更新",
    count: { one: "{n} 个问题", other: "{n} 个问题" },
    none: "没有问题提到“{q}”。",
    ask: "<a>直接问我们</a>。",
    items: [
      {
        id: "free",
        q: "免费吗？",
        a: "免费。它是开源软件，在 Windows 上用到的驱动也是免费的。",
      },
      {
        id: "how",
        q: "它是怎么工作的？",
        a: "你的每个手柄在游戏中都显示为一个 Xbox 360 手柄，各有玩家编号，原始手柄会被隐藏，避免游戏识别两次。在 Windows 上，这需要两个免费驱动：ViGEmBus 和 HidHide。在 Linux 上，使用系统自带的功能。",
      },
      {
        id: "data",
        q: "它会上传我的数据吗？",
        a: "不会上传任何关于你的信息：无需账号，没有追踪。打开窗口时以及窗口开着期间每隔几小时，它会向 GitHub 查询是否有新版本，可以在“设置”的“检查更新”中关闭。在 Windows 上，它还会下载你选择安装的更新和驱动。",
      },
      {
        id: "dataReports",
        q: "它会上传我的数据吗？",
        a: "不会上传任何关于你的信息：无需账号，没有追踪。打开窗口时以及窗口开着期间每隔几小时，它会向 GitHub 查询是否有新版本，可以在“设置”的“检查更新”中关闭。在 Windows 上，它还会下载你选择安装的更新和驱动。“报告问题”只发送该手柄的技术信息，发送前你可以先查看。",
      },
      {
        id: "languages",
        q: "应用支持哪些语言？",
        a: "英语、葡萄牙语和简体中文。在“设置”的“语言”中选择。",
      },
      {
        id: "update",
        q: "怎么更新？",
        a: "有新版本时，应用会显示“立即更新”。在 Windows 上，它会自动安装更新并保留设置。在 Linux 和 Mac 上，它会打开下载页面。",
      },
      {
        id: "steam",
        q: "能和 Steam 一起用吗？",
        a: "可以。在 Steam 设置中，为 PlayStation 和 Switch 手柄关闭 Steam Input，否则游戏可能把每次按键识别两次。",
      },
      {
        id: "icons",
        q: "游戏会显示 PlayStation 的按键图标吗？",
        a: "默认不会，因为游戏看到的是 Xbox 手柄。如果游戏支持你的手柄，在应用中打开它并开启“原生模式”：游戏会读取手柄本身，显示它的按键图标，支持自适应扳机，有线连接时还支持触觉反馈。原生模式下，配置方案、陀螺仪瞄准和按键映射都会关闭，切换前最好先关闭游戏。原生模式也能让应用和 DS5Dongle 一起使用。",
      },
      {
        id: "remap",
        q: "不用 Steam 也能为每个游戏改键吗？",
        a: "可以，在 Windows 和 Linux 上。在“按键”的“全部按键”中，任意按键都可以改成另一个按键、同时按下多个按键、键盘按键或宏。保存到配置方案并添加游戏，该游戏在前台时就会自动启用。",
      },
      {
        id: "letters",
        q: "我的 Switch 手柄 A 和 B 是反的。",
        a: "游戏按位置读取按键，和 Xbox 手柄一样，所以下方的 B 在游戏中就是 A。如果想按手柄上印的字母来，请在“按键”的“全部按键”中开启“按手柄标注的字母映射”。",
      },
      {
        id: "drift",
        q: "我的摇杆会漂移，或者推不到边缘了。",
        a: "在 Windows 和 Linux 上，打开你的手柄，进入“摇杆”，点击“校准摇杆”。它会根据摇杆的实际移动设置中心、死区和满幅阈值，你也可以分别手动调整每个摇杆。",
      },
      {
        id: "joycons",
        q: "每只 Joy-Con 能单独当一个手柄吗？",
        a: "可以，在 Windows 和 Linux 上。打开这对 Joy-Con，点击“拆分 Joy-Con”：每只都变成一个横握的手柄，两个人就能用一对一起玩。“合并 Joy-Con”可以合回去。这是实验性功能。",
      },
      {
        id: "gyro",
        q: "游戏能用我手柄的陀螺仪吗？",
        a: "只认 Xbox 手柄的游戏不能，但 OpenController 可以用它瞄准，在“体感”中设置。在 Windows 上，它还能在“信息”页把手柄以 DualShock 4 的身份提供给游戏，这样读取体感的游戏和 Steam Input 就能拿到陀螺仪数据。这是实验性功能，默认关闭，因为只认 Xbox 手柄的游戏到时会识别不到它。Cemu 等模拟器可以通过“手柄实验室”读取陀螺仪。",
      },
      {
        id: "sticks",
        q: "支持飞行摇杆和方向盘吗？",
        a: "支持。它会保持这些设备原样，飞行和赛车游戏直接读取，扭转、油门和力反馈都能用。要在手柄游戏中使用 Logitech Extreme 3D Pro，或在 Linux、Mac 上使用 Logitech G29，请在应用中打开它并关闭“原生模式”。其他设备可以从应用中发送设备信息。",
      },
      {
        id: "players",
        q: "可以超过四个人一起玩吗？",
        a: "大多数电脑游戏最多支持四个手柄。一些较新的游戏支持更多，遇到这种情况应用会提示你。在 Linux 上，第四位之后的玩家也有自己的编号。",
      },
      {
        id: "viiper",
        q: "游戏识别不到我的手柄，或者电脑蓝屏。",
        a: "在 Windows 上，试试 VIIPER：先关闭游戏，然后在“设置”的“高级”中，把虚拟手柄驱动从 ViGEmBus 改为 VIIPER。随后“驱动与依赖”页会安装它需要的组件，可能需要管理员权限并重启。这是实验性功能，如果启动失败，应用会改回 ViGEmBus 并提示你。",
      },
      {
        id: "keys",
        q: "我设为键盘按键的按钮在游戏里没反应。",
        a: "有些游戏会忽略其他程序发送的按键，尤其是带反作弊的游戏；以管理员身份运行的游戏，Windows 也会拦截这些按键。有些游戏还禁止使用宏，请先查看游戏规则。",
      },
      {
        id: "hidhide",
        q: "HidHide 的窗口自己弹出来了。",
        a: "那是 HidHide 自己的安装程序或更新程序，不是 OpenController。更新后它会重启 Windows，并再次打开以完成安装。从 1.5 版起，它还会添加一个随 Windows 启动的更新程序，可以在任务管理器的“启动应用”中关闭。",
      },
      {
        id: "name",
        q: "应用显示的是另一款手柄的名称。",
        a: "有些手柄会复制其他手柄的 USB ID，比如 Onikuma C1 会自称是 Switch Pro Controller。打开你的手柄，进入“信息”，在“型号”中选择正确的型号。",
      },
      {
        id: "offList",
        q: "我的手柄不在列表中，或者用起来不正常。",
        a: "不在列表中的手柄大多也能用，因为很多手柄会自称是 Xbox、PlayStation 或 Switch 手柄。要添加或修复你的手柄，请在应用中打开它，进入“信息”，点击“报告问题”。它会发送所需的信息，我们不用拿到实物也能添加支持。",
      },
      {
        id: "offListMapping",
        q: "我的手柄不在列表中，或者用起来不正常。",
        a: "不在列表中的手柄大多也能用，因为很多手柄会自称是 Xbox、PlayStation 或 Switch 手柄。如果应用读不出它的按键，手柄页面会显示“映射按键布局”：按提示依次操作各个部件，它就能作为 Xbox 手柄使用。要为所有人添加或修复你的手柄，请在应用中打开它，进入“信息”，点击“报告问题”。",
      },
      {
        id: "finished",
        q: "已经是正式版了吗？",
        a: "还没有，目前是测试版。有些手柄可能还不能正常使用，有些功能也还没有。遇到问题请<a>告诉我们</a>。",
      },
    ],
  },

  contact: {
    label: "联系",
    title: "遇到问题？告诉我们。",
    body: "OpenController 还在测试阶段，每一份反馈都有帮助。",
    report: {
      title: "报告问题",
      button: "联系我们",
      issue: "提交 issue",
    },
    ideas: {
      title: "建议和问题",
      button: "提交建议",
    },
    official: {
      title: "官方网站",
      body: "<b>{domain}</b> 是 OpenController 唯一的官方网站。请只从这里或 GitHub 下载。",
    },
  },

  contactForm: {
    title: "联系我们",
    kind: "主题",
    kinds: { problem: "遇到问题", idea: "提建议", other: "其他" },
    system: "操作系统",
    systemOther: "其他",
    systemDetail: "版本或发行版",
    systemDetailHint: "例如 23H2、Ubuntu 24.04、Sonoma",
    version: "OpenController 版本",
    versionHint: "显示在窗口顶部",
    controller: "手柄",
    controllerHint: "具体型号，例如 8BitDo Ultimate 2 Wireless",
    connection: "连接方式",
    connections: ["数据线", "蓝牙", "自带接收器", "不确定"],
    choose: "请选择",
    message: { problem: "发生了什么？", idea: "你的建议", other: "你的消息" },
    messageHint: {
      problem: "你做了什么，预期是什么，实际发生了什么。如果有错误信息，请粘贴在这里。",
      idea: "OpenController 应该做什么？在什么情况下有用？",
      other: "想写多少都可以。",
    },
    email: "你的邮箱（可选）",
    emailHint: "仅在你希望收到回复时填写，只用于回复。",
    send: "发送",
    close: "关闭",
    sentTitle: "消息已发送，谢谢！",
    sentBody: "如果你留了邮箱，回复会发到那里。",
    errors: {
      message: "请多写一点，至少一句话。",
      email: "邮箱格式似乎不正确。",
      rate: "短时间内发送的消息太多，请一小时后重试。",
      other: "消息暂时无法发送。请稍后重试，或在 GitHub 上提交 issue。",
    },
  },

  request: {
    title: "申请添加手柄",
    intro: "告诉我们你希望列表中加入哪款手柄。使用的人越多，越优先添加。",
    model: "品牌和型号",
    modelHint: "按销售名称填写，例如 Redragon Darkflame G820",
    ids: "手柄测试读取到的信息",
    notes: "其他说明（可选）",
    notesHint: "在哪里买的，怎么连接，哪些功能不能用。",
    email: "你的邮箱（可选）",
    emailHint: "只用于在添加后通知你。",
    app: "已经装了 OpenController？它可以替你发送手柄信息：打开手柄，进入“信息”，然后点击“报告问题”。",
    send: "发送申请",
    close: "关闭",
    sentTitle: "申请已发送，谢谢！",
    sentBody: "如果你留了邮箱，添加后会通知你。",
    errors: {
      model: "请填写品牌和型号。",
      email: "邮箱格式似乎不正确。",
      rate: "短时间内发送的申请太多，请一小时后重试。",
      other: "申请暂时无法发送，请稍后重试。",
    },
  },

  footer: {
    blurb: "免费开源。用你现有的手柄在电脑上玩游戏。",
    nav: "项目",
    controllers: "手柄",
    whatsNew: "更新内容",
    report: "报告问题",
    contact: "联系我们",
    license: "MIT 许可证",
    notices: "第三方声明",
    official: "OpenController 只通过 <a>{repo}</a> 和 {domain} 发布。其他使用该名称的网站与本项目无关。",
    disclaimer:
      "本项目与 Sony、Microsoft、Nintendo、Valve、8BitDo 或其他任何手柄厂商均无关联，提及其名称仅用于说明兼容的硬件。ViGEmBus、HidHide、DsHidMini 和 BthPS3 由 Nefarius Software Solutions 开发，从其发布页面下载，不随本软件附带。使用风险自负：对于封号或其他处罚，例如在禁止宏的游戏中使用宏，作者概不负责。",
    analytics: "本站以匿名方式统计访问量：不使用 Cookie，不保存 IP 地址，第二天也无法区分不同的访客。",
    madeBy: "由 <a>{name}</a> 制作",
  },
};

export default home;
