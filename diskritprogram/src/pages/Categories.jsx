import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { categories, difficultyColor } from '../data/categories';
import * as LucideIcons from 'lucide-react';

function CategoryIcon({ name, size = 22 }) {
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon size={size} />;
}

const DIFFICULTIES = ['Semua', 'Dasar', 'Menengah', 'Lanjutan'];

export default function Categories() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filtered = categories.filter(cat => {
    const matchSearch =
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'Semua' || cat.difficulty === filter;
    return matchSearch && matchFilter;
  });

  const totalPrograms = categories.reduce((s, c) => s + c.programs.length, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="page-title">Semua Kategori</h1>
        <p className="page-subtitle">
          {categories.length} kategori topik · {totalPrograms} program mahasiswa tersedia
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            size={16}
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari kategori atau deskripsi…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-main)] outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={15} className="text-[var(--text-muted)]" />
          <div className="flex gap-1.5">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  filter === d
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-indigo-400 hover:text-[var(--text-main)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-[var(--text-muted)]">
          <div className="text-5xl mb-4">🔍</div>
          <p className="font-semibold">Tidak ada kategori yang cocok</p>
          <p className="text-sm mt-1">Coba ubah kata kunci atau filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(cat => {
            const badge = difficultyColor[cat.difficulty];
            return (
              <Link
                to={cat.path}
                key={cat.id}
                className="card-premium p-6 flex flex-col gap-4 group"
              >
                {/* Icon + Difficulty */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: cat.color }}
                  >
                    <CategoryIcon name={cat.icon} />
                  </div>
                  <span
                    className="badge-premium text-[10px]"
                    style={{
                      backgroundColor: badge.bg,
                      color: badge.text,
                      borderColor: badge.border,
                    }}
                  >
                    {cat.difficulty}
                  </span>
                </div>

                {/* Text */}
                <div className="flex-1 space-y-1.5">
                  <h2 className="font-black text-base text-[var(--text-main)] group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-[10px] font-bold">
                  <span className="text-[var(--text-muted)]">
                    {cat.programs.length} Program
                  </span>
                  <span className="text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lihat Program <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
