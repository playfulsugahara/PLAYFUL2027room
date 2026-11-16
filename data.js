/* =========================================================
   2027年作戦会議 メンバーページ ── 台帳（このファイルだけ更新すれば全ページに反映）
   ・url が空 "" のものは「準備中」と表示される
   ・YouTube は限定公開のURLをそのまま貼る（https://youtu.be/xxxx でも可）
   ========================================================= */
window.SITE = {

  /* ---------- Zoom 5回 ---------- */
  sessions: [
    {
      n: 1, date: "2026-11-15", dow: "日", time: "21:00〜23:00",
      title: "キックオフ", theme: "うつわのおさらいと、今期の取り組み",
      youtube: "https://youtu.be/nDri0eq01pA",
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

  /* ---------- 今週のお題（9つ） ---------- */
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
      band: "https://band.us/band/105081542/post/8"
    },
    { n: 2, date: "2026-11-22", dow: "日" },
    { n: 3, date: "2026-11-29", dow: "日" },
    { n: 4, date: "2026-12-06", dow: "日" },
    { n: 5, date: "2026-12-13", dow: "日" },
    { n: 6, date: "2026-12-20", dow: "日" },
    { n: 7, date: "2026-12-27", dow: "日" },
    { n: 8, date: "2027-01-03", dow: "日" },
    { n: 9, date: "2027-01-10", dow: "日" }
  ],

  /* ---------- ライブラリ ----------
     type : video（解説動画）/ radio（ラジオ）/ article（記事・レポート）/ archive（講義アーカイブ）/ slides（スライド・資料）
     tags : kiso（基礎）/ chochiku（貯蓄）/ juyou（受容）/ ryunyu（流入）/ nami（感情と波）/ shukan（習慣）
     term : "1期" / "2期"
  ------------------------------------------------- */
  items: [
    /* --- 2期 --- */
    { id: "ar-1115", term: "2期", type: "archive", date: "2026-11-15", title: "11/15 キックオフ講義", desc: "うつわのおさらいと、今期の取り組み。ビジョンの洞窟探索ツアーのはじまり", tags: ["kiso", "nami"], url: "zoom.html?n=1", kw: "作戦会議 コンセプト 星座 洞窟" },
    { id: "s-1115", term: "2期", type: "slides", date: "2026-11-15", title: "11/15 キックオフ スライド（29枚）", desc: "3つのうつわ・行動と感情の波・すごろくの地図・PLAYFUL思考の世界", tags: ["kiso", "nami"], url: "zoom.html?n=1#slides", kw: "すごろく 5つのエリア カイゼン センリャク デザイン ビジョン アート" },
    { id: "d-world", term: "2期", type: "slides", date: "2026-11-15", title: "世界の見方をアップデートする資料集", desc: "5つのエリアと、ビジョンの洞窟・人生芸術の大海。キックオフのスライド11枚目から", tags: ["kiso"], url: "zoom.html?n=1#slide-11", kw: "PLAYFUL思考 アート思考 ビジョン思考 星のカケラ 航海術" },

    /* --- 基礎 --- */
    { id: "a-utsuwa", term: "1期", type: "article", date: "2026-09-06", title: "お金の3つのうつわ", desc: "貯蓄・受容・流入。3つのうつわの定義と育て方を一本にまとめた記事", tags: ["kiso", "chochiku", "juyou", "ryunyu"], url: "https://playfulsugahara.github.io/playful-report/utsuwa/", kw: "4ステップ チェックリスト 定義" },
    { id: "v-utsuwa", term: "1期", type: "video", date: "2026-07-31", title: "『お金の3つのうつわ』解説", desc: "まずはここから。3つのうつわの全体像", tags: ["kiso"], url: "", kw: "全体像 はじめて" },
    { id: "r-shiru", term: "1期", type: "radio", date: "2026-08-02", title: "【重要】知る→やる→できる→わかる の仕組み", desc: "知っているのに、できない。脳の仕組みから", tags: ["kiso", "shukan"], url: "", kw: "脳 続かない 知るをできるに変える" },
    { id: "r-muishiki", term: "1期", type: "radio", date: "2026-07-28", title: "お金を遠ざける無意識の正体", desc: "気づかないうちに、お金を遠ざけているもの", tags: ["kiso", "juyou"], url: "", kw: "無意識 ブロック 思い込み" },
    { id: "ar-0802", term: "1期", type: "archive", date: "2026-08-02", title: "8/2 キックオフ＆講義① アーカイブ", desc: "1期のはじまり。お金のうつわを育てる習慣", tags: ["kiso"], url: "", kw: "1期 キックオフ" },
    { id: "s-0802", term: "1期", type: "slides", date: "2026-08-02", title: "8/2 キックオフ＆講義① スライド資料", desc: "1期キックオフのスライド", tags: ["kiso"], url: "", kw: "1期 キックオフ" },
    { id: "a-0825", term: "1期", type: "article", date: "2026-08-25", title: "8/25 交流会レポート", desc: "始めてみて起きた変化、途中で出てくるしんどさ、引き受けすぎてしまうとき、潜在意識の仕組み", tags: ["kiso", "shukan"], url: "https://playfulsugahara.github.io/playful-report/20260825/", kw: "しんどい 引き受けすぎ 潜在意識" },
    { id: "a-0914", term: "1期", type: "article", date: "2026-09-14", title: "9/14 質問会・交流会レポート", desc: "「これ、無駄だったんじゃないか」に集まった8つのケースを、3つのうつわで読み解く", tags: ["kiso", "juyou"], url: "https://playfulsugahara.github.io/playful-report/20260914/", kw: "無駄遣い 罪悪感 ケース" },
    { id: "a-0924", term: "1期", type: "article", date: "2026-09-24", title: "9/24 交流会・質問会レポート", desc: "完璧主義や「頑張る」を手放すと、なぜ豊かさが入ってくるのか", tags: ["kiso", "ryunyu"], url: "https://playfulsugahara.github.io/playful-report/20260924/", kw: "完璧主義 頑張る 手放す 豊かさ" },

    /* --- 貯蓄 --- */
    { id: "v-chochiku", term: "1期", type: "video", date: "2026-07-31", title: "貯蓄のうつわ：解説", desc: "現状把握と、スペースを空けておくこと", tags: ["chochiku"], url: "https://youtu.be/_p0pVCALKqY", kw: "現状把握 余白" },
    { id: "v-shushi", term: "1期", type: "video", date: "2026-07-31", title: "収支を見るワーク 全体像", desc: "収支を見るワークの全体の流れ", tags: ["chochiku"], url: "https://youtu.be/EYyA_u5eUJA", kw: "収支 家計" },
    { id: "v-receipt", term: "1期", type: "video", date: "2026-07-31", title: "貯蓄：ワーク① 収支を見る｜レシートワーク", desc: "レシートワークのやり方", tags: ["chochiku", "juyou"], url: "https://youtu.be/pA4rIJy9nnM", kw: "レシート 感情 記録" },
    { id: "v-genjo", term: "1期", type: "video", date: "2026-07-31", title: "貯蓄：ワーク② 収支を見る｜現状把握", desc: "今のお金の流れを把握する", tags: ["chochiku"], url: "https://youtu.be/kh_FD8tetvY", kw: "現状把握 固定費" },
    { id: "v-guide", term: "1期", type: "video", date: "2026-07-28", title: "収支のワーク｜ガイド", desc: "収支のワークの進め方ガイド", tags: ["chochiku"], url: "", kw: "収支 やり方" },
    { id: "ar-0824", term: "1期", type: "archive", date: "2026-08-24", title: "8/24 作業会 アーカイブ", desc: "みんなでレシートワークをした作業会", tags: ["chochiku"], url: "", kw: "レシート 作業会" },
    { id: "a-0824", term: "1期", type: "article", date: "2026-08-24", title: "8/24 作業会レポート", desc: "3つのうつわの全体像、レシートワークの実務Q&A、「頑張るのをやめる」と入ってくる理由", tags: ["chochiku", "kiso"], url: "https://playfulsugahara.github.io/playful-report/20260824/", kw: "レシート Q&A 頑張るのをやめる" },

    /* --- 受容 --- */
    { id: "v-juyou", term: "1期", type: "video", date: "2026-07-31", title: "受容のうつわ：解説", desc: "自分の感情や欲にフォーカスし、細かく叶えてあげる", tags: ["juyou"], url: "", kw: "喜び 欲 感情" },
    { id: "ar-0901", term: "1期", type: "archive", date: "2026-09-01", title: "9/1 講義② アーカイブ「喜びを増やす」", desc: "受容のうつわを育てる講義", tags: ["juyou"], url: "", kw: "喜び 買い物" },
    { id: "a-0901", term: "1期", type: "article", date: "2026-09-01", title: "9/1 第二回講義｜喜びを増やす取り組み", desc: "見えないもの／見えるもの・全信全疑・欲と専門性", tags: ["juyou"], url: "https://playfulsugahara.github.io/playful-report/20260901/", kw: "全信全疑 欲 専門性" },
    { id: "a-0901b", term: "1期", type: "article", date: "2026-09-03", title: "喜びを増やして、お買い物上手になろう", desc: "自分の買い物を振り返り、喜びを増やす取り組み", tags: ["juyou"], url: "https://playfulsugahara.github.io/playful-report/20260901-report/", kw: "買い物 4象限 喜び" },

    /* --- 流入・感情と波 --- */
    { id: "v-ryunyu", term: "1期", type: "video", date: "2026-07-31", title: "流入のうつわ：解説", desc: "稼げる量。ここ半年の収入＋臨時収入の平均（月商）", tags: ["ryunyu"], url: "https://youtu.be/k--CBdSdWCw", kw: "臨時収入 収入" },
    { id: "ar-1004", term: "1期", type: "archive", date: "2026-10-04", title: "10/4 講義③ アーカイブ「感情と行動の波」", desc: "行動の波と感情の波。今期のベースになる講義", tags: ["ryunyu", "nami"], url: "", kw: "行動の波 感情の波 やる やらない" },
    { id: "a-1004", term: "1期", type: "article", date: "2026-10-04", title: "10/4 第三回講義レポート", desc: "気分で決めるのをやめる。行動の波と感情の波。〈流入〉のうつわと、臨時収入の正体", tags: ["ryunyu", "nami"], url: "https://playfulsugahara.github.io/playful-report/20261004/", kw: "行動の波 感情の波 臨時収入 気分" },

    /* --- 習慣 --- */
    { id: "v-kotsu", term: "1期", type: "video", date: "2026-07-28", title: "習慣化のコツ｜レクチャー動画", desc: "習慣を続けるためのコツ", tags: ["shukan"], url: "https://youtu.be/FNdgEwh-pFs", kw: "続かない 習慣化" },
    { id: "v-yasashisa", term: "1期", type: "video", date: "2026-07-28", title: "自分への優しさが習慣継続のカギ", desc: "お金のうつわを育てるテレビ", tags: ["shukan"], url: "", kw: "自分を責める 優しさ 継続" },
    { id: "v-profile", term: "1期", type: "video", date: "2026-07-28", title: "習慣化プロフィールについて", desc: "習慣化プロフィールの読み方", tags: ["shukan"], url: "https://youtu.be/iX-s4OeqCoc", kw: "プロフィール ホロスコープ" }
  ]
};

window.TAGS = { kiso: "基礎", chochiku: "貯蓄", juyou: "受容", ryunyu: "流入", nami: "感情と波", shukan: "習慣" };
window.TYPES = { video: "解説動画", radio: "ラジオ", article: "記事", archive: "講義アーカイブ", slides: "スライド・資料" };
