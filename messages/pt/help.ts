import type { HelpMessages } from "../en/help";

const help: HelpMessages = {
  index: {
    title: "Ajuda",
    metaTitle: "Ajuda com controles nos jogos de PC | OpenController",
    description: "Respostas para os problemas comuns com controles no PC: controle de PS5 ou PS4, controles do Switch, jogos que ignoram o controle, drift e mira por giroscópio.",
    lead: "Respostas curtas para os problemas que mais aparecem com controles no PC.",
  },
  ui: {
    home: "Início",
    help: "Ajuda",
    answer: "Resumindo",
    steps: "Passo a passo",
    related: "Veja também",
    download: "Baixar o OpenController",
    test: "Testar seu controle",
    free: "Gratuito e de código aberto, para Windows, Linux e Mac.",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "Usar o controle de PS5 no PC",
      metaTitle: "Como usar o controle de PS5 (DualSense) no PC",
      description: "Conecte o DualSense por cabo ou Bluetooth e jogue qualquer jogo de PC com ele, até os que só conhecem o controle de Xbox.",
      answer:
        "O Windows reconhece o DualSense, mas muitos jogos só entendem controle de Xbox. O OpenController mostra o seu DualSense aos jogos como um controle de Xbox, então ele funciona em todos, e mantém os extras: giroscópio, touchpad e o botão do microfone.",
      steps: [
        "<download>Baixe o OpenController</download> e abra. No Windows, a página Requisitos instala os dois drivers gratuitos de que ele precisa.",
        "Conecte o DualSense pelo cabo USB ou pareie por Bluetooth: segure Create e o botão PS até a luz piscar e adicione o controle nas configurações de Bluetooth do Windows.",
        "Ele aparece na janela com um número de jogador. Abra o jogo e jogue.",
      ],
      sections: [
        {
          h: "Gatilhos adaptáveis e vibração háptica",
          p: [
            "Os jogos veem um controle de Xbox, então não usam os gatilhos adaptáveis. O modo nativo, na página do controle, devolve o DualSense de verdade aos jogos que têm suporte, com os gatilhos deles e, pelo cabo, a vibração háptica. Ou o Laboratório dá aos gatilhos efeitos próprios em qualquer jogo: resistência, vibração ou um clique.",
          ],
        },
        {
          h: "Giroscópio, touchpad e microfone",
          p: [
            "Girar o controle pode mirar: sempre, ao mirar ou enquanto você segura um botão. O touchpad e o botão do microfone podem apertar botões de Xbox, teclas ou macros. No Windows, o touchpad também pode mover o mouse, e o botão do microfone pode silenciar o microfone do PC.",
          ],
        },
        {
          h: "Jogos da Steam",
          p: [
            "Se o Steam Input estiver ligado para controles de PlayStation, a Steam também lê o DualSense e um toque pode contar duas vezes. Desligue o suporte a PlayStation nas configurações de controle da Steam.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "Usar o controle de PS4 no PC",
      metaTitle: "Como usar o controle de PS4 (DualShock 4) no PC",
      description: "Jogue no PC com o DualShock 4 por cabo, Bluetooth ou adaptador sem fio da Sony, com a luz mostrando o seu jogador.",
      answer:
        "Muitos jogos de PC não leem o controle de PS4. O OpenController mostra ele aos jogos como um controle de Xbox, por cabo, Bluetooth ou adaptador sem fio da Sony, e a luz dele mostra o seu número de jogador.",
      steps: [
        "<download>Baixe o OpenController</download> e abra. No Windows, a página Requisitos instala os dois drivers gratuitos de que ele precisa.",
        "Conecte o DualShock 4 pelo cabo USB ou pareie por Bluetooth: segure Share e o botão PS até a luz piscar e adicione o controle nas configurações de Bluetooth do Windows.",
        "A luz fica na cor do jogador. Abra o jogo e jogue.",
      ],
      sections: [
        {
          h: "Touchpad e giroscópio",
          p: [
            "Além do clique, o touchpad vira três botões: a metade esquerda, a metade direita e dois dedos. Cada um pode apertar um botão de Xbox, uma tecla ou uma macro. Girar o controle pode mirar, como um mouse na mão.",
          ],
        },
        {
          h: "Barra de luz",
          p: ["A luz mostra a cor do jogador, como no PlayStation, uma cor que você escolher ou a bateria, do verde ao vermelho. Ela pisca quando a bateria está acabando."],
        },
        {
          h: "Vindo do DS4Windows",
          p: ["O DS4Windows fez isso por anos e não é mais mantido. <ds4windows>Veja o que muda</ds4windows> ao passar para o OpenController."],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "Usar o Switch Pro Controller ou o Joy-Con no PC",
      metaTitle: "Como usar o Switch Pro Controller ou o Joy-Con no PC",
      description: "Jogue no PC com o Switch Pro Controller ou com Joy-Con, em par ou deitado, com os botões onde você espera.",
      answer:
        "O OpenController faz o Switch Pro Controller e os Joy-Con funcionarem nos jogos de PC como controles de Xbox. Um par de Joy-Con joga como um controle só, ou como dois, um para cada amigo, deitados.",
      steps: [
        "<download>Baixe o OpenController</download> e abra. No Windows, a página Requisitos instala os dois drivers gratuitos de que ele precisa.",
        "Pareie o controle por Bluetooth: segure o botãozinho de sincronizar até as luzes correrem e adicione o controle nas configurações de Bluetooth do Windows. O Pro Controller também funciona pelo cabo USB.",
        "Ele aparece na janela com um número de jogador. Abra o jogo e jogue.",
      ],
      sections: [
        {
          h: "A ou B?",
          p: [
            "Os botões seguem a posição, então o de baixo é A nos jogos, como no controle de Xbox. Para usar as letras como estão impressas, ligue Usar as letras do controle em Todos os botões, na página do controle.",
          ],
        },
        {
          h: "Dois jogadores com um par",
          p: [
            "Na página do par, Separar Joy-Cons transforma cada Joy-Con em um controle próprio, deitado: analógico à esquerda, botões à direita, SL e SR como bumpers. Juntar Joy-Cons junta de novo. É experimental, no Windows e no Linux.",
          ],
        },
        {
          h: "Giroscópio e Capture",
          p: ["Os dois têm giroscópio, então girar o controle pode mirar. O botão Capture pode apertar um botão de Xbox, uma tecla ou uma macro."],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "O controle funciona no menu, mas não no jogo",
      metaTitle: "Controle funciona no menu mas não no jogo no PC: como resolver",
      description: "Seu controle mexe nos menus da Steam ou do Windows, mas não faz nada no jogo. Por que acontece e como resolver.",
      answer:
        "Normalmente isso quer dizer que o jogo só lê controle de Xbox, enquanto o Windows e o launcher leem o seu sem problema. O OpenController mostra o seu controle aos jogos como um controle de Xbox, e isso resolve na maioria dos jogos.",
      sections: [
        {
          h: "Por que acontece",
          p: [
            "O Windows tem mais de um jeito de os programas lerem controles. Launchers e menus costumam usar um que enxerga qualquer controle. Muitos jogos usam só o XInput, que só enxerga controle de Xbox, e aí um controle de PlayStation, Switch ou genérico fica invisível para eles.",
          ],
        },
        {
          h: "Como resolver",
          p: [
            "<download>Baixe o OpenController</download>, abra e conecte o controle. Quando ele aparece com um número de jogador, os jogos o veem como controle de Xbox. Reinicie o jogo se ele já estava aberto.",
          ],
        },
        {
          h: "Se cada toque conta duas vezes",
          p: [
            "O Steam Input ou o próprio jogo ainda podem ler o controle original ao lado do de Xbox. O HidHide, oferecido na página Requisitos, esconde os originais dos jogos: reinicie o jogo depois de instalar. Na Steam, desligue o suporte a PlayStation ou Switch nas configurações de controle.",
          ],
        },
        {
          h: "Ainda nada",
          p: [
            "Alguns jogos só escutam o primeiro controle. Arraste o seu controle para cima do Jogador 1 para trocar os dois. Teclas e macros dos botões extras não chegam a jogos abertos como administrador.",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "O PC não reconhece o controle",
      metaTitle: "PC não reconhece o controle? Veja isto primeiro",
      description: "O que conferir quando o PC não vê o seu controle, e como fazer um controle genérico ou desconhecido funcionar nos jogos.",
      answer:
        "Primeiro veja se o PC lê o controle: <test>o teste na nossa página inicial</test> mostra qualquer controle em segundos e diz qual é. Se ele aparece lá, o PC enxerga o controle, e o OpenController consegue fazer os jogos enxergarem também.",
      sections: [
        {
          h: "Confira o básico",
          p: [
            "Troque o cabo: alguns só carregam. Ligue direto no PC, sem hub. No Bluetooth, deixe o controle em modo de pareamento e adicione nas configurações do Windows. Em 8BitDo e parecidos, confira a chave de modo: no modo XInput, os botões extras e o giroscópio ficam escondidos.",
          ],
        },
        {
          h: "Controles genéricos e desconhecidos",
          p: [
            "A maioria dos controles genéricos copia o chip de um controle de Xbox, PlayStation ou Switch e funciona como ele. Se o OpenController não consegue ler os botões do seu, a página dele oferece Mapear os botões: ele acende cada parte no desenho e você aperta. Depois disso, ele funciona como controle de Xbox.",
          ],
        },
        {
          h: "Peça para incluir",
          p: ["Reportar um problema, na página Informações do controle, envia os dados dele para ser incluído. Você também pode <contact>falar com a gente</contact>."],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "Uma alternativa ao DS4Windows",
      metaTitle: "Alternativa ao DS4Windows: gratuita, de código aberto e mantida",
      description: "O DS4Windows não é mais mantido. O OpenController faz o mesmo trabalho com controles de PlayStation e ainda cobre Switch, 8BitDo e centenas de outros.",
      answer:
        "O DS4Windows não é mais mantido, e os downloads com o nome dele hoje vêm de sites que não são dos autores. O OpenController é um app gratuito e de código aberto que faz o mesmo trabalho com controles de PlayStation e ainda cobre Switch, 8BitDo e centenas de outros.",
      sections: [
        {
          h: "O que continua igual",
          p: [
            "O seu DualShock 4 ou DualSense vira um controle de Xbox nos jogos, vários ao mesmo tempo, cada um com o número de jogador na luz. Mira por giroscópio, touchpad como botões, cor e bateria na barra de luz e perfis que trocam com o jogo aberto, está tudo lá. Ele usa os mesmos drivers gratuitos, ViGEmBus e HidHide.",
          ],
        },
        {
          h: "O que muda",
          p: [
            "Ele lê os controles pelo SDL, então não se limita aos de PlayStation. Roda no Windows, no Linux e no Mac, onde adiciona botões e luzes, mas não cria controles virtuais. Mostrar aos jogos um DualShock 4 em vez de um controle de Xbox existe no Windows, como opção experimental.",
          ],
        },
        {
          h: "Na troca",
          p: ["Feche o DS4Windows antes, para os dois não criarem um controle virtual para o mesmo controle. Se o DS4Windows instalou o ViGEmBus e o HidHide, o OpenController usa os dois como estão."],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "Mira por giroscópio no PC",
      metaTitle: "Mira por giroscópio no PC com controle de PlayStation ou Switch",
      description: "Mire girando o controle em qualquer jogo de PC, com DualSense, DualShock 4, Switch Pro, Joy-Con ou Steam Deck.",
      answer:
        "Com o OpenController, um controle com giroscópio pode mirar em qualquer jogo de PC: girar o controle move o analógico direito. Isso vale para DualSense, DualShock 4, Switch Pro Controller, Joy-Con, Steam Deck e controles 8BitDo no modo D-input.",
      steps: [
        "<download>Baixe o OpenController</download>, abra e conecte o controle.",
        "Na página dele, abra Movimento e escolha quando o giroscópio mira: sempre, com o gatilho esquerdo puxado ou enquanto você segura um botão.",
        "Ajuste a sensibilidade até um giro rápido do pulso dar a virada que você quer.",
      ],
      sections: [
        {
          h: "Ajuste fino",
          p: [
            "A mira pode ter sensibilidade própria, o movimento para cima e para baixo pode ser mais lento que o de lado, e um botão pode pausar o giroscópio enquanto você reposiciona o controle. Em Avançado, a aceleração faz giros rápidos irem mais longe, e a estabilização segura a mão que treme.",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "No Windows, o Flick Stick do Laboratório vira a câmera com o analógico direito como um mouse faria, com o giroscópio para o ajuste fino. Configure por jogo, com a aceleração do mouse do jogo desligada.",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "Corrigir o drift do analógico no PC",
      metaTitle: "Como corrigir o drift do analógico no PC, em todos os jogos",
      description: "Meça o analógico com drift, recentralize e ajuste uma zona morta só do tamanho necessário, uma vez, para todos os jogos de PC.",
      answer:
        "Um analógico gasto que se mexe sozinho muitas vezes se resolve no software: o OpenController mede onde ele descansa, usa esse ponto como centro e ajusta uma zona morta só do tamanho para esconder o drift, em todos os jogos.",
      steps: [
        "<download>Baixe o OpenController</download>, abra e conecte o controle.",
        "Na página dele, abra Analógicos e clique em Medir. Deixe o analógico parado e depois gire ele pela borda.",
        "O centro, a zona morta e o ponto de inclinação total saem do que ele mediu. O desenho mostra o que os jogos recebem.",
      ],
      sections: [
        {
          h: "Os ajustes",
          p: [
            "A zona morta ignora movimentos pequenos perto do centro. A anti-zona morta faz os jogos reagirem ao primeiro movimento depois dela. A inclinação total conta como empurrado até o fim um analógico que já não chega à borda.",
          ],
        },
        {
          h: "Quando é defeito físico",
          p: [
            "Se o drift for grande, a zona morta que o esconde também engole movimentos pequenos de verdade, e aí o analógico precisa de limpeza ou troca. Para um botão gasto que aperta duas vezes, o filtro de botões do Laboratório ignora o toque duplo.",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
