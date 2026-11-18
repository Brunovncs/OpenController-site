import type { HelpMessages } from "../en/help";

const help: HelpMessages = {
  index: {
    title: "ヘルプ",
    metaTitle: "PCゲームのコントローラーのヘルプ | OpenController",
    description: "PCでのコントローラーのよくある問題への答え：PS5・PS4コントローラー、Switchのコントローラー、コントローラーを認識しないゲーム、ドリフト、ジャイロエイム。",
    lead: "PCでコントローラーを使うときによくある問題に、短く答えます。",
  },
  ui: {
    home: "ホーム",
    help: "ヘルプ",
    answer: "要点",
    steps: "手順",
    related: "関連記事",
    download: "OpenControllerをダウンロード",
    test: "コントローラーをテスト",
    free: "無料のオープンソース。Windows、Linux、Mac対応。",
  },
  articles: {
    "ps5-controller-on-pc": {
      title: "PS5コントローラーをPCで使う",
      metaTitle: "PS5コントローラー（DualSense）をPCで使う方法",
      description: "DualSenseを有線かBluetoothでつないで、Xboxコントローラーしか知らないゲームも含め、どのPCゲームでも遊べます。",
      answer:
        "WindowsはDualSenseを認識しますが、多くのゲームはXboxコントローラーしか理解しません。OpenControllerはDualSenseをXboxコントローラーとしてゲームに見せるので、どのゲームでも使えます。ジャイロ、タッチパッド、マイクボタンといった機能もそのまま使えます。",
      steps: [
        "<download>OpenControllerをダウンロード</download>して開きます。Windowsでは、「Requirements」ページから必要な無料ドライバー2つをインストールできます。",
        "DualSenseをUSBケーブルでつなぐか、Bluetoothでペアリングします。クリエイトボタンとPSボタンをライトが点滅するまで押し続け、Windowsの「Bluetooth」設定で追加してください。",
        "ウィンドウにプレイヤー番号つきで表示されます。ゲームを開いて遊びましょう。",
      ],
      sections: [
        {
          h: "アダプティブトリガーとハプティック",
          p: [
            "ゲームからはXboxコントローラーに見えるので、アダプティブトリガーは使えません。コントローラーのページにある「Native mode」をオンにすると、対応しているゲームには本物のDualSenseが見え、トリガーの効果や、有線ならハプティックフィードバックも使えます。または「Controller Lab」で、どのゲームでもトリガーに独自の効果をつけられます：抵抗、振動、クリック感です。",
          ],
        },
        {
          h: "ジャイロ、タッチパッド、マイク",
          p: [
            "コントローラーを傾けてエイムできます。常時、エイム中、ボタンを押している間から選べます。タッチパッドとマイクボタンには、Xboxボタン、キー、マクロを割り当てられます。Windowsでは、タッチパッドでマウスを動かしたり、マイクボタンでPCのマイクをミュートしたりもできます。",
          ],
        },
        {
          h: "Steamのゲーム",
          p: [
            "PlayStationコントローラーのSteam Inputがオンだと、SteamもDualSenseを読み取り、1回の入力が二重に数えられることがあります。Steamのコントローラー設定でPlayStationのサポートをオフにしてください。",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "controller-works-in-menu-not-in-game", "gyro-aiming-on-pc"],
    },
    "ps4-controller-on-pc": {
      title: "PS4コントローラーをPCで使う",
      metaTitle: "PS4コントローラー（DualShock 4）をPCで使う方法",
      description: "DualShock 4を有線、Bluetooth、ソニーのワイヤレスアダプターでつないでPCゲームで遊べます。ライトバーにはプレイヤーが表示されます。",
      answer:
        "多くのPCゲームはPS4コントローラーを読み取りません。OpenControllerは有線、Bluetooth、ソニーのワイヤレスアダプターのどれでも、PS4コントローラーをXboxコントローラーとしてゲームに見せます。ライトバーにはプレイヤー番号が表示されます。",
      steps: [
        "<download>OpenControllerをダウンロード</download>して開きます。Windowsでは、「Requirements」ページから必要な無料ドライバー2つをインストールできます。",
        "DualShock 4をUSBケーブルでつなぐか、Bluetoothでペアリングします。SHAREボタンとPSボタンをライトが点滅するまで押し続け、Windowsの「Bluetooth」設定で追加してください。",
        "ライトがプレイヤーの色に変わります。ゲームを開いて遊びましょう。",
      ],
      sections: [
        {
          h: "タッチパッドとジャイロ",
          p: [
            "タッチパッドには、クリックのほかに左半分、右半分、2本指の3つのボタンがあります。それぞれにXboxボタン、キー、マクロを割り当てられます。コントローラーを傾けて、手に持ったマウスのようにエイムすることもできます。",
          ],
        },
        {
          h: "ライトバー",
          p: [
            "ライトには、PlayStationと同じプレイヤーの色、好きな色、または緑から赤へのバッテリー残量を表示できます。バッテリーが少なくなると点滅します。",
          ],
        },
        {
          h: "DS4Windowsから乗り換える場合",
          p: ["DS4Windowsは長年この役目を果たしてきましたが、もうメンテナンスされていません。OpenControllerに移ると<ds4windows>何が変わるか</ds4windows>をまとめました。"],
        },
      ],
      related: ["ds4windows-alternative", "ps5-controller-on-pc", "controller-works-in-menu-not-in-game"],
    },
    "switch-controller-on-pc": {
      title: "Switch Pro ControllerやJoy-ConをPCで使う",
      metaTitle: "Switch Pro Controller（プロコン）やJoy-ConをPCで使う方法",
      description: "Switch Pro ControllerやJoy-Conで、2本セットでも横持ちでも、ボタンが思った位置のままPCゲームを遊べます。",
      answer:
        "OpenControllerを使うと、Switch Pro ControllerとJoy-ConがXboxコントローラーとしてPCゲームで使えます。Joy-Conは2本で1つのコントローラーにも、横持ちで1人1本ずつ、2つのコントローラーにもできます。",
      steps: [
        "<download>OpenControllerをダウンロード</download>して開きます。Windowsでは、「Requirements」ページから必要な無料ドライバー2つをインストールできます。",
        "コントローラーをBluetoothでペアリングします。小さなシンクロボタンをランプが流れるように光るまで押し続け、Windowsの「Bluetooth」設定で追加してください。Pro ControllerはUSBケーブルでも使えます。",
        "ウィンドウにプレイヤー番号つきで表示されます。ゲームを開いて遊びましょう。",
      ],
      sections: [
        {
          h: "AかBか",
          p: [
            "ボタンは位置に従うので、Xboxコントローラーと同じく、ゲームでは下のボタンがAになります。印字どおりの文字で使いたい場合は、コントローラーのページの「All buttons」で「Use the controller's letters」をオンにしてください。",
          ],
        },
        {
          h: "1組で2人プレイ",
          p: [
            "ペアのページで「Split Joy-Cons」を押すと、Joy-Conがそれぞれ横持ちの独立したコントローラーになります。スティックが左、ボタンが右、SLとSRがLBとRBです。「Join Joy-Cons」で元に戻ります。WindowsとLinuxで使える試験的な機能です。",
          ],
        },
        {
          h: "ジャイロとキャプチャー",
          p: ["どちらもジャイロを内蔵しているので、コントローラーを傾けてエイムできます。キャプチャーボタンにはXboxボタン、キー、マクロを割り当てられます。"],
        },
      ],
      related: ["gyro-aiming-on-pc", "controller-works-in-menu-not-in-game", "controller-not-detected"],
    },
    "controller-works-in-menu-not-in-game": {
      title: "メニューでは動くのにゲーム内でコントローラーが効かない",
      metaTitle: "コントローラーがメニューでは動くのにゲームで効かない時の対処法",
      description: "SteamやWindowsのメニューは操作できるのに、ゲームではコントローラーが反応しない。その原因と直し方。",
      answer:
        "たいていの場合、Windowsやランチャーはコントローラーをきちんと読み取れていても、ゲームがXboxコントローラーしか読み取らないのが原因です。OpenControllerはコントローラーをXboxコントローラーとしてゲームに見せるので、ほとんどのゲームでこれで解決します。",
      sections: [
        {
          h: "原因",
          p: [
            "Windowsには、ソフトがコントローラーを読み取る方法がいくつかあります。ランチャーやメニューは、どんなコントローラーでも見える方法をよく使います。一方、多くのゲームはXboxコントローラーしか見えないXInputだけを使うので、PlayStation、Switch、汎用のコントローラーはゲームから見えません。",
          ],
        },
        {
          h: "解決方法",
          p: [
            "<download>OpenControllerをダウンロード</download>して開き、コントローラーをつなぎます。プレイヤー番号つきで表示されれば、ゲームからはXboxコントローラーとして見えます。ゲームをすでに開いていた場合は、再起動してください。",
          ],
        },
        {
          h: "入力が二重になる場合",
          p: [
            "Steam Inputやゲームが、Xboxコントローラーと並んで元のコントローラーも読み取っているかもしれません。「Requirements」ページで入れられるHidHideは、元のコントローラーをゲームから隠します。インストール後にゲームを再起動してください。Steamの場合は、コントローラー設定でPlayStationやSwitchのサポートをオフにしてください。",
          ],
        },
        {
          h: "それでも反応しない場合",
          p: [
            "最初のコントローラーにしか反応しないゲームもあります。お使いのコントローラーのタイルをプレイヤー1のタイルにドラッグすると入れ替わります。追加ボタンのキーやマクロは、管理者として実行しているゲームには届きません。",
          ],
        },
      ],
      related: ["controller-not-detected", "ps5-controller-on-pc", "ps4-controller-on-pc"],
    },
    "controller-not-detected": {
      title: "PCがコントローラーを認識しない",
      metaTitle: "PCがコントローラーを認識しない時にまず確認すること",
      description: "PCがコントローラーを認識しないときの確認ポイントと、汎用品や不明なコントローラーをゲームで使う方法。",
      answer:
        "まず、PCがそもそも読み取れているかを確認しましょう。<test>トップページのテスト</test>なら、どんなコントローラーでも数秒で表示し、何の機種かを教えてくれます。そこに表示されればPCは認識しているので、OpenControllerでゲームからも見えるようにできます。",
      sections: [
        {
          h: "基本を確認",
          p: [
            "別のケーブルを試してください。充電専用のケーブルもあります。ハブを使わず、PCに直接挿してください。Bluetoothの場合は、コントローラーをペアリングモードにしてWindowsの設定で追加します。8BitDoなどはモード切り替えスイッチを確認してください。XInputモードでは追加ボタンとジャイロが隠れます。",
          ],
        },
        {
          h: "汎用品や不明なコントローラー",
          p: [
            "汎用コントローラーのほとんどは、Xbox、PlayStation、Switchのコントローラーと同じチップを使い、そのコントローラーとして動きます。OpenControllerがボタンを読み取れない場合は、コントローラーのページに「Map the buttons」が表示されます。イラストの各部分が順に光るので、そのとおりに押してください。その後はXboxコントローラーとして使えます。",
          ],
        },
        {
          h: "追加をリクエスト",
          p: ["コントローラーの「Information」ページにある「Report a problem」で、追加に必要な情報を送れます。<contact>メッセージを送る</contact>こともできます。"],
        },
      ],
      related: ["controller-works-in-menu-not-in-game", "switch-controller-on-pc"],
    },
    "ds4windows-alternative": {
      title: "DS4Windowsの代わりに",
      metaTitle: "DS4Windowsの代替：無料・オープンソース・開発継続中",
      description: "DS4Windowsはもうメンテナンスされていません。OpenControllerはPlayStationコントローラーで同じことができ、Switch、8BitDoなど数百種類にも対応します。",
      answer:
        "DS4Windowsはもうメンテナンスされておらず、今その名前で配布されているダウンロードは、作者とは関係のないサイトからのものです。OpenControllerは無料のオープンソースアプリで、PlayStationコントローラーで同じことができるうえ、Switch、8BitDoなど数百種類のコントローラーにも対応しています。",
      sections: [
        {
          h: "引き継げること",
          p: [
            "DualShock 4やDualSenseは、ゲームからXboxコントローラーとして見え、複数台を同時に使え、それぞれのライトにプレイヤー番号が表示されます。ジャイロエイム、タッチパッドのボタン化、ライトバーの色とバッテリー表示、前面のゲームに合わせて切り替わるプロファイルもそろっています。使うドライバーも同じ無料のViGEmBusとHidHideです。",
          ],
        },
        {
          h: "違うところ",
          p: [
            "コントローラーをSDLで読み取るので、PlayStationのコントローラーに限りません。Windows、Linux、Macで動きます。Macではボタンとライトの機能を加えますが、仮想コントローラーは作りません。XboxコントローラーではなくDualShock 4としてゲームに見せる機能は、Windowsで試験的なオプションとして使えます。",
          ],
        },
        {
          h: "乗り換え方",
          p: [
            "先にDS4Windowsを終了してください。両方が同じコントローラーの仮想コントローラーを作ってしまうのを防ぐためです。DS4WindowsがViGEmBusとHidHideをインストールしていれば、OpenControllerはそのまま使います。",
          ],
        },
      ],
      related: ["ps4-controller-on-pc", "ps5-controller-on-pc", "gyro-aiming-on-pc"],
    },
    "gyro-aiming-on-pc": {
      title: "PCでジャイロエイム",
      metaTitle: "PlayStationやSwitchのコントローラーでPCでもジャイロエイム",
      description: "DualSense、DualShock 4、Switch Pro、Joy-Con、Steam Deckで、コントローラーを傾けてどのPCゲームでもエイムできます。",
      answer:
        "OpenControllerを使えば、ジャイロ付きのコントローラーでどのPCゲームでもエイムできます。コントローラーを傾けると右スティックが動きます。対象はDualSense、DualShock 4、Switch Pro Controller、Joy-Con、Steam Deck、D-inputモードの8BitDoです。",
      steps: [
        "<download>OpenControllerをダウンロード</download>して開き、コントローラーをつなぎます。",
        "コントローラーのページで「Motion」を開き、ジャイロでエイムするタイミングを選びます：常時、左トリガーを引いている間、ボタンを押している間。",
        "手首をすばやくひねったときに、狙いどおりの角度だけ向きが変わるよう感度を調整します。",
      ],
      sections: [
        {
          h: "細かい調整",
          p: [
            "エイム中だけ別の感度にしたり、上下の動きを左右より遅くしたり、コントローラーを持ち直す間ボタンでジャイロを止めたりできます。「Advanced」では、加速ですばやい動きをより大きく反映させたり、手ぶれ補正で震える手を安定させたりできます。",
          ],
        },
        {
          h: "Flick Stick",
          p: [
            "Windowsでは、「Controller Lab」のFlick Stickで、右スティックを使ってマウスのようにカメラを回し、細かいエイムはジャイロで行えます。ゲームごとに設定し、ゲーム側のマウス加速はオフにしてください。",
          ],
        },
      ],
      related: ["ps5-controller-on-pc", "switch-controller-on-pc", "stick-drift-fix"],
    },
    "stick-drift-fix": {
      title: "PCでスティックのドリフトを直す",
      metaTitle: "コントローラーのスティックドリフトをPCで直す（全ゲーム対応）",
      description: "ドリフトするスティックを計測し、中心を合わせ直し、必要なだけのデッドゾーンを一度設定するだけで、すべてのPCゲームに効きます。",
      answer:
        "勝手に動いてしまう劣化したスティックは、ソフトで直せることがよくあります。OpenControllerはスティックが止まっている位置を計測して中心にし、ドリフトを隠すのにちょうどいいデッドゾーンを設定します。すべてのゲームに効きます。",
      steps: [
        "<download>OpenControllerをダウンロード</download>して開き、コントローラーをつなぎます。",
        "コントローラーのページで「Sticks」を開き、「Measure」をクリックします。スティックから手を離し、そのあと端に沿ってぐるっと回してください。",
        "計測結果から、中心、デッドゾーン、最大の傾きが設定されます。ゲームに届く入力はイラストで確認できます。",
      ],
      sections: [
        {
          h: "設定項目",
          p: [
            "デッドゾーンは、中心付近の小さな動きを無視します。アンチデッドゾーンは、デッドゾーンを越えた最初の動きにゲームが反応するようにします。最大の傾きは、端まで届かなくなったスティックを、いちばん奥まで倒したものとして扱います。",
          ],
        },
        {
          h: "ハードウェアの問題の場合",
          p: [
            "ドリフトが大きいと、それを隠すデッドゾーンが小さな本当の動きまで消してしまいます。その場合はスティックの清掃か交換が必要です。劣化して二重に押されるボタンには、「Controller Lab」のボタンフィルターで二重押しを無視できます。",
          ],
        },
      ],
      related: ["controller-not-detected", "gyro-aiming-on-pc"],
    },
  },
};

export default help;
