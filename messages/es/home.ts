import type { HomeMessages } from "../en/home";

const home: HomeMessages = {
  meta: {
    title: "OpenController: usa cualquier mando en juegos de PC, gratis",
    description:
      "Usa tu mando de PlayStation, Switch, 8BitDo y cientos más en juegos de PC, solo o con amigos. Gratis y de código abierto para Windows, Linux y Mac.",
    features: [
      "Mandos de PlayStation, Switch, 8BitDo y otros aparecen en los juegos como un mando de Xbox 360",
      "Varios mandos a la vez, cada uno con su propio número de jugador",
      "Cualquier botón como uno o varios botones, una tecla o una macro, con perfiles por juego",
      "Apuntar con giroscopio",
      "Zona muerta, curva de respuesta y corrección de drift de los sticks",
      "Luz y batería del mando",
    ],
  },

  hero: {
    tagline: "Tu mando en todos los juegos de PC.",
    lead: "Usa mandos de PlayStation, Switch, 8BitDo y otros en tus juegos de PC, solo o con amigos.",
    test: "Prueba tu mando",
    video: "La app OpenController mostrando un DualSense, dos Joy-Con, un joystick de vuelo y un volante mientras alguien juega, y después los cinco a la vez.",
    caption: "La app muestra cada pulsación en un dibujo de tu mando.",
    facts: [
      { k: "Funciona en", v: "Windows, Linux y Mac" },
      { k: "Compatible con", v: "Cientos de mandos" },
      { k: "Cuesta", v: "Nada. Es de código abierto" },
      { k: "Envía", v: "Nada sobre ti" },
    ],
  },

  check: {
    label: "Prueba tu mando",
    title: "Prueba tu mando aquí.",
    body: "Antes de descargar, mira si OpenController reconoce tu mando. Conéctalo y pulsa un botón.",
  },

  features: {
    label: "Qué hace",
    title: "Conecta y juega.",
    body: "La mayoría de los juegos de PC están hechos para el mando de Xbox. OpenController hace que el tuyo también funcione en ellos.",
    games: {
      title: "Funciona en tus juegos",
      body: "Botones, sticks, gatillos y vibración funcionan como esperas. Los mandos de Xbox ya funcionan, así que no los toca. Si un juego admite tu mando tal como es, activa \"Native mode\" y el juego ve el mando real.",
      steps: ["Conecta tu mando", "Abre un juego", "Juega"],
    },
    friends: {
      title: "Juega con amigos",
      body: "Cada mando es un jugador, y sigue siendo el mismo jugador si se desconecta un momento.",
      hint: "Pruébalo: arrastra uno sobre otro para cambiar jugadores, o toca dos.",
    },
    custom: {
      title: "A tu manera",
      body: "Cambia lo que hace cualquier botón, apunta con el giroscopio, corrige un stick con drift y guarda una configuración para cada juego que se activa sola al abrirlo. \"Controller Lab\" añade efectos en los gatillos del DualSense y, en Windows, Flick Stick y el touchpad como mouse. En Windows, el botón de micrófono del DualSense también puede silenciar el PC. Nada de esto hace falta para jugar.",
      setups: { default: "Predeterminado", racing: "Juego de carreras", shooter: "Shooter" },
      inUse: "en uso",
    },
    updates: {
      title: "Siempre al día",
      body: "La app te avisa cuando sale una versión nueva. En Windows, un clic la instala y conserva tus ajustes.",
      notice: "Hay una versión nueva.",
      button: "Actualizar ahora",
    },
  },

  swap: {
    players: "Jugadores",
    player: "Jugador {n}",
    pad: "{name}, jugador {n}",
    receiver: "Receptor",
    swapped: "{a} ahora es el jugador {i}, {b} es el jugador {j}.",
  },

  performance: {
    label: "Rendimiento",
    title: "Casi nada en segundo plano.",
    body: "La ventana solo se ejecuta mientras está abierta. Al cerrarla, solo queda la parte que hace funcionar tus mandos.",
    memory: "Memoria en uso",
    note: "Medido en la versión 0.8.0 y Windows 11 con el Administrador de tareas, sin ningún mando conectado. Con la ventana abierta usó entre 30 y 35 MB.",
    games: "En tus juegos",
    measures: [
      { k: "Retraso que añade a tu mando", v: "Normalmente menos de un milisegundo" },
      { k: "Procesador, sin ningún mando conectado", v: "0 %" },
    ],
    bars: {
      summary: "Hasta {closed} MB con la ventana cerrada, unos {open} MB con ella abierta.",
      open: "Ventana abierta: {n} MB",
      closed: "<b>Hasta {n} MB</b> con la ventana cerrada.",
    },
  },

  controllers: {
    label: "Mandos",
    title: "Busca tu mando.",
    body: "Busca el tuyo para ver qué funciona. La mayoría de los mandos funcionan aunque no estén en la lista. Si el tuyo da problemas, <a>avísanos</a>.",
  },

  platforms: {
    label: "Sistemas",
    title: "Descarga para Windows, Linux o Mac.",
    body: "La misma app en los tres. Mac ya gestiona los mandos por su cuenta, así que ahí hace menos.",
    caption: "Qué funciona en cada sistema",
    feature: "Función",
    yes: "Sí",
    no: "No",
    rows: {
      games: { label: "Funciona en tus juegos", mac: "Integrado en macOS" },
      players: { label: "Cada amigo sigue siendo el mismo jugador", mac: "" },
      remap: { label: "Botones reasignados y una configuración por juego", mac: "Botones extra como teclas" },
      light: { label: "Luz y batería del mando", mac: "" },
    },
    windows: {
      title: "Windows 10, 11",
      body: [
        "Para PC x64 y ARM. Se instala sin permisos de administrador y se actualiza sin reinstalar. Un clic instala los dos drivers gratuitos que necesita.",
        "HidHide, el driver que oculta el mando original, aún no tiene versión para ARM. En un PC ARM, un juego que también lea el original puede verlo dos veces.",
        "El instalador aún no está firmado, así que la primera vez Windows puede mostrar “Windows protegió su PC”. Haz clic en Más información y luego en Ejecutar de todas formas.",
      ],
    },
    linux: {
      title: "Linux",
      body: [
        "Para x64 y ARM, en Ubuntu 22.04, Debian 12, Fedora 36 o más nuevos, o cualquier distribución con glibc 2.35 o posterior. Funciona con juegos nativos y con Proton o Wine.",
        "El instalador pide tu contraseña una vez para dar a la app acceso a tus mandos. En una Steam Deck, primero crea una contraseña ejecutando passwd en Konsole.",
      ],
    },
    mac: {
      title: "macOS 13+",
      body: [
        "Una sola app para Mac con Apple silicon o Intel. En Mac, los juegos ya funcionan con mandos de PlayStation, Xbox y Switch Pro, y macOS no deja que las apps añadan mandos.",
        "Así que añade lo que falta: botones extra como teclas, la luz del mando, la batería y una configuración para cada juego. Las teclas necesitan el permiso de Accesibilidad, que la ventana te pide.",
        "macOS la bloquea la primera vez. Ábrela una vez, luego ve a Ajustes del Sistema, Privacidad y seguridad, y haz clic en Abrir igualmente.",
      ],
    },
  },

  download: {
    for: "Descargar para {os}",
    any: "Descargar para Windows, Linux o Mac",
    github: "Descargar desde GitHub",
    githubDown: "GitHub no respondió ahora mismo. La página de versiones tiene todas las compilaciones.",
    missing: "No hay versión para {os} en {version}",
    build: "Compílalo tú mismo",
    releases: "Todas las versiones",
    whatsNew: "Novedades",
    phone: "OpenController funciona en una computadora. Abre esta página ahí para obtener la descarga correcta.",
    platforms: {
      "windows-x64": { name: "Windows", ask: "¿PC con Intel o AMD?" },
      "windows-arm64": { name: "Windows en ARM", ask: "¿PC con ARM?" },
      "linux-x64": { name: "Linux", ask: "¿Equipo con Intel o AMD?" },
      "linux-arm64": { name: "Linux en ARM", ask: "¿Equipo con ARM?" },
      "macos-universal": { name: "Mac", ask: "¿Mac?" },
      "macos-arm64": { name: "Mac, Apple silicon", ask: "¿Mac con Apple silicon?" },
      "macos-x64": { name: "Mac, Intel", ask: "¿Mac con Intel?" },
    },
  },

  faq: {
    label: "Preguntas",
    title: "Preguntas frecuentes.",
    side: "¿Otra pregunta, o un mando que no funciona bien? <a>Escríbenos</a>.",
    search: "Buscar en las preguntas",
    clear: "Borrar búsqueda",
    placeholder: "Prueba Linux, macro o actualizar",
    count: { one: "{n} pregunta", other: "{n} preguntas" },
    none: "Ninguna pregunta menciona “{q}”.",
    ask: "<a>Pregúntanos directamente</a>.",
    items: [
      {
        id: "free",
        q: "¿Es gratis?",
        a: "Sí. Es de código abierto, y los drivers que usa en Windows también son gratuitos.",
      },
      {
        id: "how",
        q: "¿Cómo funciona?",
        a: "Cada uno de tus mandos aparece en los juegos como un mando de Xbox 360 con su propio número de jugador, y el original se oculta para que el juego no lo vea dos veces. En Windows usa dos drivers gratuitos, ViGEmBus y HidHide. En Linux usa una función del propio sistema.",
      },
      {
        id: "data",
        q: "¿Envía algún dato mío?",
        a: "Nada sobre ti: sin cuenta, sin rastreo. Al abrir la ventana consulta GitHub para ver si hay una versión nueva, algo que puedes desactivar en \"Settings\", en \"Check for updates\". En Windows también descarga las actualizaciones y los drivers que decidas instalar.",
      },
      {
        id: "dataReports",
        q: "¿Envía algún dato mío?",
        a: "Nada sobre ti: sin cuenta, sin rastreo. Al abrir la ventana consulta GitHub para ver si hay una versión nueva, algo que puedes desactivar en \"Settings\", en \"Check for updates\". En Windows también descarga las actualizaciones y los drivers que decidas instalar. \"Report a problem\" envía solo los datos técnicos de ese mando, y puedes leerlos antes de enviarlos.",
      },
      {
        id: "languages",
        q: "¿En qué idiomas está la app?",
        a: "En inglés, portugués y chino simplificado. Elige uno en \"Settings\", en \"Language\".",
      },
      {
        id: "update",
        q: "¿Cómo actualizo?",
        a: "Cuando sale una versión nueva, la app muestra \"Update now\". En Windows instala la actualización y conserva tus ajustes. En Linux y Mac abre la página de descarga.",
      },
      {
        id: "steam",
        q: "¿Funciona con Steam?",
        a: "Sí. En la configuración de Steam, desactiva Steam Input para los mandos de PlayStation y Switch, o el juego puede recibir cada pulsación dos veces.",
      },
      {
        id: "icons",
        q: "¿Los juegos mostrarán los iconos de los botones de PlayStation?",
        a: "No por defecto, ya que los juegos ven un mando de Xbox. Si un juego admite tu mando, ábrelo en la app y activa \"Native mode\": el juego ve el mando real, con sus iconos, los gatillos adaptativos y, por cable, la vibración háptica. Los perfiles, apuntar con giroscopio y la reasignación se desactivan mientras está en modo nativo, y conviene cerrar el juego antes de cambiar. \"Native mode\" también permite usar la app junto con un DS5Dongle.",
      },
      {
        id: "remap",
        q: "¿Puedo reasignar botones para cada juego sin Steam?",
        a: "Sí, en Windows y Linux. En \"Buttons\", \"All buttons\", cualquier botón puede convertirse en otro, en varios a la vez, en una tecla o en una macro. Guárdalo en un perfil, añade el juego y se activa siempre que ese juego esté en primer plano.",
      },
      {
        id: "letters",
        q: "La A y la B de mi mando de Switch están cambiadas.",
        a: "Los juegos leen los botones por su posición, como en un mando de Xbox, así que la B de abajo es la A en los juegos. Para seguir las letras impresas, activa \"Use the controller's letters\" en \"Buttons\", \"All buttons\".",
      },
      {
        id: "drift",
        q: "Mi stick tiene drift, o ya no llega al borde.",
        a: "En Windows y Linux, abre tu mando, ve a \"Sticks\" y pulsa \"Measure the stick\". Ajusta el centro, la zona muerta y la inclinación máxima según cómo se mueve el stick de verdad, y también puedes ajustarlos tú mismo para cada stick.",
      },
      {
        id: "joycons",
        q: "¿Puede cada Joy-Con ser un mando por separado?",
        a: "Sí, en Windows y Linux. Abre la pareja y pulsa \"Split Joy-Cons\": cada uno se convierte en un mando que se sujeta de lado, así dos personas pueden jugar con una sola pareja. \"Join Joy-Cons\" los vuelve a juntar. Es experimental.",
      },
      {
        id: "gyro",
        q: "¿Pueden los juegos usar el giroscopio de mi mando?",
        a: "Los juegos que solo conocen mandos de Xbox no pueden, pero OpenController puede apuntar con él, en \"Motion\". En Windows también puede mostrar tu mando a los juegos como un DualShock 4, en \"Information\", para que los juegos y Steam Input que leen movimiento reciban el giroscopio. Es experimental y está desactivado por defecto, porque entonces los juegos que solo conocen mandos de Xbox no lo ven. Emuladores como Cemu pueden leerlo desde \"Controller Lab\".",
      },
      {
        id: "sticks",
        q: "¿Funciona con joysticks de vuelo y volantes?",
        a: "Sí. Los deja como están, así que los juegos de vuelo y de carreras los leen directamente, con giro, acelerador y force feedback. Para usar un Logitech Extreme 3D Pro, o un Logitech G29 en Linux o Mac, en un juego de mando, ábrelo en la app y desactiva \"Native mode\". Para otros, envía sus datos desde la app.",
      },
      {
        id: "players",
        q: "¿Pueden jugar más de cuatro personas?",
        a: "La mayoría de los juegos de PC aceptan hasta cuatro mandos. Algunos más nuevos aceptan más, y la app te avisa cuando pasa. En Linux, los jugadores a partir del quinto también tienen su propio número.",
      },
      {
        id: "viiper",
        q: "Un juego no ve mi mando, o mi PC da pantallazos azules.",
        a: "En Windows, prueba VIIPER: cierra tus juegos y, en \"Settings\", en \"Advanced\", crea los mandos virtuales con VIIPER en lugar de ViGEmBus. Después, \"Requirements\" instala lo que necesita, y puede pedir permisos de administrador y un reinicio. Es experimental, y si no arranca, la app vuelve a ViGEmBus y te avisa.",
      },
      {
        id: "keys",
        q: "Un botón que asigné a una tecla no hace nada en mi juego.",
        a: "Algunos juegos ignoran las teclas de otros programas, sobre todo los que tienen anti-cheat, y Windows las bloquea en juegos ejecutados como administrador. Algunos juegos también prohíben las macros, así que revisa sus reglas antes.",
      },
      {
        id: "hidhide",
        q: "Se abre sola una ventana de HidHide.",
        a: "Es el instalador o el actualizador del propio HidHide, no OpenController. Después de una actualización reinicia Windows y se vuelve a abrir para terminar. Desde la 1.5 también añade un actualizador que arranca con Windows, que puedes desactivar en el Administrador de tareas, en Aplicaciones de arranque.",
      },
      {
        id: "name",
        q: "La app muestra mi mando con el nombre de otro.",
        a: "Algunos mandos copian el id USB de otro, como el Onikuma C1, que dice ser un Switch Pro Controller. Abre tu mando, ve a \"Information\" y elige el tuyo en \"Model\".",
      },
      {
        id: "offList",
        q: "Mi mando no está en la lista, o no funciona bien.",
        a: "La mayoría de los mandos funcionan aunque no estén en la lista, porque muchos dicen ser un mando de Xbox, PlayStation o Switch. Para que añadan o arreglen el tuyo, ábrelo en la app, ve a \"Information\" y pulsa \"Report a problem\". Envía lo necesario para darle soporte sin tenerlo en la mano.",
      },
      {
        id: "offListMapping",
        q: "Mi mando no está en la lista, o no funciona bien.",
        a: "La mayoría de los mandos funcionan aunque no estén en la lista, porque muchos dicen ser un mando de Xbox, PlayStation o Switch. Si la app no puede leer sus botones, su página muestra \"Map the buttons\": pulsa cada parte cuando te lo pida y funcionará como un mando de Xbox. Para que añadan o arreglen el tuyo para todos, ábrelo en la app, ve a \"Information\" y pulsa \"Report a problem\".",
      },
      {
        id: "finished",
        q: "¿Está terminado?",
        a: "Todavía no, está en beta. Puede que algunos mandos aún no funcionen bien y faltan algunas funciones. Si algo sale mal, <a>avísanos</a>.",
      },
    ],
  },

  contact: {
    label: "Contacto",
    title: "¿Algo no funciona? Cuéntanoslo.",
    body: "OpenController está en beta, y cada informe ayuda. Usa el formulario o abre una issue en GitHub.",
    report: {
      title: "Informar de un problema",
      body: "Dinos tu sistema, el mando y cómo está conectado, la versión de OpenController y qué pasó. Una captura de pantalla ayuda.",
      button: "Contáctanos",
      issue: "Abrir una issue",
    },
    ideas: {
      title: "Sugerencias y preguntas",
      body: "Una idea, un mando que te gustaría que funcionara o una pregunta: envíala por el mismo formulario.",
      button: "Enviar una sugerencia",
    },
    official: {
      title: "Sitio oficial",
      body: "<b>{domain}</b> es el único sitio oficial de OpenController. Descárgalo solo desde aquí o desde GitHub. Cualquier otro sitio que lo ofrezca no es nuestro.",
    },
  },

  contactForm: {
    title: "Contáctanos",
    intro: "Cuéntanos qué pasó o qué te gustaría ver. Leemos todos los mensajes.",
    kind: "Asunto",
    kinds: { problem: "Un problema", idea: "Una sugerencia", other: "Otra cosa" },
    system: "Sistema operativo",
    systemOther: "Otro",
    systemDetail: "Versión o distribución",
    systemDetailHint: "p. ej. 23H2, Ubuntu 24.04, Sonoma",
    version: "Versión de OpenController",
    versionHint: "Aparece arriba en su ventana",
    controller: "Mando",
    controllerHint: "El modelo exacto, p. ej. 8BitDo Ultimate 2 Wireless",
    connection: "Conectado por",
    connections: ["Cable", "Bluetooth", "Su receptor", "No estoy seguro"],
    choose: "Elige",
    message: { problem: "¿Qué pasó?", idea: "Tu sugerencia", other: "Tu mensaje" },
    messageHint: {
      problem: "Qué hiciste, qué esperabas y qué pasó en su lugar. Si hubo un mensaje de error, pégalo aquí.",
      idea: "¿Qué debería hacer OpenController, y cuándo te ayudaría?",
      other: "Escribe todo lo que necesites.",
    },
    email: "Tu email (opcional)",
    emailHint: "Solo si quieres respuesta. Se usa solo para contestarte.",
    send: "Enviar",
    close: "Cerrar",
    sentTitle: "Mensaje enviado. ¡Gracias!",
    sentBody: "Si dejaste tu email, la respuesta llegará ahí.",
    errors: {
      message: "Escribe un poco más, al menos una frase.",
      email: "Ese email no parece correcto.",
      rate: "Demasiados mensajes en poco tiempo. Vuelve a intentarlo en una hora.",
      other: "No se pudo enviar el mensaje ahora. Inténtalo de nuevo en un momento, o abre una issue en GitHub.",
    },
  },

  request: {
    title: "Pedir un mando",
    intro: "Dinos qué mando te gustaría ver en la lista. Los más usados van primero.",
    model: "Marca y modelo",
    modelHint: "Como se vende, p. ej. Redragon Darkflame G820",
    ids: "Leído por la prueba de mando",
    notes: "Algo más (opcional)",
    notesHint: "Dónde lo compraste, cómo lo conectas, qué no funciona.",
    email: "Tu email (opcional)",
    emailHint: "Solo para avisarte cuando se añada.",
    app: "¿Ya tienes OpenController? Puede enviar los datos del mando por ti: abre el mando, luego \"Information\" y luego \"Report a problem\".",
    send: "Enviar solicitud",
    close: "Cerrar",
    sentTitle: "Solicitud enviada. ¡Gracias!",
    sentBody: "Si dejaste tu email, te avisaremos cuando se añada.",
    errors: {
      model: "Escribe la marca y el modelo.",
      email: "Ese email no parece correcto.",
      rate: "Demasiadas solicitudes en poco tiempo. Vuelve a intentarlo en una hora.",
      other: "No se pudo enviar la solicitud ahora. Inténtalo de nuevo en un momento.",
    },
  },

  footer: {
    blurb: "Gratis y de código abierto. Juega en PC con el mando que ya tienes.",
    nav: "Proyecto",
    controllers: "Mandos",
    whatsNew: "Novedades",
    report: "Informar de un problema",
    contact: "Contáctanos",
    license: "Licencia MIT",
    notices: "Avisos de terceros",
    official: "OpenController solo se distribuye desde <a>{repo}</a> y {domain}. Otros sitios que usan el nombre no tienen relación con este proyecto.",
    source: "OpenController tiene licencia <license>MIT</license>. <source>Código en GitHub</source>. <bug>Informar de un error</bug>.",
    disclaimer:
      "Sin relación con Sony, Microsoft, Nintendo, Valve, 8BitDo ni ningún otro fabricante de mandos; sus nombres solo identifican hardware compatible. ViGEmBus, HidHide, DsHidMini y BthPS3 son de Nefarius Software Solutions y se descargan de sus páginas de versiones, no vienen incluidos. Úsalo bajo tu propio riesgo: los autores no se hacen responsables de baneos u otras sanciones, como por usar macros en juegos que las prohíben.",
    analytics: "Este sitio cuenta las visitas de forma anónima: sin cookies, sin guardar la dirección IP, nada que distinga a una persona de otra al día siguiente.",
    madeBy: "Hecho por <a>{name}</a>",
  },
};

export default home;
