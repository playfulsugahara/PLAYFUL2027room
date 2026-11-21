/* 2027年作戦会議 メンバーページ ── data.js の台帳から各ページを組み立てる */
(function () {
  const S = window.SITE, TAGS = window.TAGS, TYPES = window.TYPES;
  const ICON = { video: "▶", radio: "🎧", article: "📖", archive: "🎥", slides: "🖼", work: "✍️" };
  const params = new URLSearchParams(location.search);
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* 今日（確認用に ?today=2026-11-22 で日付を変えられる） */
  const today = params.get("today") || new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Tokyo" });
  const md = (d) => { const [, m, dd] = d.split("-"); return `${+m}/${+dd}`; };
  const released = (d) => d <= today;

  const qOpen = S.questions.filter((q) => released(q.date) && q.q);
  const latestQ = qOpen[qOpen.length - 1];
  const nextSession = S.sessions.find((s) => s.date >= today);

  function ytId(url) {
    if (!url) return "";
    const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : "";
  }

  /* YouTube の動画は、いきなり再生せず詳細ページ（item.html）へ */
  function detailHref(it) {
    if (it.type === "work") return `item.html?id=${encodeURIComponent(it.id)}`; /* ワークは動画がなくても要点ページへ */
    if (it.url && ytId(it.url) && ["video", "radio", "archive"].includes(it.type)) return `item.html?id=${encodeURIComponent(it.id)}`;
    return it.url;
  }

  function itemHTML(it, snip) {
    const tags = (it.tags || []).map((t) => `<span class="badge">${TAGS[t]}</span>`).join("");
    const term = `<span class="badge ${it.term === "2期" ? "t2" : ""}">${it.term}</span>`;
    const href = detailHref(it);
    const wait = href ? "" : `<span class="badge wait">準備中</span>`;
    const ext = /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "";
    const inner = `<span class="ic" aria-hidden="true">${ICON[it.type]}</span>
      <span><span class="tt">${esc(it.title)}${it.sub ? `<small class="sub">${esc(it.sub)}</small>` : ""}</span><span class="ds">${esc(it.desc)}</span>${snip ? `<span class="hit">${snip}</span>` : ""}
      <span class="meta"><span class="badge">${TYPES[it.type]}</span>${term}${tags}${wait}</span></span>`;
    return href
      ? `<li><a class="item t-${it.type}" href="${esc(href)}"${ext}>${inner}</a></li>`
      : `<li><div class="item t-${it.type} off" aria-disabled="true">${inner}</div></li>`;
  }

  /* ---------------- ホーム ---------------- */
  function home() {
    /* お知らせ：上から3件。4件目からは「すべてのお知らせ」の中。date から7日間は NEW */
    const news = (S.news || []).filter((n) => released(n.date));
    if (news.length) {
      const ago = (d) => (Date.parse(today) - Date.parse(d)) / 864e5;
      const li = (n) => {
        const inner = `<span class="d">${n.date.slice(5).replace("-", ".")}</span>${ago(n.date) < 7 ? `<span class="new">NEW</span>` : ""}<span class="tx">${esc(n.text)}</span>`;
        return n.href ? `<li><a href="${esc(n.href)}">${inner}<span class="ar" aria-hidden="true">→</span></a></li>` : `<li><div>${inner}</div></li>`;
      };
      const more = news.slice(3);
      $("#news").innerHTML = `<div class="news"><span class="script">Information</span><h2 class="news-h">お知らせ</h2>
        <ul>${news.slice(0, 3).map(li).join("")}</ul>
        ${more.length ? `<details><summary>すべてのお知らせ（${news.length}件）</summary><ul>${more.map(li).join("")}</ul></details>` : ""}</div>`;
    }
    if (latestQ) {
      $("#odai").innerHTML = `<div class="card lime"><span class="flag">今週の問い</span>
        <span class="num">Q${latestQ.n}｜${md(latestQ.date)}（${latestQ.dow}）配信</span>
        <p class="odai-q">${esc(latestQ.q)}</p>
        <p class="muted">${latestQ.due ? `${latestQ.due}までに、ノートや手帳に書いてみましょう。` : ""}</p>
        <div class="row"><a class="btn" href="odai.html">問いを見る →</a></div></div>`;
    }
    if (nextSession) {
      $("#next").innerHTML = `<div class="card blue"><span class="num">NEXT ZOOM｜第${nextSession.n}回</span>
        <h3>${md(nextSession.date)}（${nextSession.dow}）${nextSession.time}</h3>
        <p>${esc(nextSession.title)}：${esc(nextSession.theme)}</p></div>`;
    }

    /* すごろく：Zoom 5マス＋問い 9マス を日付順に（同じ日は Zoom → 問い） */
    const cells = [
      ...S.sessions.map((s) => ({ kind: "zoom", date: s.date, s })),
      ...S.questions.map((q) => ({ kind: "q", date: q.date, q }))
    ].sort((a, b) => (a.date === b.date ? (a.kind === "zoom" ? -1 : 1) : a.date < b.date ? -1 : 1));
    const nowIdx = cells.reduce((acc, c, i) => (released(c.date) ? i : acc), -1);

    let html = `<p class="phase">前半｜知る・集める</p>`;
    cells.forEach((c, i) => {
      if (c.date === "2026-12-20" && c.kind === "q") html += `<p class="phase">後半｜深掘る・形にする</p>`;
      const cls = [c.kind, i < nowIdx ? "done" : "", i === nowIdx ? "now" : ""].join(" ");
      const nowTag = i === nowIdx ? `<span class="now-tag">いまここ</span>` : "";
      let label, link = "";
      if (c.kind === "zoom") {
        label = `Zoom ${c.s.n}｜${c.s.title}：${c.s.theme}`;
        if (released(c.date)) link = `zoom.html?n=${c.s.n}`;
      } else {
        label = released(c.date) && c.q.q ? `問い Q${c.q.n}｜${c.q.q}` : `問い Q${c.q.n}｜（${md(c.date)}に届きます）`;
        if (released(c.date) && c.q.q) link = `odai.html#q${c.q.n}`;
      }
      const mark = c.kind === "zoom" ? `ZOOM<br>${c.s.n}` : `Q${c.q.n}`;
      const inner = `<span class="n">${mark}</span><span class="body"><span class="d">${md(c.date)}（${c.kind === "zoom" ? c.s.dow : c.q.dow}）</span>${nowTag}<span class="tt">${esc(label)}${link ? " →" : ""}</span></span>`;
      /* 開いている回は、丸アイコンも文字も、行のどこを押しても飛べる */
      html += link ? `<li class="${cls} go"><a class="rowlink" href="${link}">${inner}</a></li>` : `<li class="${cls}">${inner}</li>`;
      c.link = link; c.now = i === nowIdx;
    });
    $("#steps").innerHTML = html;

    /* 盤面の画像の上に、押せるマスを重ねる（img/sugoroku.png 2000×1414 の上での [x, y, 幅, 高さ]。マス目の線から測った値） */
    const IW = 2000, IH = 1414, T = 147, B = 1047, RH = 219;
    const POS = {
      q4: [147, T, 239, RH], q3: [392, T, 238, RH], zoom2: [636, T, 239, RH], q2: [880, T, 239, RH], q1: [1124, T, 239, RH], zoom1: [1369, T, 238, RH],
      zoom3: [147, 372, 239, RH], q5: [147, 597, 239, RH], q6: [147, 822, 239, RH],
      q7: [147, B, 241, RH], zoom4: [393, B, 235, RH], q8: [634, B, 239, RH], q9: [878, B, 243, RH], zoom5: [1126, B, 239, RH]
    };
    const board = $("#board");
    if (board) {
      board.insertAdjacentHTML("beforeend", cells.map((c) => {
        const key = c.kind === "zoom" ? `zoom${c.s.n}` : `q${c.q.n}`;
        const [x, y, w, h] = POS[key];
        const st = `left:${x / IW * 100}%;top:${y / IH * 100}%;width:${w / IW * 100}%;height:${h / IH * 100}%`;
        const name = c.kind === "zoom" ? `Zoom ${c.s.n}` : `問い Q${c.q.n}`;
        const cl = `hot${c.now ? " now" : ""}`;
        return c.link ? `<a class="${cl}" href="${c.link}" style="${st}" aria-label="${name}"></a>`
          : (c.now ? `<span class="${cl}" style="${st}"></span>` : "");
      }).join(""));
    }

    $("#tiles").innerHTML = Object.entries(TAGS).map(([k, v]) => {
      const n = S.items.filter((it) => it.tags.includes(k)).length;
      return `<a class="tile ${k}" href="library.html?tab=${k}"><b>${v}</b><span>${n}件</span></a>`;
    }).join("");
  }

  /* ---------------- Zoom ---------------- */
  function zoom() {
    const n = +params.get("n");
    const s = S.sessions.find((x) => x.n === n);
    const list = S.sessions.map((x) => {
      const open = released(x.date);
      const inner = `<span class="k">第<b>${x.n}</b>回</span><span><b>${md(x.date)}（${x.dow}）${esc(x.title)}</b><br><span class="muted">${esc(x.theme)}</span></span>`;
      return open ? `<li><a href="zoom.html?n=${x.n}" class="${s && x.n === s.n ? "cur" : ""}">${inner}</a></li>` : `<li><div class="off">${inner}</div></li>`;
    }).join("");
    $("#sessions").innerHTML = list;

    if (!s) { $("#detail").hidden = true; return; }
    $("#listHead").textContent = "ほかの回";
    document.title = `第${s.n}回 ${s.title}｜2027年作戦会議`;
    $("#head").innerHTML = `<p class="no">ZOOM ${s.n} ｜ ${md(s.date)}（${s.dow}）${s.time}</p><h1>${esc(s.title)}</h1><p class="theme">${esc(s.theme)}</p>`;

    const id = ytId(s.youtube);
    $("#video").outerHTML = id
      ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="第${s.n}回 講義アーカイブ" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="row"><a class="btn ghost" href="${esc(s.youtube)}" target="_blank" rel="noopener">YouTubeで開く ↗</a>${s.dur ? `<span class="vdur">▶ 動画 ${esc(s.dur)}</span>` : ""}</p>`
      : `<div class="video wait"><p>講義の動画は準備中です。<br>アップされたら、ここで見られます。</p></div>`;

    if (s.slides) slides(s.slides); else $("#slidesSec").hidden = true;

    if (s.points.length) $("#points").innerHTML = s.points.map((p) => `<li><span>${esc(p)}</span></li>`).join("");
    else $("#pointsSec").hidden = true;

    const rel = s.related.map((rid) => S.items.find((it) => it.id === rid)).filter(Boolean);
    if (rel.length) $("#related").innerHTML = rel.map((x) => itemHTML(x)).join(""); else $("#relSec").hidden = true; /* map の番号が snip に入らないように */
  }

  function slides({ dir, count }) {
    const src = (i) => `${dir}/${String(i).padStart(2, "0")}.jpg?v=3`; /* 差し替え時はここの v を上げる */
    const img = $("#slideImg"), pos = $("#pos"), thumbs = $("#thumbs");
    thumbs.innerHTML = Array.from({ length: count }, (_, k) =>
      `<button type="button" data-i="${k + 1}" aria-label="${k + 1}枚目"><img src="${src(k + 1)}" alt="" loading="lazy" width="96" height="54"></button>`).join("");
    let cur = 1;
    const m = location.hash.match(/slide-(\d+)/);
    if (m) cur = Math.min(Math.max(+m[1], 1), count);
    function go(i) {
      cur = Math.min(Math.max(i, 1), count);
      img.src = src(cur); img.alt = `スライド ${cur}枚目`;
      pos.textContent = `${cur} / ${count}`;
      $("#prev").disabled = cur === 1; $("#next").disabled = cur === count;
      thumbs.querySelectorAll("button").forEach((b) => {
        const on = +b.dataset.i === cur; b.setAttribute("aria-current", on);
        if (on) thumbs.scrollTo({ left: b.offsetLeft - thumbs.clientWidth / 2 + b.clientWidth / 2, behavior: "smooth" });
      });
      $("#dl").href = src(cur);
    }
    $("#prev").onclick = () => go(cur - 1);
    $("#next").onclick = () => go(cur + 1);
    thumbs.onclick = (e) => { const b = e.target.closest("button"); if (b) go(+b.dataset.i); };
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "Escape") $("#lb").classList.remove("open");
    });
    let x0 = null;
    const st = $("#stage");
    st.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    st.addEventListener("touchend", (e) => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
    });
    img.onclick = () => { $("#lbImg").src = src(cur); $("#lb").classList.add("open"); };
    $("#lbClose").onclick = () => $("#lb").classList.remove("open");
    $("#lb").onclick = (e) => { if (e.target.id === "lb") $("#lb").classList.remove("open"); };
    go(cur);
    if (m) setTimeout(() => $("#slidesSec").scrollIntoView(), 50);
  }

  /* ---------------- 問い ---------------- */
  function odai() {
    const open = [...qOpen].reverse();
    const locked = S.questions.filter((q) => !released(q.date) || !q.q);
    const how = (q) => `<div class="how"><b>答え方</b><br>${q.due ? `${q.due}までに、` : ""}ノートや手帳に書いてみましょう。アウトプットできる人は、Bandの投稿のコメント欄へ。新しく思いついたら、どんどん書き足してOK。${q.band ? `<div class="row"><a class="btn blue" href="${esc(q.band)}" target="_blank" rel="noopener">Bandの投稿を開く →</a></div>` : ""}</div>`;
    $("#list").innerHTML =
      open.map((q, i) => `<article class="odai ${i === 0 ? "latest" : ""}" id="q${q.n}">
        ${i === 0 ? `<span class="flag">今週の問い</span>` : ""}
        <span class="qn">Q${q.n}</span><span class="d">${md(q.date)}（${q.dow}）</span>
        <p class="odai-q">${esc(q.q)}</p>
        <div class="body">${(q.body || []).map((b) => `<p>${esc(b)}</p>`).join("")}</div>
        ${q.hints && q.hints.length ? `<ul class="hints">${q.hints.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${how(q)}</article>`).join("") +
      locked.map((q) => `<article class="odai lock"><span class="qn">Q${q.n}</span><span class="d">${md(q.date)}（${q.dow}）に届きます</span></article>`).join("");
    if (location.hash) setTimeout(() => { const el = $(location.hash); if (el) el.scrollIntoView(); }, 50);
  }

  /* ---------------- ライブラリ ---------------- */
  function library() {
    let tab = params.get("tab") || "all";
    let type = params.get("type") || "all";
    const input = $("#q");
    input.value = params.get("q") || "";

    /* うつわ＝色つきボタン、種類・期＝プルダウン（ボタンが多すぎて分かりにくかったため。2026-11-21 慧） */
    $("#tabs").innerHTML = [["all", "すべて"], ...Object.entries(TAGS)]
      .map(([k, v]) => `<button type="button" class="u-${k}" data-k="${k}">${v}</button>`).join("");
    $("#types").innerHTML = [["all", "すべて"], ...Object.entries(TYPES)]
      .map(([k, v]) => `<option value="${k}">${v}</option>`).join("");
    /* 期で絞り込む（今期の新しいものと、1期で扱ったものを分けて見られるように。2026-11-20） */
    let term = params.get("term") || "all";
    const TERMS = [...new Set(S.items.map((it) => it.term))].sort((a, b) => (a === "2期" ? -1 : b === "2期" ? 1 : a === "1期" ? -1 : 1));
    const TLABEL = { "2期": "2期（今期）", "1期": "1期で扱ったもの" };
    $("#terms").innerHTML = [["all", "すべて"], ...TERMS.map((t) => [t, TLABEL[t] || t])]
      .map(([k, v]) => `<option value="${esc(k)}">${esc(v)}</option>`).join("");

    const norm = (s) => String(s || "").toLowerCase().normalize("NFKC");
    /* 並び順（2026-11-20 慧）：①2期の講義 → ②レシート・収支を見る → ③1期（うつわ別・同じ回をまとめる）→ ④特別講義 → ⑤使い方 → ⑥ワーク */
    const ORDER = { archive: 0, slides: 1, article: 2, video: 3, radio: 4, work: 5 };
    const TAGORDER = Object.keys(TAGS);
    const BEST = ["v-receipt", "v-genjo"], GUIDE = ["v-guide"], PIN = ["v-utsuwa"];
    const group = (it) => it.type === "work" ? 5 : GUIDE.includes(it.id) ? 4 : BEST.includes(it.id) ? 1
      : it.term === "2期" ? 0 : it.term === "1期" ? 2 : 3;

    /* 要点ページの本文（notes.js）も検索する。1文字ずつ正規化して、元の文字の位置を覚えておく */
    const BODY = {};
    Object.entries(window.NOTES || {}).forEach(([id, n]) => {
      const div = document.createElement("div");
      div.innerHTML = (n.sections || []).map((x) => `<p>${esc(x.title)}</p>${x.html}`).join("") + (n.image_alt ? `<p>${esc(n.image_alt)}</p>` : "");
      div.querySelectorAll("p,li,h3,h4,tr,blockquote").forEach((el) => el.append(" "));
      const raw = div.textContent.replace(/\s+/g, " ").trim();
      let nt = "", map = [];
      for (let i = 0; i < raw.length; i++) { const c = norm(raw[i]); nt += c; for (let k = 0; k < c.length; k++) map.push(i); }
      BODY[id] = { raw, nt, map };
    });
    /* 当たった箇所の前後を1行ぶん出し、探した言葉に色をつける */
    function snippet(b, first, words) {
      const pos = b.nt.indexOf(first);
      const at = b.map[pos], a = Math.max(0, at - 24), z = Math.min(b.raw.length, at + first.length + 40);
      const on = new Array(z - a).fill(false);
      for (let i = a; i < z; i++) {
        words.forEach((w) => {
          if (norm(b.raw.slice(i, i + w.length)) === w) for (let k = 0; k < w.length && i + k < z; k++) on[i + k - a] = true;
        });
      }
      let html = a > 0 ? "…" : "", open = false;
      for (let i = a; i < z; i++) {
        const f = on[i - a];
        if (f && !open) { html += "<mark>"; open = true; }
        if (!f && open) { html += "</mark>"; open = false; }
        html += esc(b.raw[i]);
      }
      return html + (open ? "</mark>" : "") + (z < b.raw.length ? "…" : "");
    }

    function render() {
      document.querySelectorAll("#tabs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === tab));
      $("#types").value = type; $("#types").classList.toggle("on", type !== "all");
      $("#terms").value = term; $("#terms").classList.toggle("on", term !== "all");
      const words = norm(input.value).split(/\s+/).filter(Boolean);
      const snips = {}, inBody = {};
      const hits = S.items.filter((it) => {
        if (tab !== "all" && !it.tags.includes(tab)) return false;
        if (type !== "all" && it.type !== type) return false;
        if (term !== "all" && it.term !== term) return false;
        const hay = norm([it.title, it.sub || "", it.desc, it.kw, TYPES[it.type], it.term, ...it.tags.map((t) => TAGS[t])].join(" "));
        if (words.every((w) => hay.includes(w))) return true;
        const b = BODY[it.id];
        if (!b || !words.length || !words.every((w) => hay.includes(w) || b.nt.includes(w))) return false;
        const bw = words.filter((w) => b.nt.includes(w));
        inBody[it.id] = true;
        snips[it.id] = snippet(b, bw.find((w) => !hay.includes(w)) || bw[0], bw);
        return true;
      }).sort((a, b) => {
        if (!!inBody[a.id] !== !!inBody[b.id]) return inBody[a.id] ? 1 : -1; // タイトル・説明で当たったものを先に
        const ga = group(a), gb = group(b);
        if (ga !== gb) return ga - gb;
        if (ga === 0) return (a.date > b.date ? -1 : a.date < b.date ? 1 : 0) || ORDER[a.type] - ORDER[b.type]; // 2期の講義：新しい回から
        if (ga === 2) { // 1期：うつわ別に、同じ回をまとめて
          const ta = tab === "all" ? TAGORDER.indexOf(a.tags[0]) : 0, tb = tab === "all" ? TAGORDER.indexOf(b.tags[0]) : 0;
          return ta - tb || (PIN.includes(b.id) - PIN.includes(a.id)) || (a.date < b.date ? -1 : a.date > b.date ? 1 : 0) || ORDER[a.type] - ORDER[b.type];
        }
        return 0; // それ以外は data.js の順のまま
      });
      $("#count").textContent = `${hits.length}件`;
      $("#items").innerHTML = hits.map((it) => itemHTML(it, snips[it.id])).join("");
      $("#empty").hidden = hits.length > 0;
      const u = new URL(location.href);
      tab === "all" ? u.searchParams.delete("tab") : u.searchParams.set("tab", tab);
      type === "all" ? u.searchParams.delete("type") : u.searchParams.set("type", type);
      term === "all" ? u.searchParams.delete("term") : u.searchParams.set("term", term);
      input.value ? u.searchParams.set("q", input.value) : u.searchParams.delete("q");
      history.replaceState(null, "", u);
    }
    $("#tabs").onclick = (e) => { const b = e.target.closest("button"); if (b) { tab = b.dataset.k; render(); } };
    $("#types").onchange = (e) => { type = e.target.value; render(); };
    $("#terms").onchange = (e) => { term = e.target.value; render(); };
    input.addEventListener("input", render);
    $("#searchForm").onsubmit = (e) => { e.preventDefault(); render(); input.blur(); };
    render();
  }


  /* ---------------- 詳細ページ ---------------- */
  function item() {
    const it = S.items.find((x) => x.id === params.get("id"));
    if (!it) { $("#head").innerHTML = `<h1>見つかりませんでした</h1><p class="theme"><a href="library.html">ライブラリにもどる</a></p>`; $("#detail").hidden = true; return; }
    const N = (window.NOTES || {})[it.id];
    document.title = `${it.title}${it.sub ? `｜${it.sub}` : ""}｜2027年作戦会議`;
    /* ワークの要点ページでは、メニューの「ワーク」を選択中にする */
    if (it.type === "work" || S.works.some((w) => w.item === it.id)) {
      document.querySelectorAll('a[aria-current="page"]').forEach((a) => a.removeAttribute("aria-current"));
      document.querySelectorAll('a[href="work.html"]').forEach((a) => a.setAttribute("aria-current", "page"));
    }
    const tags = it.tags.map((t) => `<a class="badge" href="library.html?tab=${t}">${TAGS[t]}</a>`).join("");
    const wk = S.works.find((w) => w.item === it.id);
    $("#head").innerHTML = `<p class="no">${TYPES[it.type].toUpperCase()} ｜ ${it.term}${wk && wk.time ? ` ｜ ⏱ 目安 ${esc(wk.time)}` : ""}</p><h1>${esc(it.title)}${it.sub ? `<span class="h1sub">${esc(it.sub)}</span>` : ""}</h1>${["video", "radio", "archive"].includes(it.type) ? "" : `<p class="theme">${esc(it.desc)}</p>`}<p class="meta" style="margin-top:10px;display:flex;gap:4px;flex-wrap:wrap">${tags}</p>`;

    const id = ytId(it.url);
    /* 動画が複数ある項目（使い方動画など）：ボタンで各動画の位置へ移動する（items の videos: [{ key, label, url, time }]） */
    if (it.videos) {
      $("#video").outerHTML = `<nav class="vjump" aria-label="動画を選ぶ">${it.videos.map((v) => `<a class="btn" href="#v-${esc(v.key)}">${esc(v.label)}${v.time ? `<small>${esc(v.time)}</small>` : ""}</a>`).join("")}</nav>`
        + it.videos.map((v) => `<section class="vsec" id="v-${esc(v.key)}"><h2 class="shadowed">${esc(v.label)}</h2><div class="video tall"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(v.url)}?rel=0" title="${esc(v.label)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="row" style="justify-content:center"><a class="btn ghost" href="${esc(v.url)}" target="_blank" rel="noopener">YouTubeで開く ↗</a><a class="btn ghost" href="#head">↑ 上にもどる</a></p></section>`).join("");
      if (location.hash) setTimeout(() => { const el = $(location.hash); if (el) el.scrollIntoView(); }, 80); /* ワーク・ライブラリの「▶ 使い方」から来たとき */
    } else
    $("#video").outerHTML = id
      ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0" title="${esc(it.title)}" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="row"><a class="btn ghost" href="${esc(it.url)}" target="_blank" rel="noopener">YouTubeで開く ↗</a>${it.dur ? `<span class="vdur">▶ 動画 ${esc(it.dur)}</span>` : ""}</p>`
      : it.type === "work" ? `<p class="row"><a class="btn ghost" href="work.html">← ワークメニューにもどる</a></p>` /* 動画のないワークは動画枠を出さない */
      : `<div class="video wait"><p>動画は準備中です。</p></div>`;

    /* 講義アーカイブにスライドがあれば、動画の下にスライドを出す（items の slides: { dir, count }） */
    if (it.slides && $("#slidesSec")) { $("#slidesSec").hidden = false; slides(it.slides); }

    let html = "", relIds = [];
    if (N) {
      N.sections.forEach((sec, i) => {
        if (sec.related) { relIds = sec.related; return; }
        html += `<section class="note"><h2 class="${i % 2 ? "shadowed" : "shadowed b"}">${esc(sec.title)}</h2><div class="note-body">${sec.html}</div></section>`;
        if (i === 1 && N.image) html += `<figure class="note-fig"><img src="${N.image}" alt="${esc(N.image_alt)}" loading="lazy"></figure>`;
      });
    } else {
      html = `<p class="muted note-wait">${it.type === "work" ? "このワークのやり方" : "この動画のポイント"}は準備中です。</p>`;
    }
    $("#notes").innerHTML = html;

    /* 次に見る：原稿で指定がなければ、同じうつわのものを自動で4件 */
    let rel = relIds.map((r) => S.items.find((x) => x.id === r)).filter(Boolean);
    if (!rel.length) rel = S.items.filter((x) => x.id !== it.id && detailHref(x) && x.tags.some((t) => it.tags.includes(t))).slice(0, 4);
    if (rel.length) $("#related").innerHTML = rel.map((x) => itemHTML(x)).join(""); else $("#relSec").hidden = true; /* map の番号が snip に入らないように */
  }


  /* ---------------- ワーク ---------------- */
  const VCOL = { chochiku: "貯蓄", juyou: "受容", ryunyu: "流入" };
  function work() {
    /* うつわは複数選べる（どれか1つでも付いていれば表示。2026-11-20 慧）。何も選んでいない＝すべて */
    let fs = (params.get("v") || "").split(",").filter((k) => VCOL[k]);
    let tf = params.get("t") || "all";
    const TCAT = [["all", "すべて"], ["5", "5分でできる"], ["15", "15分くらい"], ["30", "30分〜"]];
    $("#tf").innerHTML = `<span class="tf-l">⏱ 時間</span>` + TCAT.map(([k, v]) => `<button type="button" data-k="${k}">${v}</button>`).join("");
    $("#vf").innerHTML = [["all", "すべて"], ...Object.entries(VCOL)]
      .map(([k, v]) => `<button type="button" data-k="${k}" class="${k}">${k === "all" ? v : `<span class="dot ${k}"></span>${v}`}</button>`).join("");
    function render() {
      document.querySelectorAll("#vf button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === "all" ? !fs.length : fs.includes(b.dataset.k)));
      document.querySelectorAll("#tf button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === tf));
      const hit = (w) => fs.filter((k) => w.v.includes(k)).length; /* 選んだうつわのうち、いくつに効くか */
      const list = S.works.filter((w) => !w.hidden && (!fs.length || hit(w) > 0) && (tf === "all" || String(w.tc) === tf))
        .sort((a, b) => (b.rec - a.rec) || (hit(b) - hit(a))); /* おすすめ → 選んだうつわに多く効く順 */
      $("#works").innerHTML = list.map((w) => {
        const it = w.item && S.items.find((x) => x.id === w.item);
        const ok = it && detailHref(it);
        const dots = w.v.map((k) => `<span class="vm ${k}"><span class="dot ${k}"></span>${VCOL[k]}</span>`).join("");
        const both = w.v.length > 1 ? `<span class="both">${w.v.map((k) => VCOL[k]).join("にも")}にも効く</span>` : "";
        return `<li class="wk${w.rec ? " rec" : ""}${ok ? "" : " wait"}">
          ${w.rec ? `<span class="flag">おすすめ</span>` : ""}
          <div class="vms">${dots}${both}</div>
          <h3>${esc(w.name)}${w.isNew ? `<span class="new">NEW！</span>` : ""}</h3>
          ${w.time ? `<p class="wtime">⏱ ${esc(w.time)}</p>` : ""}
          <p class="${w.desc ? "" : "muted"}">${w.desc ? esc(w.desc) : "説明は準備中です。"}</p>
          ${ok ? `<a class="btn" href="item.html?id=${encodeURIComponent(it.id)}">やり方を見る →</a>` : `<span class="badge wait">やり方は準備中</span>`}
        </li>`;
      }).join("");
      if (!list.length) $("#works").innerHTML = `<li class="muted" style="list-style:none">この組み合わせのワークはありません。</li>`;
      const u = new URL(location.href); fs.length ? u.searchParams.set("v", fs.join(",")) : u.searchParams.delete("v");
      tf === "all" ? u.searchParams.delete("t") : u.searchParams.set("t", tf); history.replaceState(null, "", u);
    }
    $("#vf").onclick = (e) => {
      const b = e.target.closest("button"); if (!b) return;
      const k = b.dataset.k;
      if (k === "all") fs = [];
      else fs = fs.includes(k) ? fs.filter((x) => x !== k) : Object.keys(VCOL).filter((x) => x === k || fs.includes(x));
      if (fs.length === Object.keys(VCOL).length) fs = []; /* 3つとも選んだら「すべて」と同じ */
      render();
    };
    $("#tf").onclick = (e) => { const b = e.target.closest("button"); if (b) { tf = b.dataset.k; render(); } };
    render();
  }

  const page = document.body.dataset.page;

  /* ---------------- 右上の「≡ メニュー」（全ページ共通。中身はここだけで管理） ---------------- */
  function menu() {
    const wrap = $(".top .wrap");
    if (!wrap) return;
    const btn = document.createElement("button");
    btn.className = "menu-btn"; btn.type = "button";
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", "drawer");
    btn.innerHTML = `<span class="bars" aria-hidden="true"><i></i><i></i><i></i></span><span class="ml">メニュー</span>`;
    wrap.appendChild(btn);

    const a = (href, label, sub = "", ext = false) =>
      `<li><a href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}><span class="ml1">${label}</span>${sub ? `<span class="ml2">${sub}</span>` : ""}</a></li>`;
    const g = (icon, title, body) => `<div class="mg"><h3><span aria-hidden="true">${icon}</span>${title}</h3><ul>${body}</ul></div>`;
    const help = (title, body) => `<li><details><summary><span class="ml1">${title}</span></summary><div class="hp">${body}</div></details></li>`;

    const q = latestQ, z = nextSession;
    const html = `
      <div class="dr-head"><span class="dr-t">メニュー</span><button type="button" class="dr-x" aria-label="閉じる">✕</button></div>
      ${g("🔰", "はじめての方へ",
        a("item.html?id=v-guide", "このページの使い方", "メンバーページ・ワーク・ライブラリの使い方を、1分以内の動画で") +
        a("item.html?id=v-utsuwa", "まずは『お金の3つのうつわ』解説", "すべての土台になる7分の動画") +
        a("odai.html", "今週の問いに答えてみる", "ノートや手帳に書くだけでOK") +
        a("work.html", "おすすめのワークをやってみる", "「おすすめ」の印が先頭に並んでいます"))}
      ${g("📅", "今週のこと",
        (q ? a("odai.html", `今週の問い　Q${q.n}`, q.due ? `${q.due}までに` : "") : "") +
        (z ? a("zoom.html", `次のZoom　${md(z.date)}（${z.dow}）${z.time.split("〜")[0]}`, `第${z.n}回 ${z.title}：${z.theme}`) : "") +
        a("index.html#news", "お知らせ", "新しく追加したもの"))}
      ${g("🔍", "やりたいことから探す",
        a("work.html?t=5", "5分でできるワークをやりたい", "すきま時間にできるものだけ") +
        a("library.html?tab=chochiku", "お金の流れを見たい", "〈貯蓄〉のうつわ") +
        a("library.html?tab=juyou", "喜び・感情を大事にしたい", "〈受容〉のうつわ") +
        a("library.html?tab=ryunyu", "収入の流れを広げたい", "〈流入〉のうつわ") +
        a("library.html?q=波", "感情と行動の波を知りたい", "波のつかみ方") +
        a("library.html?tab=shukan", "習慣を続けるコツを知りたい", "続けるためのヒント"))}
      ${g("🎬", "種類から探す",
        a("zoom.html", "Zoomのアーカイブとスライド", "作戦会議の各回") +
        a("library.html?type=video", "解説動画") +
        a("library.html?type=radio", "ラジオ", "聞き流しで") +
        a("library.html?type=article", "記事") +
        a("library.html?type=archive", "1期の講義アーカイブ"))}
      ${g("🗺", "全体の流れ", a("index.html#map", "すごろくの地図", "2ヶ月の道のりと、いまいる場所"))}
      ${g("💡", "困ったときは",
        help("スマホのホーム画面に追加する方法",
          `<p><b>iPhone（Safari）</b><br>画面下の共有ボタン（□に↑）を押す →「ホーム画面に追加」→「追加」</p>
           <p><b>Android（Chrome）</b><br>右上の「︙」を押す →「ホーム画面に追加」→「追加」</p>
           <p>アイコンを押すだけで、アプリのようにこのページが開くようになります。</p>`) +
        help("動画が見られないとき",
          `<p>動画は限定公開です。YouTubeにログインしていなくても見られます。</p>
           <p>再生されないときは、動画の下の<b>「YouTubeで開く」</b>を押してください。YouTubeのアプリやサイトで再生できます。</p>
           <p>それでも見られないときは、ページを再読み込みするか、少し時間をおいて開いてみてください。</p>`) +
        a("receipt.html", "領収書がほしいとき", "宛名とメールアドレスを入れて申請") +
        a("https://www.band.us/band/105081542", "質問はBandへ", "わからないことは気軽に聞いてください", true))}`;

    const ov = document.createElement("div"); ov.className = "dr-ov"; ov.hidden = true;
    const dr = document.createElement("nav"); dr.id = "drawer"; dr.className = "drawer"; dr.setAttribute("aria-label", "メニュー"); dr.hidden = true;
    dr.innerHTML = html;
    document.body.append(ov, dr);

    const open = (on) => {
      btn.setAttribute("aria-expanded", String(on));
      if (on) { ov.hidden = dr.hidden = false; requestAnimationFrame(() => document.body.classList.add("dr-open")); $(".dr-x", dr).focus(); }
      else { document.body.classList.remove("dr-open"); setTimeout(() => { ov.hidden = dr.hidden = true; }, 250); btn.focus(); }
    };
    btn.onclick = () => open(true);
    ov.onclick = () => open(false);
    $(".dr-x", dr).onclick = () => open(false);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !dr.hidden) open(false); });
    dr.addEventListener("click", (e) => { if (e.target.closest("a")) open(false); });
    if (params.get("menu") === "1") open(true); /* 見た目の確認用 */ /* 同じページ内（#news など）に飛ぶときも閉じる */
  }

  /* ---------------- 右下の「一番上にもどる」（全ページ共通。少しスクロールすると出る） ---------------- */
  function toTop() {
    const b = document.createElement("button");
    b.type = "button"; b.className = "totop"; b.setAttribute("aria-label", "一番上にもどる");
    b.innerHTML = `<span aria-hidden="true">↑</span><span class="tl">TOP</span>`;
    document.body.appendChild(b);
    const sync = () => b.classList.toggle("on", window.scrollY > 400);
    window.addEventListener("scroll", sync, { passive: true }); sync();
    b.onclick = () => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  /* ---------------- 領収書の申請（receipt.html）。送信先は data.js の forms.receipt ---------------- */
  function receipt() {
    const f = $("#rc"), err = $(".rc-err"), url = (S.forms || {}).receipt;
    if (!f) return;
    const say = (m) => { err.textContent = m; err.hidden = !m; };
    if (!url) { say("ただいま準備中です。もうしばらくお待ちください。"); $("button", f).disabled = true; return; }
    const PRICE = { "2期": 8800 } /* 1期は人によって違う（お申し込み時の参加費）ので、処理のときに申し込み表で確認 */, sum = $(".rc-sum");
    f.addEventListener("change", () => {
      const k = [...f.querySelectorAll('input[name="kind"]:checked')].map((x) => x.value);
      const amt = k.map((x) => x === "1期" ? "1期はお申し込み時の参加費" : `2期は${PRICE[x].toLocaleString()}円`).join("、");
      sum.textContent = k.length ? `${k.join("・")}の${k.length}枚をお送りします（${amt}）。但し書きはどちらも「研修費として」です。` : "但し書きはどちらも「研修費として」です。";
    });
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(f), kinds = fd.getAll("kind");
      const d = Object.fromEntries(fd);
      for (const k of ["name", "atena", "mail", "mail2"]) d[k] = (d[k] || "").trim();
      if (!kinds.length) return say("どの期の領収書が必要か、選んでください。");
      if (!d.name || !d.atena || !d.mail) return say("未入力の欄があります。");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.mail)) return say("メールアドレスの形をご確認ください。");
      if (d.mail !== d.mail2) return say("確認用のメールアドレスが一致しません。");
      say("");
      const b = $("button", f); b.disabled = true; b.textContent = "送信しています…";
      try {
        /* text/plain で送ると事前確認（CORS）が要らず、Apps Script の返事も読める */
        const r = await fetch(url, { method: "POST", body: JSON.stringify({ name: d.name, atena: d.atena, mail: d.mail, kinds, website: d.website || "" }) });
        const j = await r.json();
        if (!j.ok) throw new Error(j.error || "error");
        f.hidden = true; const done = $("#rc-done"); done.hidden = false; done.focus();
      } catch (_) {
        b.disabled = false; b.textContent = "この内容で申請する";
        say("送信できませんでした。通信状況をご確認のうえ、もう一度お試しください。続くときはBandでお知らせください。");
      }
    });
  }


  /* ---------------- 用語辞典（glossary.html）。中身は glossary.js（原本は 📮 コンテンツ/06_用語辞典/*.md） ---------------- */
  const GCAT = { utsuwa: ["うつわ", "💧"], shikumi: ["心と体のしくみ", "🌊"], dodai: ["5つの土台", "🏛"], work: ["ワーク", "✍️"], aruaru: ["あるある", "💭"], sakusen: ["作戦会議", "🗺"] };
  function glossary() {
    const G = window.GLOSSARY || {};
    const ids = Object.keys(G).sort((a, b) => (G[a].yomi || G[a].term).localeCompare(G[b].yomi || G[b].term, "ja"));
    /* わかった（ok）／まだわからない（ng）は、本人のブラウザの中にだけ残す（localStorage）。運営には送らない */
    const KEY = "glossary-st";
    let st = {}; try { st = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (_) {}
    try { JSON.parse(localStorage.getItem("glossary-ok") || "[]").forEach((x) => { if (!st[x]) st[x] = "ok"; }); localStorage.removeItem("glossary-ok"); } catch (_) {}
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (_) {} };
    const mark = (x) => st[x] === "ok" ? `<span class="gi-ok" aria-label="わかった">✓</span>` : st[x] === "ng" ? `<span class="gi-ok ng" aria-label="まだわからない">?</span>` : "";
    const catB = (c) => `<span class="g-cat c-${c}"><span aria-hidden="true">${GCAT[c][1]}</span>${GCAT[c][0]}</span>`;
    const body = (t) => [t.term, ...(t.aka || []), t.find, t.hito, ...t.sections.map((s) => s.title + " " + s.html.replace(/<[^>]+>/g, " "))].join(" ");
    const norm = (s) => s.toLowerCase().replace(/[\s　、。・「」〈〉]/g, "");

    const id = params.get("id");
    if (id && G[id]) return gDetail(id);

    /* 一覧 */
    const day = Math.floor((Date.now() + 9 * 3600e3) / 864e5);
    const tid = ids[day % ids.length];
    if (tid) { const a = $("#gToday"); a.href = `glossary.html?id=${tid}`; a.innerHTML = `<span class="gt-l">今日の1語</span><b>${esc(G[tid].term)}</b><span class="gt-h">${esc(G[tid].hito)}</span><span class="gt-go">ひらく →</span>`; }
    const prog = () => {
      const n = ids.length || 1, a = ids.filter((x) => st[x] === "ok").length, b = ids.filter((x) => st[x] === "ng").length;
      $("#gProg").innerHTML = `<span class="gp-bar" role="img" aria-label="わかった${a}語・まだわからない${b}語・まだ読んでいない${ids.length - a - b}語"><i class="ok" style="width:${(a / n) * 100}%"></i><i class="ng" style="width:${(b / n) * 100}%"></i></span>
        <span class="gp-legend"><span class="k ok"></span>わかった <b>${a}</b><span class="k ng"></span>まだわからない <b>${b}</b><span class="k no"></span>まだ読んでいない <b>${ids.length - a - b}</b></span>`;
    };
    prog();
    let tab = params.get("cat") || "all", q = params.get("q") || "";
    $("#gq").value = q;
    const cats = Object.keys(GCAT).filter((c) => ids.some((x) => G[x].cat === c));
    const tabs = () => { $("#gTabs").innerHTML = [["all", "すべて"], ...cats.map((c) => [c, GCAT[c][0]]), ...(ids.some((x) => st[x] === "ng") ? [["ng", "？まだわからない"]] : [])].map(([k, v]) => `<button type="button" data-k="${k}"${k === "ng" ? ' class="g-ngtab"' : ""}>${v}</button>`).join(""); };
    tabs();
    function render() {
      document.querySelectorAll("#gTabs button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === tab));
      const nq = norm(q);
      const list = ids.filter((x) => (tab === "all" || G[x].cat === tab || (tab === "ng" && st[x] === "ng")) && (!nq || norm(body(G[x])).includes(nq)));
      $("#gCount").textContent = `${list.length}語`;
      $("#gList").innerHTML = list.map((x) => { const t = G[x]; return `<li><a class="g-item${st[x] ? " " + st[x] : ""}" href="glossary.html?id=${x}">${catB(t.cat)}<b class="gi-t">${esc(t.term)}</b><span class="gi-h">${esc(t.hito)}</span>${mark(x)}</a></li>`; }).join("");
      $("#gEmpty").hidden = list.length > 0;
    }
    $("#gTabs").onclick = (e) => { const b = e.target.closest("button"); if (!b) return; tab = b.dataset.k; render(); };
    $("#gForm").onsubmit = (e) => { e.preventDefault(); q = $("#gq").value.trim(); tab = "all"; render(); };
    $("#gq").oninput = () => { q = $("#gq").value.trim(); render(); };
    render();

    /* 1語のページ */
    function gDetail(gid) {
      const t = G[gid];
      document.title = `${t.term}｜用語辞典｜2027年作戦会議`;
      $("#gListView").hidden = true;
      const v = $("#gDetailView"); v.hidden = false;
      const hl = (q, w) => esc(q).split(esc(w)).join(`<mark>${esc(w)}</mark>`);
      const links = (t.links || []).filter((x) => G[x]);
      const rel = (t.related || []).map((r) => ({ r, it: S.items.find((x) => x.id === r.id) })).filter((x) => x.it);
      let h = `<section class="sess-head g-head"><div class="wrap"><p class="g-crumb"><a href="glossary.html"><span aria-hidden="true">📖</span>用語辞典</a></p><p class="no">${catB(t.cat)}</p><h1>${esc(t.term)}</h1><p class="g-hito">${esc(t.hito)}</p></div></section><section><div class="wrap">`;
      t.sections.forEach((s, i) => { h += `<section class="note${s.title.includes("使用例") ? " g-zoom" : s.title === "一般的な意味" ? " g-dict" : ""}"><h2 class="${i % 2 ? "shadowed" : "shadowed b"}">${esc(s.title)}</h2><div class="note-body">${s.html}</div></section>`; });
      if (links.length) h += `<section class="note"><h2 class="shadowed b">つながる言葉</h2><p class="g-chips">${links.map((x) => `<a href="glossary.html?id=${x}">${esc(G[x].term)}</a>`).join("")}</p></section>`;
      if (t.seen && t.seen.length) h += `<section class="note"><h2 class="shadowed b">登場回</h2><ul class="g-seen">${t.seen.map((s) => `<li><a href="${esc(s.href)}"${s.ext ? ' target="_blank" rel="noopener"' : ""}><q>${hl(s.q, s.w)}</q><span class="gs-t">${esc(s.title)} ${s.ext ? "↗" : "→"}</span></a></li>`).join("")}</ul></section>`;
      if (rel.length) h += `<section class="note"><h2 class="shadowed">関連する動画・記事</h2><ul class="list">${rel.map(({ r, it }) => (r.at ? itemHTML(it, `▶ ${esc(r.at)}〜 のあたり`).replace('class="hit"', 'class="hit at"') : itemHTML(it))).join("")}</ul></section>`;
      h += `<div class="g-okrow"><p class="g-okq">この言葉、どうでしたか？</p><div class="g-okbtns"><button type="button" class="btn g-okbtn" data-s="ok">✓ わかった！</button><button type="button" class="btn g-okbtn ng" data-s="ng">？ まだわからない</button></div><p class="g-oknote" id="gNote"></p></div><p class="row"><a class="btn ghost" href="glossary.html">← 用語辞典にもどる</a></p></div></section>`;
      v.innerHTML = h;
      const sync = () => {
        document.querySelectorAll(".g-okbtn").forEach((b) => { const on = st[gid] === b.dataset.s; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
        $("#gNote").textContent = st[gid] === "ok" ? "記録しました。いつでも押し直せます。" : st[gid] === "ng" ? "記録しました。一覧の「？まだわからない」から、あとで読み返せます。" : "押した記録は、このスマホの中にだけ残ります。";
      };
      document.querySelectorAll(".g-okbtn").forEach((b) => { b.onclick = () => {
        const prev = st[gid] || "";
        st[gid] = st[gid] === b.dataset.s ? undefined : b.dataset.s; if (!st[gid]) delete st[gid]; save(); sync();
        /* 運営の集計用：どの言葉が押されたかだけを送る（名前・端末の情報は送らない）。送れなくても画面には影響しない */
        const url = (S.forms || {}).glossary;
        if (url) fetch(url, { method: "POST", mode: "no-cors", keepalive: true, body: JSON.stringify({ id: gid, term: t.term, s: st[gid] || "", p: prev }) }).catch(() => {});
      }; });
      sync();
    }
  }

  menu();
  toTop();
  ({ home, zoom, odai, library, item, work, receipt, glossary }[page] || (() => {}))();
})();
