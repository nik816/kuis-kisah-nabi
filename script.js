(function () {
"use strict";
/* ===== DATA SOAL =====
   Format: [kategori, pertanyaan, [4 pilihan], index jawaban benar (mulai 0), pembahasan]
   Kategori: kisah | mukjizat | teladan */
const RAW = [
["kisah","Siapakah nabi yang membuat kapal atas perintah Allah?",["Nabi Ibrahim AS","Nabi Nuh AS","Nabi Musa AS","Nabi Yunus AS"],1,"Nabi Nuh AS diperintahkan membuat kapal sebelum banjir besar datang."],
["kisah","Siapakah manusia pertama sekaligus nabi pertama?",["Nabi Adam AS","Nabi Idris AS","Nabi Nuh AS","Nabi Ibrahim AS"],0,"Nabi Adam AS adalah manusia pertama dan nabi pertama."],
["kisah","Nabi yang pernah ditelan ikan besar adalah...",["Nabi Yusuf AS","Nabi Yunus AS","Nabi Ayyub AS","Nabi Harun AS"],1,"Nabi Yunus AS ditelan ikan besar, lalu berdoa memohon ampun kepada Allah."],
["kisah","Kitab Taurat diturunkan kepada...",["Nabi Daud AS","Nabi Isa AS","Nabi Musa AS","Nabi Muhammad SAW"],2,"Taurat diturunkan kepada Nabi Musa AS."],
["kisah","Kitab Injil diturunkan kepada...",["Nabi Isa AS","Nabi Musa AS","Nabi Daud AS","Nabi Sulaiman AS"],0,"Injil diturunkan kepada Nabi Isa AS."],
["kisah","Kitab Zabur diturunkan kepada...",["Nabi Musa AS","Nabi Daud AS","Nabi Isa AS","Nabi Yahya AS"],1,"Zabur diturunkan kepada Nabi Daud AS."],
["kisah","Al-Qur'an diturunkan kepada...",["Nabi Isa AS","Nabi Ibrahim AS","Nabi Muhammad SAW","Nabi Musa AS"],2,"Al-Qur'an diturunkan kepada Nabi Muhammad SAW melalui Malaikat Jibril."],
["kisah","Nabi yang dimasukkan ke dalam sumur oleh saudara-saudaranya adalah...",["Nabi Yusuf AS","Nabi Yakub AS","Nabi Ismail AS","Nabi Ishaq AS"],0,"Nabi Yusuf AS dimasukkan ke sumur oleh saudara-saudaranya, kisahnya ada dalam Surah Yusuf."],
["kisah","Nabi yang dikenal sangat sabar ketika diuji dengan sakit adalah...",["Nabi Ayyub AS","Nabi Luth AS","Nabi Hud AS","Nabi Syu'aib AS"],0,"Nabi Ayyub AS sabar saat diuji sakit dan tetap berdoa kepada Allah."],
["kisah","Siapakah nabi yang membangun Ka'bah bersama putranya, Ismail?",["Nabi Nuh AS","Nabi Ibrahim AS","Nabi Adam AS","Nabi Musa AS"],1,"Nabi Ibrahim AS dan Nabi Ismail AS meninggikan fondasi Ka'bah."],
["kisah","Nabi yang diberi kerajaan dan dapat memahami bahasa burung adalah...",["Nabi Sulaiman AS","Nabi Zakaria AS","Nabi Harun AS","Nabi Idris AS"],0,"Allah mengajarkan Nabi Sulaiman AS bahasa burung."],
["kisah","Berapa jumlah rasul Ulul Azmi?",["3","5","7","10"],1,"Ulul Azmi ada 5: Nuh, Ibrahim, Musa, Isa, dan Muhammad SAW."],
["kisah","Siapakah nabi dan rasul terakhir?",["Nabi Isa AS","Nabi Musa AS","Nabi Muhammad SAW","Nabi Yahya AS"],2,"Nabi Muhammad SAW adalah penutup para nabi."],
["mukjizat","Tongkat yang berubah menjadi ular adalah mukjizat...",["Nabi Musa AS","Nabi Nuh AS","Nabi Yunus AS","Nabi Adam AS"],0,"Tongkat Nabi Musa AS menjadi ular dengan izin Allah."],
["mukjizat","Api tidak membakar Nabi Ibrahim AS. Apa penyebabnya?",["Ia pandai berenang","Allah memerintahkan api menjadi dingin","Api padam sendiri","Ia memakai pelindung"],1,"Allah memerintahkan api menjadi dingin dan menyelamatkan Nabi Ibrahim AS."],
["mukjizat","Dengan izin Allah, Nabi Isa AS dapat...",["Menyembuhkan orang buta sejak lahir","Membelah lautan","Melunakkan besi","Menundukkan angin"],0,"Dengan izin Allah, Nabi Isa AS menyembuhkan orang buta sejak lahir dan penderita kusta."],
["mukjizat","Besi menjadi lunak di tangan...",["Nabi Daud AS","Nabi Yusuf AS","Nabi Nuh AS","Nabi Ayyub AS"],0,"Allah melunakkan besi bagi Nabi Daud AS."],
["mukjizat","Mukjizat terbesar Nabi Muhammad SAW adalah...",["Tongkat","Al-Qur'an","Kapal","Unta"],1,"Al-Qur'an adalah mukjizat abadi Nabi Muhammad SAW."],
["mukjizat","Perjalanan Isra Mi'raj dialami oleh...",["Nabi Musa AS","Nabi Isa AS","Nabi Muhammad SAW","Nabi Ibrahim AS"],2,"Isra Mi'raj adalah perjalanan Nabi Muhammad SAW dalam satu malam."],
["mukjizat","Unta betina yang keluar dari batu adalah mukjizat...",["Nabi Shalih AS","Nabi Hud AS","Nabi Luth AS","Nabi Yunus AS"],0,"Unta betina Nabi Shalih AS adalah tanda kebesaran Allah bagi kaum Tsamud."],
["mukjizat","Nabi yang lahir tanpa seorang ayah adalah...",["Nabi Yahya AS","Nabi Isa AS","Nabi Ismail AS","Nabi Ishaq AS"],1,"Nabi Isa AS lahir dari Maryam dengan kuasa Allah."],
["mukjizat","Nabi yang diberi kemampuan menakwilkan mimpi adalah...",["Nabi Yusuf AS","Nabi Harun AS","Nabi Idris AS","Nabi Hud AS"],0,"Nabi Yusuf AS diajari Allah menakwilkan mimpi."],
["mukjizat","Dengan izin Allah, Nabi Isa AS juga dapat...",["Menghidupkan orang mati","Berbicara dengan semut","Membuat kapal","Membelah laut"],0,"Mukjizat Nabi Isa AS termasuk menghidupkan orang mati dengan izin Allah."],
["mukjizat","Angin ditundukkan oleh Allah untuk...",["Nabi Sulaiman AS","Nabi Yunus AS","Nabi Zakaria AS","Nabi Adam AS"],0,"Allah menundukkan angin bagi Nabi Sulaiman AS."],
["mukjizat","Tangan yang bercahaya putih adalah mukjizat...",["Nabi Musa AS","Nabi Nuh AS","Nabi Hud AS","Nabi Ismail AS"],0,"Tangan Nabi Musa AS bercahaya putih dengan izin Allah."],
["teladan","Sifat wajib rasul yang berarti jujur adalah...",["Shiddiq","Amanah","Tabligh","Fathanah"],0,"Shiddiq artinya jujur dalam ucapan dan perbuatan."],
["teladan","Amanah artinya...",["Cerdas","Menyampaikan","Dapat dipercaya","Jujur"],2,"Amanah artinya dapat dipercaya."],
["teladan","Tabligh artinya...",["Menyampaikan wahyu","Menyembunyikan wahyu","Berbohong","Melupakan"],0,"Tabligh artinya menyampaikan wahyu dari Allah."],
["teladan","Fathanah artinya...",["Jujur","Cerdas","Sabar","Dermawan"],1,"Fathanah artinya cerdas."],
["teladan","Sebelum menjadi nabi, Muhammad SAW dijuluki...",["Al-Amin","Al-Karim","Al-Fatih","Al-Hakim"],0,"Beliau dijuluki Al-Amin, yaitu orang yang dapat dipercaya."],
["teladan","Kisah Nabi Ibrahim AS dan Ismail AS mengajarkan kita untuk...",["Taat kepada perintah Allah","Menunda pekerjaan","Berbohong","Menyerah"],0,"Keduanya mencontohkan ketaatan dan keikhlasan kepada Allah."],
["teladan","Nabi Ayyub AS meneladankan sifat...",["Sabar","Sombong","Pemarah","Malas"],0,"Nabi Ayyub AS sabar menghadapi ujian."],
["teladan","Nabi Yusuf AS meneladankan sikap...",["Dendam","Memaafkan","Iri hati","Berbohong"],1,"Nabi Yusuf AS memaafkan saudara-saudaranya."],
["teladan","Setelah ditelan ikan, Nabi Yunus AS berdoa dan...",["Bertaubat kepada Allah","Marah","Berputus asa","Lari"],0,"Beliau bertasbih dan bertaubat kepada Allah."],
["teladan","Nabi Sulaiman AS meneladankan sikap...",["Sombong","Bersyukur","Kikir","Malas"],1,"Nabi Sulaiman AS bersyukur atas nikmat Allah."],
["teladan","Nabi Nuh AS meneladankan sikap...",["Mudah menyerah","Gigih berdakwah","Pemalas","Iri"],1,"Nabi Nuh AS gigih berdakwah dalam waktu yang sangat lama."],
["teladan","Nabi Muhammad SAW diutus untuk menyempurnakan...",["Akhlak mulia","Bangunan","Perdagangan","Pakaian"],0,"Beliau bersabda bahwa dirinya diutus untuk menyempurnakan akhlak mulia."],
["teladan","Sifat mustahil bagi rasul adalah...",["Berbohong","Jujur","Cerdas","Amanah"],0,"Rasul tidak mungkin berbohong (kidzib)."],
["mukjizat","Laut terbelah setelah dipukul dengan tongkat oleh...",["Nabi Musa AS","Nabi Nuh AS","Nabi Daud AS","Nabi Isa AS"],0,"Dengan izin Allah, laut terbelah sehingga Nabi Musa AS dan pengikutnya selamat."],
["kisah","Siapakah ibu Nabi Isa AS?",["Siti Hajar","Siti Maryam","Siti Sarah","Siti Asiyah"],1,"Ibu Nabi Isa AS adalah Maryam, yang namanya menjadi nama salah satu surah Al-Qur'an."]
];
/* ===== KONFIGURASI KESULITAN ===== */
const DIFFS = {
  easy:   {label:"Easy · Pemula",     time:20, lives:5, points:10},
  normal: {label:"Normal · Menengah", time:15, lives:3, points:20},
  hard:   {label:"Hard · Ahli",       time:12, lives:3, points:30}
};
const DIFF_KEYS = Object.keys(DIFFS);
const CATS = {kisah:"Kisah Nabi & Rasul", mukjizat:"Mukjizat Nabi", teladan:"Keteladanan", campuran:"Campuran"};
const MIN_Q = 5; // minimal soal agar sesi boleh dimulai

/* ===== BANK SOAL: soal lama + soal-tambahan.js ===== */
const OLD_NORMAL = new Set([9, 11, 14, 16, 19, 21, 22, 23, 38]); // indeks soal lama yang tingkat normal
const toQ = (r, d) => ({category:r[0], difficulty:d || r[1], question:r[d ? 1 : 2], options:r[d ? 2 : 3], answer:r[d ? 3 : 4], explanation:r[d ? 4 : 5]});
const OLD = RAW.map((r, i) => toQ(r, OLD_NORMAL.has(i) ? "normal" : "easy"));
const EXTRA = (typeof SOAL_TAMBAHAN !== "undefined" ? SOAL_TAMBAHAN : []).map(r => toQ(r));
const counter = {};
const QUESTIONS = OLD.concat(EXTRA).map(q => {
  counter[q.category] = (counter[q.category] || 0) + 1;
  q.id = q.category + "-" + String(counter[q.category]).padStart(3, "0");
  return q;
});

/* Validasi otomatis: hasil peringatan tampil di console */
function validateBank(){
  const issues = [], ids = new Set(), seen = new Set();
  QUESTIONS.forEach(q => {
    const k = q.id;
    if (ids.has(k)) issues.push(k + ": id ganda"); ids.add(k);
    if (!q.question || !q.question.trim()) issues.push(k + ": pertanyaan kosong");
    if (!Array.isArray(q.options) || q.options.length !== 4 || q.options.some(o => !o || !o.trim()) || new Set(q.options).size !== 4) issues.push(k + ": opsi tidak valid");
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) issues.push(k + ": index jawaban");
    if (!q.explanation || !q.explanation.trim()) issues.push(k + ": pembahasan kosong");
    if (!CATS[q.category] || q.category === "campuran") issues.push(k + ": kategori");
    if (!DIFFS[q.difficulty]) issues.push(k + ": kesulitan");
    const norm = (q.question || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (seen.has(norm)) issues.push(k + ": pertanyaan duplikat"); seen.add(norm);
  });
  if (issues.length) console.warn("Validasi bank soal:", issues);
  return issues;
}
validateBank();

/* ===== STATE ===== */
const $ = id => document.getElementById(id);
const KEY = "kuisNabi";
let sel = {cat:"campuran", diff:"normal", count:10};
let cfg = DIFFS.normal, list = [], idx = 0, score = 0, lives = 0, right = 0, streak = 0, left = 0;
let timer = null, locked = false, waitingNext = false, readyAt = 0, resultAt = 0, startedAt = 0;

/* ===== NAVIGASI ===== */
function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0, 0);
  if (id === "home") renderHome();
  if (id === "categories") renderSetup();
}
// resultAt: abaikan klik ganda yang jatuh pada tombol hasil tepat setelah quiz selesai
const justFinished = () => Date.now() - resultAt < 500;
document.querySelectorAll("[data-go]").forEach(b => b.onclick = () => {
  if (b.closest("#result") && justFinished()) return;
  stopTimer(); show(b.dataset.go);
});
document.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => { sel.cat = b.dataset.cat; renderSetup(); });
document.querySelectorAll("[data-diff]").forEach(b => b.onclick = () => { sel.diff = b.dataset.diff; renderSetup(); });
document.querySelectorAll("[data-count]").forEach(b => b.onclick = () => { sel.count = Number(b.dataset.count); renderSetup(); });
$("start").onclick = startGame;
$("next").onclick = nextQuestion;
$("again").onclick = () => { if (!justFinished()) startGame(); };

