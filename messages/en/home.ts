/** The home page: hero, features, performance, downloads, FAQ, contact, footer and the two forms. */
const home = {
  meta: {
    title: "OpenController: use any controller in PC games, free",
    description:
      "Use your PlayStation, Switch, 8BitDo and hundreds of other controllers in PC games, alone or with friends. Free and open source for Windows, Linux and Mac.",
    /** For search engines (JSON-LD featureList), not shown on the page. */
    features: [
      "PlayStation, Switch, 8BitDo and other controllers show up in games as an Xbox 360 controller",
      "Several controllers at once, each with its own player number",
      "Any button as one or several buttons, a key or a macro, with profiles per game",
      "Gyro aiming",
      "Stick deadzone, response curve and drift correction",
      "Controller light and battery",
    ],
  },

  hero: {
    tagline: "Your controller in every PC game.",
    lead: "Use PlayStation, Switch, 8BitDo and other controllers in your PC games, alone or with friends.",
    test: "Test your controller",
    video: "The OpenController app showing a DualSense, two Joy-Cons, a flight stick and a racing wheel as they are played, then all five at once.",
    facts: [
      { k: "Runs on", v: "Windows, Linux and Mac" },
      { k: "Works with", v: "Hundreds of controllers" },
      { k: "Costs", v: "Nothing. It's open source" },
      { k: "Sends", v: "Nothing about you" },
    ],
  },

  check: {
    title: "Test your controller here.",
  },

  features: {
    title: "Plug it in and play.",
    games: {
      title: "Works in your games",
      body: "Xbox controllers already work, so it leaves those alone. If a game supports your controller as it is, turn on Native mode and the game sees the real one.",
      steps: ["Connect your controller", "Open a game", "Play"],
    },
    friends: {
      title: "Play with friends",
      body: "Each one stays the same player, even if its controller disconnects for a moment.",
      hint: "Try it: drag one onto another to swap players, or tap two.",
    },
    custom: {
      title: "Your way",
      body: "Change what any button does, aim with the gyro, fix a stick that drifts, and save a setup for each game that switches on when the game opens. The Controller Lab adds trigger effects on a DualSense, plus Flick Stick and the touchpad as a mouse on Windows.",
      setups: { default: "Default", racing: "Racing game", shooter: "Shooter" },
      inUse: "in use",
    },
    updates: {
      title: "Always up to date",
      body: "On Windows, one click installs it and keeps your settings.",
      notice: "A new version is out.",
      button: "Update now",
    },
  },

  swap: {
    players: "Players",
    player: "Player {n}",
    pad: "{name}, player {n}",
    receiver: "Receiver",
    swapped: "{a} is now player {i}, {b} is player {j}.",
  },

  performance: {
    title: "Almost nothing in the background.",
    memory: "Memory in use",
    games: "In your games",
    measures: [
      { k: "Delay it adds to your controller", v: "Usually under a millisecond" },
      { k: "Processor, with no controller connected", v: "0 %" },
    ],
    bars: {
      summary: "Up to {closed} MB with the window closed, about {open} MB with it open.",
      open: "Window open: {n} MB",
      closed: "<b>Up to {n} MB</b> once the window is closed.",
    },
  },

  controllers: {
    title: "Find your controller.",
  },

  platforms: {
    title: "Download for Windows, Linux or Mac.",
    caption: "What works on each system",
    feature: "Feature",
    yes: "Yes",
    no: "No",
    rows: {
      games: { label: "Works in your games", mac: "Built into macOS" },
      players: { label: "Each friend stays the same player", mac: "" },
      remap: { label: "Remapped buttons and a setup per game", mac: "Extra buttons as keys" },
      light: { label: "Controller light and battery", mac: "" },
    },
    windows: {
      title: "Windows 10, 11",
      body: [
        "It installs without administrator rights and updates without reinstalling. One click sets up the two free drivers it needs.",
        "HidHide, the driver that hides the original controller, has no ARM version yet. On an ARM PC, a game that also reads the original may see it twice.",
        "The installer isn't signed yet, so the first time Windows may show “Windows protected your PC”. Click More info, then Run anyway.",
      ],
    },
    linux: {
      title: "Linux",
      body: [
        "On Ubuntu 22.04, Debian 12, Fedora 36 or newer, or any distribution with glibc 2.35 or later. Works with native games and with Proton or Wine.",
        "The installer asks for your password once to give the app access to your controllers. On a Steam Deck, set a password first by running passwd in Konsole.",
      ],
    },
    mac: {
      title: "macOS 13+",
      body: [
        "One app for Apple and Intel Macs. On a Mac, games already work with PlayStation, Xbox and Switch Pro controllers, and macOS doesn't let apps add controllers.",
        "Extra buttons as keys need the Accessibility permission, which the window asks for.",
        "macOS blocks it the first time. Open it once, then go to System Settings, Privacy & Security, and click Open Anyway.",
      ],
    },
  },

  download: {
    for: "Download for {os}",
    any: "Download for Windows, Linux or Mac",
    github: "Download from GitHub",
    githubDown: "GitHub didn't answer just now. The releases page has every build.",
    missing: "No {os} build in {version}",
    build: "Build it yourself",
    releases: "All releases",
    whatsNew: "What's new",
    phone: "OpenController runs on a computer. Open this page there to get the right download.",
    platforms: {
      "windows-x64": { name: "Windows", ask: "Intel or AMD PC?" },
      "windows-arm64": { name: "Windows on ARM", ask: "ARM PC?" },
      "linux-x64": { name: "Linux", ask: "Intel or AMD computer?" },
      "linux-arm64": { name: "Linux on ARM", ask: "ARM computer?" },
      "macos-universal": { name: "Mac", ask: "Mac?" },
      "macos-arm64": { name: "Mac, Apple silicon", ask: "Apple silicon Mac?" },
      "macos-x64": { name: "Mac, Intel", ask: "Intel Mac?" },
    },
  },

  faq: {
    title: "Common questions.",
    search: "Search the questions",
    clear: "Clear search",
    placeholder: "Try Linux, macro or update",
    count: { one: "{n} question", other: "{n} questions" },
    none: "No question mentions “{q}”.",
    ask: "<a>Ask us directly</a>.",
    // "dataReports" replaces "data", and "offList" or "offListMapping" shows, once the latest app has those features (lib/faq.ts).
    items: [
      {
        id: "free",
        q: "Is it free?",
        a: "Yes. It's open source, and the drivers it uses on Windows are free too.",
      },
      {
        id: "how",
        q: "How does it work?",
        a: "Each of your controllers shows up in games as an Xbox 360 controller with its own player number, and the original is hidden so the game doesn't see it twice. On Windows this uses two free drivers, ViGEmBus and HidHide. On Linux it uses a feature built into the system.",
      },
      {
        id: "data",
        q: "Does it send any of my data?",
        a: "Nothing about you: no account, no tracking. It checks GitHub for a new version when you open the window and every few hours while it stays open, which you can turn off in Settings under Check for updates. On Windows it also downloads the updates and drivers you choose to install.",
      },
      {
        id: "dataReports",
        q: "Does it send any of my data?",
        a: "Nothing about you: no account, no tracking. It checks GitHub for a new version when you open the window and every few hours while it stays open, which you can turn off in Settings under Check for updates. On Windows it also downloads the updates and drivers you choose to install. Report a problem sends only technical details: that controller's and, for one made for Xbox, the models of the Xbox devices connected. No serial numbers, and you can read it all before sending.",
      },
      {
        id: "languages",
        q: "What languages is the app in?",
        a: "English, Portuguese and Simplified Chinese. Pick one in Settings, under Language.",
      },
      {
        id: "update",
        q: "How do I update?",
        a: "When a new version is out, the app shows Update now. On Windows it installs the update and keeps your settings. On Linux and Mac it opens the download page.",
      },
      {
        id: "steam",
        q: "Does it work with Steam?",
        a: "Yes. In Steam's settings, turn off Steam Input for PlayStation and Switch controllers, or the game may see each press twice.",
      },
      {
        id: "icons",
        q: "Will games show PlayStation button icons?",
        a: "Not by default, since games see an Xbox controller. If a game supports your controller, open it in the app and turn on Native mode: the game sees the real controller, with its icons, adaptive triggers and, over the cable, haptic feedback. Profiles, gyro aiming and remapping are off while it's native, and you should close the game before switching. Native mode also lets the app work alongside a DS5Dongle.",
      },
      {
        id: "remap",
        q: "Can I remap buttons for each game without Steam?",
        a: "Yes, on Windows and Linux. Under Buttons, All buttons, any button can become another, several at once, a key or a macro. Save it in a profile, add the game, and it switches on whenever that game is in front.",
      },
      {
        id: "letters",
        q: "A and B are swapped on my Switch controller.",
        a: "Games read buttons by position, as on an Xbox controller, so the B at the bottom is A in games. To follow the printed letters, turn on Use the controller's letters under Buttons, All buttons.",
      },
      {
        id: "drift",
        q: "My stick drifts, or no longer reaches its edge.",
        a: "On Windows and Linux, open your controller, go to Sticks and press Measure the stick. It sets the centre, deadzone and full tilt from how the stick really moves, and you can also adjust them for each stick yourself.",
      },
      {
        id: "joycons",
        q: "Can each Joy-Con be a controller of its own?",
        a: "Yes, on Windows and Linux. Open the pair and press Split Joy-Cons: each one becomes a controller held sideways, so two people can play with one pair. Join Joy-Cons puts them back. It's experimental.",
      },
      {
        id: "gyro",
        q: "Can games use my controller's gyro?",
        a: "Games that only know Xbox controllers can't, but OpenController can aim with it, under Motion. On Windows it can also show your controller to games as a DualShock 4, under Information, so games and Steam Input that read motion get the gyro. That is experimental and off by default, because games that only know Xbox controllers then don't see it. Emulators like Cemu can read it from the Controller Lab.",
      },
      {
        id: "sticks",
        q: "Does it work with flight sticks and wheels?",
        a: "Yes. It leaves them as they are, so flight and racing games read them directly, with twist, throttle and force feedback. To use a Logitech Extreme 3D Pro, or a Logitech G29 on Linux or Mac, in a gamepad game, open it in the app and turn off Native mode. For others, send their details from the app.",
      },
      {
        id: "players",
        q: "Can more than four people play?",
        a: "Most PC games take up to four controllers. Some newer ones take more, and the app tells you when that happens. On Linux, players past the fourth get their own number too.",
      },
      {
        id: "viiper",
        q: "A game doesn't see my controller, or my PC gets blue screens.",
        a: "On Windows, try VIIPER: close your games, then in Settings, under Advanced, make the virtual controllers with VIIPER instead of ViGEmBus. Requirements then installs what it needs, which may ask for administrator rights and a restart. It's experimental, and if it doesn't start the app goes back to ViGEmBus and tells you.",
      },
      {
        id: "keys",
        q: "A button I set to a key does nothing in my game.",
        a: "Some games ignore keys from other programs, especially ones with anti-cheat, and Windows blocks them in games run as administrator. Some games also forbid macros, so check their rules first.",
      },
      {
        id: "hidhide",
        q: "A HidHide window opens by itself.",
        a: "That is HidHide's own installer or updater, not OpenController. After an update it restarts Windows and opens again to finish. Since 1.5 it also adds an updater that starts with Windows, which you can turn off in Task Manager, under Startup apps.",
      },
      {
        id: "name",
        q: "The app shows my controller with another one's name.",
        a: "Some controllers copy another one's USB id, like the Onikuma C1, which says it is a Switch Pro Controller. Open your controller, go to Information and pick yours under Model.",
      },
      {
        id: "offList",
        q: "My controller is not on the list, or misbehaves.",
        a: "Most controllers work even off the list, because many say they are an Xbox, PlayStation or Switch controller. To get yours added or fixed, open it in the app, go to Information and press Report a problem. It sends what it takes to support it without having it in hand.",
      },
      {
        id: "offListMapping",
        q: "My controller is not on the list, or misbehaves.",
        a: "Most controllers work even off the list, because many say they are an Xbox, PlayStation or Switch controller. If the app can't read its buttons, its page shows Map the buttons: press each part when asked and it works as an Xbox controller. To get yours added or fixed for everyone, open it in the app, go to Information and press Report a problem.",
      },
      {
        id: "finished",
        q: "Is it finished?",
        a: "Not yet, it's in beta. Some controllers may not work right yet and some features are missing. If something goes wrong, <a>let us know</a>.",
      },
    ],
  },

  contact: {
    title: "Something not working? Tell us.",
    report: "Report a problem",
    issue: "Open an issue",
    idea: "Send a suggestion",
  },

  contactForm: {
    title: "Contact us",
    kind: "Subject",
    kinds: { problem: "A problem", idea: "A suggestion", other: "Something else" },
    system: "Operating system",
    systemOther: "Other",
    systemDetail: "Version or distribution",
    systemDetailHint: "e.g. 23H2, Ubuntu 24.04, Sonoma",
    version: "OpenController version",
    versionHint: "Shown at the top of its window",
    controller: "Controller",
    controllerHint: "The exact model, e.g. 8BitDo Ultimate 2 Wireless",
    connection: "Connected by",
    connections: ["Cable", "Bluetooth", "Its receiver", "Not sure"],
    choose: "Choose",
    message: { problem: "What happened?", idea: "Your suggestion", other: "Your message" },
    messageHint: {
      problem: "What you did, what you expected and what happened instead. If there was an error message, paste it here.",
      idea: "What should OpenController do, and when would it help?",
      other: "Write as much as you need.",
    },
    email: "Your email (optional)",
    emailHint: "Only if you'd like an answer. It's used just to reply.",
    send: "Send",
    close: "Close",
    sentTitle: "Message sent. Thank you!",
    sentBody: "If you left your email, the answer goes there.",
    errors: {
      message: "Write a little more, at least a sentence.",
      email: "That email doesn't look right.",
      rate: "Too many messages in a short time. Try again in an hour.",
      other: "The message couldn't be sent right now. Try again in a moment, or open an issue on GitHub.",
    },
  },

  request: {
    title: "Ask for a controller",
    intro: "Tell us which controller you'd like on the list. The most used ones come first.",
    model: "Brand and model",
    modelHint: "As it is sold, e.g. Redragon Darkflame G820",
    ids: "Read by the controller test",
    notes: "Anything else (optional)",
    notesHint: "Where you bought it, how you connect it, what doesn't work.",
    email: "Your email (optional)",
    emailHint: "Only used to tell you when it's added.",
    app: "Already have OpenController? It can send the controller's details for you: open the controller, then Information, then Report a problem.",
    send: "Send request",
    close: "Close",
    sentTitle: "Request sent. Thank you!",
    sentBody: "If you left your email, you'll hear back when it's added.",
    errors: {
      model: "Write the brand and model.",
      email: "That email doesn't look right.",
      rate: "Too many requests in a short time. Try again in an hour.",
      other: "The request couldn't be sent right now. Try again in a moment.",
    },
  },

  footer: {
    nav: "Project",
    controllers: "Controllers",
    whatsNew: "What's new",
    report: "Report a problem",
    contact: "Contact us",
    license: "MIT License",
    notices: "Third-party notices",
    official: "OpenController is only distributed from <a>{repo}</a> and {domain}. Other sites using the name are not affiliated with this project.",
    disclaimer:
      "Not affiliated with Sony, Microsoft, Nintendo, Valve, 8BitDo or any other controller maker; their names only identify compatible hardware. ViGEmBus, HidHide, DsHidMini and BthPS3 are by Nefarius Software Solutions and are downloaded from their releases, not bundled. Use it at your own risk: the authors are not responsible for bans or other penalties, such as for macros in games that forbid them.",
    analytics: "This site counts visits anonymously: no cookies, no IP address kept, nothing that tells one person from another the next day.",
    madeBy: "Made by <a>{name}</a>",
  },
};

export default home;
export type HomeMessages = typeof home;
