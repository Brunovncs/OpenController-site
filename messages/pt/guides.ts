import type { GuideFacts, GuideNoun, GuidesMessages } from "../en/guides";

const pick = (n: GuideNoun, one: string, many: string) => (n.plural ? many : one);
const seu = (n: GuideNoun) => pick(n, "seu", "seus");

const guides: GuidesMessages = {
  names: {
    dualsense: { name: "DualSense" },
    "dualsense-edge": { name: "DualSense Edge" },
    "dualshock-4": { name: "DualShock 4" },
    "dualshock-3": { name: "DualShock 3" },
    "ps2-controller": { name: "controle de PS2" },
    "switch-pro-controller": { name: "Switch Pro Controller" },
    "joy-con": { name: "Joy-Con" },
    "switch-online-controllers": { name: "controles de SNES, N64 e Mega Drive do Switch Online", plural: true },
    "switch-2-controllers": { name: "controles do Switch 2", plural: true },
    "gamecube-controller": { name: "controle de GameCube" },
    "wii-remote": { name: "Wii Remote e Wii U Pro Controller", plural: true },
    "xbox-controller": { name: "controle de Xbox" },
    "xbox-elite": { name: "controle Xbox Elite" },
    "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2, Ultimate 3 e Pro 3", plural: true },
    "8bitdo-ultimate": { name: "8BitDo Ultimate" },
    "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C" },
    "8bitdo-pro-2": { name: "8BitDo Pro 2" },
    "8bitdo-sn30-pro": { name: "8BitDo SN30 Pro e controles retrô", plural: true },
    "steam-deck": { name: "controles do Steam Deck", plural: true },
    "steam-controller": { name: "Steam Controller" },
    "handheld-pc": { name: "controles de PC portátil", plural: true },
    "flydigi-vader": { name: "Flydigi Vader" },
    "flydigi-apex": { name: "Flydigi Apex" },
    "stadia-controller": { name: "controle do Stadia" },
    "luna-controller": { name: "controle do Amazon Luna" },
    "shield-controller": { name: "controle do NVIDIA Shield" },
    "generic-controllers": { name: "controles PowerA, Hori, Razer e outros", plural: true },
  },

  title: (n) => `${n.Name} no PC`,
  metaTitle: "{title} | OpenController",

  description: {
    xbox: (n: GuideNoun, f: GuideFacts) => {
      const motion = f.gyro === "yes" ? "mire com movimento" : f.gyro === "dinput" ? "mire com movimento no modo D-input" : "";
      const more = f.extras && motion ? ` Configure os botões extras e ${motion}.` : f.extras ? " Configure os botões extras." : motion ? ` ${motion.charAt(0).toUpperCase()}${motion.slice(1)}.` : "";
      return `Use ${seu(n)} ${n.name} em qualquer jogo de PC como controle de Xbox.${more} Grátis para Windows e Linux.`;
    },
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `Os jogos de PC já leem ${seu(n)} ${n.name}. O OpenController adiciona os botões extras como teclas e macros. Grátis.`
        : `Os jogos de PC já leem ${seu(n)} ${n.name}. O OpenController mantém o número de jogador ${pick(n, "dele", "deles")} junto dos seus outros controles. Grátis para Windows e Linux.`,
    unsupported: (n) => `${n.Name} ainda não ${pick(n, "funciona", "funcionam")} no OpenController. Veja quais controles funcionam.`,
  },

  intro: {
    xbox: (n) =>
      `Muitos jogos de PC só leem controle de Xbox. Com o OpenController aberto, ${seu(n)} ${n.name} ${pick(n, "aparece", "aparecem")} nos jogos como um controle de Xbox 360, e o original fica escondido para o jogo não ver o mesmo controle duas vezes.`,
    passthrough: (n, f) =>
      f.extras
        ? `Os jogos de PC já leem ${seu(n)} ${n.name}. O OpenController só adiciona os botões extras como teclas e macros.`
        : `Os jogos de PC já leem ${seu(n)} ${n.name}. O OpenController não mexe ${pick(n, "nele", "neles")}, só mantém o número de jogador ${pick(n, "dele", "deles")} quando os amigos entram com outros controles.`,
    unsupported: (n) => `O OpenController reconhece ${seu(n)} ${n.name}, mas ainda não consegue ${pick(n, "lê-lo", "lê-los")}.`,
  },

  steps: {
    download: "Baixe o OpenController e abra. No Windows, a página Requisitos instala com um clique os drivers gratuitos de que ele precisa.",
    connect: "Conecte o controle pelo cabo, Bluetooth ou receptor. Ele aparece na janela do OpenController, desenhado no próprio formato.",
    extras: "Clique nele para configurar os botões extras. Cada um pode ser um ou vários botões de Xbox, uma tecla ou uma macro, com um perfil por jogo se quiser.",
    gyro: "Para mirar movendo o controle, ligue em Movimento: sempre, ao mirar ou segurando um botão.",
    play: "Abra o jogo. Ele vê um controle de Xbox 360.",
    passthroughExtras: "Clique nele para configurar os botões extras como teclas ou macros. Os jogos continuam lendo o controle como antes.",
    passthrough: "Abra o jogo. Ele lê o controle como antes, agora com o número de jogador fixo.",
  },

  page: {
    breadcrumb: "Caminho",
    controllers: "Controles",
    test: "Teste seu controle",
    works: "O que funciona",
    setup: "Como configurar",
    steamTip: "Usa a Steam? Nas configurações dela, desligue o Steam Input para controles de PlayStation e Switch, senão o jogo pode receber cada botão duas vezes.",
    faq: "Mais respostas nas <a>perguntas frequentes</a>.",
    models: "Modelos ({n})",
    modelsIntro: "A maioria dos controles funciona mesmo fora desta lista.",
    missing: "Seu controle não está aqui ou funciona errado? <a>Avise a gente</a>.",
    more: "Outros controles",
    all: "Todos os controles",
  },

  index: {
    metaTitle: "Qualquer controle no PC: PlayStation, Switch, Stadia e mais | OpenController",
    description:
      "Use controles de PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo e PCs portáteis em qualquer jogo de PC como controle de Xbox. Veja o que funciona com o seu. Grátis.",
    title: "Controles que funcionam no PC com o OpenController",
    intro: "O OpenController conhece {n} modelos de controle, e a maioria dos outros funciona também. Escolha o seu ou <a>procure pelo nome</a>.",
    models: { one: "1 modelo", other: "{n} modelos" },
  },

  links: { title: "Como usar cada controle no PC" },

  copy: {
    dualsense: {
      title: "Controle de PS5 (DualSense) no PC em qualquer jogo | OpenController",
      description:
        "Use o DualSense do PS5 em qualquer jogo de PC como controle de Xbox, por USB ou Bluetooth. Mira com giroscópio, touchpad como botões, barra de luz. Grátis no Windows e Linux.",
      sections: {
        native: {
          title: "Xbox ou nativo",
          body: [
            "Por padrão o jogo recebe um controle de Xbox 360, com ícones de Xbox e vibração. Ele não usa a resposta tátil nem os gatilhos adaptáveis, mas a página Laboratório do app pode dar aos gatilhos resistência ou vibração por conta própria. Nos jogos que suportam o DualSense, ligue o Modo nativo na página do controle: eles recebem ícones de PlayStation, gatilhos adaptáveis e, no cabo, resposta tátil. Perfis, giroscópio e remapeamento ficam desligados no Modo nativo.",
          ],
        },
        "gyro-touchpad": {
          title: "Giroscópio e touchpad",
          body: [
            "O giroscópio soma no analógico direito: sempre, com o L2 puxado ou segurando um botão. O touchpad vira quatro botões: clique, metade esquerda, metade direita e dois dedos. Cada um deles, e o botão do microfone, pode ser um botão de Xbox, uma tecla ou uma macro, por jogo. No Windows o touchpad também pode mover o mouse, e o botão do microfone pode silenciar o PC.",
          ],
        },
        cable: {
          title: "Cabo e Bluetooth",
          body: [
            "Ligue o cabo num DualSense que está no Bluetooth e ele continua o mesmo jogador: o jogo não vê ele desconectar. As luzes de jogador e a barra de luz mostram o número do jogador, ou a barra pode mostrar a bateria.",
          ],
        },
      },
    },

    "dualshock-4": {
      title: "Controle de PS4 (DualShock 4) no PC em qualquer jogo | OpenController",
      description:
        "Use o DualShock 4 do PS4 em qualquer jogo de PC como controle de Xbox, por cabo, Bluetooth ou adaptador da Sony. Mira com giroscópio. Grátis no Windows e Linux.",
      sections: {
        connect: {
          title: "Cabo, Bluetooth ou adaptador",
          body: [
            "As duas versões do DualShock 4 funcionam por USB, Bluetooth ou pelo adaptador sem fio USB da Sony. Ligue o cabo num que está no Bluetooth e ele continua o mesmo jogador.",
          ],
        },
        light: {
          title: "Barra de luz",
          body: [
            "A barra de luz mostra o número do jogador nas cores do PlayStation: azul, vermelho, verde, rosa. Também pode mostrar uma cor que você escolher, a bateria do verde ao vermelho, ou nada. Abaixo de 15% de bateria ela pisca.",
          ],
        },
        "gyro-touchpad": {
          title: "Giroscópio e touchpad",
          body: [
            "O giroscópio soma no analógico direito: sempre, com o L2 puxado ou segurando um botão. O touchpad vira quatro botões: clique, metade esquerda, metade direita e dois dedos. Cada um pode ser um botão de Xbox, uma tecla ou uma macro, por jogo. No Windows o touchpad também pode mover o mouse.",
          ],
        },
      },
    },

    "switch-pro-controller": {
      title: "Switch Pro Controller no PC em qualquer jogo | OpenController",
      description:
        "Use o Switch Pro Controller em qualquer jogo de PC como controle de Xbox, por USB ou Bluetooth, com mira por giroscópio. Grátis no Windows e Linux.",
      sections: {
        layout: {
          title: "Posição dos botões",
          body: [
            "Os botões seguem a posição, não a letra. O de baixo, B no Switch, é o A do Xbox, e o da direita, A, é o B do Xbox. Para manter as letras, troque em Botões, por jogo se quiser.",
          ],
        },
        "gyro-capture": {
          title: "Giroscópio, Capture e luzes",
          body: [
            "O giroscópio soma no analógico direito: sempre, segurando o ZL ou segurando um botão. O Capture pode ser um botão de Xbox, uma tecla ou uma macro. As luzes de jogador mostram o número do jogador, como no Switch.",
          ],
        },
      },
    },

    "stadia-controller": {
      title: "Controle do Stadia no PC: use em qualquer jogo | OpenController",
      description:
        "O Stadia acabou, mas o controle continua funcionando. Use em qualquer jogo de PC como controle de Xbox, por USB ou Bluetooth, no Windows e no Linux. Grátis.",
      sections: {
        "after-stadia": {
          title: "Depois do Stadia",
          body: [
            "O Google fechou o Stadia em janeiro de 2023, mas o controle continua funcionando como um controle comum e não precisa de nada do Google. A maioria dos jogos de Windows só lê controle de Xbox, então ignora ele. O OpenController lê o controle do Stadia e entrega aos jogos um controle de Xbox 360 no lugar.",
          ],
        },
        connect: {
          title: "USB ou Bluetooth",
          body: [
            "Com o cabo USB-C funciona na hora. O Bluetooth só funciona se o controle foi passado para o modo Bluetooth com a ferramenta que o Google lançou quando o Stadia fechou. Se o seu não foi, use o cabo.",
          ],
        },
        buttons: {
          title: "Capture e Assistente",
          body: [
            "Os jogos não usam os botões Capture e Assistente. No Windows e no Linux, cada um pode virar um ou vários botões de Xbox, uma tecla ou uma macro, com um perfil por jogo que entra sozinho. No Mac, eles funcionam como teclas.",
          ],
        },
        linux: {
          title: "No Linux",
          body: [
            "O script de instalação adiciona uma regra para o app ler o controle sem root. Os jogos, o Wine e o Proton veem um controle de Xbox 360.",
          ],
        },
      },
    },

    "flydigi-vader": {
      title: "Flydigi Vader 5 Pro e 4 Pro no PC e no Linux | OpenController",
      description:
        "Use o Flydigi Vader 5 Pro, 4 Pro ou um Vader antigo em qualquer jogo de PC como controle de Xbox, com M1 a M4, C e Z. Windows e Linux, grátis.",
      sections: {
        which: {
          title: "Qual Vader você tem",
          body: [
            "O Vader 4 Pro, 5 Pro e o Direwolf 4 conectam pelo cabo ou pelo receptor. Os Vader 2 e 3, mais antigos, usam o receptor antigo deles. Todos aparecem nos jogos como um controle de Xbox 360.",
            "O Vader 5S é diferente. Ele é um controle com fio feito para o Xbox, e o Windows lê ele como qualquer controle de Xbox, então o OpenController vê um Xbox Wireless Controller. O Windows não passa os botões extras dele para outros apps. Dê a eles botões do Xbox no Space Station for Xbox e eles funcionam em todo lugar como esses botões.",
          ],
        },
        "space-station": {
          title: "Botões extras e o Space Station",
          body: [
            "M1 a M4, C, Z, LM e RM podem virar um ou vários botões de Xbox, uma tecla ou uma macro, com um perfil por jogo que entra sozinho.",
            'No Vader 4 Pro, no 5 Pro e no Direwolf 4, ligue "Allow third-party apps to take over mappings" no Flydigi Space Station, senão outros programas não leem esses botões. A janela do OpenController avisa quando isso é preciso. Os Vader 2 e 3 no receptor antigo não precisam.',
          ],
        },
        linux: {
          title: "No Linux",
          body: [
            "O script de instalação adiciona uma regra para o app ler o Vader sem root. Os jogos, o Wine e o Proton veem um controle de Xbox 360, e os botões extras funcionam como no Windows, com o mesmo aviso do Space Station nos controles mais novos.",
          ],
        },
      },
    },
  },

  changelog: {
    metaTitle: "Novidades do OpenController | Notas de versão",
    description: "Todas as versões do OpenController, da mais nova para a mais antiga: o que mudou e se as suas configurações continuam.",
    title: "Novidades",
    intro: "O app procura uma versão nova quando a janela abre e se atualiza sem reinstalar.",
    notesInEnglish: "As notas de cada versão são escritas em inglês.",
    feed: "Todas as versões",
    rss: "Acompanhar por RSS",
    latest: "A {version} saiu em {date}.",
    first: "Essas são todas as versões desde a primeira, a {version}, de {date}.",
    offline: "O GitHub não respondeu agora.",
    offlineLink: "As notas também estão na <a>página de versões</a>.",
    day: (day, month) => `${day} ${month.toLowerCase()}`,
    labels: {
      count: { one: "{n} versão", other: "{n} versões" },
      monthNav: "Ir para o mês",
      jumpTo: "Ir para {month}",
      scroller: "Notas de versão",
      source: "No GitHub",
    },
  },
};

export default guides;