/* ===== PEMILIHAN SOAL ===== */
const poolFor = (cat, diff) => QUESTIONS.filter(q => (cat === "campuran" || q.category === cat) && q.difficulty === diff);
function renderSetup(){
  document.querySelectorAll("[data-cat]").forEach(b => { b.classList.toggle("selected", b.dataset.cat === sel.cat); b.setAttribute("aria-pressed", b.dataset.cat === sel.cat); });
  document.querySelectorAll("[data-diff]").forEach(b => {
    b.classList.toggle("selected", b.dataset.diff === sel.diff); b.setAttribute("aria-pressed", b.dataset.diff === sel.diff);
    b.querySelector(".dn").textContent = poolFor(sel.cat, b.dataset.diff).length + " soal tersedia";
  });
  document.querySelectorAll("[data-count]").forEach(b => { b.classList.toggle("selected", Number(b.dataset.count) === sel.count); b.setAttribute("aria-pressed", Number(b.dataset.count) === sel.count); });
  const n = poolFor(sel.cat, sel.diff).length, real = Math.min(sel.count, n), a = $("avail");
  a.classList.toggle("warn", n < sel.count);
  a.textContent = n < MIN_Q ? "Soal untuk pilihan ini belum cukup (" + n + "). Pilih kategori atau kesulitan lain."
    : n < sel.count ? "Hanya " + n + " soal tersedia, jadi sesi ini berisi " + real + " soal."
    : "Sesi ini berisi " + real + " soal dari " + n + " soal yang tersedia.";
  $("start").disabled = n < MIN_Q;
}

