import type { CheckMessages } from "../en/check";

const check: CheckMessages = {
  controllers: "Manettes",
  status: {
    example: "Exemple",
    idle: "En attente d'une manette",
    known: "Reconnue",
    unknown: "Connectée, absente de la liste",
    xinput: "Connectée comme manette Xbox",
    anon: "Connectée, modèle non indiqué",
  },
  pressed: "Appuyé",
  extra: "· extra",
  pressExample: "Clique ou touche les boutons du dessin.",
  pressIdle: "Les boutons s'allument ici quand tu appuies dessus.",
  pressAny: "Appuie sur un bouton, bouge les sticks, presse les gâchettes.",
  idle: {
    title: "Branche ta manette et appuie sur un bouton.",
    body: "Par câble ou en Bluetooth. Tu verras son nom et ce qu'OpenController peut faire avec.",
    brave: "Brave cache les manettes aux sites web. Ouvre cette page dans Chrome ou Edge, ou essaie un exemple ci-dessous.",
    unsupported: "Ce navigateur ne sait pas lire les manettes. Ouvre cette page dans Chrome ou Edge, ou essaie un exemple ci-dessous.",
    helpTitle: "Elle n'apparaît pas ?",
    help: [
      "Clique sur la page, puis appuie sur un bouton. Les navigateurs n'affichent une manette qu'après un appui.",
      "Brave et certains bloqueurs de pub cachent les manettes. Utilise Chrome ou Edge, ou désactive le bloqueur sur cette page.",
      "Associe d'abord ta manette Bluetooth dans les paramètres de ton système.",
      "Si OpenController est ouvert avec le masquage activé, le navigateur voit sa manette Xbox au lieu de la tienne. Quitte-le pour tester la tienne.",
    ],
  },
  verdict: {
    dinput: "Elle marche déjà telle quelle dans les jeux, en mode Xbox. Pour ses boutons supplémentaires et la visée par mouvement, passe-la en mode D-input, comme expliqué ci-dessous.",
    unsupported: "Cette version ne sait pas encore la lire.",
    handheld: "Les jeux marchent déjà avec la manette intégrée. Sous Windows, OpenController peut aussi assigner ses boutons supplémentaires.",
    passthrough: "Les jeux la prennent déjà en charge, donc OpenController la laisse telle quelle.",
    mac: "Sur Mac, les jeux marchent déjà avec. OpenController ajoute les boutons supplémentaires, la lumière et le niveau de batterie.",
    works: "Marche dans tes jeux comme un joueur à part entière, et garde son numéro de joueur si elle se reconnecte.",
  },
  copied: "Ce n'est pas le nom de la tienne ? Beaucoup de manettes utilisent la puce de la {name} et se présentent comme elle, donc la tienne marche pareil.",
  lookalike: "Si c'est la {names}, choisis-la dans l'app sous « Model », sur sa page « Information ».",
  caps: {
    extras: "Boutons supplémentaires",
    motion: "Visée par mouvement",
    light: "Barre lumineuse",
    touchpad: "Pavé tactile en boutons",
    none: "Aucun",
    yes: "Oui",
    no: "Non",
    dinput: "Oui, en mode D-input",
    lightYes: "Couleur du joueur, ta couleur ou la batterie",
    touchpadYes: "Oui, comme boutons supplémentaires",
  },
  mapping: "Ton navigateur ne connaît pas cette disposition, donc le dessin peut allumer les mauvais boutons. OpenController lit la manette lui-même et n'a pas ce problème.",
  seeFamily: "Voir toutes les manettes de ce type",
  unknown: "Pas encore dans notre liste, mais elle marchera sans doute. <a>Demande son ajout</a> et les identifiants que ton navigateur vient de lire partent avec la demande.",
  xinput:
    "Elle marche, et les jeux la voient comme une manette Xbox. Windows ne donne pas le modèle exact au navigateur. Une 8BitDo ou similaire en mode Xbox cache ses boutons supplémentaires : passe-la en D-input (sur une 8BitDo, allume-la en maintenant B) ou utilise le Bluetooth. Si OpenController est ouvert, c'est peut-être la manette Xbox qu'il présente aux jeux.",
  anon: "Ton navigateur n'a pas indiqué de quelle manette il s'agit. Safari ne le fait jamais. Ouvre cette page dans Chrome ou Edge pour voir les détails.",
  tryOne: "Pas de manette sous la main ? Essaie un exemple :",
};

export default check;
