import type { HelpMessages } from "../en/help";

const help: HelpMessages = {
  index: {
    title: "Ayuda",
    metaTitle: "Ayuda con mandos en juegos de PC | OpenController",
    description: "Respuestas a los problemas habituales con mandos en PC: mando de PS5 o PS4, mandos de Switch, juegos que ignoran tu mando, drift y apuntar con giroscopio.",
    lead: "Respuestas cortas a los problemas más comunes con mandos en PC.",
  },
  ui: {
    home: "Inicio",
    help: "Ayuda",
    answer: "En resumen",
    steps: "Paso a paso",
    related: "Relacionado",
    download: "Descargar OpenController",
    test: "Prueba tu mando",
    free: "Gratis y de código abierto, para Windows, Linux y Mac.",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "Usar un mando de PS5 en PC",
      metaTitle: "Cómo usar el mando de PS5 (DualSense) en PC",
      description: "Conecta un DualSense por cable o Bluetooth y juega con él a cualquier juego de PC, incluso a los que solo conocen el mando de Xbox.",
      answer:
        "Windows reconoce el DualSense, pero muchos juegos solo entienden mandos de Xbox. OpenController muestra tu DualSense a los juegos como un mando de Xbox, así que funciona en todos, y conserva los extras: giroscopio, touchpad y el botón de micrófono.",
      steps: [
        "<download>Descarga OpenController</download> y ábrelo. En Windows, su página \"Requirements\" instala los dos drivers gratuitos que necesita.",
        "Conecta el DualSense con un cable USB, o emparéjalo por Bluetooth: mantén Create y el botón PS hasta que la luz parpadee, y luego añádelo en la configuración de Bluetooth de Windows.",
        "Aparece en la ventana con un número de jugador. Abre tu juego y juega.",
      ],
      sections: [
        {
          h: "Gatillos adaptativos y vibración háptica",
          p: [
            "Los juegos ven un mando de Xbox, así que no pueden usar los gatillos adaptativos. \"Native mode\", en la página del mando, devuelve el DualSense real a los juegos que lo admiten, con sus gatillos y, por cable, la vibración háptica. O bien \"Controller Lab\" da a los gatillos efectos propios en cualquier juego: resistencia, vibración o un clic. Hace lo mismo con los Flydigi Apex 3, 4 y 5, cuyos gatillos también ofrecen resistencia.",
          ],
        },
        {
          h: "Giroscopio, touchpad y micrófono",
          p: [
            "Girar el mando puede apuntar: siempre, al apuntar o mientras mantienes un botón. El touchpad y el botón de micrófono pueden pulsar botones de Xbox, teclas o macros. En Windows el touchpad también puede mover el mouse, y el botón de micrófono puede silenciar el micrófono del PC.",
          ],
        },
        {
          h: "Juegos de Steam",
          p: [
            "Si Steam Input está activado para los mandos de PlayStation, Steam también lee el DualSense y una pulsación puede contar dos veces. Desactiva la compatibilidad con PlayStation en la configuración de mandos de Steam.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "Usar un mando de PS4 en PC",
      metaTitle: "Cómo usar el mando de PS4 (DualShock 4) en PC",
      description: "Juega en PC con un DualShock 4 por cable, Bluetooth o el adaptador inalámbrico de Sony, con la barra de luz mostrando tu jugador.",
      answer:
        "Muchos juegos de PC no leen el mando de PS4. OpenController se lo muestra como un mando de Xbox, por cable, Bluetooth o el adaptador inalámbrico de Sony, y su barra de luz muestra tu número de jugador.",
      steps: [
        "<download>Descarga OpenController</download> y ábrelo. En Windows, su página \"Requirements\" instala los dos drivers gratuitos que necesita.",
        "Conecta el DualShock 4 con un cable USB, o emparéjalo por Bluetooth: mantén Share y el botón PS hasta que la luz parpadee, y luego añádelo en la configuración de Bluetooth de Windows.",
        "Su luz toma el color de su jugador. Abre tu juego y juega.",
      ],
      sections: [
        {
          h: "Touchpad y giroscopio",
          p: [
            "Además del clic, el touchpad da tres botones: su mitad izquierda, su mitad derecha y dos dedos. Cada uno puede pulsar un botón de Xbox, una tecla o una macro. Girar el mando puede apuntar, como un mouse en la mano.",
          ],
        },
        {
          h: "Barra de luz",
          p: [
            "La luz muestra el color del jugador, como en una PlayStation, un color que elijas o la batería de verde a rojo. Parpadea cuando queda poca batería.",
          ],
        },
        {
          h: "Si vienes de DS4Windows",
          p: ["DS4Windows hizo esto durante años y ya no se mantiene. <ds4windows>Esto es lo que cambia</ds4windows> si te pasas a OpenController."],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "Usar un Switch Pro Controller o Joy-Con en PC",
      metaTitle: "Cómo usar el Switch Pro Controller o los Joy-Con en PC",
      description: "Juega en PC con un Switch Pro Controller o con Joy-Con, en pareja o de lado, con los botones donde los esperas.",
      answer:
        "OpenController hace que el Switch Pro Controller y los Joy-Con funcionen en los juegos de PC como mandos de Xbox. Una pareja de Joy-Con juega como un solo mando, o como dos, uno para cada amigo, sujetos de lado.",
      steps: [
        "<download>Descarga OpenController</download> y ábrelo. En Windows, su página \"Requirements\" instala los dos drivers gratuitos que necesita.",
        "Empareja el mando por Bluetooth: mantén su pequeño botón de sincronización hasta que las luces se muevan, y luego añádelo en la configuración de Bluetooth de Windows. El Pro Controller también funciona con un cable USB.",
        "Aparece en la ventana con un número de jugador. Abre tu juego y juega.",
      ],
      sections: [
        {
          h: "¿A o B?",
          p: [
            "Los botones siguen su posición, así que el de abajo es la A en los juegos, como en un mando de Xbox. Para usar las letras tal como están impresas, activa \"Use the controller's letters\" en \"All buttons\", en la página del mando.",
          ],
        },
        {
          h: "Dos jugadores con una pareja",
          p: [
            "En la página de la pareja, \"Split Joy-Cons\" convierte cada Joy-Con en un mando propio, sujeto de lado: stick a la izquierda, botones a la derecha, SL y SR como bumpers. \"Join Joy-Cons\" los vuelve a juntar. Es experimental, en Windows y Linux.",
          ],
        },
        {
          h: "Giroscopio y Capture",
          p: ["Los dos tienen giroscopio, así que girar el mando puede apuntar. El botón Capture puede pulsar un botón de Xbox, una tecla o una macro."],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "El mando funciona en los menús pero no en el juego",
      metaTitle: "El mando funciona en el menú pero no en el juego en PC: solución",
      description: "Tu mando mueve los menús de Steam o Windows, pero no hace nada en el juego. Por qué pasa y cómo arreglarlo.",
      answer:
        "Normalmente significa que el juego solo lee mandos de Xbox, mientras que Windows y el launcher leen el tuyo sin problema. OpenController muestra tu mando a los juegos como un mando de Xbox, y eso lo arregla en la mayoría de los juegos.",
      sections: [
        {
          h: "Por qué pasa",
          p: [
            "Windows tiene más de una forma de que los programas lean mandos. Los launchers y los menús suelen usar una que ve cualquier mando. Muchos juegos solo usan XInput, que solo ve mandos de Xbox, así que un mando de PlayStation, Switch o genérico es invisible para ellos.",
          ],
        },
        {
          h: "La solución",
          p: [
            "<download>Descarga OpenController</download>, ábrelo y conecta tu mando. Cuando aparece con un número de jugador, los juegos lo ven como un mando de Xbox. Reinicia el juego si ya estaba abierto.",
          ],
        },
        {
          h: "Si las pulsaciones cuentan dos veces",
          p: [
            "Steam Input o el juego pueden seguir leyendo el mando original junto al de Xbox. HidHide, que se ofrece en la página \"Requirements\", oculta los originales a los juegos: reinicia el juego después de instalarlo. Con Steam, desactiva la compatibilidad con PlayStation o Switch en su configuración de mandos.",
          ],
        },
        {
          h: "Sigue sin funcionar",
          p: [
            "Algunos juegos solo escuchan al primer mando. Arrastra la ficha de tu mando sobre la del Jugador 1 para intercambiarlos. Las teclas y macros de los botones extra no llegan a los juegos ejecutados como administrador.",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "El PC no reconoce el mando",
      metaTitle: "¿El PC no reconoce tu mando? Revisa esto primero",
      description: "Qué revisar cuando el PC no ve tu mando, y cómo hacer que un mando genérico o desconocido funcione en los juegos.",
      answer:
        "Primero mira si el PC lo lee: <test>la prueba de nuestra página principal</test> muestra cualquier mando en segundos y dice qué es. Si aparece ahí, el PC lo ve, y OpenController puede hacer que los juegos también lo vean.",
      sections: [
        {
          h: "Revisa lo básico",
          p: [
            "Prueba otro cable: algunos solo cargan. Conéctalo directamente al PC, no a un hub. Por Bluetooth, pon el mando en modo de emparejamiento y añádelo en la configuración de Windows. En los 8BitDo y similares, revisa el interruptor de modo: en modo XInput los botones extra y el giroscopio quedan ocultos.",
          ],
        },
        {
          h: "Mandos genéricos y desconocidos",
          p: [
            "La mayoría de los mandos genéricos copian el chip de un mando de Xbox, PlayStation o Switch y funcionan como él. Si OpenController no puede leer los botones del tuyo, su página ofrece \"Map the buttons\": ilumina cada parte en el dibujo y tú la pulsas. Después funciona como un mando de Xbox.",
          ],
        },
        {
          h: "Pide que lo añadan",
          p: ["\"Report a problem\", en la página \"Information\" del mando, envía sus datos para que se pueda añadir. También puedes <contact>escribirnos</contact>."],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "Una alternativa a DS4Windows",
      metaTitle: "Alternativa a DS4Windows: gratis, de código abierto y mantenida",
      description: "DS4Windows ya no se mantiene. OpenController hace lo mismo con los mandos de PlayStation y además cubre Switch, 8BitDo y cientos más.",
      answer:
        "DS4Windows ya no se mantiene, y las descargas con su nombre ahora vienen de sitios que no son de sus autores. OpenController es una app gratuita y de código abierto que hace lo mismo con los mandos de PlayStation y además cubre Switch, 8BitDo y cientos más.",
      sections: [
        {
          h: "Lo que se mantiene",
          p: [
            "Tu DualShock 4 o DualSense se convierte en un mando de Xbox en los juegos, varios a la vez, cada uno con su número de jugador en la luz. Apuntar con giroscopio, el touchpad como botones, el color y la batería en la barra de luz, y perfiles que cambian según el juego en primer plano: todo está ahí. Usa los mismos drivers gratuitos, ViGEmBus y HidHide.",
          ],
        },
        {
          h: "Lo que cambia",
          p: [
            "Lee los mandos con SDL, así que no se limita a los de PlayStation. Funciona en Windows, Linux y Mac, donde añade botones y luces pero no mandos virtuales. Mostrar a los juegos un DualShock 4 en lugar de un mando de Xbox existe en Windows, como opción experimental.",
          ],
        },
        {
          h: "Cómo cambiar",
          p: [
            "Cierra DS4Windows primero, para que los dos no creen un mando virtual para el mismo mando. Si DS4Windows instaló ViGEmBus y HidHide, OpenController los usa tal como están.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "Apuntar con giroscopio en PC",
      metaTitle: "Apuntar con giroscopio en PC con un mando de PlayStation o Switch",
      description: "Apunta girando tu mando en cualquier juego de PC, con un DualSense, DualShock 4, Switch Pro, Joy-Con o Steam Deck.",
      answer:
        "Con OpenController, un mando con giroscopio puede apuntar en cualquier juego de PC: girarlo mueve el stick derecho. Eso incluye el DualSense, el DualShock 4, el Switch Pro Controller, los Joy-Con, la Steam Deck y los mandos 8BitDo en modo D-input.",
      steps: [
        "<download>Descarga OpenController</download>, ábrelo y conecta el mando.",
        "En su página, abre \"Motion\" y elige cuándo apunta el giroscopio: siempre, mientras aprietas el gatillo izquierdo o mientras mantienes un botón.",
        "Sube o baja la sensibilidad hasta que un giro rápido de muñeca dé el giro que quieres.",
      ],
      sections: [
        {
          h: "Ajuste fino",
          p: [
            "Apuntar puede tener su propia sensibilidad, arriba y abajo puede ser más lento que a los lados, y un botón puede pausar el giroscopio mientras recolocas el mando. En \"Advanced\", la aceleración hace que los giros rápidos lleguen más lejos y la estabilización calma una mano temblorosa.",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "En Windows, el Flick Stick de \"Controller Lab\" gira la cámara con el stick derecho como lo haría un mouse, con el giroscopio para la puntería fina. Configúralo por juego, con la aceleración del mouse del juego desactivada.",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "Arreglar el drift del stick en PC",
      metaTitle: "Cómo arreglar el drift del stick del mando en PC, en todos los juegos",
      description: "Mide un stick con drift, recéntralo y ajusta una zona muerta del tamaño justo, una sola vez, para todos los juegos de PC.",
      answer:
        "Un stick gastado que se mueve solo muchas veces se arregla por software: OpenController mide dónde reposa, lo toma como centro y ajusta una zona muerta del tamaño justo para ocultar el drift, en todos los juegos.",
      steps: [
        "<download>Descarga OpenController</download>, ábrelo y conecta el mando.",
        "En su página, abre \"Sticks\" y haz clic en \"Measure\". Deja el stick quieto y luego gíralo por todo el borde.",
        "El centro, la zona muerta y la inclinación máxima se ajustan según lo que midió. El dibujo muestra lo que reciben los juegos.",
      ],
      sections: [
        {
          h: "Los ajustes",
          p: [
            "La zona muerta ignora los movimientos pequeños cerca del centro. La anti zona muerta hace que los juegos reaccionen al primer movimiento fuera de ella. La inclinación máxima cuenta como empujado hasta el fondo un stick que ya no llega al borde.",
          ],
        },
        {
          h: "Cuando es el hardware",
          p: [
            "Si el drift es grande, una zona muerta que lo oculte también se traga movimientos pequeños reales, y el stick necesita limpieza o cambio. Para un botón gastado que pulsa dos veces, el filtro de botones de \"Controller Lab\" ignora la doble pulsación.",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
