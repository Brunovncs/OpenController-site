import type { CheckMessages } from "../en/check";

const check: CheckMessages = {
  controllers: "コントローラー",
  status: {
    example: "サンプル",
    idle: "コントローラーを待っています",
    known: "認識済み",
    unknown: "接続済み、リストにはありません",
    xinput: "Xboxコントローラーとして接続中",
    anon: "接続済み、機種は不明",
  },
  pressed: "押されたボタン",
  extra: "· 追加",
  pressExample: "イラストのボタンをクリックかタップしてください。",
  pressIdle: "押したボタンがここで光ります。",
  pressAny: "ボタンを押したり、スティックを動かしたり、トリガーを引いたりしてみてください。",
  idle: {
    title: "コントローラーをつないで、どれかボタンを押してください。",
    body: "有線でもBluetoothでも大丈夫です。名前と、OpenControllerでできることが表示されます。",
    brave: "Braveはコントローラーをサイトから隠します。このページをChromeかEdgeで開くか、下のサンプルを試してください。",
    unsupported: "このブラウザーはコントローラーを読み取れません。このページをChromeかEdgeで開くか、下のサンプルを試してください。",
    helpTitle: "表示されませんか？",
    help: [
      "ページをクリックしてから、ボタンを押してください。ブラウザーはボタンが押されるまでコントローラーを表示しません。",
      "Braveや一部の広告ブロッカーはコントローラーを隠します。ChromeかEdgeを使うか、このページでブロッカーをオフにしてください。",
      "Bluetoothのコントローラーは、先にシステムの設定でペアリングしてください。",
      "OpenControllerを開いていて非表示がオンだと、ブラウザーにはあなたのコントローラーではなく、OpenControllerのXboxコントローラーが見えます。テストするときはアプリを終了してください。",
    ],
  },
  verdict: {
    dinput: "このままXboxモードでゲームに使えます。追加ボタンやモーションでのエイムを使うには、下の説明のとおりD-inputモードに切り替えてください。",
    unsupported: "このバージョンではまだ読み取れません。",
    handheld: "内蔵コントローラーはそのままゲームで使えます。WindowsではOpenControllerで追加ボタンの割り当てもできます。",
    passthrough: "ゲームがすでに対応しているので、OpenControllerは手を加えません。",
    mac: "Macではそのままゲームで使えます。OpenControllerは追加ボタン、ライト、バッテリー残量を加えます。",
    works: "ゲームで1人のプレイヤーとして使え、つなぎ直してもプレイヤー番号は変わりません。",
  },
  copied: "お手持ちの名前と違いますか？多くのコントローラーは{name}のチップを使い、{name}として認識されるので、同じように動きます。",
  lookalike: "{names}なら、アプリの「Information」ページの「Model」で選んでください。",
  caps: {
    extras: "追加ボタン",
    motion: "動かしてエイム",
    light: "ライトバー",
    touchpad: "タッチパッドをボタンに",
    none: "なし",
    yes: "あり",
    no: "なし",
    dinput: "あり（D-inputモード）",
    lightYes: "プレイヤーの色、好きな色、またはバッテリー",
    touchpadYes: "あり（追加ボタンとして）",
  },
  mapping: "ブラウザーがこの配置を知らないため、イラストで違うボタンが光ることがあります。OpenControllerはコントローラーを直接読み取るので影響はありません。",
  seeFamily: "同じタイプのコントローラーをすべて見る",
  unknown: "まだリストにはありませんが、たぶん動きます。<a>追加をリクエスト</a>すると、ブラウザーが今読み取ったIDも一緒に送られます。",
  xinput:
    "動作します。ゲームからはXboxコントローラーとして見えます。Windowsは正確な機種をブラウザーに伝えません。8BitDoなどはXboxモードだと追加ボタンが隠れます。D-inputに切り替えるか（8BitDoならBを押しながら電源を入れる）、Bluetoothでつないでください。OpenControllerを開いている場合は、OpenControllerがゲームに見せているXboxコントローラーかもしれません。",
  anon: "ブラウザーがどのコントローラーかを伝えていません。Safariは常にそうです。詳しく見るには、このページをChromeかEdgeで開いてください。",
  tryOne: "手元にコントローラーがない場合は、こちらを試してください：",
};

export default check;
