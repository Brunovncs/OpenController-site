import type { GuideFacts, GuideNoun, GuidesMessages } from "../en/guides";

const pick = (n: GuideNoun, one: string, many: string) => (n.plural ? many : one);
const vowel = (n: GuideNoun) => /^[aeiouhéèêAEIOUHÉ]/.test(n.name);
const ton = (n: GuideNoun) => (n.plural ? "tes" : n.gender === "m" || vowel(n) ? "ton" : "ta");
const le = (n: GuideNoun) => pick(n, n.gender === "m" ? "le" : "la", "les");
const the = (n: GuideNoun) => (n.plural ? "les " : vowel(n) ? "l'" : n.gender === "m" ? "le " : "la ");
const The = (n: GuideNoun) => {
  const s = the(n) + n.name;
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const ses = (n: GuideNoun) => pick(n, "ses", "leurs");

const guides: GuidesMessages = {
  names: {
    dualsense: { name: "DualSense", gender: "f" },
    "dualsense-edge": { name: "DualSense Edge", gender: "f" },
    "dualshock-4": { name: "DualShock 4", gender: "f" },
    "dualshock-3": { name: "DualShock 3", gender: "f" },
    "ps2-controller": { name: "manette PS2", gender: "f" },
    "switch-pro-controller": { name: "Switch Pro Controller", gender: "f" },
    "joy-con": { name: "Joy-Con", gender: "m" },
    "switch-online-controllers": { name: "manettes SNES, N64 et Mega Drive du Switch Online", plural: true, gender: "f" },
    "switch-2-controllers": { name: "manettes Switch 2", plural: true, gender: "f" },
    "gamecube-controller": { name: "manette GameCube", gender: "f" },
    "wii-remote": { name: "Wiimote et Wii U Pro Controller", plural: true, gender: "f" },
    "xbox-controller": { name: "manette Xbox", gender: "f" },
    "xbox-elite": { name: "manette Xbox Elite", gender: "f" },
    "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2, Ultimate 3 et Pro 3", plural: true, gender: "f" },
    "8bitdo-ultimate": { name: "8BitDo Ultimate", gender: "f" },
    "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C", gender: "f" },
    "8bitdo-pro-2": { name: "8BitDo Pro 2", gender: "f" },
    "8bitdo-sn30-pro": { name: "8BitDo SN30 Pro et manettes rétro", plural: true, gender: "f" },
    "steam-deck": { name: "commandes du Steam Deck", plural: true, gender: "f" },
    "steam-controller": { name: "Steam Controller", gender: "m" },
    "handheld-pc": { name: "commandes de PC portable", plural: true, gender: "f" },
    "flydigi-vader": { name: "Flydigi Vader", gender: "f" },
    "flydigi-apex": { name: "Flydigi Apex", gender: "f" },
    "stadia-controller": { name: "manette Stadia", gender: "f" },
    "luna-controller": { name: "manette Amazon Luna", gender: "f" },
    "shield-controller": { name: "manette NVIDIA Shield", gender: "f" },
    "generic-controllers": { name: "manettes PowerA, Hori, Razer et autres", plural: true, gender: "f" },
  },

  title: (n) => `${n.Name} sur PC`,
  metaTitle: "{title} | OpenController",

  description: {
    xbox: (n: GuideNoun, f: GuideFacts) => {
      const motion = f.gyro === "yes" ? "vise par mouvement" : f.gyro === "dinput" ? "vise par mouvement en mode D-input" : "";
      const more = f.extras && motion ? ` Règle ${ses(n)} boutons supplémentaires et ${motion}.` : f.extras ? ` Règle ${ses(n)} boutons supplémentaires.` : motion ? ` ${motion.charAt(0).toUpperCase()}${motion.slice(1)}.` : "";
      return `Utilise ${ton(n)} ${n.name} dans n'importe quel jeu PC comme une manette Xbox.${more} Gratuit pour Windows et Linux.`;
    },
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `Les jeux PC lisent déjà ${ton(n)} ${n.name}. OpenController ajoute ${ses(n)} boutons supplémentaires en touches et macros. Gratuit.`
        : `Les jeux PC lisent déjà ${ton(n)} ${n.name}. OpenController ${pick(n, "lui", "leur")} donne un numéro de joueur fixe à côté de tes autres manettes. Gratuit pour Windows et Linux.`,
    unsupported: (n) => `${The(n)} ne ${pick(n, "marche", "marchent")} pas encore avec OpenController. Découvre quelles manettes marchent.`,
  },

  intro: {
    xbox: (n) =>
      `Beaucoup de jeux PC ne lisent que les manettes Xbox. Avec OpenController ouvert, ${ton(n)} ${n.name} ${pick(n, "apparaît", "apparaissent")} dans les jeux comme une manette Xbox 360, et ${pick(n, "la manette d'origine est cachée pour que le jeu ne la voie", "les manettes d'origine sont cachées pour que le jeu ne les voie")} pas en double.`,
    passthrough: (n, f) =>
      f.extras
        ? `Les jeux PC lisent déjà ${ton(n)} ${n.name}. OpenController ne touche pas au reste et ajoute ${ses(n)} boutons supplémentaires en touches et macros.`
        : `Les jeux PC lisent déjà ${ton(n)} ${n.name}. OpenController n'y touche pas et ${pick(n, "lui", "leur")} garde un numéro de joueur fixe quand des amis jouent avec d'autres manettes.`,
    unsupported: (n) => `OpenController reconnaît ${ton(n)} ${n.name}, mais ne sait pas encore ${le(n)} lire.`,
  },

  steps: {
    download: "Télécharge OpenController et ouvre-le. Sous Windows, sa page « Requirements » installe en un clic les pilotes gratuits dont il a besoin.",
    connect: "Branche la manette par câble, en Bluetooth ou avec son récepteur. Elle apparaît dans la fenêtre d'OpenController, dessinée avec sa vraie forme.",
    extras: "Clique dessus pour régler les boutons supplémentaires. Chacun peut être un ou plusieurs boutons Xbox, une touche ou une macro, avec un profil par jeu si tu veux.",
    gyro: "Pour viser en bougeant la manette, active la visée dans « Motion » : tout le temps, pendant la visée ou en maintenant un bouton.",
    play: "Lance ton jeu. Il voit une manette Xbox 360.",
    passthroughExtras: "Clique dessus pour régler ses boutons supplémentaires en touches ou macros. Les jeux continuent de lire la manette comme avant.",
    passthrough: "Lance ton jeu. Il lit la manette comme avant, maintenant avec un numéro de joueur fixe.",
  },

  page: {
    breadcrumb: "Fil d'Ariane",
    controllers: "Manettes",
    test: "Teste ta manette",
    works: "Ce qui marche",
    setup: "Comment la configurer",
    steamTip: "Tu utilises Steam ? Dans ses paramètres, désactive Steam Input pour les manettes PlayStation et Switch, sinon le jeu peut recevoir chaque appui en double.",
    faq: "D'autres réponses dans les <a>questions fréquentes</a>.",
    models: "Modèles ({n})",
    modelsIntro: "La plupart des manettes marchent même si elles ne sont pas dans cette liste.",
    missing: "La tienne manque ou se comporte mal ? <a>Préviens-nous</a>.",
    more: "Autres manettes",
    all: "Toutes les manettes",
  },

  index: {
    metaTitle: "N'importe quelle manette sur PC : PlayStation, Switch, Stadia et plus | OpenController",
    description:
      "Utilise les manettes PlayStation, Switch, Stadia, Luna, Flydigi, 8BitDo et de PC portables dans tout jeu PC comme une manette Xbox. Vois ce qui marche. Gratuit.",
    title: "Les manettes qui marchent sur PC avec OpenController",
    intro: "OpenController connaît {n} modèles de manettes, et la plupart des autres marchent aussi. Choisis la tienne, ou <a>cherche par nom</a>.",
    models: { one: "1 modèle", other: "{n} modèles" },
  },

  links: { title: "Comment utiliser chaque manette sur PC" },

  copy: {
    dualsense: {
      title: "Manette PS5 DualSense sur PC, dans tous les jeux | OpenController",
      description:
        "La DualSense de la PS5 dans tout jeu PC comme une manette Xbox, en USB ou Bluetooth. Visée gyro, pavé tactile en boutons, barre lumineuse. Gratuit, Windows et Linux.",
      sections: {
        native: {
          title: "Xbox ou natif",
          body: [
            "Par défaut, les jeux reçoivent une manette Xbox 360, avec les icônes Xbox et la vibration. Ils ne peuvent pas utiliser le retour haptique ni les gâchettes adaptatives, mais la page « Controller Lab » de l'app peut donner aux gâchettes sa propre résistance ou vibration. Pour les jeux qui prennent en charge la DualSense, active « Native mode » sur la page de la manette : ils reçoivent les icônes PlayStation, les gâchettes adaptatives et, en filaire, le retour haptique. Les profils, le gyroscope et la réassignation sont désactivés en « Native mode ».",
          ],
        },
        "gyro-touchpad": {
          title: "Gyroscope et pavé tactile",
          body: [
            "Le gyroscope s'ajoute au stick droit : tout le temps, quand tu presses L2, ou tant que tu maintiens un bouton. Le pavé tactile donne quatre boutons : clic, moitié gauche, moitié droite et deux doigts. Chacun d'eux, et le bouton micro, peut être un bouton Xbox, une touche ou une macro, par jeu. Sous Windows, le pavé tactile peut aussi bouger la souris, et le bouton micro peut couper le micro du PC.",
          ],
        },
        cable: {
          title: "Câble et Bluetooth",
          body: [
            "Branche le câble sur une DualSense en Bluetooth et elle reste le même joueur : le jeu ne la voit pas se déconnecter. Les voyants de joueur et la barre lumineuse montrent le numéro du joueur, ou la barre lumineuse peut montrer la batterie.",
          ],
        },
      },
    },

    "dualshock-4": {
      title: "Manette PS4 DualShock 4 sur PC, dans tous les jeux | OpenController",
      description:
        "Utilise la DualShock 4 de la PS4 dans tout jeu PC comme une manette Xbox, par câble, Bluetooth ou l'adaptateur Sony. Visée gyro. Gratuit, Windows et Linux.",
      sections: {
        connect: {
          title: "Câble, Bluetooth ou adaptateur",
          body: [
            "Les deux versions de la DualShock 4 marchent en USB, en Bluetooth ou avec l'adaptateur sans fil USB de Sony. Branche le câble sur une manette en Bluetooth et elle reste le même joueur.",
          ],
        },
        light: {
          title: "Barre lumineuse",
          body: [
            "La barre lumineuse montre le numéro du joueur avec les couleurs PlayStation : bleu, rouge, vert, rose. Elle peut aussi afficher une couleur que tu choisis, la batterie du vert au rouge, ou rien. Elle clignote sous 15 % de batterie.",
          ],
        },
        "gyro-touchpad": {
          title: "Gyroscope et pavé tactile",
          body: [
            "Le gyroscope s'ajoute au stick droit : tout le temps, quand tu presses L2, ou tant que tu maintiens un bouton. Le pavé tactile donne quatre boutons : clic, moitié gauche, moitié droite et deux doigts. Chacun peut être un bouton Xbox, une touche ou une macro, par jeu. Sous Windows, le pavé tactile peut aussi bouger la souris.",
          ],
        },
      },
    },

    "switch-pro-controller": {
      title: "Switch Pro Controller sur PC, dans tous les jeux | OpenController",
      description:
        "Utilise la Switch Pro Controller dans tout jeu PC comme une manette Xbox, en USB ou Bluetooth. Visée gyro, Capture en touche ou macro. Gratuit, Windows et Linux.",
      sections: {
        layout: {
          title: "Disposition des boutons",
          body: [
            "Les boutons suivent leur position, pas leur lettre. Celui du bas, B sur Switch, est le A Xbox, et celui de droite, A, est le B Xbox. Pour garder les lettres, inverse-les dans « Buttons », par jeu si tu veux.",
          ],
        },
        "gyro-capture": {
          title: "Gyroscope, Capture et voyants",
          body: [
            "Le gyroscope s'ajoute au stick droit : tout le temps, en maintenant ZL, ou tant que tu maintiens un bouton. Capture peut être un bouton Xbox, une touche ou une macro. Les voyants de joueur montrent le numéro du joueur, comme sur une Switch.",
          ],
        },
      },
    },

    "stadia-controller": {
      title: "Manette Stadia sur PC : utilise-la dans tous les jeux | OpenController",
      description:
        "Stadia n'existe plus, mais sa manette marche encore. Utilise-la dans tout jeu PC comme une manette Xbox, en USB ou Bluetooth, sous Windows et Linux. Gratuit.",
      sections: {
        "after-stadia": {
          title: "Après Stadia",
          body: [
            "Google a fermé Stadia en janvier 2023, mais la manette marche toujours comme une manette normale et n'a besoin de rien de la part de Google. La plupart des jeux Windows ne lisent que les manettes Xbox, donc ils l'ignorent. OpenController la lit et donne à tes jeux une manette Xbox 360 à la place.",
          ],
        },
        connect: {
          title: "USB ou Bluetooth",
          body: [
            "Avec le câble USB-C, elle marche tout de suite. Le Bluetooth ne marche que si la manette a été passée en mode Bluetooth avec l'outil publié par Google à la fermeture de Stadia. Si ce n'est pas le cas de la tienne, utilise le câble.",
          ],
        },
        buttons: {
          title: "Capture et Assistant",
          body: [
            "Les jeux n'utilisent pas les boutons Capture et Assistant. Sous Windows et Linux, chacun peut être un ou plusieurs boutons Xbox, une touche ou une macro, avec un profil par jeu qui s'active tout seul. Sur Mac, ils marchent comme des touches.",
          ],
        },
        linux: {
          title: "Sous Linux",
          body: [
            "Le script d'installation ajoute une règle pour que l'app puisse lire la manette sans root. Les jeux, Wine et Proton voient une manette Xbox 360.",
          ],
        },
      },
    },

    "flydigi-vader": {
      title: "Flydigi Vader 5 Pro et 4 Pro sur PC et Linux | OpenController",
      description:
        "Utilise la Flydigi Vader 5 Pro, 4 Pro ou une Vader plus ancienne dans tout jeu PC comme une manette Xbox, avec M1 à M4, C et Z assignés. Windows et Linux, gratuit.",
      sections: {
        which: {
          title: "Quelle Vader tu as",
          body: [
            "Les Vader 4 Pro, 5 Pro et la Direwolf 4 se branchent par câble ou avec le récepteur. Les Vader 2 et 3, plus anciennes, utilisent leur propre récepteur plus ancien. Toutes apparaissent dans les jeux comme une manette Xbox 360.",
            "La Vader 5S est différente. C'est une manette filaire faite pour Xbox, et Windows la lit comme n'importe quelle manette Xbox, donc OpenController voit une Xbox Wireless Controller. Windows ne transmet pas ses boutons en plus aux autres applis. Donne-leur des boutons Xbox dans Space Station for Xbox et ils marchent partout comme ces boutons.",
          ],
        },
        "space-station": {
          title: "Boutons supplémentaires et Space Station",
          body: [
            "M1 à M4, C, Z, LM et RM peuvent chacun être un ou plusieurs boutons Xbox, une touche ou une macro, avec un profil par jeu qui s'active tout seul.",
            "Sur la Vader 4 Pro, la 5 Pro et la Direwolf 4, active « Allow third-party apps to take over mappings » dans Flydigi Space Station, sinon les autres apps ne peuvent pas lire ces boutons. La fenêtre d'OpenController te le rappelle quand c'est nécessaire. Les Vader 2 et 3 sur l'ancien récepteur n'en ont pas besoin.",
          ],
        },
        linux: {
          title: "Sous Linux",
          body: [
            "Le script d'installation ajoute une règle pour que l'app puisse lire la Vader sans root. Les jeux, Wine et Proton voient une manette Xbox 360, et les boutons supplémentaires marchent comme sous Windows, avec le même rappel Space Station pour les manettes plus récentes.",
          ],
        },
      },
    },
  },

  changelog: {
    metaTitle: "Nouveautés d'OpenController | Notes de version",
    description: "Toutes les versions d'OpenController, de la plus récente à la plus ancienne : ce qui a changé et si tes réglages sont conservés.",
    title: "Nouveautés",
    intro: "L'app vérifie s'il y a une nouvelle version quand sa fenêtre s'ouvre et se met à jour sans réinstallation.",
    notesInEnglish: "Les notes de chaque version sont écrites en anglais.",
    feed: "Toutes les versions",
    rss: "Suivre par RSS",
    latest: "La {version} est sortie le {date}.",
    first: "Ce sont toutes les versions depuis la première, la {version}, sortie le {date}.",
    offline: "GitHub n'a pas répondu à l'instant.",
    offlineLink: "Les notes sont aussi sur la <a>page des versions</a>.",
    day: (day, month) => `${day} ${month.toLowerCase()}`,
    labels: {
      count: { one: "{n} version", other: "{n} versions" },
      monthNav: "Aller au mois",
      jumpTo: "Aller à {month}",
      scroller: "Notes de version",
      source: "Sur GitHub",
    },
  },
};

export default guides;
