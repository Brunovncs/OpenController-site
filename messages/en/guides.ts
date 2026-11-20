/**
 * The controller pages (/controllers and /controllers/<slug>) and the changelog page. Server only,
 * so some entries are functions: their sentences depend on the controller's name and grammar.
 * Each language writes its own functions; only the arguments are shared.
 */

/** A controller's name in this language. */
export type GuideName = {
  /** As it reads mid-sentence: "DualSense", "PS2 controller". */
  name: string;
  /** The name is a group and takes plural agreement ("Switch 2 controllers"). */
  plural?: boolean;
  /** Grammatical gender, for languages whose articles or adjectives need it. */
  gender?: "m" | "f";
};

/** What the sentence functions get: the name, the same with a capital first letter, and its grammar. */
export type GuideNoun = { name: string; Name: string; plural: boolean; gender?: "m" | "f" };

/** What OpenController does with the controller, for the generated descriptions. */
export type GuideFacts = {
  /** It has extra buttons OpenController can set. */
  extras: boolean;
  /** "yes": it aims with motion. "dinput": only in D-input mode. */
  gyro: "yes" | "dinput" | "no";
};

/** Hand-written text for a guide page, on top of the generated one. Section keys are anchor ids: keep them. */
export type GuideCopy = {
  /** The whole <title>, written for what people type in the search box. */
  title: string;
  description: string;
  sections: Record<string, { title: string; body: string[] }>;
};

const names = {
  dualsense: { name: "DualSense" },
  "dualsense-edge": { name: "DualSense Edge" },
  "dualshock-4": { name: "DualShock 4" },
  "dualshock-3": { name: "DualShock 3" },
  "ps2-controller": { name: "PS2 controller" },
  "switch-pro-controller": { name: "Switch Pro Controller" },
  "joy-con": { name: "Joy-Con" },
  "switch-online-controllers": { name: "Switch Online SNES, N64 and Mega Drive controllers", plural: true },
  "switch-2-controllers": { name: "Switch 2 controllers", plural: true },
  "gamecube-controller": { name: "GameCube controller" },
  "wii-remote": { name: "Wii Remote and Wii U Pro Controller", plural: true },
  "xbox-controller": { name: "Xbox controller" },
  "xbox-elite": { name: "Xbox Elite controller" },
  "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2, Ultimate 3 and Pro 3", plural: true },
  "8bitdo-ultimate": { name: "8BitDo Ultimate" },
  "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C" },
  "8bitdo-pro-2": { name: "8BitDo Pro 2" },
  "8bitdo-sn30-pro": { name: "8BitDo SN30 Pro and retro controllers", plural: true },
  "steam-deck": { name: "Steam Deck controls", plural: true },
  "steam-controller": { name: "Steam Controller" },
  "handheld-pc": { name: "handheld PC controls", plural: true },
  "flydigi-vader": { name: "Flydigi Vader" },
  "flydigi-apex": { name: "Flydigi Apex" },
  "stadia-controller": { name: "Stadia controller" },
  "luna-controller": { name: "Amazon Luna controller" },
  "shield-controller": { name: "NVIDIA Shield controller" },
  "generic-controllers": { name: "PowerA, Hori, Razer and other controllers", plural: true },
} satisfies Record<string, GuideName>;

/** The slug of every guide page, from the English names. */
export type GuideSlug = keyof typeof names;

const pick = (n: GuideNoun, one: string, many: string) => (n.plural ? many : one);

