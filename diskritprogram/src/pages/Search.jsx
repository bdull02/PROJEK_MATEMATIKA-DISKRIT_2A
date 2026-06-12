import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, User, Hash, ArrowRight, X } from 'lucide-react';
import { categories } from '../data/categories';

// Flatten all programs into one searchable list
const allPrograms = categories.flatMap(cat =>
  cat.programs.map(prog => ({
    ...prog,
    categoryName: cat.name,
    categoryId: cat.id,
    categoryPath: cat.path,
    categoryColor: cat.color,
  }))
);

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part)
      ? <mark key={i} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded px-0.5">{part}</mark>
      : part
  );
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const found = allPrograms.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.nim.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    );
    setResults(found);
  }, [query]);

  const handleChange = e => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const clearQuery = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="page-title">Pencarian</h1>
        <p className="page-subtitle">Temukan program berdasarkan judul, nama mahasiswa, NIM, atau topik.</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          autoFocus
          placeholder="Cari judul program, nama, NIM, atau topik…"
          className="w-full pl-11 pr-12 py-4 text-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results */}
      {query.trim() === '' ? (
        /* Empty state – show suggestions */
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔍</div>
          <p className="font-semibold text-[var(--text-main)]">Mulai mengetik untuk mencari</p>
          <p className="text-sm text-[var(--text-muted)]">Coba: "himpunan", "ISBN", "Bhanu", atau "traversal"</p>

          <div className="flex flex-wrap gap-2 justify-center pt-4">
            {['himpunan', 'rekursi', 'matriks', 'BFS', 'ISBN', 'pascal'].map(hint => (
              <button
                key={hint}
                onClick={() => { setQuery(hint); setSearchParams({ q: hint }); }}
                className="px-3 py-1.5 text-xs font-bold rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-indigo-400 hover:text-indigo-600 transition-all"
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <div className="text-6xl">😶</div>
          <p className="font-semibold text-[var(--text-main)]">Tidak ada program ditemukan</p>
          <p className="text-sm text-[var(--text-muted)]">Coba kata kunci yang berbeda.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)] font-semibold">
            {results.length} program ditemukan untuk "<span className="text-indigo-600">{query}</span>"
          </p>
          <div className="space-y-3">
            {results.map(prog => (
              <Link
                to={`/program/${prog.id}`}
                key={prog.id}
                className="card-premium p-5 flex items-start gap-4 group"
              >
                {/* Color dot */}
                <div
                  className="w-2 h-full min-h-12 rounded-full shrink-0"
                  style={{ backgroundColor: prog.categoryColor }}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-bold text-sm text-[var(--text-main)] group-hover:text-indigo-600 transition-colors">
                    {highlight(prog.title, query)}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {highlight(prog.description, query)}
                  </p>
                  <div className="flex items-center flex-wrap gap-3 pt-1 text-[10px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-1 font-bold text-[var(--text-main)]">
                      <User size={10} /> {highlight(prog.author, query)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={10} /> {highlight(prog.nim, query)}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${prog.categoryColor}20`, color: prog.categoryColor }}
                    >
                      {highlight(prog.categoryName, query)}
                    </span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-indigo-600 shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