/* ===== LOCAL STORAGE (dengan migrasi data lama) ===== */
function getStats(){
  let d = {};
  try { d = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e){}
  if (typeof d !== "object") d = {};
  const n = v => Number(v) || 0;
  const s = {plays:n(d.plays), right:n(d.right), wrong:n(d.wrong), high:{}, diffPlays:{}, records:{}, history:[]};
  DIFF_KEYS.forEach(k => {
    s.high[k] = n(d.high && typeof d.high === "object" ? d.high[k] : 0);
    s.diffPlays[k] = n(d.diffPlays && d.diffPlays[k]);
  });
  if (typeof d.high === "number" || typeof d.high === "string") s.high.easy = Math.max(s.high.easy, n(d.high)); // migrasi versi lama
  if (d.records && typeof d.records === "object") Object.keys(d.records).forEach(k => { s.records[k] = n(d.records[k]); });
  if (Array.isArray(d.history)) s.history = d.history.filter(h => h && typeof h === "object").slice(-10).map(h => ({score:n(h.score), cat:String(h.cat), diff:String(h.diff)}));
  return s;
}
function saveStats(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }
function renderHome(){
  const s = getStats();
  $("nQ").textContent = QUESTIONS.length;
  $("hs").textContent = DIFF_KEYS.map(k => k[0].toUpperCase() + k.slice(1) + " " + s.high[k]).join(" · ");
  $("plays").textContent = s.plays ? "(" + s.plays + "x main)" : "";
}

