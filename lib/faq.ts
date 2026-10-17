import type { L } from "./i18n";

/**
 * Answers are plain text; "[words](#anchor)" is a link, drawn by components/Faq.tsx and kept as
 * plain words in the JSON-LD and llms.txt.
 */
export type FaqItem = { q: L; a: L };

export const QA: FaqItem[] = [
  {
    q: { en: "Is it free?", pt: "É gratuito?" },
    a: {
      en: "Yes. It is open source, and the drivers it uses on Windows are free too.",
      pt: "Sim. É de código aberto, e os drivers que ele usa no Windows também são gratuitos.",
    },
  },
  {
    q: { en: "How does it work?", pt: "Como ele funciona?" },
    a: {
      en: "Most PC games are made for the Xbox controller. While OpenController is running, each of your controllers shows up in games as an Xbox 360 controller with its own player number, and the original is hidden so the game doesn't see the same controller twice. On Windows this uses two free drivers, ViGEmBus and HidHide. On Linux it uses a feature built into the system. Nothing changes on the controller itself.",
      pt: "A maioria dos jogos de PC foi feita para o controle de Xbox. Enquanto o OpenController está aberto, cada controle seu aparece nos jogos como um controle de Xbox 360, com o próprio número de jogador, e o original fica escondido para o jogo não ver o mesmo controle duas vezes. No Windows ele usa dois drivers gratuitos, o ViGEmBus e o HidHide. No Linux, usa um recurso do próprio sistema. Nada muda no seu controle.",
    },
  },
  {
    q: { en: "Does it send any of my data?", pt: "Ele envia algum dado meu?" },
    a: {
      en: "Nothing about you: no account, no tracking. When you open its window, it checks GitHub for a new version. You can turn that off in Settings, under Check for updates. On Windows it also downloads the updates and drivers you choose to install, and checks each file before running it.",
      pt: "Nada sobre você: sem conta, sem rastreamento. Quando você abre a janela, ele consulta o GitHub para ver se saiu uma versão nova. Dá para desligar isso em Configurações, na opção Procurar atualizações. No Windows ele também baixa as atualizações e os drivers que você escolher instalar, e confere cada arquivo antes de rodar.",
    },
  },
  {
    q: { en: "Is the app in Portuguese?", pt: "O app está em português?" },
    a: {
      en: "Yes. It opens in English, and you can switch to Portuguese in Settings, under Language. Your choice stays across updates.",
      pt: "Sim. Ele abre em inglês, e você troca para português em Configurações, na opção Idioma. A escolha continua depois das atualizações.",
    },
  },
  {
    q: { en: "How do I update?", pt: "Como eu atualizo?" },
    a: {
      en: "The app lets you know when a new version is out. On Windows, click Update now and it installs it for you, keeping your settings. On Linux and Mac, it opens the download page.",
      pt: "O app avisa quando sai uma versão nova. No Windows, é só clicar em Atualizar agora que ele instala sozinho e mantém suas configurações. No Linux e no Mac, ele abre a página de download.",
    },
  },
  {
    q: { en: "Does it work with Steam?", pt: "Funciona junto com a Steam?" },
    a: {
      en: "Yes. Turn off Steam Input for PlayStation and Switch controllers in Steam's settings, or Steam reads them too and the game may see the same button twice.",
      pt: "Sim. Desligue o Steam Input para controles de PlayStation e Switch nas configurações da Steam, senão a Steam também lê esses controles e o jogo pode ver o mesmo botão duas vezes.",
    },
  },
  {
    q: { en: "Will games show PlayStation button icons?", pt: "Os jogos vão mostrar os ícones do PlayStation?" },
    a: {
      en: "Not by default. Games show Xbox button icons, since that is the controller they see, and special features like the DualSense's adaptive triggers don't reach them. If a game supports your controller, open it in the app and turn on Keep native. The game then sees the real controller, with its own icons, adaptive triggers and, over the cable, haptic feedback. This also lets the app work alongside a DS5Dongle. While a controller is native, its profiles, gyro aiming and remapped buttons are off. Close the game before switching.",
      pt: "Não por padrão. Os jogos mostram os ícones do Xbox, já que é esse o controle que eles veem, e recursos especiais como os gatilhos adaptáveis do DualSense não chegam a eles. Se o jogo aceita o seu controle, abra-o no app e ligue Deixar nativo. Aí o jogo vê o controle de verdade, com os próprios ícones, os gatilhos adaptáveis e, no cabo, a vibração háptica. Isso também permite usar o app junto com um DS5Dongle. Enquanto o controle está nativo, os perfis, a mira com giroscópio e os botões remapeados ficam desligados. Feche o jogo antes de trocar.",
    },
  },
  {
    q: { en: "Can I remap buttons for each game without Steam?", pt: "Dá para remapear os botões de cada jogo sem a Steam?" },
    a: {
      en: "Yes, on Windows and Linux. Open your controller and, under Buttons, open All buttons. Any button can become another one, a key or a macro, and the game no longer sees it as itself. Save it in a profile and add the game to that profile: it switches on by itself while the game is in front, whether the game came from Steam or not. Restore defaults puts everything back.",
      pt: "Sim, no Windows e no Linux. Abra o seu controle e, em Botões, abra Todos os botões. Qualquer botão pode virar outro, uma tecla ou uma macro, e o jogo deixa de vê-lo como ele mesmo. Salve num perfil e adicione o jogo a esse perfil: ele entra sozinho enquanto o jogo está na frente, tenha o jogo vindo da Steam ou não. Restaurar padrão desfaz tudo.",
    },
  },
  {
    q: { en: "A and B are swapped on my Switch controller.", pt: "O A e o B do meu controle de Switch estão trocados." },
    a: {
      en: "Games see buttons by where they are, as on an Xbox controller, so the B at the bottom of a Switch controller is A in games. To follow the letters instead, open the controller, go to Buttons, open All buttons and turn on Use the controller's letters.",
      pt: "Os jogos veem os botões pela posição, como num controle de Xbox, então o B de baixo de um controle de Switch vira A nos jogos. Para seguir as letras, abra o controle, vá em Botões, abra Todos os botões e ligue Usar as letras do controle.",
    },
  },
  {
    q: { en: "My stick drifts, or no longer reaches its edge.", pt: "Meu analógico anda sozinho, ou não chega mais até a borda." },
    a: {
      en: "On Windows and Linux, open your controller and go to Sticks, then press Measure. It finds where the stick rests and how far it reaches, and sets its centre, deadzone and full tilt from that, so a stick that always leans the same way only needs a small deadzone. You can also set the deadzone, full tilt and response curve yourself, from the values offered or any value you type, for both sticks or for each one. The page shows live what games get.",
      pt: "No Windows e no Linux, abra o seu controle, vá em Analógicos e aperte Medir. Ele descobre onde o analógico descansa e até onde chega, e ajusta o centro, a zona morta e a inclinação total a partir disso, então um analógico que sempre pende para o mesmo lado precisa só de uma zona morta pequena. Também dá para ajustar a zona morta, a inclinação total e a curva de resposta à mão, com os valores oferecidos ou qualquer valor digitado, para os dois analógicos ou para cada um. A página mostra ao vivo o que os jogos recebem.",
    },
  },
  {
    q: { en: "Can each Joy-Con be a controller of its own?", pt: "Dá para usar cada Joy-Con como um controle?" },
    a: {
      en: "Yes, on Windows and Linux. A left and a right Joy-Con are joined into one controller at first. Open the pair and press Split Joy-Cons: each becomes a controller of its own, held sideways, so two friends can play with one pair. SL and SR are then the bumpers, and the shoulder button and trigger on the end can be given anything. Join Joy-Cons puts them back together. It is experimental.",
      pt: "Sim, no Windows e no Linux. Um Joy-Con esquerdo e um direito começam juntos, como um controle só. Abra o par e aperte Separar Joy-Cons: cada um vira um controle, segurado de lado, então dois amigos jogam com um par. O SL e o SR viram os bumpers, e o botão de ombro e o gatilho da ponta podem fazer o que você quiser. Juntar Joy-Cons junta de novo. É experimental.",
    },
  },
  {
    q: { en: "Can games use my controller's gyro?", pt: "Os jogos podem usar o giroscópio do meu controle?" },
    a: {
      en: "An Xbox controller has no gyro, so games don't see it. OpenController can aim with it instead, by adding it to the right stick, under Motion. On Windows you can also show the controller to games as a DualShock 4, under Information. Games and Steam Input that read motion then get its gyro and accelerometer, but games that only know Xbox controllers don't see it, so it is off by default. It is experimental.",
      pt: "Controle de Xbox não tem giroscópio, então os jogos não o veem. O OpenController pode mirar com ele, somando o movimento ao analógico direito, em Movimento. No Windows também dá para mostrar o controle aos jogos como um DualShock 4, em Informações. Aí os jogos e o Steam Input que leem movimento recebem o giroscópio e o acelerômetro, mas jogos que só conhecem controle de Xbox deixam de vê-lo, por isso vem desligado. É experimental.",
    },
  },
  {
    q: { en: "Can more than four people play?", pt: "Dá para jogar com mais de quatro pessoas?" },
    a: {
      en: "Most PC games accept up to four controllers. Some newer games accept more, and the app lets you know when that happens. On Linux, players past the fourth get their own number too.",
      pt: "A maioria dos jogos de PC aceita até quatro controles. Alguns jogos mais novos aceitam mais, e o app avisa quando é o caso. No Linux, os jogadores depois do quarto também ganham o próprio número.",
    },
  },
  {
    q: { en: "A game doesn't see my controller, or my PC gets blue screens.", pt: "Um jogo não vê meu controle, ou o PC dá tela azul." },
    a: {
      en: "On Windows, you can try VIIPER. In Settings, under Advanced, the virtual controllers can be made with VIIPER instead of ViGEmBus. It is experimental and off by default, and ViGEmBus is still the recommended choice, but switching can help. Close your games first. Requirements then installs what VIIPER needs when you click, which can ask for administrator rights and a restart. If VIIPER doesn't start, the app goes back to ViGEmBus and tells you.",
      pt: "No Windows, dá para experimentar o VIIPER. Em Configurações, em Avançado, os controles virtuais podem ser criados pelo VIIPER em vez do ViGEmBus. Ele é experimental e vem desligado, e o ViGEmBus continua sendo o recomendado, mas trocar pode ajudar. Feche os jogos antes. Depois, em Requisitos, o app instala com um clique o que o VIIPER precisa, o que pode pedir permissão de administrador e reiniciar o PC. Se o VIIPER não iniciar, o app volta para o ViGEmBus e avisa.",
    },
  },
  {
    q: { en: "A button I set to a key does nothing in my game.", pt: "Um botão que configurei como tecla não faz nada no jogo." },
    a: {
      en: "Some games ignore keys pressed by other programs, especially games with anti-cheat. Windows also blocks them in games opened as administrator. Some games also forbid macros in their rules, so check before using them; what happens to your account is up to the game.",
      pt: "Alguns jogos ignoram teclas apertadas por outros programas, principalmente os que têm anti-cheat. O Windows também bloqueia essas teclas em jogos abertos como administrador. Alguns jogos também proíbem macros nas regras, então confira antes de usar; o que acontece com a sua conta depende do jogo.",
    },
  },
  {
    q: { en: "A HidHide window opens by itself.", pt: "Uma janela do HidHide abre sozinha." },
    a: {
      en: "That is HidHide's own setup or updater, not OpenController. When HidHide is updated, its installer asks to restart Windows and opens again afterwards to finish. Since version 1.5, HidHide also installs an updater that starts with Windows and lets you know when a new HidHide is out. You can turn it off in Task Manager, under Startup apps, and OpenController keeps working the same.",
      pt: "É o instalador ou o atualizador do próprio HidHide, não o OpenController. Quando o HidHide é atualizado, o instalador pede para reiniciar o Windows e abre de novo depois para terminar. Desde a versão 1.5, o HidHide também instala um atualizador que abre junto com o Windows e avisa quando sai um HidHide novo. Dá para desligá-lo no Gerenciador de Tarefas, em Aplicativos de inicialização, e o OpenController continua funcionando igual.",
    },
  },
  {
    q: { en: "The app shows my controller with another one's name.", pt: "O app mostra meu controle com o nome de outro." },
    a: {
      en: "Some controllers copy another one's USB id, like the Onikuma C1, which says it is a Switch Pro Controller. The app can't tell them apart, so open your controller, go to Information and pick yours under Model. It then shows with its own name and drawing.",
      pt: "Alguns controles copiam o ID USB de outro, como o Onikuma C1, que diz ser um Switch Pro Controller. O app não consegue diferenciá-los, então abra o seu controle, vá em Informações e escolha o modelo certo em Modelo. Aí ele aparece com o nome e o desenho dele.",
    },
  },
  {
    q: { en: "Is it finished?", pt: "Já está pronto?" },
    a: {
      en: "Not yet, it is in beta. With so many controllers out there, some may not work as they should yet and some features are still missing. If something goes wrong, [let us know](#contact).",
      pt: "Ainda não, está em beta. Com tantos controles por aí, alguns podem ainda não funcionar como deveriam e alguns recursos ainda faltam. Se algo der errado, [avise a gente](#contact).",
    },
  },
];


