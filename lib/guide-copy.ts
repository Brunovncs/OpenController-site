import type { L } from "./i18n";

/**
 * Hand-written copy for the controller pages people already search for, on top of what
 * guides.ts generates for every family. Facts here must match the app's README and CHANGELOG.
 */
export type GuideCopy = {
  /** The whole <title>, written for what people type in the search box. */
  title: L;
  description: L;
  sections: { id: string; title: L; body: L[] }[];
};

export const GUIDE_COPY: Record<string, GuideCopy> = {
  "stadia-controller": {
    title: {
      en: "Stadia controller on PC: use it in any game | OpenController",
      pt: "Controle do Stadia no PC: use em qualquer jogo | OpenController",
    },
    description: {
      en: "Stadia is gone, but its controller still works. Use it in any PC game as an Xbox controller, over USB or Bluetooth, on Windows and Linux. Free.",
      pt: "O Stadia acabou, mas o controle continua funcionando. Use em qualquer jogo de PC como controle de Xbox, por USB ou Bluetooth, no Windows e no Linux. Grátis.",
    },
    sections: [
      {
        id: "after-stadia",
        title: { en: "Nothing to download from Google", pt: "Nada para baixar do Google" },
        body: [
          {
            en: "Google closed Stadia in January 2023. The controller still works as a normal gamepad, and there is nothing from Google to install. The catch is that most Windows games only read Xbox controllers, so they ignore it.",
            pt: "O Google fechou o Stadia em janeiro de 2023. O controle continua funcionando como um controle comum, e não há nada do Google para instalar. O problema é que a maioria dos jogos de Windows só lê controle de Xbox, então ignora ele.",
          },
          {
            en: "OpenController sits in the middle. It reads the Stadia controller and hands your games an Xbox 360 controller, so it works in games that never heard of Stadia.",
            pt: "O OpenController fica no meio. Ele lê o controle do Stadia e entrega aos jogos um controle de Xbox 360, então funciona até em jogo que nunca ouviu falar do Stadia.",
          },
        ],
      },
      {
        id: "connect",
        title: { en: "USB or Bluetooth", pt: "USB ou Bluetooth" },
        body: [
          {
            en: "With the USB-C cable it works right away. Bluetooth works too, as long as the controller was switched to Bluetooth mode with the tool Google released when Stadia closed. If yours never was, use the cable.",
            pt: "Com o cabo USB-C funciona na hora. Pelo Bluetooth também, desde que o controle tenha sido passado para o modo Bluetooth com a ferramenta que o Google lançou quando o Stadia fechou. Se o seu nunca foi, use o cabo.",
          },
        ],
      },
      {
        id: "buttons",
        title: { en: "Capture and Assistant", pt: "Capture e Assistente" },
        body: [
          {
            en: "Games have no use for the Capture and Assistant buttons, so OpenController gives them to you. On Windows and Linux each one can become one or several Xbox buttons, a key or a macro, with a profile per game that turns on by itself. On a Mac they work as keys.",
            pt: "Os jogos não usam os botões Capture e Assistente, então o OpenController deixa eles com você. No Windows e no Linux, cada um pode virar um ou vários botões de Xbox, uma tecla ou uma macro, com um perfil por jogo que entra sozinho. No Mac, eles funcionam como teclas.",
          },
        ],
      },
      {
        id: "linux",
        title: { en: "On Linux", pt: "No Linux" },
        body: [
          {
            en: "It works the same way. The install script adds a rule that lets the app read the controller without root, and games, Wine and Proton see an Xbox 360 controller.",
            pt: "Funciona do mesmo jeito. O script de instalação adiciona uma regra que deixa o app ler o controle sem root, e os jogos, o Wine e o Proton veem um controle de Xbox 360.",
          },
        ],
      },
    ],
  },

  "flydigi-vader": {
    title: {
      en: "Flydigi Vader 5 Pro and 4 Pro on PC and Linux | OpenController",
      pt: "Flydigi Vader 5 Pro e 4 Pro no PC e no Linux | OpenController",
    },
    description: {
      en: "Use the Flydigi Vader 5 Pro, 4 Pro, 5S or an older Vader in any PC game as an Xbox controller, with M1 to M4, C and Z mapped. Windows and Linux, free.",
      pt: "Use o Flydigi Vader 5 Pro, 4 Pro, 5S ou um Vader antigo em qualquer jogo de PC como controle de Xbox, com M1 a M4, C e Z. Windows e Linux, grátis.",
    },
    sections: [
      {
        id: "which",
        title: { en: "Which Vader you have", pt: "Qual Vader você tem" },
        body: [
          {
            en: "The Vader 4 Pro, 5 Pro and 5S, and the Direwolf 4, connect by cable or by their receiver. The older Vader 2 and 3 connect through their own older receiver. All of them show up in games as an Xbox 360 controller. What changes between them is how the extra buttons are read.",
            pt: "O Vader 4 Pro, 5 Pro e 5S, e o Direwolf 4, conectam pelo cabo ou pelo receptor. Os Vader 2 e 3, mais antigos, conectam pelo receptor antigo deles. Todos aparecem nos jogos como um controle de Xbox 360. O que muda entre eles é como os botões extras são lidos.",
          },
        ],
      },
      {
        id: "space-station",
        title: { en: "Extra buttons and Space Station", pt: "Botões extras e o Space Station" },
        body: [
          {
            en: "M1 to M4, C, Z, LM and RM can each become one or several Xbox buttons, a key or a macro, with a profile per game that turns on by itself.",
            pt: "M1 a M4, C, Z, LM e RM podem virar um ou vários botões de Xbox, uma tecla ou uma macro, com um perfil por jogo que entra sozinho.",
          },
          {
            en: "On the Vader 4 Pro and newer, Flydigi's own app has to let other programs read them. Turn on \"Allow third-party apps to take over mappings\" in Flydigi Space Station, and OpenController's window reminds you when it's needed. The Vader 2 and 3 on the old receiver don't need it.",
            pt: "No Vader 4 Pro e nos mais novos, o próprio app da Flydigi precisa deixar outros programas lerem esses botões. Ligue \"Allow third-party apps to take over mappings\" no Flydigi Space Station, e a janela do OpenController avisa quando isso é preciso. Os Vader 2 e 3 no receptor antigo não precisam.",
          },
        ],
      },
      {
        id: "linux",
        title: { en: "On Linux", pt: "No Linux" },
        body: [
          {
            en: "OpenController runs on Linux too. The install script adds a rule that lets it read the Vader without root, and games, Wine and Proton see an Xbox 360 controller. The extra buttons work as on Windows, and the window shows the same Space Station note for the newer pads.",
            pt: "O OpenController também roda no Linux. O script de instalação adiciona uma regra que deixa ele ler o Vader sem root, e os jogos, o Wine e o Proton veem um controle de Xbox 360. Os botões extras funcionam como no Windows, e a janela mostra o mesmo aviso do Space Station nos controles mais novos.",
          },
        ],
      },
    ],
  },
};
