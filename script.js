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
const QUESTIONS = RAW.map(r => ({category:r[0], question:r[1], options:r[2], answer:r[3], explanation:r[4]}));

/* ===== STATE ===== */
const $ = id => document.getElementById(id);
const TIME = 15, TOTAL = 10;
let list = [], idx = 0, score = 0, lives = 3, right = 0, streak = 0, left = TIME, timer = null, cat = "campuran", locked = false, waitingNext = false, readyAt = 0, resultAt = 0;

/* ===== NAVIGASI ===== */
function show(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo(0, 0);
  if (id === "home") $("nQ").textContent = QUESTIONS.length; // jumlah soal selalu sesuai data
renderHome();
}
// resultAt: abaikan klik ganda yang jatuh pada tombol hasil tepat setelah quiz selesai
const justFinished = () => Date.now() - resultAt < 500;
document.querySelectorAll("[data-go]").forEach(b => b.onclick = () => {
  if (b.closest("#result") && justFinished()) return;
  stopTimer(); show(b.dataset.go);
});
document.querySelectorAll("[data-cat]").forEach(b => b.onclick = () => startGame(b.dataset.cat));
$("again").onclick = () => { if (!justFinished()) startGame(cat); };
$("next").onclick = nextQuestion;

/* ===== LOCAL STORAGE ===== */
function getStats(){
  try {
    const d = JSON.parse(localStorage.getItem("kuisNabi")) || {};
    return {high: Number(d.high) || 0, plays: Number(d.plays) || 0};
  } catch(e){ return {high:0, plays:0}; }
}
function saveStats(s){ try { localStorage.setItem("kuisNabi", JSON.stringify(s)); } catch(e){} }
function renderHome(){
  const s = getStats();
  $("hs").textContent = s.high;
  $("plays").textContent = s.plays ? "(" + s.plays + "x main)" : "";
}

/* ===== GAME ===== */
function shuffle(a){ return a.map(v => [Math.random(), v]).sort((x,y) => x[0]-y[0]).map(x => x[1]); }

function startGame(c){
  cat = c;
  const pool = c === "campuran" ? QUESTIONS : QUESTIONS.filter(q => q.category === c);
  list = shuffle(pool).slice(0, TOTAL);
  idx = 0; score = 0; lives = 3; right = 0; streak = 0;
  $("score").textContent = 0; $("combo").textContent = "";
  show("quiz");
  loadQuestion();
}

function loadQuestion(){
  locked = false; waitingNext = false;
  readyAt = Date.now() + 300; // cegah klik ganda tidak sengaja menjawab soal baru
  const q = list[idx];
  $("qnum").textContent = idx + 1;
  $("bar").style.width = (idx / list.length * 100) + "%";
  $("lives").textContent = "❤️".repeat(lives) + "💔".repeat(3 - lives);
  $("question").textContent = q.question;
  $("question").setAttribute("aria-live", "polite");
  $("feedback").hidden = true;
  // acak urutan pilihan, tetap lacak mana yang benar
  const opts = shuffle(q.options.map((t, i) => ({t, ok: i === q.answer})));
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
  left = TIME; renderTime();
  timer = setInterval(() => { left--; renderTime(); if (left <= 0) answer(null); }, 1000);
}
function stopTimer(){ clearInterval(timer); timer = null; }
function renderTime(){
  $("time").textContent = Math.max(left, 0);
  $("time").parentElement.classList.toggle("low", left <= 5);
  $("tbar").style.width = (Math.max(left, 0) / TIME * 100) + "%";
  $("tbar").classList.toggle("low", left <= 5);
}

function answer(btn){
  if (locked) return;
  if (btn && Date.now() < readyAt) return;
  locked = true; waitingNext = true; stopTimer();
  const q = list[idx];
  const correct = btn && btn.dataset.ok === "true";
  document.querySelectorAll(".opt").forEach(b => {
    b.disabled = true;
    if (b.dataset.ok === "true") b.classList.add("correct");
  });
  if (correct){
    score += 10; right++; streak++;
    $("score").textContent = score; $("score").classList.add("pop");
    setTimeout(() => $("score").classList.remove("pop"), 300);
    $("combo").textContent = streak >= 3 ? "Combo x" + streak + "!" : "";
    $("fbTitle").textContent = "✅ Jawaban Benar! +10";
  } else {
    if (btn) btn.classList.add("wrong");
    lives = Math.max(0, lives - 1); streak = 0; $("combo").textContent = "";
    $("lives").textContent = "❤️".repeat(lives) + "💔".repeat(3 - lives);
    $("fbTitle").textContent = btn ? "❌ Belum Tepat" : "⏰ Waktu habis";
  }
  $("fbAnswer").textContent = "Jawaban yang benar: " + q.options[q.answer];
  $("fbText").textContent = "Pembahasan: " + q.explanation;
  $("next").textContent = (lives <= 0 || idx === list.length - 1) ? "Lihat Hasil" : "Lanjut";
  $("feedback").hidden = false;
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
  const answered = idx;                 // soal yang benar-benar dijawab
  const wrong = answered - right;
  const acc = answered ? Math.round(right / answered * 100) : 0;
  const pct = score;                    // skor 0-100 dipakai untuk bintang & pesan
  const s = getStats();
  const isNew = score > s.high;
  s.plays++; if (isNew) s.high = score;
  saveStats(s);
  $("rScore").textContent = score;
  $("rRight").textContent = right;
  $("rWrong").textContent = wrong;
  $("rAcc").textContent = acc + "%";
  const n = pct >= 90 ? 5 : pct >= 70 ? 4 : pct >= 50 ? 3 : pct >= 30 ? 2 : 1;
  $("stars").textContent = "⭐".repeat(n);
  $("rMsg").textContent = pct >= 90 ? "Hebat! Pemahamanmu sangat baik."
    : pct >= 70 ? "Bagus! Tinggal sedikit lagi untuk hasil maksimal."
    : pct >= 50 ? "Sudah cukup baik. Yuk pelajari lagi."
    : "Jangan menyerah. Coba lagi dan tingkatkan hasilmu.";
  $("rBest").textContent = isNew ? "🏆 HIGH SCORE BARU!" : "🏆 High Score: " + s.high;
  $("rPlays").textContent = "Total permainan: " + s.plays;
  resultAt = Date.now();
  show("result");
}

renderHome();
})();