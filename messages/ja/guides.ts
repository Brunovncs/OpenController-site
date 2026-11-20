import type { GuideFacts, GuideNoun, GuidesMessages } from "../en/guides";

const guides: GuidesMessages = {
  names: {
    dualsense: { name: "DualSense" },
    "dualsense-edge": { name: "DualSense Edge" },
    "dualshock-4": { name: "DualShock 4" },
    "dualshock-3": { name: "DualShock 3" },
    "ps2-controller": { name: "PS2コントローラー" },
    "switch-pro-controller": { name: "Switch Pro Controller" },
    "joy-con": { name: "Joy-Con" },
    "switch-online-controllers": { name: "Switch Online用のスーパーファミコン・N64・メガドライブのコントローラー", plural: true },
    "switch-2-controllers": { name: "Switch 2のコントローラー", plural: true },
    "gamecube-controller": { name: "ゲームキューブのコントローラー" },
    "wii-remote": { name: "WiiリモコンとWii U PROコントローラー", plural: true },
    "xbox-controller": { name: "Xboxコントローラー" },
    "xbox-elite": { name: "Xbox Eliteコントローラー" },
    "8bitdo-ultimate-2": { name: "8BitDo Ultimate 2・Ultimate 3・Pro 3", plural: true },
    "8bitdo-ultimate": { name: "8BitDo Ultimate" },
    "8bitdo-ultimate-2c": { name: "8BitDo Ultimate 2C" },
    "8bitdo-pro-2": { name: "8BitDo Pro 2" },
    "8bitdo-sn30-pro": { name: "8BitDo SN30 Proとレトロシリーズ", plural: true },
    "steam-deck": { name: "Steam Deckのコントローラー", plural: true },
    "steam-controller": { name: "Steam Controller" },
    "handheld-pc": { name: "携帯ゲーミングPCのコントローラー", plural: true },
    "flydigi-vader": { name: "Flydigi Vader" },
    "flydigi-apex": { name: "Flydigi Apex" },
    "stadia-controller": { name: "Stadiaコントローラー" },
    "luna-controller": { name: "Amazon Lunaコントローラー" },
    "shield-controller": { name: "NVIDIA Shieldコントローラー" },
    "generic-controllers": { name: "PowerA・Hori・Razerなどのコントローラー", plural: true },
  },

  title: (n) => `${n.Name}をPCで使う`,
  metaTitle: "{title} | OpenController",

  description: {
    xbox: (n: GuideNoun, f: GuideFacts) => {
      const motion = f.gyro === "yes" ? "モーションでのエイム" : f.gyro === "dinput" ? "D-inputモードでのモーションエイム" : "";
      const more = f.extras && motion ? `追加ボタンの割り当てや${motion}もできます。` : f.extras ? "追加ボタンの割り当てもできます。" : motion ? `${motion}もできます。` : "";
      return `お使いの${n.name}を、どのPCゲームでもXboxコントローラーとして使えます。${more}Windows・Linux対応、無料。`;
    },
    passthrough: (n: GuideNoun, f: GuideFacts) =>
      f.extras
        ? `PCゲームはお使いの${n.name}をそのまま読み取れます。OpenControllerは追加ボタンをキーやマクロとして使えるようにします。無料。`
        : `PCゲームはお使いの${n.name}をそのまま読み取れます。OpenControllerは、ほかのコントローラーと一緒に使ってもプレイヤー番号を固定します。Windows・Linux対応、無料。`,
    unsupported: (n) => `${n.Name}は、OpenControllerではまだ使えません。対応しているコントローラーを確認できます。`,
  },

  intro: {
    xbox: (n) =>
      `多くのPCゲームはXboxコントローラーしか読み取りません。OpenControllerを開いておくと、お使いの${n.name}はゲームからXbox 360コントローラーとして見えます。元のコントローラーは隠されるので、ゲームに二重に認識されることはありません。`,
    passthrough: (n, f) =>
      f.extras
        ? `PCゲームはお使いの${n.name}をそのまま読み取れます。OpenControllerはそれ以外には手を加えず、追加ボタンをキーやマクロとして使えるようにします。`
        : `PCゲームはお使いの${n.name}をそのまま読み取れます。OpenControllerは手を加えず、友だちがほかのコントローラーで参加してもプレイヤー番号を固定します。`,
    unsupported: (n) => `OpenControllerはお使いの${n.name}を認識しますが、まだ読み取ることはできません。`,
  },

  steps: {
    download: "OpenControllerをダウンロードして開きます。Windowsでは、「Requirements」ページから必要な無料ドライバーをワンクリックでインストールできます。",
    connect: "コントローラーを有線、Bluetooth、または専用レシーバーでつなぎます。OpenControllerのウィンドウに、その形のイラストで表示されます。",
    extras: "クリックして追加ボタンを設定します。どれも1つまたは複数のXboxボタン、キー、マクロにでき、必要ならゲームごとのプロファイルも作れます。",
    gyro: "コントローラーを動かしてエイムするには、「Motion」でオンにします。常時、エイム中、ボタンを押している間から選べます。",
    play: "ゲームを開きます。ゲームからはXbox 360コントローラーとして見えます。",
    passthroughExtras: "クリックして追加ボタンをキーやマクロに設定します。ゲームはこれまでどおりコントローラーを読み取ります。",
    passthrough: "ゲームを開きます。これまでどおりコントローラーを読み取り、プレイヤー番号が固定されます。",
  },

  page: {
    breadcrumb: "パンくずリスト",
    controllers: "コントローラー",
    test: "コントローラーをテスト",
    works: "できること",
    setup: "設定のしかた",
    steamTip: "Steamを使っていますか？Steamの設定で、PlayStationとSwitchのコントローラーのSteam Inputをオフにしてください。オンのままだと、ゲームがボタン入力を二重に受け取ることがあります。",
    faq: "ほかの答えは<a>よくある質問</a>にあります。",
    models: "機種（{n}）",
    modelsIntro: "このリストになくても、ほとんどのコントローラーは動きます。",
    missing: "お使いのコントローラーがない、またはうまく動きませんか？<a>お知らせください</a>。",
    more: "ほかのコントローラー",
    all: "すべてのコントローラー",
  },

  index: {
    metaTitle: "どんなコントローラーもPCで：PlayStation、Switch、Stadiaなど | OpenController",
    description:
      "PlayStation、Switch、Stadia、Luna、Flydigi、8BitDo、携帯ゲーミングPCのコントローラーを、どのPCゲームでもXboxコントローラーとして使えます。対応状況を確認できます。無料。",
    title: "OpenControllerでPCに使えるコントローラー",
    intro: "OpenControllerは{n}機種のコントローラーを知っていて、それ以外もほとんど動きます。お使いのものを選ぶか、<a>名前で検索</a>してください。",
    models: { one: "1機種", other: "{n}機種" },
  },

  links: { title: "コントローラー別：PCでの使い方" },

  copy: {
    dualsense: {
      title: "PS5コントローラー（DualSense）をPCで使う：どのゲームでもジャイロ対応 | OpenController",
      description:
        "PS5のDualSenseを、USBまたはBluetoothで、どのPCゲームでもXboxコントローラーとして使えます。ジャイロエイム、タッチパッドのボタン化、ライトバーに対応。Windows・Linux向け、無料。",
      sections: {
        native: {
          title: "Xboxかネイティブか",
          body: [
            "初期状態では、ゲームにはXbox 360コントローラーとして見え、Xboxのボタン表示と振動になります。ハプティックやアダプティブトリガーはゲームから使えませんが、アプリの「Controller Lab」ページでトリガーに独自の抵抗や振動をつけられます。DualSenseに対応したゲームでは、コントローラーのページで「Native mode」をオンにしてください。PlayStationのボタン表示、アダプティブトリガー、有線ならハプティックも使えます。「Native mode」の間は、プロファイル、ジャイロ、ボタンの割り当て変更はオフになります。",
          ],
        },
        "gyro-touchpad": {
          title: "ジャイロとタッチパッド",
          body: [
            "ジャイロは右スティックの入力に加わります。常時、L2を引いている間、ボタンを押している間から選べます。タッチパッドは、クリック、左半分、右半分、2本指の4つのボタンになります。それぞれとマイクボタンを、ゲームごとにXboxボタン、キー、マクロにできます。Windowsでは、タッチパッドでマウスを動かしたり、マイクボタンでPCをミュートしたりもできます。",
          ],
        },
        cable: {
          title: "有線とBluetooth",
          body: [
            "Bluetoothで使っているDualSenseにケーブルを挿しても、同じプレイヤーのままです。ゲームからは切断されたように見えません。プレイヤーランプとライトバーにプレイヤー番号が表示されます。ライトバーにはバッテリーを表示することもできます。",
          ],
        },
      },
    },

    "dualshock-4": {
      title: "PS4コントローラー（DualShock 4）をPCのどのゲームでも使う | OpenController",
      description:
        "PS4のDualShock 4を、有線、Bluetooth、ソニーのアダプターで、どのPCゲームでもXboxコントローラーとして使えます。ジャイロエイム対応。Windows・Linux向け、無料。",
      sections: {
        connect: {
          title: "有線、Bluetooth、アダプター",
          body: [
            "DualShock 4はどちらのバージョンも、USB、Bluetooth、ソニーのUSBワイヤレスアダプターで使えます。Bluetoothで使っているものにケーブルを挿しても、同じプレイヤーのままです。",
          ],
        },
        light: {
          title: "ライトバー",
          body: [
            "ライトバーは、PlayStationと同じ色でプレイヤー番号を表示します：青、赤、緑、ピンク。好きな色、緑から赤へのバッテリー表示、消灯も選べます。バッテリーが15%を切ると点滅します。",
          ],
        },
        "gyro-touchpad": {
          title: "ジャイロとタッチパッド",
          body: [
            "ジャイロは右スティックの入力に加わります。常時、L2を引いている間、ボタンを押している間から選べます。タッチパッドは、クリック、左半分、右半分、2本指の4つのボタンになります。それぞれをゲームごとにXboxボタン、キー、マクロにできます。Windowsでは、タッチパッドでマウスを動かすこともできます。",
          ],
        },
      },
    },

    "switch-pro-controller": {
      title: "Switch Pro Controller（プロコン）をPCのどのゲームでも使う | OpenController",
      description:
        "Switch Pro Controllerを、USBまたはBluetoothで、どのPCゲームでもXboxコントローラーとして使えます。ジャイロエイム、キャプチャーボタンをキーやマクロに。Windows・Linux向け、無料。",
      sections: {
        layout: {
          title: "ボタンの配置",
          body: [
            "ボタンは文字ではなく位置に従います。下のボタン（SwitchのB）はXboxのA、右のボタン（A）はXboxのBになります。文字どおりにしたい場合は「Buttons」で入れ替えてください。ゲームごとにも設定できます。",
          ],
        },
        "gyro-capture": {
          title: "ジャイロ、キャプチャー、ランプ",
          body: [
            "ジャイロは右スティックの入力に加わります。常時、ZLを押している間、ボタンを押している間から選べます。キャプチャーボタンはXboxボタン、キー、マクロにできます。プレイヤーランプは、Switchと同じようにプレイヤー番号を表示します。",
          ],
        },
      },
    },

    "stadia-controller": {
      title: "StadiaコントローラーをPCで使う：どのゲームでも | OpenController",
      description:
        "Stadiaは終了しましたが、コントローラーはまだ使えます。WindowsとLinuxで、USBまたはBluetoothで、どのPCゲームでもXboxコントローラーとして使えます。無料。",
      sections: {
        "after-stadia": {
          title: "Stadia終了後",
          body: [
            "Googleは2023年1月にStadiaを終了しましたが、コントローラーは普通のゲームパッドとして動き、Googleのサービスは何も必要ありません。ほとんどのWindowsゲームはXboxコントローラーしか読み取らないので、Stadiaコントローラーは無視されます。OpenControllerはこれを読み取り、代わりにXbox 360コントローラーをゲームに渡します。",
          ],
        },
        connect: {
          title: "USBかBluetoothか",
          body: [
            "USB-Cケーブルならすぐに使えます。Bluetoothは、Stadia終了時にGoogleが公開したツールでコントローラーをBluetoothモードに切り替えてある場合だけ使えます。切り替えていない場合はケーブルを使ってください。",
          ],
        },
        buttons: {
          title: "キャプチャーとアシスタント",
          body: [
            "キャプチャーボタンとアシスタントボタンはゲームでは使われません。WindowsとLinuxでは、それぞれを1つまたは複数のXboxボタン、キー、マクロにでき、ゲームごとのプロファイルが自動で切り替わります。Macではキーとして使えます。",
          ],
        },
        linux: {
          title: "Linuxでは",
          body: [
            "インストールスクリプトがルールを追加するので、アプリはrootなしでコントローラーを読み取れます。ゲーム、Wine、ProtonからはXbox 360コントローラーとして見えます。",
          ],
        },
      },
    },

    "flydigi-vader": {
      title: "Flydigi Vader 5 Pro・4 ProをPCとLinuxで使う | OpenController",
      description:
        "Flydigi Vader 5 Pro、4 Pro、旧型のVaderを、どのPCゲームでもXboxコントローラーとして使えます。M1～M4、C、Zも割り当て可能。Windows・Linux対応、無料。",
      sections: {
        which: {
          title: "お使いのVaderはどれ？",
          body: [
            "Vader 4 Pro、5 Pro、Direwolf 4は、有線かレシーバーでつなぎます。旧型のVader 2と3は、専用の旧型レシーバーを使います。どれもゲームからはXbox 360コントローラーとして見えます。",
            "Vader 5Sは別です。Xbox向けの有線コントローラーで、WindowsはほかのXboxコントローラーと同じように読むため、OpenControllerにはXbox Wireless Controllerとして見えます。Windowsは追加ボタンをほかのアプリに渡しません。Space Station for XboxでXboxのボタンを割り当てれば、どこでもそのボタンとして使えます。",
          ],
        },
        "space-station": {
          title: "追加ボタンとSpace Station",
          body: [
            "M1～M4、C、Z、LM、RMは、それぞれ1つまたは複数のXboxボタン、キー、マクロにでき、ゲームごとのプロファイルが自動で切り替わります。",
            "Vader 4 Pro、5 Pro、Direwolf 4では、Flydigi Space Stationで「Allow third-party apps to take over mappings」をオンにしてください。オフだと、ほかのアプリはこれらのボタンを読み取れません。必要なときはOpenControllerのウィンドウでお知らせします。旧型レシーバーのVader 2と3では不要です。",
          ],
        },
        linux: {
          title: "Linuxでは",
          body: [
            "インストールスクリプトがルールを追加するので、アプリはrootなしでVaderを読み取れます。ゲーム、Wine、ProtonからはXbox 360コントローラーとして見え、追加ボタンもWindowsと同じように使えます。新しいモデルでは、同じくSpace Stationの設定のお知らせが出ます。",
          ],
        },
      },
    },
  },

  changelog: {
    metaTitle: "OpenControllerの更新情報 | リリースノート",
    description: "OpenControllerの全バージョンを新しい順に。変更点と、設定が引き継がれるかどうか。",
    title: "更新情報",
    intro: "アプリはウィンドウを開いたときに新しいバージョンを確認し、再インストールなしで更新されます。",
    notesInEnglish: "各バージョンのリリースノートは英語で書かれています。",
    feed: "すべてのバージョン",
    rss: "RSSで購読",
    latest: "{version}は{date}に公開されました。",
    first: "最初のバージョン{version}（{date}）からのすべてのバージョンです。",
    offline: "GitHubから応答がありませんでした。",
    offlineLink: "リリースノートは<a>リリースページ</a>でも読めます。",
    day: (day, month) => `${month}${day}`,
    labels: {
      count: { one: "{n}バージョン", other: "{n}バージョン" },
      monthNav: "月に移動",
      jumpTo: "{month}に移動",
      scroller: "リリースノート",
      source: "GitHubで見る",
    },
  },
};

export default guides;
