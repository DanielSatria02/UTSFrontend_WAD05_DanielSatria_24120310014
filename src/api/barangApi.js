// Thin wrapper around the Barang REST endpoints (proxied through /api, see vite.config.js)
const BASE_URL = '/api/barang'

export async function fetchBarang() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`Gagal mengambil data barang (status ${response.status})`)
  }
  return response.json()
}

export async function createBarang(payload) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(`Gagal menambah barang (status ${response.status})`)
  }
  return response.json()
}

export async function deleteBarang(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  if (!response.ok && response.status !== 204) {
    throw new Error(`Gagal menghapus barang (status ${response.status})`)
  }
}
