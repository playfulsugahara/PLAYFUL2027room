/* =========================================================
   2027年作戦会議 メンバーページ ── 台帳（このファイルだけ更新すれば全ページに反映）
   ・url が空 "" のものは「準備中」と表示される
   ・YouTube は限定公開のURLをそのまま貼る（https://youtu.be/xxxx でも可）
   ========================================================= */
window.SITE = {

  /* ---------- お知らせ（ホームの Information 欄） ----------
     新しいものを上に足す。ホームには上から3件、それ以降は「すべてのお知らせ」の中に入る
     date から7日間は「NEW」が自動で付く ／ href は押したときの行き先（空なら押せない1行）
  ------------------------------------------------- */
  news: [
    { date: "2026-11-22", text: "新しいワーク「ごきげん」を追加しました", href: "item.html?id=k-gokigen" },
    { date: "2026-11-21", text: "ワーク／ライブラリの使い方 解説動画をアップしました！", href: "item.html?id=v-guide" },
    { date: "2026-11-19", text: "1期・2期の領収書を申請できるようになりました。宛名とメールアドレスを入れると、PDFでお送りします", href: "receipt.html" },
    { date: "2026-11-17", text: "はじめての方へ：使い方動画（1分）と、右上の「≡ メニュー」ができました", href: "item.html?id=v-guide" },
    { date: "2026-11-17", text: "はじめての方へ：まずは『お金の3つのうつわ』解説（7分）から", href: "item.html?id=v-utsuwa" },
    { date: "2026-11-17", text: "1期の講義アーカイブ・解説動画・ラジオを、ライブラリでまとめて見られるようになりました", href: "library.html" },
    { date: "2026-11-16", text: "メンバーページをオープンしました。ワークは「5分でできる」など所要時間から選べます", href: "work.html" },
    { date: "2026-11-17", text: "ワーク「BEST BUYチャレンジ」に、選んだあとの振り返りを追加しました", href: "item.html?id=k-bestbuy" },
    { date: "2026-11-16", text: "第1回 キックオフのアーカイブとスライドを公開しました", href: "zoom.html?n=1" }
  ],

  /* ---------- 送り先（Google Apps Script のウェブアプリURL）。receipt＝領収書の申請（空なら「準備中」）／glossary＝用語辞典の「わかった・まだわからない」（名前なしの数だけ。空なら送らない） ---------- */
  forms: { glossary: "https://script.google.com/macros/s/AKfycbwxXb5Yo5oZpar4uWZl_8Rh3dCC0IFKy-NiOOZcI3i2RdcYDLjZk6m9j6pm1__NiVWKmw/exec", receipt: "https://script.google.com/macros/s/AKfycbz3dGN2iiqTuV9_bw_H201ZOxn0ROO7YbaDeL3Jt0Dufos9r8RjSUXDm4JG0BCIG24TyQ/exec" },

  /* ---------- Zoom 5回 ---------- */
  sessions: [
    {
      n: 1, date: "2026-11-15", dow: "日", time: "21:00〜23:00",
      title: "キックオフ", theme: "うつわのおさらいと、今期の取り組み",
      youtube: "https://youtu.be/nDri0eq01pA", dur: "約59分",
      slides: { dir: "slides/20261115", count: 29 },
      points: [
        "2027年に自分の波乗りを楽しむために、人生のコンセプトをつくる2ヶ月",
        "お金は目に見える。だから今回も、お金のうつわを変化の指標にしながら進める",
        "〈流入〉に取りかかりながら、〈貯蓄〉と〈受容〉を細かく回す。〈貯蓄〉〈受容〉のうつわが、いつも〈流入〉より大きい状態で",
        "行動の波をつかむヒントは、感情",
        "前半の1ヶ月は感情への解像度を上げる。後半の1ヶ月はホロスコープとあわせてコンセプトを設計する",
        "作戦会議は、2ヶ月の「ビジョンの洞窟」探索ツアー。問いとZoomで星のカケラを集め、自分だけの星座（コンセプト）をつくる"
      ],
      related: ["a-utsuwa", "v-utsuwa", "a-1004", "ar-1004"]
    },
    { n: 2, date: "2026-11-29", dow: "日", time: "21:00〜23:00", title: "感情①", theme: "ネガティブな感情をエネルギーに変える", youtube: "", slides: null, points: [], related: [] },
    { n: 3, date: "2026-12-13", dow: "日", time: "21:00〜23:00", title: "感情②", theme: "無価値感・焦燥感とのつきあい方", youtube: "", slides: null, points: [], related: [] },
    { n: 4, date: "2026-12-28", dow: "月", time: "21:00〜23:00", title: "コンセプト設計", theme: "ホロスコープで、コンセプト設計（講義＋ワーク）", youtube: "", slides: null, points: [], related: [] },
    { n: 5, date: "2027-01-13", dow: "水", time: "21:00〜23:00", title: "最終回", theme: "2027年のコンセプトを手に、行動の波に乗る", youtube: "", slides: null, points: [], related: [] }
  ],

  /* ---------- 今週の問い（9つ） ---------- */
  questions: [
    {
      n: 1, date: "2026-11-15", dow: "日",
      q: "2027年はどんな年になったら最高？",
      body: [
        "思いついたキーワード、情景、感情、色など、どんどん書き出してみましょう。",
        "そこそこ幸せ、ではありません。最高！です。あなたが最高と感じる要素とは？"
      ],
      hints: ["仕事は？ プライベートは？ 趣味は？", "誰といますか？", "どんな服を着て、どこにいますか？", "どんな表情で、何を感じていますか？"],
      due: "11/21（土）",
      band: "https://band.us/band/105081542/post/8",
      /* 振り返り：date の hour 時（省略時20時）に表示。翌週の問いと同じ時刻にする */
      review: {
        date: "2026-11-22", hour: 19,
        derived: [
          "書き出したものは、「何をしているか・何を手に入れたか」と「そのとき、どんな気持ちでいるか」に分けられる",
          "言葉を変えて何度も出てくるものは、コンセプトの原石",
          "「最高」の形は、人によって違う。人と比べず、自分が最高と感じるものが「自分仕様の幸せ」",
          "一度書くと、頭は自然とその未来のヒントを探しはじめる"
        ],
        cta: "期間中、思いついたらどんどん書き足しましょう！"
      }
    },
    {
      n: 2, date: "2026-11-22", dow: "日", hour: 19,
      q: "「あの時のあの感覚、また味わいたいなぁ」と思う体験は？",
      body: [
        "今までに、すごく幸せだった・嬉しかった・楽しかった・感動した思い出を振り返って、そのときのシチュエーションを、思い出せる限り詳しく書き出してみましょう。",
        "思い出はいくつでも。たくさんあるほど、自分が幸せだと感じる「要素」が見えてきます。"
      ],
      hints: ["いつ、どこにいた？", "誰と過ごしていた？", "何をした・してもらった？", "そのとき、どんな気持ちだった？", "どうして、それが良かった？"],
      due: "11/28（土）",
      band: "https://band.us/band/105081542/post/13"
    },
    { n: 3, date: "2026-11-29", dow: "日" },
    { n: 4, date: "2026-12-06", dow: "日" },
    { n: 5, date: "2026-12-13", dow: "日" },
    { n: 6, date: "2026-12-20", dow: "日" },
    { n: 7, date: "2026-12-27", dow: "日" },
    { n: 8, date: "2027-01-03", dow: "日" },
    { n: 9, date: "2027-01-10", dow: "日" }
  ],

  /* ---------- ワークメニュー（ビュッフェ形式） ----------
     v : 効くうつわ（chochiku 貯蓄 / juyou 受容 / ryunyu 流入。複数可）
     rec : おすすめ ／ item : 詳細ページ（items の id）。空なら「準備中」
     desc : ひとこと。空なら「説明は準備中」
     hidden : 詳細ページができるまで一覧に出さない（できたら消す）
     time : 所要時間の目安（カードと詳細ページに出す）／ tc : 時間のタブ（5＝5分でできる／15＝15分くらい／30＝30分〜）
     isNew : 「NEW！」マーク（1期で詳しく紹介していないワーク／2期で追加したワーク）
  ------------------------------------------------- */
  works: [
    { id: "w-receipt", time: "1〜10分", tc: 15, name: "レシート", v: ["chochiku", "juyou"], rec: true, item: "v-receipt",
      desc: "買ったものと、そのとき感じたことを一言書くところから。慣れてきたら、感情の割合と理由、感情の成分まで見ていく（初級・中級・上級）" },
    { id: "w-genjo", time: "10〜30分", tc: 30, name: "収支を見る", v: ["chochiku"], rec: true, item: "v-genjo",
      desc: "いま動かせるお金、これから決まっている支出、1ヶ月の収支を書き出して、自分の現在地を知る" },
    { id: "w-zero", time: "3〜5分", tc: 5, isNew: true, name: "ゼロ秒思考", v: ["chochiku", "juyou"], rec: true, item: "k-zero",
      desc: "裏紙の左上に問いを書き、1分で頭に浮かんだ言葉を書き出す。いちばん気になったものを、さらに深掘りする" },
    { id: "w-furikaeri", time: "15〜20分", tc: 15, isNew: true, name: "振り返り", v: ["chochiku", "ryunyu"], rec: false, item: "k-furikaeri",
      desc: "自分や事業への投資に使ったお金に、どんな変化やリターンがあったかを書き出す。次に同じような選択をするときの改善点も書く" },
    { id: "w-uketori", time: "3〜5分", tc: 5, name: "受け取り", v: ["juyou"], rec: false, item: "k-uketori",
      desc: "今日あなたは何を受け取りましたか？ お金を払って受け取ったもの以外も含めて、受け取ったものを書き出す" },
    { id: "w-skill", time: "30分〜", tc: 30, name: "スキルシェア", v: ["ryunyu"], rec: false, item: "k-skill",
      desc: "自分にできること・得意なことを、人の役に立つ形で小さく差し出してみる" },
    { id: "w-yamery", time: "10〜15分", tc: 15, isNew: true, name: "手放し", v: ["juyou"], rec: false, item: "k-yamery",
      desc: "義理や我慢でやっていることを書き出して、ひとつずつ小さくやめていく" },
    { id: "w-katazuke", time: "15〜30分", tc: 30, isNew: true, name: "お片付け", v: ["chochiku", "juyou"], rec: false, item: "k-katazuke",
      desc: "引き出し1つから。モノを手放して余白をつくり、これまでの買い物を答え合わせする" },
    { id: "w-hantai", time: "10〜20分", tc: 15, isNew: true, name: "お金の使い方を変える", v: ["juyou", "ryunyu"], rec: false, item: "k-hantai",
      desc: "自分の支出が「他人／自分」「有形／無形」の4つのどこに偏っているかを見て、反対の位置に小さく使ってみる" },
    { id: "w-bestbuy", time: "5分（買い物のついでに）", tc: 5, isNew: true, name: "BEST BUYチャレンジ", v: ["juyou", "ryunyu"], rec: false, item: "k-bestbuy",
      desc: "いつものお店で、その売り場で自分がいちばん欲しいものを選ぶ。金額やコスパではなく、心が動くものを" },
    { id: "w-yohaku", time: "10〜15分", tc: 15, isNew: true, name: "余白の設計", v: ["chochiku", "juyou"], rec: false, item: "k-yohaku",
      desc: "自分のメンテナンス、休む、1人時間。そんな予定を先にスケジュールに入れて設計する" },
    { id: "w-output", time: "5〜15分", tc: 15, isNew: true, name: "アウトプット", v: ["juyou", "ryunyu"], rec: false, item: "k-output",
      desc: "感じたこと、思ったこと、今考えていることを、誰かに話してみる・伝えてみる。発信もそのひとつ" },
    { id: "w-gokigen", time: "5〜15分", tc: 5, isNew: true, name: "ごきげん", v: ["juyou", "ryunyu"], rec: false, item: "k-gokigen",
      desc: "自分が得たい体感を、一人で小さく叶えてあげるワーク" },
  ],

  /* ---------- ライブラリ ----------
     type : video（解説動画）/ radio（ラジオ）/ article（記事・レポート）/ archive（講義アーカイブ）/ slides（スライド・資料）
     tags : kiso（基礎）/ chochiku（貯蓄）/ juyou（受容）/ ryunyu（流入）/ shukan（習慣）
     term : "1期" / "2期"
     sub : サブタイトル（タイトルの下に小さく出る。講義アーカイブなど、タイトルだけで中身が分からないものに付ける）
     dur : 動画の長さ（「YouTubeで開く」の隣に「▶ 動画 約〇分」と出る。yt-dlp --print duration で秒を取って書く）
  ------------------------------------------------- */
  items: [
    /* --- ワーク（動画なし・要点ページだけ。type: "work"） --- */
    { id: "k-gokigen", term: "2期", type: "work", date: "2026-11-22", title: "ごきげん", desc: "自分が得たい体感を、一人で小さく叶えてあげるワーク", tags: ["juyou", "ryunyu"], url: "", kw: "ご機嫌 機嫌 自分を満たす 体感 一人時間 ひとり時間 先に叶える 花 ストレッチ 呼吸 アロマ お香 お茶" },
    { id: "k-output", term: "2期", type: "work", date: "2026-11-16", title: "アウトプット", desc: "感じたこと・思ったことを、誰かに話してみる・伝えてみるワーク。発信もそのひとつ", tags: ["juyou", "ryunyu"], url: "", kw: "アウトプット 発信 SNS 話す 伝える 表現 シェア" },
    { id: "k-yohaku", term: "2期", type: "work", date: "2026-11-16", title: "余白の設計", desc: "メンテナンス・休む・1人時間の予定を、先にスケジュールに入れるワーク", tags: ["chochiku", "juyou"], url: "", kw: "余白 休む 休息 1人時間 ひとり時間 メンテナンス スケジュール 予定" },
    { id: "k-skill", term: "2期", type: "work", date: "2026-11-16", title: "スキルシェア", desc: "できること・得意なことを、人の役に立つ形で差し出すワーク", tags: ["ryunyu"], url: "", kw: "スキルシェア 得意 役に立つ 先に出す 無料 対価以上 流入" },
    { id: "k-yamery", term: "2期", type: "work", date: "2026-11-16", title: "手放し", desc: "義理や我慢でやっていることを見つけて、ひとつずつやめていくワーク", tags: ["juyou"], url: "", kw: "手放しワーク やりたくないことをやめる やめる 断る 我慢 義理 嫌なこと 手放す" },
    { id: "k-katazuke", term: "2期", type: "work", date: "2026-11-16", title: "お片付け", desc: "モノを手放して部屋に余白をつくり、買い物の答え合わせをするワーク", tags: ["chochiku", "juyou"], url: "", kw: "片付け 断捨離 捨てる 売る 手放す 不用品 余白" },
    { id: "k-uketori", term: "2期", type: "work", date: "2026-11-16", title: "受け取り", desc: "お金の対価を払ったもの以外も含めて、今日受け取ったものを書き出すワーク", tags: ["juyou"], url: "", kw: "受け取りワーク わたし、これ受け取りました 受け取り ありがとう 差し入れ 労い 豊かさ 許可" },
    { id: "k-zero", term: "2期", type: "work", date: "2026-11-16", title: "ゼロ秒思考", desc: "頭の中にあることを、1分で紙に書き出すワーク", tags: ["chochiku", "juyou"], url: "", kw: "0秒思考 書き出す 不安 モヤモヤ 赤羽雄二" },
    { id: "k-furikaeri", term: "2期", type: "work", date: "2026-11-16", title: "振り返り", desc: "自分や事業への投資が、どんな変化やリターンにつながったかを書き出すワーク", tags: ["chochiku", "ryunyu"], url: "", kw: "振り返り（答え合わせ） 自己投資 事業投資 リターン 臨時収入 答え合わせ 講座 寝具 ロボット掃除機 旅行 体験" },
    { id: "k-bestbuy", term: "2期", type: "work", date: "2026-11-16", title: "BEST BUYチャレンジ", desc: "いつものお店で、その売り場で自分がいちばん欲しいものを選ぶワーク", tags: ["juyou", "ryunyu"], url: "", kw: "BEST BUYワーク ベストバイ 一番欲しいもの スーパー ドラッグストア 外食 洋服 コスメ ときめく 喜び" },
    { id: "k-hantai", term: "2期", type: "work", date: "2026-11-16", title: "お金の使い方を変える", desc: "「他人／自分」「有形／無形」の偏りを見て、反対の位置に小さく使ってみるワーク", tags: ["juyou", "ryunyu"], url: "", kw: "いつもと反対の位置にお金を使う 4象限 有形 無形 他人 自分 入れ替え" },

    /* --- 特別講義（余白） --- */
    { id: "ar-yohaku1015", dur: "約1時間51分", term: "特別講義", type: "archive", date: "2026-10-15", title: "特別講義｜余白の正体", sub: "余白セミナー 10/15 アーカイブ", desc: "余白とは、自分らしくあるための自由な思考の幅。引いてつくる余白、止まる練習、欠けを受け入れて楽しむ", tags: ["chochiku", "juyou"], url: "https://youtu.be/CTAYw9h4x18", kw: "10/15 余白セミナー 余白 余白セミナー 余白の正体 思考の幅 手放す 断る 止まる練習 コンフォートゾーン グッドアンドニュー" },
    { id: "ar-yohaku1104", dur: "約2時間5分", term: "特別講義", type: "archive", date: "2026-11-04", title: "特別講義｜未来につながる余白の話", sub: "余白トークセッション 11/4（Londの甲斐さんと）", desc: "Londの甲斐さんと。余白は目的地と現在地の間にある。余裕と余白の違い、期限を決める、頼る勇気", tags: ["chochiku", "juyou"], url: "https://youtu.be/NMYopJ2JrWU", kw: "11/4 余白トークセッション 余白 甲斐 Lond トークセッション 余裕 期限 頼る 軸 比べる 状態目標" },

    /* --- 2期 --- */
    { id: "ar-1115", term: "2期", type: "archive", date: "2026-11-15", title: "2期 キックオフ｜うつわのおさらいと、ビジョンの洞窟探索ツアー", sub: "2027年作戦会議 11/15 キックオフ講義", desc: "うつわのおさらいと、今期の取り組み。ビジョンの洞窟探索ツアーのはじまり", tags: ["kiso"], url: "zoom.html?n=1", kw: "11/15 キックオフ講義 作戦会議 コンセプト 星座 洞窟" },
    { id: "s-1115", term: "2期", type: "slides", date: "2026-11-15", title: "11/15 キックオフ スライド（29枚）", desc: "3つのうつわ・行動と感情の波・すごろくの地図・PLAYFUL思考の世界", tags: ["kiso"], url: "zoom.html?n=1#slides", kw: "すごろく 5つのエリア カイゼン センリャク デザイン ビジョン アート" },
    { id: "d-world", term: "2期", type: "slides", date: "2026-11-15", title: "世界の見方をアップデートする資料集", desc: "5つのエリアと、ビジョンの洞窟・人生芸術の大海。キックオフのスライド11枚目から", tags: ["kiso"], url: "zoom.html?n=1#slide-11", kw: "PLAYFUL思考 アート思考 ビジョン思考 星のカケラ 航海術" },

    /* --- 基礎 --- */
    { id: "a-utsuwa", term: "1期", type: "article", date: "2026-09-06", title: "お金の3つのうつわ", desc: "貯蓄・受容・流入。3つのうつわの定義と育て方を一本にまとめた記事", tags: ["kiso", "chochiku", "juyou", "ryunyu"], url: "https://playfulsugahara.github.io/playful-report/utsuwa/", kw: "4ステップ チェックリスト 定義" },
    { id: "v-guide", term: "2期", type: "video", date: "2026-11-21", title: "メンバーページの使い方", sub: "2期 使い方動画（3本）", desc: "メンバーページ・ワーク・ライブラリの見かた・さがしかたを、1分以内の動画で", tags: ["kiso"], url: "https://youtube.com/shorts/sHAN0eh_l0Y", kw: "使い方 はじめて ガイド 見かた ワークの使い方 ライブラリの使い方 解説動画",
      videos: [
        { key: "page", label: "メンバーページの使い方", url: "https://youtube.com/shorts/sHAN0eh_l0Y", time: "57秒" },
        { key: "work", label: "ワークの使い方", url: "https://youtube.com/shorts/PzZpB2v2csY", time: "49秒" },
        { key: "library", label: "ライブラリの使い方", url: "https://youtube.com/shorts/vOJydDEQyEk", time: "36秒" }] },
    { id: "v-utsuwa", dur: "約8分", term: "1期", type: "video", date: "2026-07-31", title: "うつわ解説｜お金の3つのうつわ（まずはここから）", sub: "習慣コミュニティ1期 解説動画", desc: "まずはここから。3つのうつわの全体像", tags: ["kiso"], url: "https://youtu.be/FQRkQGbK2uU", kw: "『お金の3つのうつわ』解説 全体像 はじめて" },
    { id: "r-shiru", dur: "約18分", term: "1期", type: "radio", date: "2026-08-02", title: "ラジオ｜知っているのに、できない理由", sub: "習慣コミュニティ1期 知る→やる→できる→わかる の仕組み", desc: "知っているのに、できない。脳の仕組みから", tags: ["kiso", "shukan"], url: "https://youtu.be/PvjQjVWlB7U", kw: "【重要】知る→やる→できる→わかる の仕組み 脳 続かない 知るをできるに変える" },
    { id: "r-muishiki", dur: "約11分", term: "1期", type: "radio", date: "2026-07-28", title: "ラジオ｜お金を遠ざける無意識の正体", sub: "習慣コミュニティ1期 お金のうつわを育てるラジオ", desc: "気づかないうちに、お金を遠ざけているもの", tags: ["kiso", "juyou"], url: "https://youtu.be/5sDevxBwlgU", kw: "お金を遠ざける無意識の正体 無意識 ブロック 思い込み" },
    { id: "ar-0802", dur: "約1時間25分", term: "1期", type: "archive", date: "2026-08-02", title: "1期 講義①｜お金の3つのうつわと、3ヶ月の設計", sub: "習慣コミュニティ1期 8/2 キックオフ＆講義① アーカイブ", desc: "1期のはじまり。お金のうつわを育てる習慣", tags: ["kiso"], url: "https://youtu.be/Nkq4STNG8_4", slides: { dir: "slides/20260802", count: 25 }, kw: "8/2 キックオフ＆講義① アーカイブ 1期 キックオフ" },
    { id: "s-0802", term: "1期", type: "slides", date: "2026-08-02", title: "8/2 キックオフ＆講義① スライド（25枚）", desc: "コンセプト・お金の3つのうつわ・3ヶ月の設計・基本ワーク・コミュニティの使い方", tags: ["kiso"], url: "item.html?id=ar-0802#slides", kw: "1期 キックオフ レシートワーク 現状把握 ミニマムライフコスト 知る やる できる わかる ロードマップ" },
    { id: "a-0825", term: "1期", type: "article", date: "2026-08-25", title: "8/25 交流会レポート", desc: "始めてみて起きた変化、途中で出てくるしんどさ、引き受けすぎてしまうとき、潜在意識の仕組み", tags: ["kiso", "shukan"], url: "https://playfulsugahara.github.io/playful-report/20260825/", kw: "しんどい 引き受けすぎ 潜在意識" },
    { id: "a-0914", term: "1期", type: "article", date: "2026-09-14", title: "9/14 質問会・交流会レポート", desc: "「これ、無駄だったんじゃないか」に集まった8つのケースを、3つのうつわで読み解く", tags: ["kiso", "juyou"], url: "https://playfulsugahara.github.io/playful-report/20260914/", kw: "無駄遣い 罪悪感 ケース" },
    { id: "a-0924", term: "1期", type: "article", date: "2026-09-24", title: "9/24 交流会・質問会レポート", desc: "完璧主義や「頑張る」を手放すと、なぜ豊かさが入ってくるのか", tags: ["kiso", "ryunyu"], url: "https://playfulsugahara.github.io/playful-report/20260924/", kw: "完璧主義 頑張る 手放す 豊かさ" },

    /* --- 貯蓄 --- */
    { id: "v-chochiku", dur: "約8分", term: "1期", type: "video", date: "2026-07-31", title: "うつわ解説｜〈貯蓄〉現状を知ると、不安が静かになる", sub: "習慣コミュニティ1期 貯蓄のうつわ：解説", desc: "現状把握と、スペースを空けておくこと", tags: ["chochiku"], url: "https://youtu.be/_p0pVCALKqY", kw: "貯蓄のうつわ：解説 現状把握 余白" },
    { id: "v-receipt", dur: "約8分", term: "1期", type: "video", date: "2026-07-31", title: "レシート", sub: "習慣コミュニティ1期 貯蓄：ワーク① 解説動画", desc: "レシートを見て、買い物の裏にあった感情を答え合わせする", tags: ["chochiku", "juyou"], url: "https://youtu.be/pA4rIJy9nnM", kw: "貯蓄：ワーク① 収支を見る｜レシートワーク レシート 感情 記録" },
    { id: "v-genjo", dur: "約9分", term: "1期", type: "video", date: "2026-07-31", title: "収支を見る", sub: "習慣コミュニティ1期 貯蓄：ワーク② 解説動画", desc: "今のお金の流れを把握する", tags: ["chochiku"], url: "https://youtu.be/kh_FD8tetvY", kw: "貯蓄：ワーク② 収支を見る｜現状把握 現状把握 固定費 収支表 ミニマムライフコスト" },
    { id: "ar-0824", dur: "約2時間58分", term: "1期", type: "archive", date: "2026-08-24", title: "1期 作業会｜お金のうつわ徹底解説", sub: "習慣コミュニティ1期 8/24 作業会 アーカイブ", desc: "3つのうつわの順番、5つの土台との関係、収支とレシートのQ&Aまで。いちばん詳しく話した約3時間", tags: ["chochiku", "kiso"], url: "https://youtu.be/ZuoA-hDozfg", kw: "8/24 作業会 アーカイブ 8/24 作業会 アーカイブ レシート 作業会 5つの土台 ピラミッド NISA ポイント 頑張るのをやめる 幸せなお金持ち" },
    { id: "a-0824", term: "1期", type: "article", date: "2026-08-24", title: "8/24 作業会レポート", desc: "3つのうつわの全体像、レシートワークの実務Q&A、「頑張るのをやめる」と入ってくる理由", tags: ["chochiku", "kiso"], url: "https://playfulsugahara.github.io/playful-report/20260824/", kw: "レシート Q&A 頑張るのをやめる" },

    /* --- 受容 --- */
    { id: "v-juyou", dur: "約11分", term: "1期", type: "video", date: "2026-07-31", title: "うつわ解説｜〈受容〉喜びを先延ばしにしない", sub: "習慣コミュニティ1期 受容のうつわ：解説", desc: "自分の感情や欲にフォーカスし、細かく叶えてあげる", tags: ["juyou"], url: "https://youtu.be/B7JdMEA-Ao4", kw: "受容のうつわ：解説 喜び 欲 感情" },
    { id: "ar-0901", dur: "約2時間24分", term: "1期", type: "archive", date: "2026-09-01", title: "1期 講義②｜喜びを増やす・全信全疑", sub: "習慣コミュニティ1期 9/1 講義② アーカイブ", desc: "受容のうつわを育てる講義", tags: ["juyou"], url: "https://youtu.be/2OLxfKzJ-6Q", kw: "9/1 講義② アーカイブ 喜び 買い物" },
    { id: "a-0901", term: "1期", type: "article", date: "2026-09-01", title: "9/1 第二回講義｜喜びを増やす取り組み", desc: "見えないもの／見えるもの・全信全疑・欲と専門性", tags: ["juyou"], url: "https://playfulsugahara.github.io/playful-report/20260901/", kw: "全信全疑 欲 専門性" },
    { id: "a-0901b", term: "1期", type: "article", date: "2026-09-03", title: "喜びを増やして、お買い物上手になろう", desc: "自分の買い物を振り返り、喜びを増やす取り組み", tags: ["juyou"], url: "https://playfulsugahara.github.io/playful-report/20260901-report/", kw: "買い物 4象限 喜び" },

    /* --- 流入・感情と波 --- */
    { id: "v-ryunyu", dur: "約10分", term: "1期", type: "video", date: "2026-07-31", title: "うつわ解説｜〈流入〉稼ぐ前に、受け取る余白", sub: "習慣コミュニティ1期 流入のうつわ：解説", desc: "稼げる量。ここ半年の収入＋臨時収入の平均（月商）", tags: ["ryunyu"], url: "https://youtu.be/k--CBdSdWCw", kw: "流入のうつわ：解説 臨時収入 収入" },
    { id: "ar-1004", dur: "約2時間49分", term: "1期", type: "archive", date: "2026-10-04", title: "1期 講義③｜行動の波と感情の波", sub: "習慣コミュニティ1期 10/4 講義③ アーカイブ", desc: "〈流入〉を広げ続けるために、行動の波と感情の波を捉える。気分で決めるのを、やめる", tags: ["ryunyu"], url: "https://youtu.be/q79mVjKMU8s", kw: "10/4 講義③ アーカイブ 行動の波 感情の波 やる やらない" },
    { id: "a-1004", term: "1期", type: "article", date: "2026-10-04", title: "10/4 第三回講義レポート", desc: "気分で決めるのをやめる。行動の波と感情の波。〈流入〉のうつわと、臨時収入の正体", tags: ["ryunyu"], url: "https://playfulsugahara.github.io/playful-report/20261004/", kw: "行動の波 感情の波 臨時収入 気分" },

    /* --- 習慣 --- */
    { id: "v-kotsu", dur: "約9分", term: "1期", type: "video", date: "2026-07-28", title: "習慣｜三日坊主は、意志のせいじゃない", sub: "習慣コミュニティ1期 習慣化のコツ｜レクチャー動画", desc: "習慣を続けるためのコツ", tags: ["shukan"], url: "https://youtu.be/FNdgEwh-pFs", kw: "習慣化のコツ｜レクチャー動画 続かない 習慣化" },
    { id: "v-yasashisa", dur: "約12分", term: "1期", type: "video", date: "2026-07-28", title: "習慣｜自分への優しさが、続けるカギ", sub: "習慣コミュニティ1期 お金のうつわを育てるテレビ", desc: "お金のうつわを育てるテレビ", tags: ["shukan"], url: "https://youtu.be/D0OcSmvGIyw", kw: "自分への優しさが習慣継続のカギ 自分を責める 優しさ 継続" },
    { id: "v-profile", dur: "約2分", term: "1期", type: "video", date: "2026-07-28", title: "習慣｜習慣化プロフィールの使い方", sub: "習慣コミュニティ1期 習慣化プロフィールについて", desc: "習慣化プロフィールの読み方", tags: ["shukan"], url: "https://youtu.be/iX-s4OeqCoc", kw: "習慣化プロフィールについて プロフィール ホロスコープ" }
  ]
};

window.TAGS = { kiso: "基礎", chochiku: "貯蓄", juyou: "受容", ryunyu: "流入", shukan: "習慣" };
window.TYPES = { video: "解説動画", radio: "ラジオ", article: "記事", archive: "講義アーカイブ", slides: "スライド・資料", work: "ワーク" };
