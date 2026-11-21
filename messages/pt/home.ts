import type { HomeMessages } from "../en/home";

const home: HomeMessages = {
  meta: {
    title: "OpenController: use qualquer controle nos jogos de PC, de graça",
    description:
      "Use controles de PlayStation, Switch, 8BitDo e centenas de outros nos jogos de PC, sozinho ou com amigos. Gratuito e de código aberto para Windows, Linux e Mac.",
    features: [
      "Controles de PlayStation, Switch, 8BitDo e outros aparecem nos jogos como controle de Xbox 360",
      "Vários controles ao mesmo tempo, cada um com o próprio número de jogador",
      "Qualquer botão como um ou vários botões, tecla ou macro, com perfis por jogo",
      "Mira com giroscópio",
      "Zona morta, curva e correção de drift dos analógicos",
      "Luz e bateria do controle",
    ],
  },

  hero: {
    tagline: "Seu controle em qualquer jogo de PC.",
    lead: "Use controles de PlayStation, Switch, 8BitDo e outros nos seus jogos de PC, sozinho ou com amigos.",
    test: "Teste seu controle",
    video: "O app OpenController mostrando um DualSense, dois Joy-Con, um manche e um volante enquanto alguém joga, e depois os cinco juntos.",
    facts: [
      { k: "Roda em", v: "Windows, Linux e Mac" },
      { k: "Funciona com", v: "Centenas de controles" },
      { k: "Custa", v: "Nada. É de código aberto" },
      { k: "Envia", v: "Nada sobre você" },
    ],
  },

  check: {
    title: "Teste seu controle aqui.",
  },

  features: {
    title: "Conecte e jogue.",
    games: {
      title: "Funciona nos seus jogos",
      body: "Controle de Xbox já funciona, então ele nem mexe nesses. Se um jogo aceita o seu controle do jeito que ele é, ligue o Modo nativo e o jogo vê o controle de verdade.",
      steps: ["Conecte o controle", "Abra o jogo", "Jogue"],
    },
    friends: {
      title: "Jogue com os amigos",
      body: "Cada um continua o mesmo jogador, mesmo se o controle desconectar por um instante.",
      hint: "Experimente: arraste um sobre o outro para trocar, ou toque em dois.",
    },
    custom: {
      title: "Do seu jeito",
      body: "Mude o que qualquer botão faz, faça ele repetir enquanto segura ou não fazer nada, mire com o giroscópio, corrija um analógico que anda sozinho e salve uma configuração para cada jogo, que entra sozinha quando ele abre e pode ir para um amigo num arquivo. O Laboratório traz efeitos nos gatilhos do DualSense e, no Windows, o Flick Stick e o touchpad como mouse.",
      setups: { default: "Padrão", racing: "Jogo de corrida", shooter: "Jogo de tiro" },
      inUse: "em uso",
    },
    updates: {
      title: "Sempre atualizado",
      body: "No Windows, um clique instala e mantém suas configurações.",
      notice: "Saiu uma versão nova.",
      button: "Atualizar agora",
    },
  },

  swap: {
    players: "Jogadores",
    player: "Jogador {n}",
    pad: "{name}, jogador {n}",
    receiver: "Receptor",
    swapped: "{a} agora é o jogador {i}, {b} é o jogador {j}.",
  },

  performance: {
    title: "Quase nada em segundo plano.",
    memory: "Memória em uso",
    games: "Nos seus jogos",
    measures: [
      { k: "Atraso que ele adiciona ao controle", v: "Normalmente menos de um milissegundo" },
      { k: "Processador, sem nenhum controle conectado", v: "0 %" },
    ],
    bars: {
      summary: "Até {closed} MB com a janela fechada, contra cerca de {open} MB com ela aberta.",
      open: "Janela aberta: {n} MB",
      closed: "<b>Até {n} MB</b> com a janela fechada.",
    },
  },

  controllers: {
    title: "Procure seu controle.",
  },

  platforms: {
    title: "Baixe para Windows, Linux ou Mac.",
    caption: "O que funciona em cada sistema",
    feature: "Recurso",
    yes: "Sim",
    no: "Não",
    rows: {
      games: { label: "Funciona nos seus jogos", mac: "Já vem no macOS" },
      players: { label: "Cada amigo continua sendo o mesmo jogador", mac: "" },
      remap: { label: "Botões remapeados e configuração por jogo", mac: "Botões extras como teclas" },
      light: { label: "Luz do controle e bateria", mac: "" },
    },
    windows: {
      title: "Windows 10, 11",
      body: [
        "Instala sem administrador e se atualiza sem reinstalar. Um clique instala os dois drivers gratuitos de que ele precisa.",
        "O HidHide, driver que esconde o controle original, ainda não tem versão para ARM. Num PC com ARM, um jogo que também lê o original pode ver o controle duas vezes.",
        "O instalador ainda não é assinado, então na primeira vez o Windows pode mostrar “O Windows protegeu o computador”. Clique em Mais informações e depois em Executar assim mesmo.",
      ],
    },
    linux: {
      title: "Linux",
      body: [
        "No Ubuntu 22.04, Debian 12, Fedora 36 ou mais novos, ou qualquer distribuição com glibc 2.35 ou mais recente. Funciona com jogos nativos e com Proton ou Wine.",
        "O instalador pede sua senha uma vez, para o app poder usar seus controles. No Steam Deck, crie uma senha antes rodando passwd no Konsole.",
      ],
    },
    mac: {
      title: "macOS 13+",
      body: [
        "Um app só para Mac com chip da Apple ou Intel. No Mac, os jogos já aceitam controles de PlayStation, Xbox e Switch Pro, e o sistema não deixa apps criarem controles.",
        "Os botões extras como teclas precisam da permissão de Acessibilidade, que a janela pede.",
        "Na primeira vez o macOS bloqueia o app. Abra uma vez, depois vá em Ajustes do Sistema, Privacidade e Segurança, e clique em Abrir Mesmo Assim.",
      ],
    },
  },

  download: {
    for: "Baixar para {os}",
    any: "Baixar para Windows, Linux ou Mac",
    github: "Baixar no GitHub",
    githubDown: "O GitHub não respondeu agora. A página de versões tem todos os arquivos.",
    missing: "Sem versão para {os} na {version}",
    build: "Compile você mesmo",
    releases: "Todas as versões",
    whatsNew: "Novidades",
    phone: "O OpenController roda no computador. Abra esta página nele para baixar a versão certa.",
    platforms: {
      "windows-x64": { name: "Windows", ask: "PC com Intel ou AMD?" },
      "windows-arm64": { name: "Windows no ARM", ask: "PC com ARM?" },
      "linux-x64": { name: "Linux", ask: "Computador com Intel ou AMD?" },
      "linux-arm64": { name: "Linux no ARM", ask: "Computador com ARM?" },
      "macos-universal": { name: "Mac", ask: "Mac?" },
      "macos-arm64": { name: "Mac, Apple silicon", ask: "Mac com Apple silicon?" },
      "macos-x64": { name: "Mac, Intel", ask: "Mac com Intel?" },
    },
  },

  faq: {
    title: "Perguntas frequentes.",
    search: "Buscar nas perguntas",
    clear: "Limpar busca",
    placeholder: "Tente Linux, macro ou atualizar",
    count: { one: "{n} pergunta", other: "{n} perguntas" },
    none: "Nenhuma pergunta fala de “{q}”.",
    ask: "<a>Pergunte direto para a gente</a>.",
    items: [
      {
        id: "free",
        q: "É gratuito?",
        a: "Sim. É de código aberto, e os drivers que ele usa no Windows também são gratuitos.",
      },
      {
        id: "how",
        q: "Como ele funciona?",
        a: "Cada controle seu aparece nos jogos como um controle de Xbox 360, com o próprio número de jogador, e o original fica escondido para o jogo não vê-lo duas vezes. No Windows ele usa dois drivers gratuitos, o ViGEmBus e o HidHide. No Linux, usa um recurso do próprio sistema.",
      },
      {
        id: "data",
        q: "Ele envia algum dado meu?",
        a: "Nada sobre você: sem conta, sem rastreamento. Quando você abre a janela, e a cada poucas horas enquanto ela fica aberta, ele consulta o GitHub para ver se saiu versão nova, o que dá para desligar em Configurações, em Procurar atualizações. No Windows ele também baixa as atualizações e os drivers que você escolher instalar.",
      },
      {
        id: "dataReports",
        q: "Ele envia algum dado meu?",
        a: "Nada sobre você: sem conta, sem rastreamento. Quando você abre a janela, e a cada poucas horas enquanto ela fica aberta, ele consulta o GitHub para ver se saiu versão nova, o que dá para desligar em Configurações, em Procurar atualizações. No Windows ele também baixa as atualizações e os drivers que você escolher instalar. Reportar um problema envia só dados técnicos: os daquele controle e, se ele for feito para Xbox, os modelos dos aparelhos de Xbox conectados. Nada de número de série, e você pode ler tudo antes de enviar.",
      },
      {
        id: "languages",
        q: "Em que idiomas o app está?",
        a: "Inglês, português e chinês simplificado. Escolha em Configurações, em Idioma.",
      },
      {
        id: "update",
        q: "Como eu atualizo?",
        a: "Quando sai uma versão nova, o app mostra Atualizar agora. No Windows ele instala sozinho e mantém suas configurações. No Linux e no Mac, abre a página de download.",
      },
      {
        id: "steam",
        q: "Funciona junto com a Steam?",
        a: "Sim. Nas configurações da Steam, desligue o Steam Input para controles de PlayStation e Switch, senão o jogo pode ver cada toque duas vezes.",
      },
      {
        id: "icons",
        q: "Os jogos vão mostrar os ícones do PlayStation?",
        a: "Não por padrão, já que os jogos veem um controle de Xbox. Se o jogo aceita o seu controle, abra-o no app e ligue o Modo nativo: o jogo vê o controle de verdade, com os próprios ícones, os gatilhos adaptáveis e, no cabo, a vibração háptica. Enquanto ele está nativo, os perfis, a mira com giroscópio e os botões remapeados ficam desligados, e é bom fechar o jogo antes de trocar. O Modo nativo também permite usar o app junto com um DS5Dongle.",
      },
      {
        id: "remap",
        q: "Dá para remapear os botões de cada jogo sem a Steam?",
        a: "Sim, no Windows e no Linux. Em Botões, Todos os botões, qualquer botão pode virar outro, vários juntos, uma tecla ou uma macro, repetir enquanto segura ou não fazer nada. Salve num perfil, adicione o jogo, e ele entra sozinho sempre que o jogo estiver na frente. Exporte o perfil para passar a um amigo ou levar para outro PC.",
      },
      {
        id: "letters",
        q: "O A e o B do meu controle de Switch estão trocados.",
        a: "Os jogos leem os botões pela posição, como num controle de Xbox, então o B de baixo vira A nos jogos. Para seguir as letras do controle, ligue Usar as letras do controle em Botões, Todos os botões.",
      },
      {
        id: "drift",
        q: "Meu analógico anda sozinho, ou não chega mais até a borda.",
        a: "No Windows e no Linux, abra o seu controle, vá em Analógicos e aperte Medir o analógico. Ele ajusta o centro, a zona morta e a inclinação total pelo jeito que o analógico realmente se move, e você também pode ajustar cada um à mão.",
      },
      {
        id: "joycons",
        q: "Dá para usar cada Joy-Con como um controle?",
        a: "Sim, no Windows e no Linux. Abra o par e aperte Separar Joy-Cons: cada um vira um controle segurado de lado, e duas pessoas jogam com um par só. Juntar Joy-Cons junta de novo. É experimental.",
      },
      {
        id: "gyro",
        q: "Os jogos podem usar o giroscópio do meu controle?",
        a: "Jogos que só conhecem controle de Xbox não, mas o OpenController pode mirar com ele, em Movimento. No Windows ele também pode mostrar o controle aos jogos como um DualShock 4, em Informações, e aí os jogos e o Steam Input que leem movimento recebem o giroscópio. Isso é experimental e vem desligado, porque os jogos que só conhecem controle de Xbox deixam de vê-lo. Emuladores como o Cemu podem lê-lo pelo Laboratório.",
      },
      {
        id: "sticks",
        q: "Funciona com manche e volante?",
        a: "Sim. Ele não mexe neles, então os jogos de voo e de corrida leem esses aparelhos direto, com torção, acelerador e force feedback. Para usar um Logitech Extreme 3D Pro, ou um Logitech G29 no Linux ou no Mac, num jogo de controle, abra-o no app e desligue o Modo nativo. Para outros, envie os dados deles pelo app.",
      },
      {
        id: "players",
        q: "Dá para jogar com mais de quatro pessoas?",
        a: "A maioria dos jogos de PC aceita até quatro controles. Alguns mais novos aceitam mais, e o app avisa quando é o caso. No Linux, os jogadores depois do quarto também ganham o próprio número.",
      },
      {
        id: "viiper",
        q: "Um jogo não vê meu controle, ou o PC dá tela azul.",
        a: "No Windows, experimente o VIIPER: feche os jogos e, em Configurações, em Avançado, crie os controles virtuais pelo VIIPER em vez do ViGEmBus. Depois, em Requisitos, o app instala o que ele precisa, o que pode pedir administrador e reiniciar o PC. É experimental, e se o VIIPER não iniciar o app volta para o ViGEmBus e avisa.",
      },
      {
        id: "keys",
        q: "Um botão que configurei como tecla não faz nada no jogo.",
        a: "Alguns jogos ignoram teclas de outros programas, principalmente os que têm anti-cheat, e o Windows bloqueia essas teclas em jogos abertos como administrador. Alguns jogos também proíbem macros, então confira as regras antes.",
      },
      {
        id: "hidhide",
        q: "Uma janela do HidHide abre sozinha.",
        a: "É o instalador ou o atualizador do próprio HidHide, não o OpenController. Depois de uma atualização ele reinicia o Windows e abre de novo para terminar. Desde a versão 1.5 ele também instala um atualizador que abre com o Windows, que dá para desligar no Gerenciador de Tarefas, em Aplicativos de inicialização.",
      },
      {
        id: "name",
        q: "O app mostra meu controle com o nome de outro.",
        a: "Alguns controles copiam o ID USB de outro, como o Onikuma C1, que diz ser um Switch Pro Controller. Abra o seu controle, vá em Informações e escolha o certo em Modelo.",
      },
      {
        id: "offList",
        q: "Meu controle não está na lista, ou funciona errado.",
        a: "A maioria dos controles funciona mesmo fora da lista, porque muitos dizem ser um controle de Xbox, PlayStation ou Switch. Para incluir ou corrigir o seu, abra-o no app, vá em Informações e aperte Reportar um problema. Ele envia o que basta para dar suporte sem ter o controle em mãos.",
      },
      {
        id: "offListMapping",
        q: "Meu controle não está na lista, ou funciona errado.",
        a: "A maioria dos controles funciona mesmo fora da lista, porque muitos dizem ser um controle de Xbox, PlayStation ou Switch. Se o app não consegue ler os botões, a página dele mostra Mapear os botões: aperte cada parte quando for pedida e ele funciona como um controle de Xbox. Para incluir ou corrigir o seu para todos, abra-o no app, vá em Informações e aperte Reportar um problema.",
      },
      {
        id: "finished",
        q: "Já está pronto?",
        a: "Ainda não, está em beta. Alguns controles podem ainda não funcionar direito e alguns recursos faltam. Se algo der errado, <a>avise a gente</a>.",
      },
    ],
  },

  contact: {
    title: "Algo não funcionou? Fale com a gente.",
    report: "Reportar um problema",
    issue: "Abrir uma issue",
    idea: "Mandar uma sugestão",
  },

  contactForm: {
    title: "Fale conosco",
    kind: "Assunto",
    kinds: { problem: "Um problema", idea: "Uma sugestão", other: "Outro assunto" },
    system: "Sistema operacional",
    systemOther: "Outro",
    systemDetail: "Versão ou distribuição",
    systemDetailHint: "ex.: 23H2, Ubuntu 24.04, Sonoma",
    version: "Versão do OpenController",
    versionHint: "Aparece no topo da janela",
    controller: "Controle",
    controllerHint: "O modelo exato, ex.: 8BitDo Ultimate 2 Wireless",
    connection: "Conectado por",
    connections: ["Cabo", "Bluetooth", "Receptor", "Não sei"],
    choose: "Escolha",
    message: { problem: "O que aconteceu?", idea: "Sua sugestão", other: "Sua mensagem" },
    messageHint: {
      problem: "O que você fez, o que esperava e o que aconteceu. Se apareceu alguma mensagem de erro, cole aqui.",
      idea: "O que o OpenController deveria fazer, e quando isso ajudaria?",
      other: "Escreva o quanto precisar.",
    },
    email: "Seu email (opcional)",
    emailHint: "Só se quiser resposta. Ele é usado só para responder você.",
    send: "Enviar",
    close: "Fechar",
    sentTitle: "Mensagem enviada. Obrigado!",
    sentBody: "Se você deixou seu email, a resposta chega por lá.",
    errors: {
      message: "Escreva um pouco mais, pelo menos uma frase.",
      email: "Esse email não parece certo.",
      rate: "Muitas mensagens em pouco tempo. Tente de novo daqui a uma hora.",
      other: "Não deu para enviar agora. Tente de novo em instantes, ou abra uma issue no GitHub.",
    },
  },

  request: {
    title: "Pedir um controle",
    intro: "Diga qual controle você quer na lista. Os mais usados vêm primeiro.",
    model: "Marca e modelo",
    modelHint: "Como ele é vendido, ex.: Redragon Darkflame G820",
    ids: "Lido pelo teste de controle",
    notes: "Algo mais (opcional)",
    notesHint: "Onde comprou, como conecta, o que não funciona.",
    email: "Seu email (opcional)",
    emailHint: "Só para avisar quando ele entrar.",
    app: "Já tem o OpenController? Ele envia os dados do controle por você: abra o controle, depois Informações, depois Reportar um problema.",
    send: "Enviar pedido",
    close: "Fechar",
    sentTitle: "Pedido enviado. Obrigado!",
    sentBody: "Se você deixou seu email, avisamos quando ele entrar.",
    errors: {
      model: "Escreva a marca e o modelo.",
      email: "Esse email não parece certo.",
      rate: "Muitos pedidos em pouco tempo. Tente de novo daqui a uma hora.",
      other: "Não deu para enviar agora. Tente de novo em instantes.",
    },
  },

  footer: {
    nav: "Projeto",
    controllers: "Controles",
    whatsNew: "Novidades",
    report: "Reportar um problema",
    contact: "Fale conosco",
    license: "Licença MIT",
    notices: "Avisos de terceiros",
    official: "O OpenController só é distribuído pelo <a>{repo}</a> e pelo {domain}. Outros sites que usam o nome não têm ligação com este projeto.",
    disclaimer:
      "Sem vínculo com Sony, Microsoft, Nintendo, Valve, 8BitDo ou qualquer outro fabricante de controles; os nomes só identificam hardware compatível. ViGEmBus, HidHide, DsHidMini e BthPS3 são da Nefarius Software Solutions e são baixados das páginas deles, não incluídos. O uso é por sua conta: os autores não se responsabilizam por banimentos ou outras punições, como por macros em jogos que as proíbem.",
    analytics: "Este site conta as visitas de forma anônima: sem cookies, sem guardar IP, nada que diferencie uma pessoa da outra no dia seguinte.",
    madeBy: "Feito por <a>{name}</a>",
  },
};

export default home;
