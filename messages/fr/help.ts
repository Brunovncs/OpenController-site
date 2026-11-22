import type { HelpMessages } from "../en/help";

const help: HelpMessages = {
  index: {
    title: "Aide",
    metaTitle: "Aide manette pour les jeux PC | OpenController",
    description: "Réponses aux problèmes courants avec les manettes sur PC : manette PS5 ou PS4, manettes Switch, jeux qui ignorent ta manette, drift et visée au gyroscope.",
    lead: "Des réponses courtes aux problèmes qu'on rencontre avec les manettes sur PC.",
  },
  ui: {
    home: "Accueil",
    help: "Aide",
    answer: "En bref",
    steps: "Étape par étape",
    related: "Voir aussi",
    download: "Télécharger OpenController",
    test: "Tester ta manette",
    free: "Gratuit et open source, pour Windows, Linux et Mac.",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "Utiliser une manette PS5 sur PC",
      metaTitle: "Comment utiliser une manette PS5 (DualSense) sur PC",
      description: "Branche une DualSense par câble ou en Bluetooth et joue à n'importe quel jeu PC avec, même ceux qui ne connaissent que la manette Xbox.",
      answer:
        "Windows voit la DualSense, mais beaucoup de jeux ne comprennent que les manettes Xbox. OpenController présente ta DualSense aux jeux comme une manette Xbox, donc elle marche dans tous, et garde ses extras : gyroscope, pavé tactile et bouton micro.",
      steps: [
        "<download>Télécharge OpenController</download> et ouvre-le. Sous Windows, sa page « Requirements » installe les deux pilotes gratuits dont il a besoin.",
        "Branche la DualSense avec un câble USB, ou associe-la en Bluetooth : maintiens Create et le bouton PS jusqu'à ce que la lumière clignote, puis ajoute-la dans les paramètres Bluetooth de Windows.",
        "Elle apparaît dans la fenêtre avec un numéro de joueur. Lance ton jeu et joue.",
      ],
      sections: [
        {
          h: "Gâchettes adaptatives et retour haptique",
          p: [
            "Les jeux voient une manette Xbox, donc ils ne peuvent pas utiliser les gâchettes adaptatives. « Native mode », sur la page de la manette, rend la vraie DualSense aux jeux qui la prennent en charge, avec leurs gâchettes et, en filaire, le retour haptique. Sinon, le « Controller Lab » donne ses propres effets aux gâchettes, dans n'importe quel jeu : résistance, vibration ou clic. Il fait de même sur les Flydigi Apex 3, 4 et 5, dont les gâchettes résistent aussi.",
          ],
        },
        {
          h: "Gyroscope, pavé tactile et micro",
          p: [
            "Tourner la manette peut servir à viser : tout le temps, pendant la visée ou tant que tu maintiens un bouton. Le pavé tactile et le bouton micro peuvent appuyer sur des boutons Xbox, des touches ou des macros. Sous Windows, le pavé tactile peut aussi bouger la souris, et le bouton micro peut couper le micro du PC.",
          ],
        },
        {
          h: "Jeux Steam",
          p: [
            "Si Steam Input est activé pour les manettes PlayStation, Steam lit aussi la DualSense et un appui peut compter deux fois. Désactive la prise en charge PlayStation dans les paramètres de manette de Steam.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "Utiliser une manette PS4 sur PC",
      metaTitle: "Comment utiliser une manette PS4 (DualShock 4) sur PC",
      description: "Joue aux jeux PC avec une DualShock 4 par câble, en Bluetooth ou avec l'adaptateur sans fil de Sony, avec la barre lumineuse qui montre ton joueur.",
      answer:
        "Beaucoup de jeux PC ne lisent pas la manette PS4. OpenController la leur présente comme une manette Xbox, par câble, en Bluetooth ou avec l'adaptateur sans fil de Sony, et sa barre lumineuse montre ton numéro de joueur.",
      steps: [
        "<download>Télécharge OpenController</download> et ouvre-le. Sous Windows, sa page « Requirements » installe les deux pilotes gratuits dont il a besoin.",
        "Branche la DualShock 4 avec un câble USB, ou associe-la en Bluetooth : maintiens Share et le bouton PS jusqu'à ce que la lumière clignote, puis ajoute-la dans les paramètres Bluetooth de Windows.",
        "Sa lumière prend la couleur de son joueur. Lance ton jeu et joue.",
      ],
      sections: [
        {
          h: "Pavé tactile et gyroscope",
          p: [
            "En plus de son clic, le pavé tactile donne trois boutons : sa moitié gauche, sa moitié droite et deux doigts. Chacun peut appuyer sur un bouton Xbox, une touche ou une macro. Tourner la manette peut servir à viser, comme une souris dans la main.",
          ],
        },
        {
          h: "Barre lumineuse",
          p: [
            "La lumière montre la couleur du joueur, comme sur une PlayStation, une couleur que tu choisis, ou la batterie du vert au rouge. Elle clignote quand la batterie est faible.",
          ],
        },
        {
          h: "Si tu viens de DS4Windows",
          p: ["DS4Windows a fait ce travail pendant des années et n'est plus maintenu. <ds4windows>Voici ce qui change</ds4windows> si tu passes à OpenController."],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "Utiliser une Switch Pro Controller ou des Joy-Con sur PC",
      metaTitle: "Utiliser une Switch Pro Controller ou des Joy-Con sur PC",
      description: "Joue aux jeux PC avec une Switch Pro Controller ou des Joy-Con, en paire ou à l'horizontale, avec les boutons là où tu les attends.",
      answer:
        "OpenController fait marcher la Switch Pro Controller et les Joy-Con dans les jeux PC comme des manettes Xbox. Une paire de Joy-Con joue comme une seule manette, ou comme deux, une par ami, tenues à l'horizontale.",
      steps: [
        "<download>Télécharge OpenController</download> et ouvre-le. Sous Windows, sa page « Requirements » installe les deux pilotes gratuits dont il a besoin.",
        "Associe la manette en Bluetooth : maintiens son petit bouton de synchronisation jusqu'à ce que les lumières défilent, puis ajoute-la dans les paramètres Bluetooth de Windows. La Pro Controller marche aussi avec un câble USB.",
        "Elle apparaît dans la fenêtre avec un numéro de joueur. Lance ton jeu et joue.",
      ],
      sections: [
        {
          h: "A ou B ?",
          p: [
            "Les boutons suivent leur position, donc le bouton du bas est A dans les jeux, comme sur une manette Xbox. Pour utiliser les lettres imprimées, active « Use the controller's letters » sous « All buttons », sur la page de la manette.",
          ],
        },
        {
          h: "Deux joueurs avec une paire",
          p: [
            "Sur la page de la paire, « Split Joy-Cons » fait de chaque Joy-Con une manette à part, tenue à l'horizontale : stick à gauche, boutons à droite, SL et SR comme gâchettes hautes. « Join Joy-Cons » les réunit. C'est expérimental, sous Windows et Linux.",
          ],
        },
        {
          h: "Gyroscope et Capture",
          p: ["Les deux ont un gyroscope, donc tourner la manette peut servir à viser. Le bouton Capture peut appuyer sur un bouton Xbox, une touche ou une macro."],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "La manette marche dans les menus mais pas en jeu",
      metaTitle: "Manette qui marche dans les menus mais pas en jeu sur PC",
      description: "Ta manette fait bouger les menus de Steam ou de Windows, mais ne fait rien en jeu. Pourquoi ça arrive et comment le régler.",
      answer:
        "En général, ça veut dire que le jeu ne lit que les manettes Xbox, alors que Windows et le launcher lisent bien la tienne. OpenController présente ta manette aux jeux comme une manette Xbox, ce qui règle le problème dans la plupart des jeux.",
      sections: [
        {
          h: "Pourquoi ça arrive",
          p: [
            "Windows a plusieurs façons de laisser les programmes lire les manettes. Les launchers et les menus en utilisent souvent une qui voit n'importe quelle manette. Beaucoup de jeux n'utilisent que XInput, qui ne voit que les manettes Xbox, donc une manette PlayStation, Switch ou générique leur est invisible.",
          ],
        },
        {
          h: "La solution",
          p: [
            "<download>Télécharge OpenController</download>, ouvre-le et branche ta manette. Quand elle apparaît avec un numéro de joueur, les jeux la voient comme une manette Xbox. Relance le jeu s'il était déjà ouvert.",
          ],
        },
        {
          h: "Si les appuis comptent deux fois",
          p: [
            "Steam Input ou le jeu peuvent encore lire la manette d'origine à côté de la manette Xbox. HidHide, proposé sur la page « Requirements », cache les manettes d'origine aux jeux : relance le jeu après l'avoir installé. Avec Steam, désactive la prise en charge PlayStation ou Switch dans ses paramètres de manette.",
          ],
        },
        {
          h: "Toujours rien",
          p: [
            "Certains jeux n'écoutent que la première manette. Glisse la vignette de ta manette sur celle de « Player 1 » pour les échanger. Les touches et macros des boutons supplémentaires n'atteignent pas les jeux lancés en administrateur.",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "Le PC ne reconnaît pas la manette",
      metaTitle: "Le PC ne reconnaît pas ta manette ? Vérifie ça d'abord",
      description: "Quoi vérifier quand le PC ne voit pas ta manette, et comment faire marcher une manette générique ou inconnue dans les jeux.",
      answer:
        "Vérifie d'abord si le PC la lit : <test>le test sur notre page d'accueil</test> affiche n'importe quelle manette en quelques secondes et dit ce que c'est. Si elle y apparaît, le PC la voit, et OpenController peut faire en sorte que les jeux la voient aussi.",
      sections: [
        {
          h: "Vérifie les bases",
          p: [
            "Essaie un autre câble : certains ne font que charger. Branche-la directement sur le PC, pas sur un hub. En Bluetooth, mets la manette en mode association et ajoute-la dans les paramètres de Windows. Sur les 8BitDo et manettes similaires, vérifie le sélecteur de mode : en mode XInput, les boutons supplémentaires et le gyroscope restent cachés.",
          ],
        },
        {
          h: "Manettes génériques et inconnues",
          p: [
            "La plupart des manettes génériques copient la puce d'une manette Xbox, PlayStation ou Switch et marchent comme elle. Si OpenController ne sait pas lire les boutons de la tienne, sa page propose « Map the buttons » : il allume chaque élément sur le dessin et tu appuies dessus. Ensuite, elle marche comme une manette Xbox.",
          ],
        },
        {
          h: "Demande son ajout",
          p: ["« Report a problem », sur la page « Information » de la manette, envoie ses détails pour qu'elle puisse être ajoutée. Tu peux aussi <contact>nous écrire</contact>."],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "Une alternative à DS4Windows",
      metaTitle: "Alternative à DS4Windows : gratuite, open source et maintenue",
      description: "DS4Windows n'est plus maintenu. OpenController fait le même travail pour les manettes PlayStation et gère aussi Switch, 8BitDo et des centaines d'autres.",
      answer:
        "DS4Windows n'est plus maintenu, et les téléchargements à son nom viennent désormais de sites qui ne sont pas ceux de ses auteurs. OpenController est une app gratuite et open source qui fait le même travail pour les manettes PlayStation et gère aussi Switch, 8BitDo et des centaines d'autres.",
      sections: [
        {
          h: "Ce que tu retrouves",
          p: [
            "Ta DualShock 4 ou ta DualSense devient une manette Xbox dans les jeux, plusieurs à la fois, chacune avec son numéro de joueur sur sa lumière. Visée au gyroscope, pavé tactile en boutons, couleur et batterie sur la barre lumineuse, et profils qui changent selon le jeu au premier plan : tout y est. Il utilise les mêmes pilotes gratuits, ViGEmBus et HidHide.",
          ],
        },
        {
          h: "Ce qui change",
          p: [
            "Il lit les manettes via SDL, donc il ne se limite pas aux manettes PlayStation. Il tourne sous Windows, Linux et Mac, où il ajoute des boutons et des lumières mais pas de manettes virtuelles. Présenter aux jeux une DualShock 4 au lieu d'une manette Xbox existe sous Windows, en option expérimentale.",
          ],
        },
        {
          h: "Pour passer de l'un à l'autre",
          p: [
            "Quitte d'abord DS4Windows, pour que les deux ne créent pas chacun une manette virtuelle pour la même manette. Si DS4Windows a installé ViGEmBus et HidHide, OpenController les utilise tels quels.",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "Viser au gyroscope sur PC",
      metaTitle: "Visée au gyroscope sur PC avec une manette PlayStation ou Switch",
      description: "Vise en tournant ta manette dans n'importe quel jeu PC, avec une DualSense, DualShock 4, Switch Pro, des Joy-Con ou un Steam Deck.",
      answer:
        "Avec OpenController, une manette avec gyroscope peut viser dans n'importe quel jeu PC : la tourner bouge le stick droit. Ça vaut pour la DualSense, la DualShock 4, la Switch Pro Controller, les Joy-Con, le Steam Deck et les manettes 8BitDo en mode D-input.",
      steps: [
        "<download>Télécharge OpenController</download>, ouvre-le et branche la manette.",
        "Sur sa page, ouvre « Motion » et choisis quand le gyroscope vise : tout le temps, quand la gâchette gauche est enfoncée, ou tant que tu maintiens un bouton.",
        "Monte ou baisse la sensibilité jusqu'à ce qu'un petit mouvement rapide du poignet donne le virage que tu veux.",
      ],
      sections: [
        {
          h: "Réglages fins",
          p: [
            "La visée peut avoir sa propre sensibilité, le haut et le bas peuvent être plus lents que les côtés, et un bouton peut mettre le gyroscope en pause pendant que tu replaces la manette. Sous « Advanced », l'accélération fait aller plus loin les mouvements rapides et la stabilisation calme une main qui tremble.",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "Sous Windows, le Flick Stick du « Controller Lab » tourne la caméra avec le stick droit comme le ferait une souris, avec le gyroscope pour la visée fine. Règle-le pour chaque jeu, avec l'accélération de la souris du jeu désactivée.",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "Corriger le drift d'un stick sur PC",
      metaTitle: "Corriger le drift d'une manette sur PC, pour tous les jeux",
      description: "Mesure un stick qui dérive, recentre-le et règle une zone morte juste assez grande, une fois, pour tous les jeux PC.",
      answer:
        "Un stick usé qui bouge tout seul peut souvent se corriger par logiciel : OpenController mesure sa position au repos, en fait son centre et règle une zone morte juste assez grande pour cacher le drift, dans tous les jeux.",
      steps: [
        "<download>Télécharge OpenController</download>, ouvre-le et branche la manette.",
        "Sur sa page, ouvre « Sticks » et clique sur « Measure ». Ne touche pas au stick, puis fais-lui faire le tour de son bord.",
        "Le centre, la zone morte et l'inclinaison maximale sont réglés d'après la mesure. Le dessin montre ce que reçoivent les jeux.",
      ],
      sections: [
        {
          h: "Les réglages",
          p: [
            "La zone morte ignore les petits mouvements autour du centre. L'anti-zone morte fait réagir les jeux au premier mouvement au-delà. L'inclinaison maximale compte comme poussé à fond un stick qui n'atteint plus son bord.",
          ],
        },
        {
          h: "Quand c'est le matériel",
          p: [
            "Si le drift est important, une zone morte qui le cache avale aussi les petits mouvements réels, et le stick doit être nettoyé ou remplacé. Pour un bouton usé qui appuie deux fois, le filtre de boutons du « Controller Lab » ignore le double appui.",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