/** Once the app can send a controller report: what that sends, and where to find it. */
const WITH_REPORTS: { replace: string; item: FaqItem }[] = [
  {
    replace: "Does it send any of my data?",
    item: {
      q: { en: "Does it send any of my data?", pt: "Ele envia algum dado meu?" },
      a: {
        en: "Nothing about you: no account, no tracking. When you open its window, it checks GitHub for a new version. You can turn that off in Settings, under Check for updates. On Windows it also downloads the updates and drivers you choose to install, and checks each file before running it. If you report a problem with a controller, it sends that controller's technical details, which you can read before pressing Send, and nothing else.",
        pt: "Nada sobre você: sem conta, sem rastreamento. Quando você abre a janela, ele consulta o GitHub para ver se saiu uma versão nova. Dá para desligar isso em Configurações, na opção Procurar atualizações. No Windows ele também baixa as atualizações e os drivers que você escolher instalar, e confere cada arquivo antes de rodar. Se você reportar um problema com um controle, ele envia os dados técnicos desse controle, que você pode ler antes de apertar Enviar, e mais nada.",
      },
    },
  },
  {
    replace: "Is it finished?",
    item: {
      q: { en: "My controller is not on the list, or misbehaves.", pt: "Meu controle não está na lista, ou funciona errado." },
      a: {
        en: "Most controllers work even off the list. Many are built on the same chip as an Xbox, PlayStation or Switch controller and say they are one, so OpenController knows them as that controller. To get yours added or fixed, open it in OpenController's window, go to Information and press Report a problem. It sends the controller's ids and how the system sees it, which is what it takes to support it without having it in hand. You can add the model and what goes wrong.",
        pt: "A maioria dos controles funciona mesmo fora da lista. Muitos usam o mesmo chip de um controle de Xbox, PlayStation ou Switch e dizem ser um deles, então o OpenController os reconhece como esse controle. Para incluir ou corrigir o seu, abra-o na janela do OpenController, vá em Informações e aperte Reportar um problema. Ele envia os IDs do controle e como o sistema o enxerga, que é o que basta para dar suporte sem ter o controle em mãos. Você pode dizer o modelo e o que está errado.",
      },
    },
  },
];

/** The questions as the page shows them for the latest release. */
export function faqItems(appReports: boolean): FaqItem[] {
  if (!appReports) return QA;
  return QA.flatMap((item) => {
    const w = WITH_REPORTS.find((x) => x.replace === item.q.en);
    if (!w) return [item];
    // The data answer is replaced; the new question goes before "Is it finished?".
    return w.item.q.en === item.q.en ? [w.item] : [w.item, item];
  });
}

/** An answer with its links as plain words. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
