import type { CheckMessages } from "../en/check";

const check: CheckMessages = {
  controllers: "Mandos",
  status: {
    example: "Ejemplo",
    idle: "Esperando un mando",
    known: "Reconocido",
    unknown: "Conectado, fuera de la lista",
    xinput: "Conectado como mando de Xbox",
    anon: "Conectado, modelo no indicado",
  },
  pressed: "Pulsado",
  extra: "· extra",
  pressExample: "Haz clic o toca los botones del dibujo.",
  pressIdle: "Los botones se iluminan aquí cuando los pulsas.",
  pressAny: "Pulsa cualquier botón, mueve los sticks, aprieta los gatillos.",
  idle: {
    title: "Conecta tu mando y pulsa cualquier botón.",
    body: "Por cable o Bluetooth. Verás su nombre y lo que OpenController puede hacer con él.",
    brave: "Brave oculta los mandos a los sitios web. Abre esta página en Chrome o Edge, o prueba un ejemplo abajo.",
    unsupported: "Este navegador no puede leer mandos. Abre esta página en Chrome o Edge, o prueba un ejemplo abajo.",
    helpTitle: "¿No aparece?",
    help: [
      "Haz clic en la página y pulsa un botón. Los navegadores solo muestran un mando después de una pulsación.",
      "Brave y algunos bloqueadores de anuncios ocultan los mandos. Usa Chrome o Edge, o desactiva el bloqueador en esta página.",
      "Primero empareja el mando Bluetooth en la configuración de tu sistema.",
      "Si OpenController está abierto con la ocultación activada, el navegador ve su mando de Xbox en lugar del tuyo. Ciérralo para probar el tuyo.",
    ],
  },
  verdict: {
    dinput: "Funciona en los juegos tal como está, en modo Xbox. Para usar sus botones extra y apuntar con movimiento, cámbialo al modo D-input, como se explica abajo.",
    unsupported: "Esta versión todavía no puede leerlo.",
    handheld: "Los juegos ya funcionan con el mando integrado. En Windows, OpenController también puede asignar sus botones extra.",
    passthrough: "Los juegos ya lo admiten, así que OpenController lo deja como está.",
    mac: "En Mac, los juegos ya funcionan con él. OpenController añade los botones extra, la luz y el nivel de batería.",
    works: "Funciona en tus juegos como un jugador propio y conserva ese número de jugador si se vuelve a conectar.",
  },
  copied: "¿El tuyo tiene otro nombre? Muchos mandos usan el chip del {name} y se presentan como él, así que el tuyo funciona igual.",
  lookalike: "Si es el {names}, elígelo en la app en \"Model\", en su página \"Information\".",
  caps: {
    extras: "Botones extra",
    motion: "Apuntar moviéndolo",
    light: "Barra de luz",
    touchpad: "Touchpad como botones",
    none: "Ninguno",
    yes: "Sí",
    no: "No",
    dinput: "Sí, en modo D-input",
    lightYes: "Color del jugador, el color que elijas o la batería",
    touchpadYes: "Sí, como botones extra",
  },
  mapping: "Tu navegador no conoce esta distribución, así que el dibujo puede iluminar botones equivocados. OpenController lee el mando directamente y no tiene ese problema.",
  seeFamily: "Ver todos los mandos como este",
  unknown: "Aún no está en nuestra lista, pero probablemente funcione. <a>Pide que lo añadamos</a> y los ids que acaba de leer tu navegador se envían con la solicitud.",
  xinput:
    "Funciona, y los juegos lo ven como un mando de Xbox. Windows no le dice al navegador el modelo exacto. Un 8BitDo o similar en modo Xbox oculta sus botones extra: cámbialo a D-input (en un 8BitDo, enciéndelo manteniendo B) o usa Bluetooth. Si OpenController está abierto, puede que este sea el mando de Xbox que muestra a los juegos.",
  anon: "Tu navegador no dijo qué mando es este. Safari nunca lo dice. Abre esta página en Chrome o Edge para ver los detalles.",
  tryOne: "¿No tienes un mando a mano? Prueba uno:",
};

export default check;
