/**
 * What Open Controller does with each controller family. Mirrors `Family`, `printed_name`, `kind`
 * and `Hint` in crates/open-controller-core/src/extras.rs and the README's compatibility table.
 */

export type L = { en: string; pt: string };

export type GroupId = "playstation" | "nintendo" | "xbox" | "eightbitdo" | "steam" | "handheld" | "more";

export const GROUPS: { id: GroupId; label: L }[] = [
  { id: "playstation", label: { en: "PlayStation", pt: "PlayStation" } },
  { id: "nintendo", label: { en: "Nintendo", pt: "Nintendo" } },
  { id: "xbox", label: { en: "Xbox", pt: "Xbox" } },
  { id: "eightbitdo", label: { en: "8BitDo", pt: "8BitDo" } },
  { id: "steam", label: { en: "Steam", pt: "Steam" } },
  { id: "handheld", label: { en: "Handheld PCs", pt: "PCs portáteis" } },
  { id: "more", label: { en: "More", pt: "Outros" } },
];

/** "yes": aims with it. "dinput": only in D-input mode. "no": not listed by the README. */
export type Gyro = "yes" | "dinput" | "no";

export type Family = {
  id: string;
  group: GroupId;
  /** Short name of the family, as in the README's table. */
  label: L;
  /** The extra buttons, named as printed. null when there are none. */
  extras: L | null;
  gyro: Gyro;
  lightBar: boolean;
  /** Touchpad halves and two-finger touch as buttons of their own. */
  touchpad: boolean;
  /** Games read it directly; Open Controller lists it and leaves it alone. */
  passthrough?: boolean;
  /** Not read by this build. */
  unsupported?: boolean;
  note?: L;
};

