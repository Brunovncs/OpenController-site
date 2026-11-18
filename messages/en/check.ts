/** The controller test on the home page. */
const check = {
  controllers: "Controllers",
  status: {
    example: "Example",
    idle: "Waiting for a controller",
    known: "Recognised",
    unknown: "Connected, not on the list",
    xinput: "Connected as an Xbox controller",
    anon: "Connected, model not shown",
  },
  pressed: "Pressed",
  extra: "· extra",
  pressExample: "Click or tap the buttons on the drawing.",
  pressIdle: "Buttons light up here as you press them.",
  pressAny: "Press any button, move the sticks, pull the triggers.",
  idle: {
    title: "Connect your controller and press any button.",
    body: "By cable or Bluetooth. You will see its name and what OpenController can do with it.",
    brave: "Brave hides controllers from websites. Open this page in Chrome or Edge, or try an example below.",
    unsupported: "This browser cannot read controllers. Open this page in Chrome or Edge, or try an example below.",
    helpTitle: "Not showing up?",
    help: [
      "Click the page, then press a button. Browsers only show a controller after a press.",
      "Brave and some ad blockers hide controllers. Use Chrome or Edge, or turn the blocker off for this page.",
      "Pair a Bluetooth controller in your system's settings first.",
      "If OpenController is open with hiding on, the browser sees its Xbox controller instead of yours. Quit it to test yours.",
    ],
  },
  verdict: {
    dinput: "It works in games as it is, in Xbox mode. For its extra buttons and motion aiming, switch it to D-input mode, as shown below.",
    unsupported: "This version cannot read it yet.",
    handheld: "Games already work with the built-in controller. On Windows, OpenController can also map its extra buttons.",
    passthrough: "Games already support it, so OpenController leaves it as it is.",
    mac: "On a Mac, games already work with it. OpenController adds the extra buttons, the light and the battery level.",
    works: "Works in your games as its own player, and keeps that player number if it reconnects.",
  },
  copied: "Not the name on yours? Many controllers use the {name}'s chip and say they are one, so yours works the same.",
  lookalike: "If it is the {names}, pick it in the app under Model, on its Information page.",
  caps: {
    extras: "Extra buttons",
    motion: "Aim by moving it",
    light: "Light bar",
    touchpad: "Touchpad as buttons",
    none: "None",
    yes: "Yes",
    no: "No",
    dinput: "Yes, in D-input mode",
    lightYes: "Player colour, your colour or battery",
    touchpadYes: "Yes, as extra buttons",
  },
  mapping: "Your browser does not know this layout, so the drawing may light the wrong buttons. OpenController reads the controller itself and is not affected.",
  seeFamily: "See every controller like this one",
  unknown: "Not on our list yet, but it will probably work. <a>Ask for it to be added</a> and the ids your browser just read go with the request.",
  xinput:
    "It works, and games see it as an Xbox controller. Windows does not tell the browser the exact model. An 8BitDo or similar in Xbox mode hides its extra buttons: switch it to D-input (on an 8BitDo, turn it on holding B) or use Bluetooth. If OpenController is open, this may be the Xbox controller it shows to games.",
  anon: "Your browser did not say which controller this is. Safari never does. Open this page in Chrome or Edge to see the details.",
  tryOne: "No controller at hand? Try one:",
};

export default check;
export type CheckMessages = typeof check;
