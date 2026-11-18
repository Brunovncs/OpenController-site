import type { HomeMessages } from "../en/home";

const home: HomeMessages = {
  meta: {
    title: "OpenController : n'importe quelle manette sur PC, gratuit",
    description:
      "Utilise ta manette PlayStation, Switch, 8BitDo et des centaines d'autres dans les jeux PC, seul ou entre amis. Gratuit et open source pour Windows, Linux et Mac.",
    features: [
      "Les manettes PlayStation, Switch, 8BitDo et autres apparaissent dans les jeux comme une manette Xbox 360",
      "Plusieurs manettes à la fois, chacune avec son numéro de joueur",
      "N'importe quel bouton en un ou plusieurs boutons, une touche ou une macro, avec des profils par jeu",
      "Visée au gyroscope",
      "Zone morte, courbe de réponse et correction du drift des sticks",
      "Lumière et batterie de la manette",
    ],
  },

  hero: {
    tagline: "Ta manette dans tous les jeux PC.",
    lead: "Utilise des manettes PlayStation, Switch, 8BitDo et d'autres dans tes jeux PC, seul ou entre amis.",
    test: "Teste ta manette",
    video: "L'app OpenController affichant une DualSense, deux Joy-Con, un joystick de vol et un volant pendant qu'on joue, puis les cinq en même temps.",
    caption: "L'app affiche chaque appui sur un dessin de ta manette.",
    facts: [
      { k: "Tourne sur", v: "Windows, Linux et Mac" },
      { k: "Marche avec", v: "Des centaines de manettes" },
      { k: "Coûte", v: "Rien. C'est open source" },
      { k: "Envoie", v: "Rien sur toi" },
    ],
  },

  check: {
    label: "Teste ta manette",
    title: "Teste ta manette ici.",
    body: "Avant de télécharger, vérifie qu'OpenController connaît ta manette. Branche-la et appuie sur un bouton.",
  },

  features: {
    label: "Ce qu'il fait",
    title: "Branche et joue.",
    body: "La plupart des jeux PC sont faits pour la manette Xbox. OpenController fait marcher la tienne avec eux aussi.",
    games: {
      title: "Marche dans tes jeux",
      body: "Les boutons, les sticks, les gâchettes et la vibration marchent comme tu t'y attends. Les manettes Xbox marchent déjà, donc il n'y touche pas. Si un jeu prend en charge ta manette telle quelle, active « Native mode » et le jeu voit la vraie.",
      steps: ["Branche ta manette", "Lance un jeu", "Joue"],
    },
    friends: {
      title: "Joue entre amis",
      body: "Chaque manette est un joueur à part, et reste le même joueur si elle se déconnecte un instant.",
      hint: "Essaie : glisse une manette sur une autre pour échanger les joueurs, ou touches-en deux.",
    },
    custom: {
      title: "À ta façon",
      body: "Change ce que fait n'importe quel bouton, vise avec le gyroscope, corrige un stick qui dérive, et enregistre une config pour chaque jeu, qui s'active quand le jeu s'ouvre. Le « Controller Lab » ajoute des effets de gâchette sur une DualSense, plus le Flick Stick et le pavé tactile comme souris sous Windows. Sous Windows, le bouton micro d'une DualSense peut aussi couper le micro du PC. Rien de tout ça n'est nécessaire pour jouer.",
      setups: { default: "Par défaut", racing: "Jeu de course", shooter: "Jeu de tir" },
      inUse: "actif",
    },
    updates: {
      title: "Toujours à jour",
      body: "L'app te prévient quand une nouvelle version sort. Sous Windows, un clic l'installe et garde tes réglages.",
      notice: "Une nouvelle version est sortie.",
      button: "Update now",
    },
  },

  swap: {
    players: "Joueurs",
    player: "Joueur {n}",
    pad: "{name}, joueur {n}",
    receiver: "Récepteur",
    swapped: "{a} est maintenant le joueur {i}, {b} le joueur {j}.",
  },

  performance: {
    label: "Performances",
    title: "Presque rien en arrière-plan.",
    body: "La fenêtre ne tourne que quand elle est ouverte. Ferme-la et il ne reste que la partie qui fait marcher tes manettes.",
    memory: "Mémoire utilisée",
    note: "Mesuré sur la version 0.8.0 et Windows 11 dans le Gestionnaire des tâches, sans manette branchée. Avec la fenêtre ouverte, il utilisait 30 à 35 Mo.",
    games: "Dans tes jeux",
    measures: [
      { k: "Délai ajouté à ta manette", v: "En général moins d'une milliseconde" },
      { k: "Processeur, sans manette branchée", v: "0 %" },
    ],
    bars: {
      summary: "Jusqu'à {closed} Mo fenêtre fermée, environ {open} Mo fenêtre ouverte.",
      open: "Fenêtre ouverte : {n} Mo",
      closed: "<b>Jusqu'à {n} Mo</b> une fois la fenêtre fermée.",
    },
  },

  controllers: {
    label: "Manettes",
    title: "Trouve ta manette.",
    body: "Cherche la tienne pour voir ce qui marche. La plupart des manettes marchent même si elles ne sont pas dans la liste. Si la tienne pose problème, <a>préviens-nous</a>.",
  },

  platforms: {
    label: "Plateformes",
    title: "Télécharge pour Windows, Linux ou Mac.",
    body: "La même app sur les trois. Un Mac gère déjà les manettes tout seul, donc là-bas elle en fait moins.",
    caption: "Ce qui marche sur chaque système",
    feature: "Fonction",
    yes: "Oui",
    no: "Non",
    rows: {
      games: { label: "Marche dans tes jeux", mac: "Intégré à macOS" },
      players: { label: "Chaque ami reste le même joueur", mac: "" },
      remap: { label: "Boutons réassignés et une config par jeu", mac: "Boutons supplémentaires en touches" },
      light: { label: "Lumière et batterie de la manette", mac: "" },
    },
    windows: {
      title: "Windows 10, 11",
      body: [
        "Pour les PC x64 et ARM. S'installe sans droits administrateur et se met à jour sans réinstaller. Un clic installe les deux pilotes gratuits dont il a besoin.",
        "HidHide, le pilote qui cache la manette d'origine, n'a pas encore de version ARM. Sur un PC ARM, un jeu qui lit aussi la manette d'origine peut la voir en double.",
        "L'installateur n'est pas encore signé, donc la première fois Windows peut afficher « Windows a protégé votre ordinateur ». Clique sur Informations complémentaires, puis sur Exécuter quand même.",
      ],
    },
    linux: {
      title: "Linux",
      body: [
        "Pour x64 et ARM, sur Ubuntu 22.04, Debian 12, Fedora 36 ou plus récent, ou toute distribution avec glibc 2.35 ou plus. Marche avec les jeux natifs et avec Proton ou Wine.",
        "L'installateur demande ton mot de passe une fois pour donner à l'app l'accès à tes manettes. Sur un Steam Deck, définis d'abord un mot de passe en lançant passwd dans Konsole.",
      ],
    },
    mac: {
      title: "macOS 13+",
      body: [
        "Une seule app pour les Mac Apple et Intel. Sur Mac, les jeux marchent déjà avec les manettes PlayStation, Xbox et Switch Pro, et macOS ne laisse pas les apps ajouter des manettes.",
        "Elle ajoute donc ce qui manque : boutons supplémentaires en touches, lumière de la manette, batterie et une config pour chaque jeu. Les touches ont besoin de l'autorisation Accessibilité, que la fenêtre te demande.",
        "macOS la bloque la première fois. Ouvre-la une fois, puis va dans Réglages Système, Confidentialité et sécurité, et clique sur Ouvrir quand même.",
      ],
    },
  },

  download: {
    for: "Télécharger pour {os}",
    any: "Télécharger pour Windows, Linux ou Mac",
    github: "Télécharger sur GitHub",
    githubDown: "GitHub n'a pas répondu à l'instant. La page des versions a tous les fichiers.",
    missing: "Pas de version {os} dans la {version}",
    build: "Compile-le toi-même",
    releases: "Toutes les versions",
    whatsNew: "Nouveautés",
    phone: "OpenController tourne sur ordinateur. Ouvre cette page dessus pour avoir le bon téléchargement.",
    platforms: {
      "windows-x64": { name: "Windows", ask: "PC Intel ou AMD ?" },
      "windows-arm64": { name: "Windows sur ARM", ask: "PC ARM ?" },
      "linux-x64": { name: "Linux", ask: "Ordinateur Intel ou AMD ?" },
      "linux-arm64": { name: "Linux sur ARM", ask: "Ordinateur ARM ?" },
      "macos-universal": { name: "Mac", ask: "Mac ?" },
      "macos-arm64": { name: "Mac, Apple silicon", ask: "Mac Apple silicon ?" },
      "macos-x64": { name: "Mac, Intel", ask: "Mac Intel ?" },
    },
  },

  faq: {
    label: "Questions",
    title: "Questions fréquentes.",
    side: "Une autre question, ou une manette qui ne marche pas bien ? <a>Écris-nous</a>.",
    search: "Chercher dans les questions",
    clear: "Effacer la recherche",
    placeholder: "Essaie Linux, macro ou mise à jour",
    count: { one: "{n} question", other: "{n} questions" },
    none: "Aucune question ne parle de « {q} ».",
    ask: "<a>Pose-nous la question directement</a>.",
    items: [
      {
        id: "free",
        q: "C'est gratuit ?",
        a: "Oui. C'est open source, et les pilotes qu'il utilise sous Windows sont gratuits aussi.",
      },
      {
        id: "how",
        q: "Comment ça marche ?",
        a: "Chacune de tes manettes apparaît dans les jeux comme une manette Xbox 360 avec son propre numéro de joueur, et l'originale est cachée pour que le jeu ne la voie pas en double. Sous Windows, il utilise deux pilotes gratuits, ViGEmBus et HidHide. Sous Linux, il utilise une fonction intégrée au système.",
      },
      {
        id: "data",
        q: "Est-ce qu'il envoie mes données ?",
        a: "Rien sur toi : pas de compte, pas de pistage. Il vérifie sur GitHub s'il y a une nouvelle version quand tu ouvres la fenêtre, ce que tu peux désactiver dans « Settings », sous « Check for updates ». Sous Windows, il télécharge aussi les mises à jour et les pilotes que tu choisis d'installer.",
      },
      {
        id: "dataReports",
        q: "Est-ce qu'il envoie mes données ?",
        a: "Rien sur toi : pas de compte, pas de pistage. Il vérifie sur GitHub s'il y a une nouvelle version quand tu ouvres la fenêtre, ce que tu peux désactiver dans « Settings », sous « Check for updates ». Sous Windows, il télécharge aussi les mises à jour et les pilotes que tu choisis d'installer. « Report a problem » n'envoie que les détails techniques de cette manette, et tu peux les lire avant d'envoyer.",
      },
      {
        id: "languages",
        q: "En quelles langues est l'app ?",
        a: "Anglais, portugais et chinois simplifié. Choisis dans « Settings », sous « Language ».",
      },
      {
        id: "update",
        q: "Comment je mets à jour ?",
        a: "Quand une nouvelle version sort, l'app affiche « Update now ». Sous Windows, elle installe la mise à jour et garde tes réglages. Sous Linux et Mac, elle ouvre la page de téléchargement.",
      },
      {
        id: "steam",
        q: "Ça marche avec Steam ?",
        a: "Oui. Dans les paramètres de Steam, désactive Steam Input pour les manettes PlayStation et Switch, sinon le jeu peut voir chaque appui en double.",
      },
      {
        id: "icons",
        q: "Les jeux afficheront-ils les icônes des boutons PlayStation ?",
        a: "Pas par défaut, puisque les jeux voient une manette Xbox. Si un jeu prend en charge ta manette, ouvre-la dans l'app et active « Native mode » : le jeu voit la vraie manette, avec ses icônes, ses gâchettes adaptatives et, en filaire, le retour haptique. Les profils, la visée au gyroscope et la réassignation sont désactivés tant qu'elle est en natif, et mieux vaut fermer le jeu avant de changer. « Native mode » permet aussi à l'app de fonctionner avec un DS5Dongle.",
      },
      {
        id: "remap",
        q: "Je peux réassigner les boutons pour chaque jeu sans Steam ?",
        a: "Oui, sous Windows et Linux. Dans « Buttons », « All buttons », n'importe quel bouton peut en devenir un autre, plusieurs à la fois, une touche ou une macro. Enregistre-le dans un profil, ajoute le jeu, et il s'active dès que ce jeu est au premier plan.",
      },
      {
        id: "letters",
        q: "A et B sont inversés sur ma manette Switch.",
        a: "Les jeux lisent les boutons par position, comme sur une manette Xbox, donc le B du bas est A dans les jeux. Pour suivre les lettres imprimées, active « Use the controller's letters » dans « Buttons », « All buttons ».",
      },
      {
        id: "drift",
        q: "Mon stick dérive, ou n'atteint plus le bord.",
        a: "Sous Windows et Linux, ouvre ta manette, va dans « Sticks » et appuie sur « Measure the stick ». Ça règle le centre, la zone morte et l'inclinaison maximale d'après la façon dont le stick bouge vraiment, et tu peux aussi les ajuster toi-même pour chaque stick.",
      },
      {
        id: "joycons",
        q: "Chaque Joy-Con peut-il être une manette à part ?",
        a: "Oui, sous Windows et Linux. Ouvre la paire et appuie sur « Split Joy-Cons » : chacun devient une manette tenue à l'horizontale, pour jouer à deux avec une seule paire. « Join Joy-Cons » les réunit. C'est expérimental.",
      },
      {
        id: "gyro",
        q: "Les jeux peuvent-ils utiliser le gyroscope de ma manette ?",
        a: "Les jeux qui ne connaissent que les manettes Xbox, non, mais OpenController peut viser avec, dans « Motion ». Sous Windows, il peut aussi présenter ta manette aux jeux comme une DualShock 4, dans « Information », pour que les jeux et Steam Input qui lisent le mouvement reçoivent le gyroscope. C'est expérimental et désactivé par défaut, car les jeux qui ne connaissent que les manettes Xbox ne la voient alors plus. Les émulateurs comme Cemu peuvent le lire depuis le « Controller Lab ».",
      },
      {
        id: "sticks",
        q: "Ça marche avec les joysticks de vol et les volants ?",
        a: "Oui. Il les laisse tels quels, donc les jeux de vol et de course les lisent directement, avec la rotation, la manette des gaz et le retour de force. Pour utiliser un Logitech Extreme 3D Pro, ou un Logitech G29 sous Linux ou Mac, dans un jeu à la manette, ouvre-le dans l'app et désactive « Native mode ». Pour les autres, envoie leurs détails depuis l'app.",
      },
      {
        id: "players",
        q: "Peut-on jouer à plus de quatre ?",
        a: "La plupart des jeux PC acceptent jusqu'à quatre manettes. Certains plus récents en acceptent plus, et l'app te le signale. Sous Linux, les joueurs au-delà du quatrième ont aussi leur propre numéro.",
      },
      {
        id: "viiper",
        q: "Un jeu ne voit pas ma manette, ou mon PC fait des écrans bleus.",
        a: "Sous Windows, essaie VIIPER : ferme tes jeux, puis dans « Settings », sous « Advanced », crée les manettes virtuelles avec VIIPER au lieu de ViGEmBus. « Requirements » installe alors ce qu'il faut, ce qui peut demander les droits administrateur et un redémarrage. C'est expérimental, et s'il ne démarre pas, l'app revient à ViGEmBus et te prévient.",
      },
      {
        id: "keys",
        q: "Un bouton réglé sur une touche ne fait rien dans mon jeu.",
        a: "Certains jeux ignorent les touches venant d'autres programmes, surtout ceux avec un anti-triche, et Windows les bloque dans les jeux lancés en administrateur. Certains jeux interdisent aussi les macros, donc vérifie leurs règles avant.",
      },
      {
        id: "hidhide",
        q: "Une fenêtre HidHide s'ouvre toute seule.",
        a: "C'est l'installateur ou l'outil de mise à jour de HidHide lui-même, pas OpenController. Après une mise à jour, il redémarre Windows et se rouvre pour terminer. Depuis la 1.5, il ajoute aussi un outil de mise à jour qui démarre avec Windows, que tu peux désactiver dans le Gestionnaire des tâches, sous Applications de démarrage.",
      },
      {
        id: "name",
        q: "L'app affiche ma manette sous le nom d'une autre.",
        a: "Certaines manettes copient l'id USB d'une autre, comme la Onikuma C1, qui se présente comme une Switch Pro Controller. Ouvre ta manette, va dans « Information » et choisis la tienne sous « Model ».",
      },
      {
        id: "offList",
        q: "Ma manette n'est pas dans la liste, ou se comporte mal.",
        a: "La plupart des manettes marchent même hors de la liste, car beaucoup se présentent comme une manette Xbox, PlayStation ou Switch. Pour faire ajouter ou corriger la tienne, ouvre-la dans l'app, va dans « Information » et appuie sur « Report a problem ». Ça envoie ce qu'il faut pour la prendre en charge sans l'avoir en main.",
      },
      {
        id: "offListMapping",
        q: "Ma manette n'est pas dans la liste, ou se comporte mal.",
        a: "La plupart des manettes marchent même hors de la liste, car beaucoup se présentent comme une manette Xbox, PlayStation ou Switch. Si l'app ne sait pas lire ses boutons, sa page affiche « Map the buttons » : appuie sur chaque élément quand on te le demande et elle marche comme une manette Xbox. Pour faire ajouter ou corriger la tienne pour tout le monde, ouvre-la dans l'app, va dans « Information » et appuie sur « Report a problem ».",
      },
      {
        id: "finished",
        q: "C'est terminé ?",
        a: "Pas encore, c'est en bêta. Certaines manettes peuvent ne pas encore bien marcher et il manque des fonctions. Si quelque chose ne va pas, <a>préviens-nous</a>.",
      },
    ],
  },

  contact: {
    label: "Contact",
    title: "Quelque chose ne marche pas ? Dis-le-nous.",
    body: "OpenController est en bêta, et chaque signalement aide. Utilise le formulaire ou ouvre une issue sur GitHub.",
    report: {
      title: "Signaler un problème",
      body: "Indique ton système, la manette et comment elle est branchée, la version d'OpenController et ce qui s'est passé. Une capture d'écran aide.",
      button: "Nous contacter",
      issue: "Ouvrir une issue",
    },
    ideas: {
      title: "Suggestions et questions",
      body: "Une idée, une manette que tu aimerais voir prise en charge ou une question : envoie-la par le même formulaire.",
      button: "Envoyer une suggestion",
    },
    official: {
      title: "Site officiel",
      body: "<b>{domain}</b> est le seul site officiel d'OpenController. Télécharge-le uniquement ici ou sur GitHub. Tout autre site qui le propose n'est pas le nôtre.",
    },
  },

  contactForm: {
    title: "Nous contacter",
    intro: "Dis-nous ce qui s'est passé ou ce que tu aimerais voir. On lit tous les messages.",
    kind: "Sujet",
    kinds: { problem: "Un problème", idea: "Une suggestion", other: "Autre chose" },
    system: "Système d'exploitation",
    systemOther: "Autre",
    systemDetail: "Version ou distribution",
    systemDetailHint: "ex. 23H2, Ubuntu 24.04, Sonoma",
    version: "Version d'OpenController",
    versionHint: "Affichée en haut de sa fenêtre",
    controller: "Manette",
    controllerHint: "Le modèle exact, ex. 8BitDo Ultimate 2 Wireless",
    connection: "Branchée par",
    connections: ["Câble", "Bluetooth", "Son récepteur", "Je ne sais pas"],
    choose: "Choisir",
    message: { problem: "Que s'est-il passé ?", idea: "Ta suggestion", other: "Ton message" },
    messageHint: {
      problem: "Ce que tu as fait, ce que tu attendais et ce qui s'est passé à la place. S'il y a eu un message d'erreur, colle-le ici.",
      idea: "Que devrait faire OpenController, et quand est-ce que ça aiderait ?",
      other: "Écris autant que nécessaire.",
    },
    email: "Ton e-mail (facultatif)",
    emailHint: "Seulement si tu veux une réponse. Il sert uniquement à te répondre.",
    send: "Envoyer",
    close: "Fermer",
    sentTitle: "Message envoyé. Merci !",
    sentBody: "Si tu as laissé ton e-mail, la réponse arrivera là.",
    errors: {
      message: "Écris un peu plus, au moins une phrase.",
      email: "Cet e-mail n'a pas l'air correct.",
      rate: "Trop de messages en peu de temps. Réessaie dans une heure.",
      other: "Le message n'a pas pu être envoyé pour l'instant. Réessaie dans un moment, ou ouvre une issue sur GitHub.",
    },
  },

  request: {
    title: "Demander une manette",
    intro: "Dis-nous quelle manette tu aimerais voir dans la liste. Les plus utilisées passent en premier.",
    model: "Marque et modèle",
    modelHint: "Tel que vendu, ex. Redragon Darkflame G820",
    ids: "Lu par le test de manette",
    notes: "Autre chose (facultatif)",
    notesHint: "Où tu l'as achetée, comment tu la branches, ce qui ne marche pas.",
    email: "Ton e-mail (facultatif)",
    emailHint: "Sert uniquement à te prévenir quand elle est ajoutée.",
    app: "Tu as déjà OpenController ? Il peut envoyer les détails de la manette pour toi : ouvre la manette, puis « Information », puis « Report a problem ».",
    send: "Envoyer la demande",
    close: "Fermer",
    sentTitle: "Demande envoyée. Merci !",
    sentBody: "Si tu as laissé ton e-mail, tu seras prévenu quand elle sera ajoutée.",
    errors: {
      model: "Écris la marque et le modèle.",
      email: "Cet e-mail n'a pas l'air correct.",
      rate: "Trop de demandes en peu de temps. Réessaie dans une heure.",
      other: "La demande n'a pas pu être envoyée pour l'instant. Réessaie dans un moment.",
    },
  },

  footer: {
    blurb: "Gratuit et open source. Joue sur PC avec la manette que tu as déjà.",
    nav: "Projet",
    controllers: "Manettes",
    whatsNew: "Nouveautés",
    report: "Signaler un problème",
    contact: "Nous contacter",
    license: "Licence MIT",
    notices: "Licences tierces",
    official: "OpenController est distribué uniquement depuis <a>{repo}</a> et {domain}. Les autres sites qui utilisent ce nom n'ont aucun lien avec ce projet.",
    source: "OpenController est sous licence <license>MIT</license>. <source>Code source sur GitHub</source>. <bug>Signaler un bug</bug>.",
    disclaimer:
      "Aucun lien avec Sony, Microsoft, Nintendo, Valve, 8BitDo ou tout autre fabricant de manettes ; leurs noms servent seulement à identifier le matériel compatible. ViGEmBus, HidHide, DsHidMini et BthPS3 sont de Nefarius Software Solutions et sont téléchargés depuis leurs pages de versions, pas inclus. Utilisation à tes risques : les auteurs ne sont pas responsables des bannissements ou autres sanctions, par exemple pour des macros dans des jeux qui les interdisent.",
    analytics: "Ce site compte les visites de façon anonyme : pas de cookies, pas d'adresse IP conservée, rien qui permette de distinguer une personne d'une autre le lendemain.",
    madeBy: "Fait par <a>{name}</a>",
  },
};

export default home;