const copy = {
  dualsense: {
    title: "PS5 DualSense on PC: works in any game, with gyro | OpenController",
    description:
      "Use the PS5 DualSense in any PC game as an Xbox controller, over USB or Bluetooth. Gyro aiming, touchpad as buttons, light bar. Free for Windows and Linux.",
    sections: {
      native: {
        title: "Xbox or native",
        body: [
          "By default games get an Xbox 360 controller, with Xbox prompts and rumble. They can't use the haptics or the adaptive triggers, though the app's Lab page can give the triggers resistance or vibration of its own. For games that support the DualSense, turn on Native mode on the controller's page: they get PlayStation prompts, adaptive triggers and, by cable, haptics. Profiles, gyro and remapping are off in Native mode.",
        ],
      },
      "gyro-touchpad": {
        title: "Gyro and touchpad",
        body: [
          "The gyro adds to the right stick: always, while L2 is pulled, or while you hold a button. The touchpad gives four buttons: click, left half, right half and two fingers. Each of them, and the mic button, can be an Xbox button, a key or a macro, per game. On Windows the touchpad can also move the mouse, and the mic button can mute the PC.",
        ],
      },
      cable: {
        title: "Cable and Bluetooth",
        body: [
          "Plug the cable into a DualSense on Bluetooth and it stays the same player: the game doesn't see it disconnect. The player lights and the light bar show the player number, or the light bar can show the battery.",
        ],
      },
    },
  },

  "dualshock-4": {
    title: "PS4 DualShock 4 on PC: works in any game | OpenController",
    description:
      "Use the PS4 DualShock 4 in any PC game as an Xbox controller, by cable, Bluetooth or Sony's adaptor. Gyro aiming. Free for Windows and Linux.",
    sections: {
      connect: {
        title: "Cable, Bluetooth or adaptor",
        body: [
          "Both versions of the DualShock 4 work by USB, Bluetooth or Sony's USB wireless adaptor. Plug the cable into one on Bluetooth and it stays the same player.",
        ],
      },
      light: {
        title: "Light bar",
        body: [
          "The light bar shows the player number in PlayStation colours: blue, red, green, pink. It can also show a colour you pick, the battery from green to red, or nothing. It blinks below 15% battery.",
        ],
      },
      "gyro-touchpad": {
        title: "Gyro and touchpad",
        body: [
          "The gyro adds to the right stick: always, while L2 is pulled, or while you hold a button. The touchpad gives four buttons: click, left half, right half and two fingers. Each can be an Xbox button, a key or a macro, per game. On Windows the touchpad can also move the mouse.",
        ],
      },
    },
  },

  "switch-pro-controller": {
    title: "Switch Pro Controller on PC: works in any game | OpenController",
    description:
      "Use the Switch Pro Controller in any PC game as an Xbox controller, over USB or Bluetooth. Gyro aiming, Capture as a key or macro. Free for Windows and Linux.",
    sections: {
      layout: {
        title: "Button layout",
        body: [
          "Buttons follow their position, not their letter. The bottom one, B on a Switch, is Xbox A, and the right one, A, is Xbox B. To keep the letters, swap them under Buttons, per game if you want.",
        ],
      },
      "gyro-capture": {
        title: "Gyro, Capture and lights",
        body: [
          "The gyro adds to the right stick: always, while ZL is held, or while you hold a button. Capture can be an Xbox button, a key or a macro. The player lights show the player number, as on a Switch.",
        ],
      },
    },
  },

  "stadia-controller": {
    title: "Stadia controller on PC: use it in any game | OpenController",
    description:
      "Stadia is gone, but its controller still works. Use it in any PC game as an Xbox controller, over USB or Bluetooth, on Windows and Linux. Free.",
    sections: {
      "after-stadia": {
        title: "After Stadia",
        body: [
          "Google closed Stadia in January 2023, but the controller still works as a normal gamepad and needs nothing from Google. Most Windows games only read Xbox controllers, so they ignore it. OpenController reads it and gives your games an Xbox 360 controller instead.",
        ],
      },
      connect: {
        title: "USB or Bluetooth",
        body: [
          "With the USB-C cable it works right away. Bluetooth only works if the controller was switched to Bluetooth mode with the tool Google released when Stadia closed. If yours wasn't, use the cable.",
        ],
      },
      buttons: {
        title: "Capture and Assistant",
        body: [
          "Games don't use the Capture and Assistant buttons. On Windows and Linux each can be one or more Xbox buttons, a key or a macro, with a profile per game that switches on by itself. On a Mac they work as keys.",
        ],
      },
      linux: {
        title: "On Linux",
        body: [
          "The install script adds a rule so the app can read the controller without root. Games, Wine and Proton see an Xbox 360 controller.",
        ],
      },
    },
  },

  "flydigi-vader": {
    title: "Flydigi Vader 5 Pro and 4 Pro on PC and Linux | OpenController",
    description:
      "Use the Flydigi Vader 5 Pro, 4 Pro or an older Vader in any PC game as an Xbox controller, with M1 to M4, C and Z mapped. Windows and Linux, free.",
    sections: {
      which: {
        title: "Which Vader you have",
        body: [
          "The Vader 4 Pro, 5 Pro and the Direwolf 4 connect by cable or receiver. The older Vader 2 and 3 use their own older receiver. All of them show up in games as an Xbox 360 controller.",
          "The Vader 5S is different. It is a wired controller made for Xbox, and Windows reads it like any Xbox pad, so OpenController sees it as an Xbox Wireless Controller. Windows does not pass its extra buttons to other apps. Give them Xbox buttons in Space Station for Xbox and they work everywhere as those buttons.",
        ],
      },
      "space-station": {
        title: "Extra buttons and Space Station",
        body: [
          "M1 to M4, C, Z, LM and RM can each be one or more Xbox buttons, a key or a macro, with a profile per game that switches on by itself.",
          'On the Vader 4 Pro, 5 Pro and the Direwolf 4, turn on "Allow third-party apps to take over mappings" in Flydigi Space Station, or other apps can\'t read these buttons. OpenController\'s window reminds you when it\'s needed. The Vader 2 and 3 on the old receiver don\'t need it.',
        ],
      },
      linux: {
        title: "On Linux",
        body: [
          "The install script adds a rule so the app can read the Vader without root. Games, Wine and Proton see an Xbox 360 controller, and the extra buttons work as on Windows, with the same Space Station reminder for the newer pads.",
        ],
      },
    },
  },
} satisfies Partial<Record<GuideSlug, GuideCopy>>;

