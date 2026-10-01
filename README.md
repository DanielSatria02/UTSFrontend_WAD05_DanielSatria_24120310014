# Dashboard Inventaris Barang

Frontend Vue 3 (Composition API + Vite) untuk mini dashboard inventaris barang. Backend (FastAPI) sudah tersedia terpisah di `http://127.0.0.1:8000`.

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Make sure backend runs on `http://127.0.0.1:8000` — all request `/api/*` from Vite dev server di-proxy to said backend (see `vite.config.js`) so that there are no issues with the CORS.

## Folder Structure

```
src/
	api/
		barangApi.js        # Sends fetch, POST, and DELETE requests to /barang using async/await and try/catch
	composables/
		useBarang.js        # Manages state (ref), computed search/sort/summary values, and CRUD actions
	components/
		SummaryTiles/       # Four inventory summary tiles
		Toolbar/            # Search, sort, and add-item controls
		BarangForm/         # Modal form for adding an item
		BarangList/         # Item table, displayed as cards on mobile screens
		StockBadge/         # Stock status badge
	App.vue               # Combines all components
	style.css             # Global reset and styles
```

Each Vue component has a separate CSS file (`<style scoped src="./Nama.css">`) to keep its markup and styling separate.
