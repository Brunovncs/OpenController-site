import type { GuidesMessages } from "../en/guides";

const guides: GuidesMessages = {
  names: {
    dualsense: { name: "DualSense" },
    "dualsense-edge": { name: "DualSense Edge" },
    "dualshock-4": { name: "DualShock 4" },
    "dualshock-3": { name: "DualShock 3" },
    "ps2-controller": { name: "PS2 手柄" },
    "switch-pro-controller": { name: "Switch Pro Controller" },
    "joy-con": { name: "Joy-Con" },
    "switch-online-controllers": { name: "Switch Online 的 SNES、N64 和 Mega Drive 手柄", plural: true },
    "switch-2-controllers": { name: "Switch 2 手柄", plural: true },
    "gamecube-controller": { name: "GameCube 手柄" },
    "wii-remote": { name: "Wii Remote 和 Wii U Pro 手柄", plural: true },
    "xbox-controller": { name: "Xbox 手柄" },
    "xbox-elite": { name: "Xbox Elite 手柄" },
    "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2、Ultimate 3 和 Pro 3", plural: true },
    "8bitdo-ultimate": { name: "8BitDo Ultimate" },
    "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C" },
    "8bitdo-pro-2": { name: "8BitDo Pro 2" },
    "8bitdo-sn30-pro": { name: "8BitDo SN30 Pro 和复古手柄", plural: true },
    "steam-deck": { name: "Steam Deck 内置手柄", plural: true },
    "steam-controller": { name: "Steam Controller" },
    "handheld-pc": { name: "掌机内置手柄", plural: true },
    "flydigi-vader": { name: "Flydigi Vader" },
    "flydigi-apex": { name: "Flydigi Apex" },
    "stadia-controller": { name: "Stadia 手柄" },
    "luna-controller": { name: "Amazon Luna 手柄" },
    "shield-controller": { name: "NVIDIA Shield 手柄" },
    "generic-controllers": { name: "PowerA、Hori、Razer 等手柄", plural: true },
  },

  title: (n) => `在电脑上使用 ${n.name}`,
  metaTitle: "{title} | OpenController",

  description: {
    xbox: (n, f) => {
      const motion = f.gyro === "yes" ? "用体感瞄准" : f.gyro === "dinput" ? "在 D-input 模式下用体感瞄准" : "";
      const more = f.extras && motion ? `可设置额外按键，还能${motion}。` : f.extras ? "可设置额外按键。" : motion ? `可以${motion}。` : "";
      return `在任何电脑游戏中把你的 ${n.name} 当作 Xbox 手柄使用。${more}免费，支持 Windows 和 Linux。`;
    },
    passthrough: (n, f) =>
      f.extras
        ? `电脑游戏本身就能读取你的 ${n.name}。OpenController 把额外按键设为键盘按键和宏。免费。`
        : `电脑游戏本身就能读取你的 ${n.name}。OpenController 让它和你的其他手柄一起，保持自己的玩家编号。免费，支持 Windows 和 Linux。`,
    unsupported: (n) => `OpenController 暂不支持 ${n.name}。看看哪些手柄可以用。`,
  },

  intro: {
    xbox: (n) =>
      `很多电脑游戏只能读取 Xbox 手柄。打开 OpenController 后，你的 ${n.name} 在游戏中会显示为 Xbox 360 手柄，原始手柄会被隐藏，避免游戏识别两次。`,
    passthrough: (n, f) =>
      f.extras
        ? `电脑游戏本身就能读取你的 ${n.name}。OpenController 不改动其他部分，只把额外按键设为键盘按键和宏。`
        : `电脑游戏本身就能读取你的 ${n.name}。OpenController 保持原样，只在朋友用其他手柄加入时，让它保持自己的玩家编号。`,
    unsupported: (n) => `OpenController 能识别你的 ${n.name}，但暂时还无法读取。`,
  },

  steps: {
    download: "下载并打开 OpenController。在 Windows 上，“驱动与依赖”页可以一键安装所需的免费驱动。",
    connect: "通过数据线、蓝牙或接收器连接手柄。它会出现在 OpenController 窗口中，以自己的外形显示。",
    extras: "点击手柄设置额外按键。每个按键都可以设为一个或多个 Xbox 按键、键盘按键或宏，还可以按游戏设置配置方案。",
    gyro: "要通过转动手柄来瞄准，请在“体感”中开启：始终启用、瞄准时，或按住指定按键时。",
    play: "打开游戏，游戏会识别到一个 Xbox 360 手柄。",
    passthroughExtras: "点击手柄，把额外按键设为键盘按键或宏。游戏仍照常读取手柄。",
    passthrough: "打开游戏，游戏照常读取手柄，玩家编号保持不变。",
  },

  page: {
    breadcrumb: "导航路径",
    controllers: "手柄",
    test: "测试你的手柄",
    works: "支持的功能",
    setup: "设置方法",
    steamTip: "在用 Steam？请在 Steam 设置中为 PlayStation 和 Switch 手柄关闭 Steam Input，否则游戏可能把每次按键识别两次。",
    faq: "更多解答见<a>常见问题</a>。",
    models: "型号（{n}）",
    modelsIntro: "不在列表中的手柄大多也能用。",
    missing: "没找到你的手柄，或者用起来不正常？<a>告诉我们</a>。",
    more: "其他手柄",
    all: "全部手柄",
  },

  index: {
    metaTitle: "各种手柄连电脑玩游戏：PlayStation、Switch、Stadia 等 | OpenController",
    description:
      "在任何电脑游戏中把 PlayStation、Switch、Stadia、Luna、Flydigi、8BitDo 和掌机手柄当作 Xbox 手柄使用。看看你的手柄支持哪些功能。免费。",
    title: "可通过 OpenController 在电脑上使用的手柄",
    intro: "OpenController 认识 {n} 款手柄，其他手柄大多也能用。选择你的手柄，或<a>按名称搜索</a>。",
    models: { one: "1 个型号", other: "{n} 个型号" },
  },

  links: { title: "各款手柄在电脑上的使用方法" },

  copy: {
    dualsense: {
      title: "PS5 手柄（DualSense）连电脑玩任何游戏，支持陀螺仪 | OpenController",
      description:
        "在任何电脑游戏中把 PS5 的 DualSense 当作 Xbox 手柄使用，支持 USB 和蓝牙。陀螺仪瞄准、触摸板当按键、灯条。Windows 和 Linux 免费使用。",
      sections: {
        native: {
          title: "Xbox 还是原生",
          body: [
            "默认情况下，游戏收到的是 Xbox 360 手柄，显示 Xbox 按键提示，支持震动。游戏无法使用触觉反馈和自适应扳机，不过应用的“手柄实验室”页可以自行为扳机加上阻力或振动。对于支持 DualSense 的游戏，在手柄页面开启“原生模式”：游戏会显示 PlayStation 按键提示，支持自适应扳机，有线连接时还支持触觉反馈。原生模式下，配置方案、陀螺仪和按键映射都会关闭。",
          ],
        },
        "gyro-touchpad": {
          title: "陀螺仪和触摸板",
          body: [
            "陀螺仪与右摇杆叠加：始终启用、按住 L2 时，或按住指定按键时。触摸板提供四个按键：按下、左半区、右半区和双指。这些按键和麦克风键都可以按游戏设为 Xbox 按键、键盘按键或宏。在 Windows 上，触摸板还能移动鼠标，麦克风键还能让电脑静音。",
          ],
        },
        cable: {
          title: "有线和蓝牙",
          body: [
            "给蓝牙连接中的 DualSense 插上数据线，它仍是同一个玩家，游戏不会看到它断开。玩家指示灯和灯条显示玩家编号，灯条也可以改为显示电量。",
          ],
        },
      },
    },

    "dualshock-4": {
      title: "PS4 手柄（DualShock 4）连电脑玩任何游戏 | OpenController",
      description:
        "在任何电脑游戏中把 PS4 的 DualShock 4 当作 Xbox 手柄使用，支持数据线、蓝牙和索尼无线适配器。支持陀螺仪瞄准。Windows 和 Linux 免费使用。",
      sections: {
        connect: {
          title: "数据线、蓝牙或适配器",
          body: [
            "两个版本的 DualShock 4 都支持 USB、蓝牙和索尼的 USB 无线适配器。给蓝牙连接中的手柄插上数据线，它仍是同一个玩家。",
          ],
        },
        light: {
          title: "灯条",
          body: [
            "灯条用 PlayStation 的颜色显示玩家编号：蓝、红、绿、粉。也可以显示你选的颜色、从绿到红的电量，或者关闭。电量低于 15% 时会闪烁。",
          ],
        },
        "gyro-touchpad": {
          title: "陀螺仪和触摸板",
          body: [
            "陀螺仪与右摇杆叠加：始终启用、按住 L2 时，或按住指定按键时。触摸板提供四个按键：按下、左半区、右半区和双指。每个都可以按游戏设为 Xbox 按键、键盘按键或宏。在 Windows 上，触摸板还能移动鼠标。",
          ],
        },
      },
    },

    "switch-pro-controller": {
      title: "Switch Pro 手柄连电脑玩任何游戏 | OpenController",
      description:
        "在任何电脑游戏中把 Switch Pro Controller 当作 Xbox 手柄使用，支持 USB 和蓝牙。陀螺仪瞄准，截图键可设为键盘按键或宏。Windows 和 Linux 免费使用。",
      sections: {
        layout: {
          title: "按键布局",
          body: [
            "按键按位置对应，而不是按字母。下方的键（Switch 上的 B）是 Xbox 的 A，右边的键（A）是 Xbox 的 B。如果想保留字母，可以在“按键”中交换，也可以按游戏分别设置。",
          ],
        },
        "gyro-capture": {
          title: "陀螺仪、截图键和指示灯",
          body: [
            "陀螺仪与右摇杆叠加：始终启用、按住 ZL 时，或按住指定按键时。截图键可以设为 Xbox 按键、键盘按键或宏。玩家指示灯显示玩家编号，和在 Switch 上一样。",
          ],
        },
      },
    },

    "stadia-controller": {
      title: "Stadia 手柄连电脑：任何游戏都能用 | OpenController",
      description:
        "Stadia 已经关闭，但它的手柄仍然能用。在 Windows 和 Linux 上，通过 USB 或蓝牙，把它当作 Xbox 手柄玩任何电脑游戏。免费。",
      sections: {
        "after-stadia": {
          title: "Stadia 关闭之后",
          body: [
            "Google 在 2023 年 1 月关闭了 Stadia，但手柄仍可以作为普通手柄使用，不依赖 Google 的任何服务。大多数 Windows 游戏只读取 Xbox 手柄，所以会忽略它。OpenController 读取它，并向游戏提供一个 Xbox 360 手柄。",
          ],
        },
        connect: {
          title: "USB 或蓝牙",
          body: [
            "用 USB-C 数据线连接即可直接使用。蓝牙只有在手柄已经用 Google 在 Stadia 关闭时发布的工具切换到蓝牙模式后才能用。如果你的手柄没有切换过，请使用数据线。",
          ],
        },
        buttons: {
          title: "截图键和助手键",
          body: [
            "游戏不会使用截图键和助手键。在 Windows 和 Linux 上，每个键都可以设为一个或多个 Xbox 按键、键盘按键或宏，并按游戏保存配置方案，自动切换。在 Mac 上，它们可以用作键盘按键。",
          ],
        },
        linux: {
          title: "在 Linux 上",
          body: [
            "安装脚本会添加一条规则，让应用无需 root 即可读取手柄。游戏、Wine 和 Proton 会识别到一个 Xbox 360 手柄。",
          ],
        },
      },
    },

    "flydigi-vader": {
      title: "飞智 Flydigi Vader 5 Pro、4 Pro 连电脑和 Linux | OpenController",
      description:
        "在任何电脑游戏中把 Flydigi Vader 5 Pro、4 Pro、5S 或更早的 Vader 当作 Xbox 手柄使用，M1 至 M4、C 和 Z 都能映射。支持 Windows 和 Linux，免费。",
      sections: {
        which: {
          title: "你的 Vader 是哪一款",
          body: [
            "Vader 4 Pro、5 Pro、5S 和 Direwolf 4 通过数据线或接收器连接。较早的 Vader 2 和 3 使用自己的旧款接收器。它们在游戏中都会显示为 Xbox 360 手柄。",
          ],
        },
        "space-station": {
          title: "额外按键和飞智空间站",
          body: [
            "M1 至 M4、C、Z、LM 和 RM 都可以设为一个或多个 Xbox 按键、键盘按键或宏，并按游戏保存配置方案，自动切换。",
            "Vader 4 Pro 及更新的型号，需要在飞智空间站（Flydigi Space Station）中开启“允许第三方应用接管映射”，否则其他应用读取不到这些按键。需要时 OpenController 窗口会提醒你。使用旧款接收器的 Vader 2 和 3 不需要。",
          ],
        },
        linux: {
          title: "在 Linux 上",
          body: [
            "安装脚本会添加一条规则，让应用无需 root 即可读取 Vader。游戏、Wine 和 Proton 会识别到一个 Xbox 360 手柄，额外按键和 Windows 上一样可用，较新的型号同样会有飞智空间站的提醒。",
          ],
        },
      },
    },
  },

  changelog: {
    metaTitle: "OpenController 更新内容 | 版本说明",
    description: "OpenController 的所有版本，从新到旧：改了什么，设置是否保留。",
    title: "更新内容",
    intro: "所有版本，从新到旧。应用在窗口打开时检查新版本，无需重装即可更新。",
    notesInEnglish: "各版本的更新说明为英文。",
    feed: "所有版本",
    rss: "通过 RSS 订阅",
    latest: "{version} 于 {date}发布。",
    first: "以上是自第一个版本 {version}（{date}）以来的所有版本。",
    offline: "GitHub 暂时没有响应。",
    offlineLink: "更新说明也可以在<a>发布页面</a>查看。",
    day: (day, month) => `${month}${day}日`,
    labels: {
      count: { one: "{n} 个版本", other: "{n} 个版本" },
      monthNav: "跳转到月份",
      jumpTo: "跳转到{month}",
      scroller: "版本说明",
      source: "在 GitHub 上查看",
    },
  },
};

export default guides;