const guides = {
  names: names as Record<GuideSlug, GuideName>,

  /** The page's h1 and link text: "DualSense on PC". */
  title: (n: GuideNoun) => `${n.Name} on PC`,
  /** The <title> of pages without a hand-written one. {title} is the line above. */
  metaTitle: "{title} | OpenController",

  /** Meta description and the line under each card on /controllers. */
  description: {
    xbox: (n: GuideNoun, f: GuideFacts) => {
      const its = pick(n, "its", "their");
      const motion = f.gyro === "yes" ? "aim with motion" : f.gyro === "dinput" ? "aim with motion in D-input mode" : "";
      const more = f.extras && motion ? ` Map ${its} extra buttons and ${motion}.` : f.extras ? ` Map ${its} extra buttons.` : motion ? ` ${motion.charAt(0).toUpperCase()}${motion.slice(1)}.` : "";
      return `Use your ${n.name} in any PC game as an Xbox controller.${more} Free for Windows and Linux.`;
    },
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `PC games already read your ${n.name}. OpenController adds ${pick(n, "its", "their")} extra buttons as keys and macros. Free.`
        : `PC games already read your ${n.name}. OpenController keeps ${pick(n, "it", "them")} on ${pick(n, "its", "their")} own player number next to your other controllers. Free for Windows and Linux.`,
    unsupported: (n: GuideNoun) => `${n.Name} ${pick(n, "doesn't", "don't")} work in OpenController yet. See which controllers do.`,
  },

  /** The paragraph under the h1 of a guide page. */
  intro: {
    xbox: (n: GuideNoun) =>
      `Many PC games only read Xbox controllers. With OpenController open, your ${n.name} ${pick(n, "shows", "show")} up in games as an Xbox 360 controller, and the original is hidden so the game doesn't see ${pick(n, "it", "them")} twice.`,
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `PC games already read your ${n.name}. OpenController leaves the rest alone and adds ${pick(n, "its", "their")} extra buttons as keys and macros.`
        : `PC games already read your ${n.name}. OpenController leaves ${pick(n, "it", "them")} as ${pick(n, "it is", "they are")} and keeps ${pick(n, "it", "them")} on ${pick(n, "its", "their")} own player number when friends join with other controllers.`,
    unsupported: (n: GuideNoun) => `OpenController recognises your ${n.name} but can't read ${pick(n, "it", "them")} yet.`,
  },

  /** "How to set it up", in order; which ones show depends on the controller. */
  steps: {
    download: "Download OpenController and open it. On Windows, its Requirements page installs the free drivers it needs in one click.",
    connect: "Connect the controller by cable, Bluetooth or its receiver. It appears in OpenController's window, drawn in its own shape.",
    extras: "Click it to set the extra buttons. Each can be one or more Xbox buttons, a key or a macro, with a profile per game if you want.",
    gyro: "To aim by moving the controller, turn it on under Motion: always, while aiming, or while holding a button.",
    play: "Open your game. It sees an Xbox 360 controller.",
    passthroughExtras: "Click it to set its extra buttons as keys or macros. Games keep reading the controller as before.",
    passthrough: "Open your game. It reads the controller as before, now with a fixed player number.",
  },

  page: {
    breadcrumb: "Breadcrumb",
    controllers: "Controllers",
    test: "Test your controller",
    works: "What works",
    setup: "How to set it up",
    steamTip: "Using Steam? In its settings, turn off Steam Input for PlayStation and Switch controllers, or the game may get each press twice.",
    faq: "More answers are in the <a>common questions</a>.",
    models: "Models ({n})",
    modelsIntro: "Most controllers work even if they're not on this list.",
    missing: "Yours is missing or misbehaves? <a>Let us know</a>.",
    more: "Other controllers",
    all: "All controllers",
  },

  /** /controllers */
  index: {
    metaTitle: "Any controller on PC: PlayStation, Switch, Stadia and more | OpenController",
    description:
      "Use PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo and handheld PC controllers in any PC game as an Xbox controller. See what works with yours. Free.",
    title: "Controllers that work on PC with OpenController",
    intro: "OpenController knows {n} controller models, and most others work too. Pick yours, or <a>search by name</a>.",
    models: { one: "1 model", other: "{n} models" },
  },

  /** The list of guide pages at the bottom of the home page. */
  links: { title: "How to use each controller on PC" },

  copy,

  /** /changelog. The release notes themselves come from GitHub in English. */
  changelog: {
    metaTitle: "What's new in OpenController | Release notes",
    description: "Every OpenController version, newest first: what changed and whether your settings carry over.",
    title: "What's new",
    intro: "The app checks for a new version when its window opens and updates itself without reinstalling.",
    /** Shown under the intro in languages other than English; empty here. */
    notesInEnglish: "",
    feed: "All versions",
    rss: "Follow by RSS",
    latest: "{version} came out on {date}.",
    first: "That's every version since the first, {version}, on {date}.",
    offline: "GitHub didn't answer just now.",
    offlineLink: "The notes are also on the <a>releases page</a>.",
    /** A release's day in the feed. month is the short month name of this language, capitalised. */
    day: (day: string, month: string) => `${month} ${day}`,
    labels: {
      count: { one: "{n} version", other: "{n} versions" },
      monthNav: "Jump to month",
      jumpTo: "Jump to {month}",
      scroller: "Release notes",
      source: "On GitHub",
    },
  },
};

export default guides;
export type GuidesMessages = typeof guides;
