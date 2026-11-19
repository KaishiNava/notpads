# NotPad — Workshop Invoice (Local Edition)

Aplikasi nota pembayaran bengkel berbasis Next.js App Router + TypeScript. Data disimpan di **localStorage browser** pada perangkat yang digunakan. Tidak membutuhkan Supabase, akun, API key, atau backend database eksternal.

## Fitur
- Dashboard kosong saat belum ada nota, daftar nota, pencarian, ringkasan transaksi.
- Pilihan ukuran A4, A5, Thermal 80mm, Thermal 58mm.
- Informasi Bengkel Honda, pembeli, kendaraan, tanggal, dan nomor nota.
- Tabel barang/jasa: Qty, harga, subtotal otomatis.
- Diskon, total, pembayaran, dan kembalian otomatis.
- Preview, hapus nota, dan print sesuai ukuran.
- Animasi Framer Motion dan responsive layout.

## Menjalankan
1. Gunakan Node.js 20 atau lebih baru.
2. Jalankan `npm install`.
3. Jalankan `npm run dev`.
4. Buka `http://localhost:3000`.

## Penyimpanan lokal — penting
Nota disimpan di localStorage browser/perangkat. Data tetap ada setelah halaman ditutup atau di-refresh, tetapi:
- Data hanya tersedia di browser dan perangkat tempat nota dibuat.
- Data dapat hilang jika data situs/browser dihapus atau pengguna memakai mode privat.
- Data tidak otomatis tersinkron ke perangkat lain.
- Vercel hanya meng-host aplikasi; data nota tidak disimpan di server Vercel.

Untuk pemakaian awal satu HP, ini sesuai. Sebaiknya ekspor/cadangkan data secara berkala sebelum membersihkan data browser.