/* ===== GAME ===== */
function shuffle(a){ // Fisher-Yates
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function startGame(){
  const pool = poolFor(sel.cat, sel.diff);
  if (pool.length < MIN_Q) return;
  cfg = DIFFS[sel.diff];
  list = shuffle(pool).slice(0, Math.min(sel.count, pool.length)); // tanpa pengulangan
  idx = 0; score = 0; lives = cfg.lives; right = 0; streak = 0; startedAt = Date.now();
  $("score").textContent = 0; $("combo").textContent = "";
  show("quiz");
  loadQuestion();
}
function renderLives(){ $("lives").textContent = "❤️".repeat(lives) + "💔".repeat(cfg.lives - lives); }

function loadQuestion(){
  locked = false; waitingNext = false;
  readyAt = Date.now() + 300; // cegah klik ganda tidak sengaja menjawab soal baru
  const q = list[idx];
  $("qnum").textContent = idx + 1;
  $("qtotal").textContent = list.length;
  $("bar").style.width = (idx / list.length * 100) + "%";
  renderLives();
  $("question").textContent = q.question;
  $("feedback").hidden = true;
  const opts = shuffle(q.options.map((t, i) => ({t, ok: i === q.answer}))); // jawaban benar ikut terlacak
  const box = $("options");
  box.innerHTML = "";
  opts.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.textContent = "ABCD"[i] + ". " + o.t;
    b.dataset.ok = o.ok;
    b.onclick = () => answer(b);
    box.appendChild(b);
  });
  startTimer();
}
function startTimer(){
  stopTimer();
  left = cfg.time; renderTime();
  timer = setInterval(() => { left--; renderTime(); if (left <= 0) answer(null); }, 1000);
}
function stopTimer(){ clearInterval(timer); timer = null; }
function renderTime(){
  $("time").textContent = Math.max(left, 0);
  $("time").parentElement.classList.toggle("low", left <= 5);
  $("tbar").style.width = (Math.max(left, 0) / cfg.time * 100) + "%";
  $("tbar").classList.toggle("low", left <= 5);
}

