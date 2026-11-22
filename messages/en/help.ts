/**
 * Help pages, one per problem people search for, at /help/<slug>. Server only. Facts must match the
 * app's README and CHANGELOG. In bodies, <test>, <download>, <list> and <contact> link to the home
 * page, and the other tags to a guide or help page (see app/[lang]/help/[slug]/page.tsx).
 */
const help = {
  index: {
    title: "Help",
    metaTitle: "Controller help for PC games | OpenController",
    description: "Answers to the usual problems with controllers on PC: a PS5 or PS4 controller, Switch controllers, games that ignore your controller, drift and gyro aiming.",
    lead: "Short answers to the problems people run into with controllers on PC.",
  },
  ui: {
    home: "Home",
    help: "Help",
    answer: "In short",
    steps: "Step by step",
    related: "Related",
    download: "Download OpenController",
    test: "Test your controller",
    free: "Free and open source, for Windows, Linux and Mac.",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "Use a PS5 controller on PC",
      metaTitle: "How to use a PS5 controller (DualSense) on PC",
      description: "Connect a DualSense by cable or Bluetooth and play any PC game with it, even games that only know the Xbox controller.",
      answer:
        "Windows sees a DualSense, but many games only understand Xbox controllers. OpenController shows your DualSense to games as an Xbox controller, so it works in all of them, and keeps the extras: gyro, touchpad and the mic button.",
      steps: [
        "<download>Download OpenController</download> and open it. On Windows, its Requirements page installs the two free drivers it needs.",
        "Connect the DualSense with a USB cable, or pair it by Bluetooth: hold Create and the PS button until the light flashes, then add it in Windows' Bluetooth settings.",
        "It shows up in the window with a player number. Open your game and play.",
      ],
      sections: [
        {
          h: "Adaptive triggers and haptics",
          p: [
            "Games see an Xbox controller, so they can't use the adaptive triggers. Native mode, on the controller's page, gives the real DualSense back to the games that support it, with their triggers and, over the cable, haptic feedback. Or the Controller Lab gives the triggers effects of its own, in any game: resistance, vibration or a click. It does the same on the Flydigi Apex 3, 4 and 5, whose triggers push back too.",
          ],
        },
        {
          h: "Gyro, touchpad and mic",
          p: [
            "Turning the controller can aim: always, while aiming or while you hold a button. The touchpad and the mic button can press Xbox buttons, keys or macros. On Windows the touchpad can also move the mouse, and the mic button can mute the PC's microphone.",
          ],
        },
        {
          h: "Steam games",
          p: [
            "If Steam Input is on for PlayStation controllers, Steam reads the DualSense too and a press can count twice. Turn off PlayStation support in Steam's controller settings.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "Use a PS4 controller on PC",
      metaTitle: "How to use a PS4 controller (DualShock 4) on PC",
      description: "Play PC games with a DualShock 4 by cable, Bluetooth or Sony's wireless adaptor, with the light bar showing your player.",
      answer:
        "Many PC games don't read a PS4 controller. OpenController shows it to them as an Xbox controller, by cable, Bluetooth or Sony's wireless adaptor, and its light bar shows your player number.",
      steps: [
        "<download>Download OpenController</download> and open it. On Windows, its Requirements page installs the two free drivers it needs.",
        "Connect the DualShock 4 with a USB cable, or pair it by Bluetooth: hold Share and the PS button until the light flashes, then add it in Windows' Bluetooth settings.",
        "Its light turns the colour of its player. Open your game and play.",
      ],
      sections: [
        {
          h: "Touchpad and gyro",
          p: [
            "The touchpad gives three buttons besides its click: its left half, its right half and two fingers. Each can press an Xbox button, a key or a macro. Turning the controller can aim, like a mouse in your hand.",
          ],
        },
        {
          h: "Light bar",
          p: [
            "The light shows the player's colour, as on a PlayStation, a colour you pick, or the battery from green to red. It blinks when the battery is low.",
          ],
        },
        {
          h: "Coming from DS4Windows",
          p: ["DS4Windows did this for years and is no longer maintained. <ds4windows>Here is what changes</ds4windows> if you move to OpenController."],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "Use a Switch Pro Controller or Joy-Con on PC",
      metaTitle: "How to use a Switch Pro Controller or Joy-Con on PC",
      description: "Play PC games with a Switch Pro Controller or Joy-Cons, as a pair or held sideways, with the buttons where you expect them.",
      answer:
        "OpenController makes the Switch Pro Controller and Joy-Cons work in PC games as Xbox controllers. A pair of Joy-Cons plays as one controller, or as two, one per friend, held sideways.",
      steps: [
        "<download>Download OpenController</download> and open it. On Windows, its Requirements page installs the two free drivers it needs.",
        "Pair the controller by Bluetooth: hold its small sync button until the lights run, then add it in Windows' Bluetooth settings. The Pro Controller also works with a USB cable.",
        "It shows up in the window with a player number. Open your game and play.",
      ],
      sections: [
        {
          h: "A or B?",
          p: [
            "Buttons follow their place, so the bottom button is A in games, as on an Xbox controller. To use the letters as printed, turn on Use the controller's letters under All buttons, on the controller's page.",
          ],
        },
        {
          h: "Two players on one pair",
          p: [
            "On the pair's page, Split Joy-Cons makes each Joy-Con a controller of its own, held sideways: stick on the left, buttons on the right, SL and SR as the bumpers. Join Joy-Cons puts them back. It's experimental, on Windows and Linux.",
          ],
        },
        {
          h: "Gyro and Capture",
          p: ["Both have a gyro, so turning the controller can aim. The Capture button can press an Xbox button, a key or a macro."],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "Controller works in menus but not in the game",
      metaTitle: "Controller works in menus but not in game on PC: the fix",
      description: "Your controller moves Steam or Windows menus but does nothing in the game. Why it happens and how to fix it.",
      answer:
        "This usually means the game only reads Xbox controllers, while Windows and the launcher read yours fine. OpenController shows your controller to games as an Xbox controller, which fixes it in most games.",
      sections: [
        {
          h: "Why it happens",
          p: [
            "Windows has more than one way for programs to read controllers. Launchers and menus often use one that sees any controller. Many games only use XInput, which only sees Xbox controllers, so a PlayStation, Switch or generic controller is invisible to them.",
          ],
        },
        {
          h: "The fix",
          p: [
            "<download>Download OpenController</download>, open it and connect your controller. When it shows up with a player number, games see it as an Xbox controller. Restart the game if it was already open.",
          ],
        },
        {
          h: "If presses count twice",
          p: [
            "Steam Input or the game may still read the original controller next to the Xbox one. HidHide, offered on the Requirements page, hides the originals from games: restart the game after installing it. With Steam, turn off PlayStation or Switch support in its controller settings.",
          ],
        },
        {
          h: "Still nothing",
          p: [
            "Some games only listen to the first controller. Drag your controller's tile onto Player 1's to swap them. Keys and macros from extra buttons don't reach games running as administrator.",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "PC does not recognize the controller",
      metaTitle: "PC not recognizing your controller? Check this first",
      description: "What to check when the PC doesn't see your controller, and how to get a generic or unknown controller working in games.",
      answer:
        "First see whether the PC reads it at all: <test>the test on our home page</test> shows any controller in seconds and says what it is. If it shows up there, the PC sees it, and OpenController can make games see it too.",
      sections: [
        {
          h: "Check the basics",
          p: [
            "Try another cable: some only charge. Plug it straight into the PC, not a hub. For Bluetooth, put the controller in pairing mode and add it in Windows' settings. On 8BitDo and similar pads, check the mode switch: in XInput mode the extra buttons and gyro stay hidden.",
          ],
        },
        {
          h: "Generic and unknown controllers",
          p: [
            "Most generic controllers copy the chip of an Xbox, PlayStation or Switch controller and work as one. If OpenController can't read the buttons of yours, its page offers Map the buttons: it lights each part on the drawing and you press it. After that it works as an Xbox controller.",
          ],
        },
        {
          h: "Ask for it",
          p: ["Report a problem, on the controller's Information page, sends its details so it can be added. You can also <contact>write to us</contact>."],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "A DS4Windows alternative",
      metaTitle: "DS4Windows alternative: free, open source and maintained",
      description: "DS4Windows is no longer maintained. OpenController does the same job for PlayStation controllers and covers Switch, 8BitDo and hundreds more.",
      answer:
        "DS4Windows is no longer maintained, and downloads with its name now come from sites that are not its authors. OpenController is a free, open source app that does the same job for PlayStation controllers and also covers Switch, 8BitDo and hundreds of others.",
      sections: [
        {
          h: "What carries over",
          p: [
            "Your DualShock 4 or DualSense becomes an Xbox controller in games, several at once, each with its player number on its light. Gyro aiming, the touchpad as buttons, the light bar's colour and battery, and profiles that switch with the game in front are all there. It uses the same free drivers, ViGEmBus and HidHide.",
          ],
        },
        {
          h: "What is different",
          p: [
            "It reads controllers through SDL, so it is not limited to PlayStation pads. It runs on Windows, Linux and Mac, where it adds buttons and lights but no virtual controllers. Showing games a DualShock 4 instead of an Xbox controller exists on Windows, as an experimental option.",
          ],
        },
        {
          h: "Switching",
          p: [
            "Quit DS4Windows first, so the two don't both make a virtual controller for the same pad. If DS4Windows installed ViGEmBus and HidHide, OpenController uses them as they are.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "Gyro aiming on PC",
      metaTitle: "Gyro aiming on PC with a PlayStation or Switch controller",
      description: "Aim by turning your controller in any PC game, with a DualSense, DualShock 4, Switch Pro, Joy-Con or Steam Deck.",
      answer:
        "With OpenController, a controller with a gyro can aim in any PC game: turning it moves the right stick. That covers the DualSense, DualShock 4, Switch Pro Controller, Joy-Cons, Steam Deck and 8BitDo pads in D-input mode.",
      steps: [
        "<download>Download OpenController</download>, open it and connect the controller.",
        "On its page, open Motion and pick when the gyro aims: always, while the left trigger is pulled, or while you hold a button.",
        "Turn the sensitivity up or down until a quick wrist turn covers the turn you want.",
      ],
      sections: [
        {
          h: "Fine tuning",
          p: [
            "Aiming can have its own sensitivity, up and down can be slower than sideways, and a button can pause the gyro while you put the controller back. Under Advanced, acceleration makes fast turns go further and steadying holds a shaking hand still.",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "On Windows, the Controller Lab's Flick Stick turns the camera with the right stick as a mouse would, with the gyro for fine aim. Set it up per game, with the game's mouse acceleration off.",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "Fix stick drift on PC",
      metaTitle: "Fix controller stick drift on PC, for every game",
      description: "Measure a drifting stick, re-centre it and set a deadzone just big enough, once, for every PC game.",
      answer:
        "A worn stick that moves by itself can often be fixed in software: OpenController measures where it rests, makes that its centre and sets a deadzone just big enough to hide the drift, in every game.",
      steps: [
        "<download>Download OpenController</download>, open it and connect the controller.",
        "On its page, open Sticks and click Measure. Leave the stick alone, then roll it around its edge.",
        "The centre, deadzone and full tilt are set from what it measured. The drawing shows what games get.",
      ],
      sections: [
        {
          h: "The settings",
          p: [
            "The deadzone ignores small movements around the centre. The anti-deadzone makes games react to the first movement past it. Full tilt counts a stick that no longer reaches its edge as pushed all the way.",
          ],
        },
        {
          h: "When it's the hardware",
          p: [
            "If the drift is large, a deadzone that hides it also swallows small real movements, and the stick needs cleaning or replacing. For a worn button that presses twice, the Controller Lab's button filter ignores the double press.",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
export type HelpMessages = typeof help;
export type HelpSlug = keyof HelpMessages["articles"];
