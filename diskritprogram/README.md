# DiskritProgram — Student Program Repository

A catalog and launcher for student-built interactive HTML programs for Discrete Mathematics.

---

## What This Is

A **read-only catalog** that:
- Lists student programs by category
- Displays program metadata (title, author, NIM, description)
- Embeds the original student HTML file in an iframe
- Provides fullscreen and open-in-new-tab options

This repository **does not** generate, simulate, or recreate any educational content.
The student HTML files are the source of truth and must never be replaced.

---

## Adding Student Programs

### Step 1 — Place the HTML file

Copy the student's HTML file into:

```
public/programs/<program-id>.html
```

The `program-id` must match the `embedPath` field in `src/data/categories.js`.

Example:
```
public/programs/himpunan-operasi.html   ← matches embedPath: '/programs/himpunan-operasi.html'
public/programs/relasi-sifat.html
public/programs/logika-tabel.html
```

### Step 2 — Register the program in categories.js

Edit `src/data/categories.js` and add an entry to the correct category's `programs` array:

```js
{
  id: 'himpunan-operasi',          // unique ID, used in the URL
  title: 'Operasi Himpunan Interaktif',
  author: 'Nama Mahasiswa',
  nim: '2503999',
  description: 'Deskripsi singkat program.',
  embedPath: '/programs/himpunan-operasi.html',   // must match the file path above
  sourceInfo: 'Informasi teknis opsional.'         // optional
}
```

### Step 3 — Done

The program will automatically appear in:
- The category detail page
- The home dashboard
- Search results

---

## Current Program Slots

| ID | embedPath | Status |
|----|-----------|--------|
| himpunan-operasi | /programs/himpunan-operasi.html | ⏳ Awaiting upload |
| himpunan-demorgan | /programs/himpunan-demorgan.html | ⏳ Awaiting upload |
| himpunan-powerset | /programs/himpunan-powerset.html | ⏳ Awaiting upload |
| relasi-sifat | /programs/relasi-sifat.html | ⏳ Awaiting upload |
| relasi-mapping | /programs/relasi-mapping.html | ⏳ Awaiting upload |
| logika-tabel | /programs/logika-tabel.html | ⏳ Awaiting upload |
| logika-inferensi | /programs/logika-inferensi.html | ⏳ Awaiting upload |
| boolean-sirkuit | /programs/boolean-sirkuit.html | ⏳ Awaiting upload |
| boolean-kmap | /programs/boolean-kmap.html | ⏳ Awaiting upload |
| kombinatorika-kalkulator | /programs/kombinatorika-kalkulator.html | ⏳ Awaiting upload |
| kombinatorika-pascal | /programs/kombinatorika-pascal.html | ⏳ Awaiting upload |
| bilangan-euclid | /programs/bilangan-euclid.html | ⏳ Awaiting upload |
| bilangan-modular | /programs/bilangan-modular.html | ⏳ Awaiting upload |
| matriks-kalkulator | /programs/matriks-kalkulator.html | ⏳ Awaiting upload |
| matriks-detinv | /programs/matriks-detinv.html | ⏳ Awaiting upload |
| graf-traversal | /programs/graf-traversal.html | ⏳ Awaiting upload |
| graf-dijkstra | /programs/graf-dijkstra.html | ⏳ Awaiting upload |
| rekursi-stack | /programs/rekursi-stack.html | ⏳ Awaiting upload |
| rekursi-hanoi | /programs/rekursi-hanoi.html | ⏳ Awaiting upload |
| isbn-10 | /programs/isbn-10.html | ⏳ Awaiting upload |
| isbn-13 | /programs/isbn-13.html | ⏳ Awaiting upload |

---

## Project Structure

```
diskritprogram/
├── public/
│   └── programs/           ← PUT STUDENT HTML FILES HERE
│       ├── himpunan-operasi.html
│       ├── relasi-sifat.html
│       └── ...
├── src/
│   ├── data/
│   │   └── categories.js   ← Program metadata registry
│   └── pages/
│       ├── Home.jsx
│       ├── Categories.jsx
│       ├── CategoryDetail.jsx
│       ├── ProgramDetail.jsx   ← Embeds student HTML via iframe
│       ├── Search.jsx
│       └── About.jsx
```

---

## Running Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`