function answer(btn){
  if (locked) return;
  if (btn && Date.now() < readyAt) return;
  locked = true; waitingNext = true; stopTimer();
  const q = list[idx];
  const correct = btn && btn.dataset.ok === "true";
  document.querySelectorAll(".opt").forEach(b => { b.disabled = true; if (b.dataset.ok === "true") b.classList.add("correct"); });
  $("bar").style.width = ((idx + 1) / list.length * 100) + "%";
  if (correct){
    score += cfg.points; right++; streak++;
    $("score").textContent = score; $("score").classList.add("pop");
    setTimeout(() => $("score").classList.remove("pop"), 300);
    $("combo").textContent = streak >= 3 ? "Combo x" + streak + "!" : "";
    $("fbTitle").textContent = "✅ Jawaban Benar! +" + cfg.points;
  } else {
    if (btn) btn.classList.add("wrong");
    lives = Math.max(0, lives - 1); streak = 0; $("combo").textContent = "";
    renderLives();
    $("fbTitle").textContent = btn ? "❌ Belum Tepat" : "⏰ Waktu habis";
  }
  $("fbAnswer").textContent = "Jawaban yang benar: " + q.options[q.answer];
  $("fbText").textContent = "Pembahasan: " + q.explanation;
  $("next").textContent = (lives <= 0 || idx === list.length - 1) ? "Lihat Hasil" : "Lanjut";
  $("feedback").hidden = false;
  $("feedback").scrollIntoView({block:"nearest", behavior:"smooth"});
}
function nextQuestion(){
  if (!waitingNext) return; // cegah klik ganda "Lanjut" / "Lihat Hasil"
  waitingNext = false;
  idx++;
  if (lives <= 0 || idx >= list.length) return finish();
  loadQuestion();
}

