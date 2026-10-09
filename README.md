# Kisah Nabi & Rasul – Interactive Quiz

Game kuis edukasi berbasis web tentang kisah Nabi dan Rasul untuk anak dan pelajar. Project tugas siswa SMK PPLG. Tanpa backend, database, login, maupun gambar/audio eksternal.

## Fitur
- 3 kategori soal (Kisah Nabi & Rasul, Mukjizat Nabi, Keteladanan) ditambah **Campuran**, yang otomatis mengambil dari semua soal (tidak ada data terpisah)
- 3 tingkat kesulitan, masing-masing dengan soal, timer, nyawa, dan poin sendiri:
  - **Easy · Pemula**: 20 detik, 5 nyawa, +10 poin
  - **Normal · Menengah**: 15 detik, 3 nyawa, +20 poin
  - **Hard · Ahli**: 12 detik, 3 nyawa, +30 poin
- Pilihan jumlah soal 10 / 20 / 30. Jika soal yang tersedia kurang, jumlahnya menyesuaikan dan pemain diberi tahu (soal tidak diulang diam-diam; minimal 5 soal untuk mulai)
- Urutan soal dan pilihan jawaban diacak setiap permainan
- Combo mulai 3 jawaban benar berturut-turut, pembahasan setelah menjawab
- Halaman hasil: kategori, kesulitan, benar, salah, akurasi, skor, bintang, durasi, rekor
- Rekor tersimpan per kombinasi kategori dan kesulitan, plus statistik total di LocalStorage (data versi lama dimigrasikan, bukan dihapus)
- Validasi bank soal otomatis saat game dibuka (peringatan muncul di Console jika ada soal bermasalah)
- Responsif untuk HP, tablet, dan desktop

Jumlah soal saat ini tampil di halaman Home (dihitung otomatis). Bank soal masih terus dikembangkan.

## Teknologi
HTML5, CSS3, Vanilla JavaScript, LocalStorage.

## Struktur folder
```
kuis-kisah-nabi/
├── index.html   (struktur halaman)
├── style.css    (tampilan)
├── soal-tambahan.js (soal tambahan dengan tingkat kesulitan)
├── script.js        (soal awal di array RAW + logika game)
├── assets/
│   ├── images/  (kosong, untuk pengembangan)
│   └── sounds/  (kosong, untuk pengembangan)
└── README.md
```

## Cara menjalankan
1. Buka `index.html` di browser, atau
2. Di VS Code pasang ekstensi **Live Server**, klik kanan `index.html`, lalu **Open with Live Server**.

## Cara menambah soal
Tambahkan satu baris di array `SOAL_TAMBAHAN` pada `soal-tambahan.js`:
```js
["kisah", "normal", "Pertanyaan?", ["A", "B", "C", "D"], 1, "Pembahasan singkat."]
```
Kategori: `kisah`, `mukjizat`, atau `teladan`. Kesulitan: `easy`, `normal`, atau `hard`. Angka `1` adalah indeks jawaban benar (0-3, urutan A-D). Pastikan fakta bersumber dari Al-Qur'an atau sumber Islam tepercaya. Soal yang salah format memunculkan peringatan di Console browser (F12).

## Deploy ke Vercel
1. Upload folder ke repository GitHub.
2. Di vercel.com pilih **Add New → Project**, lalu impor repository.
3. Framework Preset: **Other**, kosongkan build command, klik **Deploy**.
