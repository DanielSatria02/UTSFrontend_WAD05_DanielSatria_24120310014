# Dashboard Inventaris Barang

Frontend Vue 3 (Composition API + Vite) untuk mini dashboard inventaris barang. Backend (FastAPI) sudah tersedia terpisah di `http://127.0.0.1:8000`.

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`. Pastikan backend FastAPI sudah berjalan di `http://127.0.0.1:8000` — semua request `/api/*` dari Vite dev server di-proxy ke backend tersebut (lihat `vite.config.js`) agar tidak terkena masalah CORS.

## Struktur folder

```
src/
  api/
    barangApi.js        # fetch/post/delete ke endpoint /barang (async/await + try-catch)
  composables/
    useBarang.js         # state (ref) + computed (search, sort, summary) + aksi CRUD
  components/
    SummaryTiles/        # 4 tile ringkasan
    Toolbar/              # pencarian, tombol urutkan, tombol tambah
    BarangForm/           # form modal tambah barang
    BarangList/           # tabel (berubah jadi kartu di layar mobile)
    StockBadge/           # badge status stok
  App.vue                 # merangkai semua komponen
  style.css                # reset & style global
```

Setiap komponen Vue memiliki file CSS terpisah (`<style scoped src="./Nama.css">`) agar markup dan styling tidak bercampur dalam satu file.

## Ambang batas status stok

Ditentukan berdasarkan `jumlah_stok`:

| Status  | Kondisi              | Alasan |
|---------|----------------------|--------|
| Habis   | `jumlah_stok == 0`   | Tidak ada unit tersisa untuk dijual/dipakai. |
| Menipis | `1 <= jumlah_stok <= 5` | Stok rendah, perlu perhatian sebelum habis — 5 dipilih sebagai batas aman minimum untuk barang perhiasan yang perputarannya lambat dan pengisian ulang butuh waktu. |
| Aman    | `jumlah_stok > 5`    | Stok masih mencukupi kebutuhan jangka pendek. |

Logika ini terpusat di `getStockStatus()` pada `src/composables/useBarang.js` sehingga badge (`StockBadge.vue`) dan perhitungan tile ringkasan selalu konsisten.

## Fitur yang diimplementasikan

- **Pencarian** nama/kategori barang menggunakan `computed` + `.filter()`.
- **Urutkan A-Z / Z-A** menggunakan `computed` berantai (`sortedBarang`) di atas hasil pencarian, dengan `.sort()`.
- **4 tile ringkasan** (Total Barang, Stok Menipis + Habis, Jumlah Kategori, Total Unit) dihitung murni dengan `computed` + `.reduce()` dari data yang sama, tanpa endpoint tambahan.
- **Tambah barang**: form modal dengan state lokal (`reactive`), `POST /barang`, lalu refresh daftar.
- **Hapus barang**: `DELETE /barang/{id}` lalu refresh daftar.
- **Responsif**: tile ringkasan menyusut dari 4 → 2 kolom di bawah 1024px; toolbar membungkus ke baris baru; tabel berubah menjadi daftar kartu di bawah 768px menggunakan CSS murni (flexbox/grid + media query), tanpa horizontal scroll yang tidak disengaja di lebar 375px.

## Seed data

Minimal 20 data barang awal sudah disediakan oleh backend (lihat `http://127.0.0.1:8000/barang`).
