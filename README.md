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


## NotPad 2.0 — pembaruan
- Halaman Pengaturan untuk identitas bengkel, logo, ukuran kertas default, footer, penomoran, dan preferensi nota.
- Logo Honda transparan bawaan tersedia di `public/honda-logo.png`; logo dapat diganti dari Pengaturan.
- Ekspor/impor cadangan JSON untuk nota dan pengaturan lokal.
- Formulir dan halaman pengaturan lebih nyaman di layar HP.
- Desain nota diperbarui untuk A4, A5, thermal 80 mm, dan 58 mm.
- Tetap menggunakan localStorage browser, tanpa Supabase.

Catatan: localStorage terikat pada browser/perangkat. Gunakan Ekspor Cadangan secara berkala. Saat memulihkan cadangan, daftar nota lokal saat ini akan diganti oleh data di file cadangan.


## NotPad 2.0.3 — Print layout fix
- Print mode now removes the app header and non-print controls from document flow, preventing blank leading pages.
- The invoice sheet is isolated before printing and uses dedicated A4/A5/80mm/58mm page rules.


## NotPad 2.1 — local-first + Android preparation
- Payment stamp is calculated automatically: LUNAS only when the paid amount covers the invoice total; otherwise BELUM LUNAS. Partial payments show remaining balance.
- Local data remains on this device/browser. A versioned local-storage schema and repository boundary are added so the storage adapter can be replaced with SQLite later without rewriting page components. Existing v1 data is migrated in place.
- Capacitor scaffolding is included. The invoice detail route now uses `/invoice?id=...` so the app can be statically exported into `out/`.
- `npm run build` creates the static web bundle. For Android, install Android Studio + Android SDK, run `npm install`, `npm run android:add` once, then `npm run android:build` and `npm run cap:open`.
- The current APK wrapper stores its localStorage inside the app's WebView on the device. This release does not yet use native SQLite; SQLite is the planned next storage adapter. Uninstalling/clearing app data can remove local records, so keep using Export Backup.
- Printing: browser/Android print services may retain a manually selected paper size. Choose the matching A4/A5/80mm/58mm media size in the print dialog if the printer exposes it. The page-specific CSS requests matching sizes, but final physical output also depends on printer/driver support.
