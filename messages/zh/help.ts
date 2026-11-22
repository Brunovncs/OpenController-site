import type { HelpMessages } from "../en/help";

const help: HelpMessages = {
  index: {
    title: "帮助",
    metaTitle: "电脑玩游戏的手柄问题解答 | OpenController",
    description: "电脑上使用手柄的常见问题解答：PS5、PS4 手柄，Switch 手柄，游戏不认手柄，摇杆漂移和陀螺仪瞄准。",
    lead: "电脑上使用手柄时常见问题的简短解答。",
  },
  ui: {
    home: "首页",
    help: "帮助",
    answer: "简单来说",
    steps: "操作步骤",
    related: "相关内容",
    download: "下载 OpenController",
    test: "测试你的手柄",
    free: "免费开源，支持 Windows、Linux 和 Mac。",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "在电脑上使用 PS5 手柄",
      metaTitle: "PS5 手柄（DualSense）怎么连电脑玩游戏",
      description: "用数据线或蓝牙连接 DualSense，玩任何电脑游戏，连只认 Xbox 手柄的游戏也能玩。",
      answer:
        "Windows 能识别 DualSense，但很多游戏只认 Xbox 手柄。OpenController 把你的 DualSense 以 Xbox 手柄的身份提供给游戏，所以所有游戏都能用，同时保留陀螺仪、触摸板和麦克风键这些额外功能。",
      steps: [
        "<download>下载 OpenController</download> 并打开。在 Windows 上，“驱动与依赖”页会安装所需的两个免费驱动。",
        "用 USB 数据线连接 DualSense，或通过蓝牙配对：按住 Create 键和 PS 键直到灯光闪烁，然后在 Windows 的蓝牙设置中添加。",
        "手柄会出现在窗口中，并分配玩家编号。打开游戏就能玩。",
      ],
      sections: [
        {
          h: "自适应扳机和触觉反馈",
          p: [
            "游戏看到的是 Xbox 手柄，所以用不了自适应扳机。手柄页面上的“原生模式”会把真正的 DualSense 交给支持它的游戏，带上游戏自己的扳机效果，有线连接时还有触觉反馈。或者用“手柄实验室”在任何游戏中给扳机加上效果：阻力、振动或段落感。飞智 Apex 3、4、5 的扳机也有力反馈，实验室同样可以给它们加上效果。",
          ],
        },
        {
          h: "陀螺仪、触摸板和麦克风键",
          p: [
            "转动手柄可以瞄准：始终启用、瞄准时，或按住指定按键时。触摸板和麦克风键可以设为 Xbox 按键、键盘按键或宏。在 Windows 上，触摸板还能移动鼠标，麦克风键还能让电脑麦克风静音。",
          ],
        },
        {
          h: "Steam 游戏",
          p: [
            "如果为 PlayStation 手柄开启了 Steam Input，Steam 也会读取 DualSense，一次按键可能被算两次。请在 Steam 的控制器设置中关闭 PlayStation 支持。",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "在电脑上使用 PS4 手柄",
      metaTitle: "PS4 手柄（DualShock 4）怎么连电脑玩游戏",
      description: "用数据线、蓝牙或索尼无线适配器连接 DualShock 4 玩电脑游戏，灯条显示你的玩家编号。",
      answer:
        "很多电脑游戏读不了 PS4 手柄。OpenController 把它以 Xbox 手柄的身份提供给游戏，支持数据线、蓝牙和索尼无线适配器，灯条还会显示你的玩家编号。",
      steps: [
        "<download>下载 OpenController</download> 并打开。在 Windows 上，“驱动与依赖”页会安装所需的两个免费驱动。",
        "用 USB 数据线连接 DualShock 4，或通过蓝牙配对：按住 Share 键和 PS 键直到灯光闪烁，然后在 Windows 的蓝牙设置中添加。",
        "灯条会变成对应玩家的颜色。打开游戏就能玩。",
      ],
      sections: [
        {
          h: "触摸板和陀螺仪",
          p: [
            "除了按下，触摸板还提供三个按键：左半区、右半区和双指。每个都可以设为 Xbox 按键、键盘按键或宏。转动手柄可以瞄准，就像手里握着鼠标。",
          ],
        },
        {
          h: "灯条",
          p: ["灯条可以像 PlayStation 一样显示玩家颜色，也可以显示你选的颜色，或者从绿到红显示电量。电量低时会闪烁。"],
        },
        {
          h: "从 DS4Windows 迁移",
          p: ["DS4Windows 做这件事很多年了，现在已经不再维护。<ds4windows>看看换成 OpenController 有哪些变化</ds4windows>。"],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "在电脑上使用 Switch Pro 手柄或 Joy-Con",
      metaTitle: "Switch Pro 手柄和 Joy-Con 怎么连电脑玩游戏",
      description: "用 Switch Pro Controller 或 Joy-Con 玩电脑游戏，成对使用或单只横握，按键位置符合你的习惯。",
      answer:
        "OpenController 让 Switch Pro Controller 和 Joy-Con 在电脑游戏中作为 Xbox 手柄使用。一对 Joy-Con 可以当一个手柄用，也可以拆成两个横握的手柄，两个朋友各用一只。",
      steps: [
        "<download>下载 OpenController</download> 并打开。在 Windows 上，“驱动与依赖”页会安装所需的两个免费驱动。",
        "通过蓝牙配对手柄：按住小小的同步键直到指示灯来回闪烁，然后在 Windows 的蓝牙设置中添加。Pro 手柄也可以用 USB 数据线连接。",
        "手柄会出现在窗口中，并分配玩家编号。打开游戏就能玩。",
      ],
      sections: [
        {
          h: "A 还是 B？",
          p: [
            "按键按位置对应，所以下方的键在游戏中是 A，和 Xbox 手柄一样。如果想按印的字母来，请在手柄页面的“全部按键”中开启“按手柄标注的字母映射”。",
          ],
        },
        {
          h: "一对 Joy-Con 两个人玩",
          p: [
            "在这对 Joy-Con 的页面上，“拆分 Joy-Con”会让每只 Joy-Con 变成独立的横握手柄：摇杆在左，按键在右，SL 和 SR 作为肩键。“合并 Joy-Con”可以合回去。这是实验性功能，支持 Windows 和 Linux。",
          ],
        },
        {
          h: "陀螺仪和截图键",
          p: ["两者都有陀螺仪，转动手柄就可以瞄准。截图键可以设为 Xbox 按键、键盘按键或宏。"],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "手柄在菜单里能用，进游戏没反应",
      metaTitle: "手柄在菜单能用、进游戏没反应？电脑上的解决办法",
      description: "手柄能操作 Steam 或 Windows 的菜单，进了游戏却没反应。原因和解决办法。",
      answer:
        "这通常是因为游戏只读取 Xbox 手柄，而 Windows 和启动器都能正常读取你的手柄。OpenController 把你的手柄以 Xbox 手柄的身份提供给游戏，大多数游戏这样就能解决。",
      sections: [
        {
          h: "为什么会这样",
          p: [
            "Windows 上程序读取手柄的方式不止一种。启动器和菜单通常用的方式能识别任何手柄。很多游戏只用 XInput，它只能识别 Xbox 手柄，所以 PlayStation、Switch 或杂牌手柄对这些游戏来说是不存在的。",
          ],
        },
        {
          h: "解决办法",
          p: [
            "<download>下载 OpenController</download>，打开后连接手柄。手柄出现并分配了玩家编号后，游戏就会把它识别为 Xbox 手柄。如果游戏之前已经打开，请重启游戏。",
          ],
        },
        {
          h: "按一次算两次",
          p: [
            "Steam Input 或游戏本身可能在读取 Xbox 手柄的同时，还在读取原始手柄。“驱动与依赖”页提供的 HidHide 可以向游戏隐藏原始手柄：安装后请重启游戏。使用 Steam 时，请在它的控制器设置中关闭 PlayStation 或 Switch 支持。",
          ],
        },
        {
          h: "还是没反应",
          p: [
            "有些游戏只认第一个手柄。把你的手柄拖到“玩家 1”上即可交换。额外按键发出的键盘按键和宏无法传给以管理员身份运行的游戏。",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "电脑识别不到手柄",
      metaTitle: "电脑识别不到手柄？先检查这几点",
      description: "电脑识别不到手柄时该检查什么，以及怎样让杂牌或未知手柄在游戏中使用。",
      answer:
        "先看看电脑能不能读到它：<test>首页上的测试</test>几秒钟就能显示任何手柄，并告诉你它是什么型号。如果那里能显示，说明电脑能识别它，OpenController 也能让游戏识别它。",
      sections: [
        {
          h: "先检查基本情况",
          p: [
            "换一根数据线试试：有些线只能充电。直接插在电脑上，不要接集线器。蓝牙连接时，让手柄进入配对模式，再在 Windows 设置中添加。8BitDo 等手柄请检查模式开关：XInput 模式下，额外按键和陀螺仪都不可用。",
          ],
        },
        {
          h: "杂牌和未知手柄",
          p: [
            "大多数杂牌手柄用的是 Xbox、PlayStation 或 Switch 手柄的芯片，用起来也和它们一样。如果 OpenController 读不出你手柄的按键，手柄页面会提供“映射按键布局”：它会在示意图上依次点亮各个部件，你按下对应的键即可。完成后就能作为 Xbox 手柄使用。",
          ],
        },
        {
          h: "申请添加",
          p: ["手柄“信息”页上的“报告问题”会发送它的设备信息，方便我们添加支持。你也可以<contact>给我们留言</contact>。"],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "DS4Windows 的替代品",
      metaTitle: "DS4Windows 替代软件：免费、开源、持续维护",
      description: "DS4Windows 已不再维护。OpenController 能为 PlayStation 手柄做同样的事，还支持 Switch、8BitDo 等数百款手柄。",
      answer:
        "DS4Windows 已不再维护，现在以它的名义提供下载的网站都不是原作者的。OpenController 是免费开源的应用，能为 PlayStation 手柄做同样的事，还支持 Switch、8BitDo 等数百款手柄。",
      sections: [
        {
          h: "保留的功能",
          p: [
            "你的 DualShock 4 或 DualSense 在游戏中会变成 Xbox 手柄，可以同时连接多个，灯条显示各自的玩家编号。陀螺仪瞄准、触摸板当按键、灯条颜色和电量显示，以及随前台游戏切换的配置方案，全都有。它使用同样的免费驱动：ViGEmBus 和 HidHide。",
          ],
        },
        {
          h: "不同之处",
          p: [
            "它通过 SDL 读取手柄，所以不局限于 PlayStation 手柄。它支持 Windows、Linux 和 Mac，在 Mac 上提供按键和灯光功能，但不创建虚拟手柄。在 Windows 上，可以选择向游戏提供 DualShock 4 而不是 Xbox 手柄，这是实验性选项。",
          ],
        },
        {
          h: "如何切换",
          p: [
            "请先退出 DS4Windows，避免两个程序为同一个手柄各创建一个虚拟手柄。如果 DS4Windows 已经安装了 ViGEmBus 和 HidHide，OpenController 会直接使用。",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "电脑上的陀螺仪瞄准",
      metaTitle: "电脑游戏用 PS 或 Switch 手柄陀螺仪瞄准",
      description: "在任何电脑游戏中转动手柄来瞄准，支持 DualSense、DualShock 4、Switch Pro、Joy-Con 和 Steam Deck。",
      answer:
        "有了 OpenController，带陀螺仪的手柄可以在任何电脑游戏中瞄准：转动手柄就相当于推动右摇杆。支持 DualSense、DualShock 4、Switch Pro Controller、Joy-Con、Steam Deck，以及 D-input 模式下的 8BitDo 手柄。",
      steps: [
        "<download>下载 OpenController</download>，打开后连接手柄。",
        "在手柄页面打开“体感”，选择陀螺仪何时瞄准：始终启用、按住左扳机时，或按住指定按键时。",
        "调高或调低灵敏度，直到手腕快速一转就能转到你想要的角度。",
      ],
      sections: [
        {
          h: "精细调整",
          p: [
            "瞄准时可以单独设置灵敏度，上下方向可以比左右慢，还可以设一个按键，在你调整手柄姿势时暂停陀螺仪。在“高级”中，加速让快速转动转得更远，稳定功能可以消除手部抖动。",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "在 Windows 上，“手柄实验室”的 Flick Stick 让右摇杆像鼠标一样转动视角，再用陀螺仪精细瞄准。请按游戏分别设置，并关闭游戏内的鼠标加速。",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "解决电脑上的摇杆漂移",
      metaTitle: "手柄摇杆漂移怎么办：电脑上一次设置，所有游戏生效",
      description: "测量漂移的摇杆，重新校准中心，设置刚好够用的死区，一次设置，所有电脑游戏都生效。",
      answer:
        "磨损后自己乱动的摇杆，很多时候可以用软件解决：OpenController 测量摇杆静止时的位置，把它设为中心，再设置一个刚好能盖住漂移的死区，所有游戏都生效。",
      steps: [
        "<download>下载 OpenController</download>，打开后连接手柄。",
        "在手柄页面打开“摇杆”，点击“开始校准”。先松开摇杆，然后沿边缘转一圈。",
        "中心、死区和满幅阈值会根据测量结果设置。示意图会显示游戏实际收到的位置。",
      ],
      sections: [
        {
          h: "各项设置",
          p: [
            "死区会忽略中心附近的细微移动。反死区让游戏对超出死区的第一下移动就有反应。满幅阈值让推不到边缘的摇杆也能算作推到底。",
          ],
        },
        {
          h: "硬件问题",
          p: [
            "如果漂移很严重，能盖住漂移的死区也会吞掉细微的正常操作，这时摇杆需要清洁或更换。对于磨损后按一次触发两次的按键，“手柄实验室”的“按键防抖”可以忽略重复触发。",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
