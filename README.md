# Kisah Nabi & Rasul – Interactive Quiz

Game kuis edukasi berbasis web tentang kisah Nabi dan Rasul untuk anak dan pelajar. Project tugas siswa SMK PPLG. Tanpa backend, database, login, maupun gambar/audio eksternal.

## Fitur
- 3 kategori soal (Kisah Nabi & Rasul, Mukjizat Nabi, Keteladanan) ditambah **Campuran**, yang otomatis mengambil dari semua soal (tidak ada data terpisah)
- 40 soal pilihan ganda (jumlah di Home dihitung otomatis dari data); urutan soal dan pilihan diacak, 10 soal per permainan
- Timer 15 detik per soal dengan bar waktu dan peringatan merah di 5 detik terakhir (berhenti saat jawaban dipilih; waktu habis dihitung salah)
- 3 nyawa (❤️/💔), skor +10 per jawaban benar, combo mulai 3 benar berturut-turut
- Feedback benar/salah (warna + tanda ✓/✗), jawaban yang benar, dan pembahasan
- Panel "Cara Bermain" dan "Tentang"
- Halaman hasil: skor, benar, salah, akurasi, bintang, pesan, high score, total permainan, dan indikator 🏆 HIGH SCORE BARU!
- High score dan jumlah permainan tersimpan di LocalStorage
- Responsif untuk HP, tablet, dan desktop

Catatan: kode game dibungkus dalam satu fungsi (IIFE) sehingga tidak ada variabel global.

Belum ada: efek suara/musik dan tombol mute.

## Teknologi
HTML5, CSS3, Vanilla JavaScript, LocalStorage.

## Struktur folder
```
kuis-kisah-nabi/
├── index.html   (struktur halaman)
├── style.css    (tampilan)
├── script.js    (data soal di array RAW + logika game)
├── assets/
│   ├── images/  (kosong, untuk pengembangan)
│   └── sounds/  (kosong, untuk pengembangan)
└── README.md
```

## Cara menjalankan
1. Buka `index.html` di browser, atau
2. Di VS Code pasang ekstensi **Live Server**, klik kanan `index.html`, lalu **Open with Live Server**.

## Cara menambah soal
Tambahkan satu baris di array `RAW` pada `script.js`:
```js
["kisah", "Pertanyaan?", ["A", "B", "C", "D"], 1, "Pembahasan singkat."]
```
Kategori: `kisah`, `mukjizat`, atau `teladan`. Angka `1` adalah indeks jawaban benar (0–3, urutan A–D). Pastikan sumber soal dapat dipertanggungjawabkan.

## Deploy ke Vercel
1. Upload folder ke repository GitHub.
2. Di vercel.com pilih **Add New → Project**, lalu impor repository.
3. Framework Preset: **Other**, kosongkan build command, klik **Deploy**.