function finish(){
  stopTimer();
  const answered = idx, wrong = answered - right;
  const acc = answered ? Math.round(right / answered * 100) : 0;
  const max = list.length * cfg.points;
  const pct = max ? score / max * 100 : 0; // bintang & pesan memakai persentase dari skor maksimum
  const rk = sel.cat + "|" + sel.diff;
  const s = getStats();
  const isNew = score > (s.records[rk] || 0);
  s.plays++; s.right += right; s.wrong += wrong; s.diffPlays[sel.diff]++;
  if (isNew) s.records[rk] = score;
  s.high[sel.diff] = Math.max(s.high[sel.diff], score);
  s.history.push({score, cat:sel.cat, diff:sel.diff}); s.history = s.history.slice(-10);
  saveStats(s);
  const sec = Math.round((Date.now() - startedAt) / 1000);
  $("rInfo").textContent = CATS[sel.cat] + " · " + cfg.label;
  $("rScore").textContent = score; $("rMax").textContent = max;
  $("rRight").textContent = right; $("rWrong").textContent = wrong; $("rAcc").textContent = acc + "%";
  $("rMeta").textContent = "Dijawab " + answered + " dari " + list.length + " soal · Durasi " + Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
  const n = pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;
  $("stars").textContent = "⭐".repeat(n);
  $("rMsg").textContent = pct >= 90 ? "Hebat! Pemahamanmu sangat baik."
    : pct >= 70 ? "Bagus! Tinggal sedikit lagi untuk hasil maksimal."
    : pct >= 50 ? "Sudah cukup baik. Yuk pelajari lagi."
    : "Jangan menyerah. Coba lagi dan tingkatkan hasilmu.";
  $("rBest").textContent = isNew && score > 0 ? "🏆 HIGH SCORE BARU!" : "🏆 Rekor (" + CATS[sel.cat] + " · " + sel.diff + "): " + (s.records[rk] || 0);
  $("rPlays").textContent = "Total permainan: " + s.plays + " · Benar " + s.right + " · Salah " + s.wrong;
  resultAt = Date.now();
  show("result");
}

renderHome();
})();