export const FAMILIES: Record<string, Family> = {
  DualShock4: {
    id: "DualShock4",
    group: "playstation",
    label: { en: "DualShock 4 and PS4 style pads", pt: "DualShock 4 e controles estilo PS4" },
    extras: { en: "Touchpad click, its left and right halves, two fingers", pt: "Clique do touchpad, suas metades esquerda e direita, dois dedos" },
    gyro: "yes",
    lightBar: true,
    touchpad: true,
    note: { en: "Also on Sony's USB wireless adaptor.", pt: "Também no adaptador sem fio USB da Sony." },
  },
  DualSense: {
    id: "DualSense",
    group: "playstation",
    label: { en: "DualSense, Access controller and PS5 style pads", pt: "DualSense, controle Access e controles estilo PS5" },
    extras: { en: "Mic, touchpad click, its halves, two fingers", pt: "Microfone, clique do touchpad, suas metades, dois dedos" },
    gyro: "yes",
    lightBar: true,
    touchpad: true,
  },
  DualSenseEdge: {
    id: "DualSenseEdge",
    group: "playstation",
    label: { en: "DualSense Edge", pt: "DualSense Edge" },
    extras: { en: "Back buttons, Fn L and Fn R, mic, touchpad click and halves", pt: "Botões traseiros, Fn L e Fn R, microfone, clique e metades do touchpad" },
    gyro: "yes",
    lightBar: true,
    touchpad: true,
  },
  DualShock3: {
    id: "DualShock3",
    group: "playstation",
    label: { en: "DualShock 3, Sixaxis and PS3 style pads", pt: "DualShock 3, Sixaxis e controles estilo PS3" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    note: {
      en: "On Windows it needs Nefarius' DsHidMini in SXS mode, and BthPS3 for Bluetooth. The app offers both.",
      pt: "No Windows precisa do DsHidMini da Nefarius no modo SXS, e do BthPS3 para Bluetooth. O app oferece os dois.",
    },
  },
  Ps2Adapter: {
    id: "Ps2Adapter",
    group: "playstation",
    label: { en: "PlayStation and PS2 pads on USB adapters", pt: "Controles de PlayStation e PS2 em adaptadores USB" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  SwitchPro: {
    id: "SwitchPro",
    group: "nintendo",
    label: { en: "Switch Pro Controller and licensed pads", pt: "Switch Pro Controller e controles licenciados" },
    extras: { en: "Capture", pt: "Capture" },
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  JoyCons: {
    id: "JoyCons",
    group: "nintendo",
    label: { en: "Joy-Con, as a pair or alone", pt: "Joy-Con, em par ou sozinho" },
    extras: { en: "Capture, SL and SR", pt: "Capture, SL e SR" },
    gyro: "yes",
    lightBar: false,
    touchpad: false,
    note: { en: "Bluetooth.", pt: "Bluetooth." },
  },
  NintendoClassic: {
    id: "NintendoClassic",
    group: "nintendo",
    label: { en: "Switch Online SNES, N64 and Mega Drive", pt: "SNES, N64 e Mega Drive do Switch Online" },
    extras: { en: "Capture on the N64", pt: "Capture no N64" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Switch2: {
    id: "Switch2",
    group: "nintendo",
    label: { en: "Switch 2 controllers", pt: "Controles do Switch 2" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    unsupported: true,
  },
  GameCube: {
    id: "GameCube",
    group: "nintendo",
    label: { en: "GameCube adapters", pt: "Adaptadores de GameCube" },
    extras: { en: "Trigger clicks, where the adapter reports them", pt: "Clique dos gatilhos, quando o adaptador informa" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
    note: {
      en: "The official Wii U adapter needs a USB library (libusb) this version leaves out.",
      pt: "O adaptador oficial do Wii U precisa de uma biblioteca USB (libusb) que esta versão não inclui.",
    },
  },
  Wii: {
    id: "Wii",
    group: "nintendo",
    label: { en: "Wii Remote and Wii U Pro", pt: "Wii Remote e Wii U Pro" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Xbox: {
    id: "Xbox",
    group: "xbox",
    label: { en: "Xbox 360, One, Series and pads made for them", pt: "Xbox 360, One, Series e controles feitos para eles" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
  },
  XboxElite: {
    id: "XboxElite",
    group: "xbox",
    label: { en: "Xbox Elite", pt: "Xbox Elite" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
  },
  SteamDeck: {
    id: "SteamDeck",
    group: "steam",
    label: { en: "Steam Deck and pads built like it", pt: "Steam Deck e controles feitos como ele" },
    extras: { en: "L4, R4, L5, R5, quick access, trackpad clicks", pt: "L4, R4, L5, R5, acesso rápido, cliques dos trackpads" },
    gyro: "yes",
    lightBar: false,
    touchpad: false,
  },
  SteamController: {
    id: "SteamController",
    group: "steam",
    label: { en: "Steam Controller", pt: "Steam Controller" },
    extras: { en: "Grips on the 2015 controller, trackpad clicks", pt: "Grips no controle de 2015, cliques dos trackpads" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoFour: {
    id: "EightBitDoFour",
    group: "eightbitdo",
    label: { en: "8BitDo Ultimate 2 Wireless, Ultimate 3, Pro 3", pt: "8BitDo Ultimate 2 Wireless, Ultimate 3, Pro 3" },
    extras: { en: "L4, R4, PL, PR in D-input mode", pt: "L4, R4, PL, PR no modo D-input" },
    gyro: "dinput",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoPro2: {
    id: "EightBitDoPro2",
    group: "eightbitdo",
    label: { en: "8BitDo Pro 2", pt: "8BitDo Pro 2" },
    extras: { en: "PL and PR in D-input mode", pt: "PL e PR no modo D-input" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoUltimate: {
    id: "EightBitDoUltimate",
    group: "eightbitdo",
    label: { en: "8BitDo Ultimate (first)", pt: "8BitDo Ultimate (o primeiro)" },
    extras: { en: "Two back buttons and the star button", pt: "Dois botões traseiros e o botão estrela" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDoUltimate2C: {
    id: "EightBitDoUltimate2C",
    group: "eightbitdo",
    label: { en: "8BitDo Ultimate 2C", pt: "8BitDo Ultimate 2C" },
    extras: { en: "L4 and R4 over Bluetooth", pt: "L4 e R4 via Bluetooth" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  EightBitDo: {
    id: "EightBitDo",
    group: "eightbitdo",
    label: { en: "8BitDo SN30 Pro, Lite, Zero, M30 and the retro range", pt: "8BitDo SN30 Pro, Lite, Zero, M30 e a linha retrô" },
    extras: null,
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Flydigi: {
    id: "Flydigi",
    group: "more",
    label: { en: "Flydigi Vader", pt: "Flydigi Vader" },
    extras: { en: "M1 to M4, C, Z, LM, RM", pt: "M1 a M4, C, Z, LM, RM" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  FlydigiApex: {
    id: "FlydigiApex",
    group: "more",
    label: { en: "Flydigi Apex 5 and 6", pt: "Flydigi Apex 5 e 6" },
    extras: { en: "M1 to M4, LM and RM", pt: "M1 a M4, LM e RM" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Stadia: {
    id: "Stadia",
    group: "more",
    label: { en: "Google Stadia", pt: "Google Stadia" },
    extras: { en: "Capture and Assistant", pt: "Capture e Assistente" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Luna: {
    id: "Luna",
    group: "more",
    label: { en: "Amazon Luna", pt: "Amazon Luna" },
    extras: { en: "Mic", pt: "Microfone" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Shield: {
    id: "Shield",
    group: "more",
    label: { en: "NVIDIA Shield", pt: "NVIDIA Shield" },
    extras: { en: "Share, volume down and up", pt: "Compartilhar, volume menos e mais" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
  Handheld: {
    id: "Handheld",
    group: "handheld",
    label: { en: "Handheld PCs' built-in controllers", pt: "Controles embutidos de PCs portáteis" },
    extras: {
      en: "Back and menu buttons of AYANEO, Legion Go, Go 2, Go S, ZOTAC Zone and OneXPlayer, as keys and macros",
      pt: "Botões traseiros e de menu de AYANEO, Legion Go, Go 2, Go S, ZOTAC Zone e OneXPlayer, como teclas e macros",
    },
    gyro: "no",
    lightBar: false,
    touchpad: false,
    passthrough: true,
    note: {
      en: "Windows only, and not tried on a machine yet. ROG Ally and MSI Claw buttons need settings written to the controller, which Open Controller does not do.",
      pt: "Só no Windows, e ainda não testado num aparelho. Os botões do ROG Ally e do MSI Claw precisam de configuração gravada no controle, o que o Open Controller não faz.",
    },
  },
  Other: {
    id: "Other",
    group: "more",
    label: { en: "PowerA, Hori, Razer, Nacon, Logitech and other pads", pt: "PowerA, Hori, Razer, Nacon, Logitech e outros controles" },
    extras: { en: "Those the controller reports", pt: "Os que o controle informar" },
    gyro: "no",
    lightBar: false,
    touchpad: false,
  },
};

export const FAMILY_ORDER = [
  "DualSenseEdge",
  "DualSense",
  "DualShock4",
  "DualShock3",
  "Ps2Adapter",
  "SwitchPro",
  "JoyCons",
  "NintendoClassic",
  "GameCube",
  "Wii",
  "Switch2",
  "Xbox",
  "XboxElite",
  "EightBitDoFour",
  "EightBitDoUltimate",
  "EightBitDoUltimate2C",
  "EightBitDoPro2",
  "EightBitDo",
  "SteamDeck",
  "SteamController",
  "Handheld",
  "Flydigi",
  "FlydigiApex",
  "Stadia",
  "Luna",
  "Shield",
  "Other",
];

export const HINTS: Record<string, L> = {
  EightBitDoDInput: {
    en: "In its default Xbox mode (XInput), its extra buttons send nothing any program can read. Turn it on while holding B to switch it to D-input mode, where they and motion aiming work.",
    pt: "No modo Xbox padrão (XInput), os botões extras não enviam nada que um programa consiga ler. Ligue o controle segurando B para mudar para o modo D-input, onde eles e a mira com movimento funcionam.",
  },
  EightBitDoSwitchD: {
    en: "Set the mode switch on its back to D. That is D-input mode, where PL and PR work.",
    pt: "Coloque a chave de modo atrás dele em D. É o modo D-input, onde PL e PR funcionam.",
  },
  EightBitDo2CBluetooth: {
    en: "On its receiver L4 and R4 are hidden. Over Bluetooth they work.",
    pt: "No receptor, L4 e R4 ficam ocultos. Via Bluetooth eles funcionam.",
  },
  EightBitDoForXbox: {
    en: "Made for Xbox: its extra buttons only copy other buttons, set in 8BitDo's app.",
    pt: "Feito para Xbox: os botões extras só copiam outros botões, configurados no app da 8BitDo.",
  },
  XboxPaddlesHidden: {
    en: "Windows does not pass the Elite's paddles on to programs, except as copies of other buttons set in the Xbox Accessories app.",
    pt: "O Windows não repassa as paletas do Elite aos programas, a não ser como cópias de outros botões configuradas no app Acessórios Xbox.",
  },
  SteamInput: {
    en: "Steam takes Valve's controllers for itself while it runs.",
    pt: "A Steam toma os controles da Valve para si enquanto está aberta.",
  },
  FlydigiThirdParty: {
    en: "The extra buttons need \"Allow third-party apps to take over mappings\" in Flydigi Space Station.",
    pt: "Os botões extras precisam de \"Allow third-party apps to take over mappings\" ligado no Flydigi Space Station.",
  },
  Switch2Unsupported: {
    en: "Switch 2 controllers need a USB library (libusb) this version leaves out.",
    pt: "Controles do Switch 2 precisam de uma biblioteca USB (libusb) que esta versão não inclui.",
  },
};

/** Short family names for dense rows. */
export const SHORT: Record<string, L> = {
  DualShock4: { en: "DualShock 4", pt: "DualShock 4" },
  DualSense: { en: "DualSense", pt: "DualSense" },
  DualSenseEdge: { en: "DualSense Edge", pt: "DualSense Edge" },
  DualShock3: { en: "DualShock 3", pt: "DualShock 3" },
  Ps2Adapter: { en: "PS2 adapter", pt: "Adaptador PS2" },
  SwitchPro: { en: "Switch Pro", pt: "Switch Pro" },
  JoyCons: { en: "Joy-Con", pt: "Joy-Con" },
  NintendoClassic: { en: "Switch Online", pt: "Switch Online" },
  Switch2: { en: "Switch 2", pt: "Switch 2" },
  GameCube: { en: "GameCube", pt: "GameCube" },
  Wii: { en: "Wii", pt: "Wii" },
  Xbox: { en: "Xbox", pt: "Xbox" },
  XboxElite: { en: "Xbox Elite", pt: "Xbox Elite" },
  SteamDeck: { en: "Steam Deck", pt: "Steam Deck" },
  SteamController: { en: "Steam Controller", pt: "Steam Controller" },
  EightBitDoFour: { en: "8BitDo, four extra", pt: "8BitDo, quatro extras" },
  EightBitDoPro2: { en: "8BitDo Pro 2", pt: "8BitDo Pro 2" },
  EightBitDoUltimate: { en: "8BitDo Ultimate", pt: "8BitDo Ultimate" },
  EightBitDoUltimate2C: { en: "8BitDo Ultimate 2C", pt: "8BitDo Ultimate 2C" },
  EightBitDo: { en: "8BitDo", pt: "8BitDo" },
  Flydigi: { en: "Flydigi Vader", pt: "Flydigi Vader" },
  FlydigiApex: { en: "Flydigi Apex", pt: "Flydigi Apex" },
  Stadia: { en: "Stadia", pt: "Stadia" },
  Luna: { en: "Luna", pt: "Luna" },
  Shield: { en: "Shield", pt: "Shield" },
  Handheld: { en: "Handheld PC", pt: "PC portátil" },
  Other: { en: "Generic", pt: "Genérico" },
};
