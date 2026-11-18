import type { CheckMessages } from "../en/check";

const check: CheckMessages = {
  controllers: "Controles",
  status: {
    example: "Exemplo",
    idle: "Esperando um controle",
    known: "Reconhecido",
    unknown: "Conectado, fora da lista",
    xinput: "Conectado como controle de Xbox",
    anon: "Conectado, modelo não informado",
  },
  pressed: "Apertado",
  extra: "· extra",
  pressExample: "Clique ou toque nos botões do desenho.",
  pressIdle: "Os botões acendem aqui conforme você aperta.",
  pressAny: "Aperte qualquer botão, mexa os analógicos, puxe os gatilhos.",
  idle: {
    title: "Conecte seu controle e aperte qualquer botão.",
    body: "Por cabo ou Bluetooth. Você vê o nome dele e o que o OpenController consegue fazer com ele.",
    brave: "O Brave esconde os controles dos sites. Abra esta página no Chrome ou no Edge, ou teste um exemplo abaixo.",
    unsupported: "Este navegador não lê controles. Abra esta página no Chrome ou no Edge, ou teste um exemplo abaixo.",
    helpTitle: "Não aparece?",
    help: [
      "Clique na página e aperte um botão. O navegador só mostra o controle depois de um toque.",
      "O Brave e alguns bloqueadores de anúncio escondem os controles. Use o Chrome ou o Edge, ou desligue o bloqueador nesta página.",
      "Pareie o controle Bluetooth nas configurações do sistema antes.",
      "Se o OpenController estiver aberto com a ocultação ligada, o navegador vê o controle de Xbox dele, e não o seu. Feche o app para testar o seu.",
    ],
  },
  verdict: {
    dinput: "Ele já funciona nos jogos assim, no modo Xbox. Para usar os botões extras e a mira com movimento, mude para o modo D-input, como explicado abaixo.",
    unsupported: "Esta versão ainda não consegue ler esse controle.",
    handheld: "Os jogos já funcionam com o controle embutido. No Windows, o OpenController também dá função aos botões extras dele.",
    passthrough: "Os jogos já aceitam esse controle, então o OpenController deixa ele como está.",
    mac: "No Mac, os jogos já funcionam com ele. O OpenController acrescenta os botões extras, a luz e o nível de bateria.",
    works: "Funciona nos seus jogos como um jogador próprio, e mantém o número do jogador se reconectar.",
  },
  copied: "Não é o nome do seu? Muitos controles usam o chip do {name} e se apresentam como ele, então o seu funciona igual.",
  lookalike: "Se for o {names}, escolha ele no app em Modelo, na página Informações.",
  caps: {
    extras: "Botões extras",
    motion: "Mira com movimento",
    light: "Barra de luz",
    touchpad: "Touchpad como botões",
    none: "Nenhum",
    yes: "Sim",
    no: "Não",
    dinput: "Sim, no modo D-input",
    lightYes: "Cor do jogador, a sua cor ou a bateria",
    touchpadYes: "Sim, como botões extras",
  },
  mapping: "O navegador não conhece esse layout, então o desenho pode acender os botões errados. O OpenController lê o próprio controle e não tem esse problema.",
  seeFamily: "Ver todos os controles parecidos",
  unknown: "Ainda não está na nossa lista, mas provavelmente funciona. <a>Peça para incluirmos</a> e os IDs que o navegador acabou de ler vão junto com o pedido.",
  xinput:
    "Funciona, e os jogos o veem como controle de Xbox. O Windows não conta ao navegador o modelo exato. Um 8BitDo ou parecido no modo Xbox esconde os botões extras: mude para D-input (no 8BitDo, ligue segurando B) ou use Bluetooth. Se o OpenController estiver aberto, este pode ser o controle de Xbox que ele mostra aos jogos.",
  anon: "Seu navegador não informou qual controle é este. O Safari nunca informa. Abra esta página no Chrome ou no Edge para ver os detalhes.",
  tryOne: "Sem controle por perto? Teste um:",
};

export default check;
