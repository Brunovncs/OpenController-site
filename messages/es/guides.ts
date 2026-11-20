import type { GuideFacts, GuideNoun, GuidesMessages } from "../en/guides";

const pick = (n: GuideNoun, one: string, many: string) => (n.plural ? many : one);
const tu = (n: GuideNoun) => pick(n, "tu", "tus");
const lo = (n: GuideNoun) => pick(n, "lo", "los");

const guides: GuidesMessages = {
  names: {
    dualsense: { name: "DualSense" },
    "dualsense-edge": { name: "DualSense Edge" },
    "dualshock-4": { name: "DualShock 4" },
    "dualshock-3": { name: "DualShock 3" },
    "ps2-controller": { name: "mando de PS2" },
    "switch-pro-controller": { name: "Switch Pro Controller" },
    "joy-con": { name: "Joy-Con" },
    "switch-online-controllers": { name: "mandos de SNES, N64 y Mega Drive de Switch Online", plural: true },
    "switch-2-controllers": { name: "mandos de Switch 2", plural: true },
    "gamecube-controller": { name: "mando de GameCube" },
    "wii-remote": { name: "Wii Remote y Wii U Pro Controller", plural: true },
    "xbox-controller": { name: "mando de Xbox" },
    "xbox-elite": { name: "mando Xbox Elite" },
    "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2, Ultimate 3 y Pro 3", plural: true },
    "8bitdo-ultimate": { name: "8BitDo Ultimate" },
    "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C" },
    "8bitdo-pro-2": { name: "8BitDo Pro 2" },
    "8bitdo-sn30-pro": { name: "8BitDo SN30 Pro y mandos retro", plural: true },
    "steam-deck": { name: "controles de Steam Deck", plural: true },
    "steam-controller": { name: "Steam Controller" },
    "handheld-pc": { name: "controles de PC portátil", plural: true },
    "flydigi-vader": { name: "Flydigi Vader" },
    "flydigi-apex": { name: "Flydigi Apex" },
    "stadia-controller": { name: "mando de Stadia" },
    "luna-controller": { name: "mando de Amazon Luna" },
    "shield-controller": { name: "mando de NVIDIA Shield" },
    "generic-controllers": { name: "mandos PowerA, Hori, Razer y otros", plural: true },
  },

  title: (n) => `${n.Name} en PC`,
  metaTitle: "{title} | OpenController",

  description: {
    xbox: (n: GuideNoun, f: GuideFacts) => {
      const motion = f.gyro === "yes" ? "apunta con movimiento" : f.gyro === "dinput" ? "apunta con movimiento en modo D-input" : "";
      const more = f.extras && motion ? ` Asigna sus botones extra y ${motion}.` : f.extras ? " Asigna sus botones extra." : motion ? ` ${motion.charAt(0).toUpperCase()}${motion.slice(1)}.` : "";
      return `Usa ${tu(n)} ${n.name} en cualquier juego de PC como mando de Xbox.${more} Gratis para Windows y Linux.`;
    },
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `Los juegos de PC ya leen ${tu(n)} ${n.name}. OpenController añade sus botones extra como teclas y macros. Gratis.`
        : `Los juegos de PC ya leen ${tu(n)} ${n.name}. OpenController ${pick(n, "le", "les")} da un número de jugador fijo junto a tus otros mandos. Gratis para Windows y Linux.`,
    unsupported: (n) => `${n.Name} aún no ${pick(n, "funciona", "funcionan")} en OpenController. Mira qué mandos funcionan.`,
  },

  intro: {
    xbox: (n) =>
      `Muchos juegos de PC solo leen mandos de Xbox. Con OpenController abierto, ${tu(n)} ${n.name} ${pick(n, "aparece", "aparecen")} en los juegos como un mando de Xbox 360, y el original se oculta para que el juego no ${lo(n)} vea dos veces.`,
    passthrough: (n, f) =>
      f.extras
        ? `Los juegos de PC ya leen ${tu(n)} ${n.name}. OpenController no toca lo demás y añade sus botones extra como teclas y macros.`
        : `Los juegos de PC ya leen ${tu(n)} ${n.name}. OpenController ${lo(n)} deja como ${pick(n, "está", "están")} y ${pick(n, "le", "les")} mantiene un número de jugador fijo cuando tus amigos se unen con otros mandos.`,
    unsupported: (n) => `OpenController reconoce ${tu(n)} ${n.name}, pero aún no puede ${pick(n, "leerlo", "leerlos")}.`,
  },

  steps: {
    download: "Descarga OpenController y ábrelo. En Windows, su página \"Requirements\" instala con un clic los drivers gratuitos que necesita.",
    connect: "Conecta el mando por cable, Bluetooth o su receptor. Aparece en la ventana de OpenController, dibujado con su propia forma.",
    extras: "Haz clic en él para configurar los botones extra. Cada uno puede ser uno o varios botones de Xbox, una tecla o una macro, con un perfil por juego si quieres.",
    gyro: "Para apuntar moviendo el mando, actívalo en \"Motion\": siempre, al apuntar o mientras mantienes un botón.",
    play: "Abre tu juego. Verá un mando de Xbox 360.",
    passthroughExtras: "Haz clic en él para configurar sus botones extra como teclas o macros. Los juegos siguen leyendo el mando como antes.",
    passthrough: "Abre tu juego. Lee el mando como antes, ahora con un número de jugador fijo.",
  },

  page: {
    breadcrumb: "Ruta de navegación",
    controllers: "Mandos",
    test: "Prueba tu mando",
    works: "Qué funciona",
    setup: "Cómo configurarlo",
    steamTip: "¿Usas Steam? En su configuración, desactiva Steam Input para los mandos de PlayStation y Switch, o el juego puede recibir cada pulsación dos veces.",
    faq: "Más respuestas en las <a>preguntas frecuentes</a>.",
    models: "Modelos ({n})",
    modelsIntro: "La mayoría de los mandos funcionan aunque no estén en esta lista.",
    missing: "¿Falta el tuyo o no funciona bien? <a>Avísanos</a>.",
    more: "Otros mandos",
    all: "Todos los mandos",
  },

  index: {
    metaTitle: "Cualquier mando en PC: PlayStation, Switch, Stadia y más | OpenController",
    description:
      "Usa mandos de PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo y PC portátiles en cualquier juego de PC como mando de Xbox. Mira qué funciona con el tuyo. Gratis.",
    title: "Mandos que funcionan en PC con OpenController",
    intro: "OpenController conoce {n} modelos de mando, y la mayoría de los demás también funcionan. Elige el tuyo o <a>búscalo por nombre</a>.",
    models: { one: "1 modelo", other: "{n} modelos" },
  },

  links: { title: "Cómo usar cada mando en PC" },

  copy: {
    dualsense: {
      title: "Mando de PS5 (DualSense) en PC, en cualquier juego | OpenController",
      description:
        "Usa el DualSense de PS5 en cualquier juego de PC como mando de Xbox, por USB o Bluetooth. Giroscopio, touchpad como botones, barra de luz. Gratis en Windows y Linux.",
      sections: {
        native: {
          title: "Xbox o nativo",
          body: [
            "Por defecto los juegos reciben un mando de Xbox 360, con iconos de Xbox y vibración. No pueden usar la respuesta háptica ni los gatillos adaptativos, aunque la página \"Controller Lab\" de la app puede dar a los gatillos resistencia o vibración por su cuenta. En los juegos compatibles con el DualSense, activa \"Native mode\" en la página del mando: reciben iconos de PlayStation, gatillos adaptativos y, por cable, respuesta háptica. Los perfiles, el giroscopio y la reasignación se desactivan en \"Native mode\".",
          ],
        },
        "gyro-touchpad": {
          title: "Giroscopio y touchpad",
          body: [
            "El giroscopio se suma al stick derecho: siempre, mientras aprietas L2 o mientras mantienes un botón. El touchpad da cuatro botones: clic, mitad izquierda, mitad derecha y dos dedos. Cada uno, y el botón de micrófono, puede ser un botón de Xbox, una tecla o una macro, por juego. En Windows el touchpad también puede mover el mouse, y el botón de micrófono puede silenciar el PC.",
          ],
        },
        cable: {
          title: "Cable y Bluetooth",
          body: [
            "Conecta el cable a un DualSense que está por Bluetooth y sigue siendo el mismo jugador: el juego no lo ve desconectarse. Las luces de jugador y la barra de luz muestran el número de jugador, o la barra puede mostrar la batería.",
          ],
        },
      },
    },

    "dualshock-4": {
      title: "Mando de PS4 (DualShock 4) en PC, en cualquier juego | OpenController",
      description:
        "Usa el DualShock 4 de PS4 en cualquier juego de PC como mando de Xbox, por cable, Bluetooth o el adaptador de Sony. Apunta con giroscopio. Gratis en Windows y Linux.",
      sections: {
        connect: {
          title: "Cable, Bluetooth o adaptador",
          body: [
            "Las dos versiones del DualShock 4 funcionan por USB, Bluetooth o con el adaptador inalámbrico USB de Sony. Conecta el cable a uno que está por Bluetooth y sigue siendo el mismo jugador.",
          ],
        },
        light: {
          title: "Barra de luz",
          body: [
            "La barra de luz muestra el número de jugador con los colores de PlayStation: azul, rojo, verde, rosa. También puede mostrar un color que elijas, la batería de verde a rojo, o nada. Parpadea por debajo del 15 % de batería.",
          ],
        },
        "gyro-touchpad": {
          title: "Giroscopio y touchpad",
          body: [
            "El giroscopio se suma al stick derecho: siempre, mientras aprietas L2 o mientras mantienes un botón. El touchpad da cuatro botones: clic, mitad izquierda, mitad derecha y dos dedos. Cada uno puede ser un botón de Xbox, una tecla o una macro, por juego. En Windows el touchpad también puede mover el mouse.",
          ],
        },
      },
    },

    "switch-pro-controller": {
      title: "Switch Pro Controller en PC, en cualquier juego | OpenController",
      description:
        "Usa el Switch Pro Controller en cualquier juego de PC como mando de Xbox, por USB o Bluetooth. Apunta con giroscopio, Capture como tecla o macro. Gratis en Windows y Linux.",
      sections: {
        layout: {
          title: "Distribución de los botones",
          body: [
            "Los botones siguen su posición, no su letra. El de abajo, B en una Switch, es la A de Xbox, y el de la derecha, A, es la B de Xbox. Para conservar las letras, cámbialos en \"Buttons\", por juego si quieres.",
          ],
        },
        "gyro-capture": {
          title: "Giroscopio, Capture y luces",
          body: [
            "El giroscopio se suma al stick derecho: siempre, mientras mantienes ZL o mientras mantienes un botón. Capture puede ser un botón de Xbox, una tecla o una macro. Las luces de jugador muestran el número de jugador, como en una Switch.",
          ],
        },
      },
    },

    "stadia-controller": {
      title: "Mando de Stadia en PC: úsalo en cualquier juego | OpenController",
      description:
        "Stadia cerró, pero su mando sigue funcionando. Úsalo en cualquier juego de PC como mando de Xbox, por USB o Bluetooth, en Windows y Linux. Gratis.",
      sections: {
        "after-stadia": {
          title: "Después de Stadia",
          body: [
            "Google cerró Stadia en enero de 2023, pero el mando sigue funcionando como un mando normal y no necesita nada de Google. La mayoría de los juegos de Windows solo leen mandos de Xbox, así que lo ignoran. OpenController lo lee y da a tus juegos un mando de Xbox 360 en su lugar.",
          ],
        },
        connect: {
          title: "USB o Bluetooth",
          body: [
            "Con el cable USB-C funciona al instante. Bluetooth solo funciona si el mando se pasó al modo Bluetooth con la herramienta que Google publicó cuando cerró Stadia. Si el tuyo no se pasó, usa el cable.",
          ],
        },
        buttons: {
          title: "Capture y Asistente",
          body: [
            "Los juegos no usan los botones Capture y Asistente. En Windows y Linux cada uno puede ser uno o varios botones de Xbox, una tecla o una macro, con un perfil por juego que se activa solo. En Mac funcionan como teclas.",
          ],
        },
        linux: {
          title: "En Linux",
          body: [
            "El script de instalación añade una regla para que la app pueda leer el mando sin root. Los juegos, Wine y Proton ven un mando de Xbox 360.",
          ],
        },
      },
    },

    "flydigi-vader": {
      title: "Flydigi Vader 5 Pro y 4 Pro en PC y Linux | OpenController",
      description:
        "Usa el Flydigi Vader 5 Pro, 4 Pro o un Vader más antiguo en cualquier juego de PC como mando de Xbox, con M1 a M4, C y Z asignados. Windows y Linux, gratis.",
      sections: {
        which: {
          title: "Qué Vader tienes",
          body: [
            "El Vader 4 Pro, 5 Pro y el Direwolf 4 se conectan por cable o receptor. Los Vader 2 y 3, más antiguos, usan su propio receptor antiguo. Todos aparecen en los juegos como un mando de Xbox 360.",
            "El Vader 5S es distinto. Es un mando con cable hecho para Xbox, y Windows lo lee como cualquier mando de Xbox, así que OpenController ve un Xbox Wireless Controller. Windows no pasa sus botones extra a otras apps. Asígnales botones de Xbox en Space Station for Xbox y funcionarán en todas partes como esos botones.",
          ],
        },
        "space-station": {
          title: "Botones extra y Space Station",
          body: [
            "M1 a M4, C, Z, LM y RM pueden ser cada uno uno o varios botones de Xbox, una tecla o una macro, con un perfil por juego que se activa solo.",
            'En el Vader 4 Pro, el 5 Pro y el Direwolf 4, activa "Allow third-party apps to take over mappings" en Flydigi Space Station, o las demás apps no pueden leer estos botones. La ventana de OpenController te lo recuerda cuando hace falta. Los Vader 2 y 3 con el receptor antiguo no lo necesitan.',
          ],
        },
        linux: {
          title: "En Linux",
          body: [
            "El script de instalación añade una regla para que la app pueda leer el Vader sin root. Los juegos, Wine y Proton ven un mando de Xbox 360, y los botones extra funcionan como en Windows, con el mismo aviso de Space Station en los mandos más nuevos.",
          ],
        },
      },
    },
  },

  changelog: {
    metaTitle: "Novedades de OpenController | Notas de versión",
    description: "Todas las versiones de OpenController, de la más nueva a la más antigua: qué cambió y si tus ajustes se conservan.",
    title: "Novedades",
    intro: "La app busca una versión nueva al abrir su ventana y se actualiza sin reinstalar.",
    notesInEnglish: "Las notas de cada versión están escritas en inglés.",
    feed: "Todas las versiones",
    rss: "Seguir por RSS",
    latest: "La {version} salió el {date}.",
    first: "Esas son todas las versiones desde la primera, la {version}, del {date}.",
    offline: "GitHub no respondió ahora mismo.",
    offlineLink: "Las notas también están en la <a>página de versiones</a>.",
    day: (day, month) => `${day} ${month.toLowerCase()}`,
    labels: {
      count: { one: "{n} versión", other: "{n} versiones" },
      monthNav: "Ir al mes",
      jumpTo: "Ir a {month}",
      scroller: "Notas de versión",
      source: "En GitHub",
    },
  },
};

export default guides;
