import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Compass, Users, Code, ArrowRight, Star, Clock } from 'lucide-react';
import { categories } from '../data/categories';
import * as LucideIcons from 'lucide-react';

function CategoryIcon({ name, className, size = 20 }) {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent className={className} size={size} />;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all programs
  const allPrograms = categories.flatMap(cat => 
    cat.programs.map(prog => ({
      ...prog,
      categoryName: cat.name,
      categoryId: cat.id,
      color: cat.color
    }))
  );

  // Statistics
  const totalCategories = categories.length;
  const totalPrograms = allPrograms.length;
  const uniqueStudents = [...new Set(allPrograms.map(p => p.author))].length;

  // Featured programs (first 3)
  const featuredPrograms = allPrograms.slice(0, 3);
  
  // Latest programs (last 3)
  const latestPrograms = [...allPrograms].reverse().slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="space-y-10 relative">
      {/* Decorative Bubble Background */}
      <div className="decor-bubble w-96 h-96 bg-indigo-500/10 top-0 left-10 rounded-full" />
      <div className="decor-bubble w-72 h-72 bg-violet-500/10 bottom-10 right-10 rounded-full" />

      {/* Hero Section */}
      <section className="relative z-10 p-8 md:p-12 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="space-y-4 max-w-xl">
          <span className="badge-premium bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
            Kumpulan Program Matematika Diskrit
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[var(--text-main)] leading-tight">
            Eksplorasi Program <span className="text-indigo-600 dark:text-indigo-400">Interaktif Mahasiswa</span>
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            Selamat datang di repositori karya mahasiswa. Temukan berbagai program simulasi, kalkulator, dan visualisasi interaktif untuk memahami konsep-konsep Matematika Diskrit secara mendalam.
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari program, NIM, atau topik..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-main)] outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button type="submit" className="btn-premium-primary text-xs">Cari</button>
          </form>
        </div>

        {/* Fun illustration pixel-art style wrapper */}
        <div className="w-48 h-48 md:w-56 md:h-56 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-[var(--border-color)] flex items-center justify-center relative overflow-hidden shadow-inner">
          <div className="text-center space-y-2">
            <div className="text-5xl animate-bounce">💻</div>
            <div className="text-xs font-bold text-[var(--text-muted)] font-mono">student_projects.sh</div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Program', value: totalPrograms, icon: Code, color: 'text-indigo-600' },
          { label: 'Kategori Topik', value: totalCategories, icon: Compass, color: 'text-emerald-600' },
          { label: 'Kontributor Mahasiswa', value: uniqueStudents, icon: Users, color: 'text-violet-600' }
        ].map((stat, i) => (
          <div key={i} className="card-premium p-4 md:p-6 text-center space-y-2">
            <div className="flex justify-center">
              <stat.icon size={24} className={stat.color} />
            </div>
            <div className="text-2xl md:text-3xl font-black text-[var(--text-main)]">{stat.value}</div>
            <div className="text-[10px] md:text-xs text-[var(--text-muted)] font-semibold uppercase">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Featured & Latest Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Featured Programs */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            <Star size={18} className="text-indigo-600" />
            <span>Program Unggulan</span>
          </h3>
          <div className="space-y-3">
            {featuredPrograms.map(prog => (
              <Link to={`/program/${prog.id}`} key={prog.id} className="block card-premium p-4 hover:border-indigo-500 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[var(--text-main)]">{prog.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1">{prog.description}</p>
                    <div className="flex items-center gap-2 pt-2 text-[10px] text-[var(--text-muted)]">
                      <span className="font-bold">{prog.author}</span>
                      <span>•</span>
                      <span>NIM {prog.nim}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    {prog.categoryName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Programs */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
            <Clock size={18} className="text-indigo-600" />
            <span>Karya Terbaru</span>
          </h3>
          <div className="space-y-3">
            {latestPrograms.map(prog => (
              <Link to={`/program/${prog.id}`} key={prog.id} className="block card-premium p-4 hover:border-indigo-500 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[var(--text-main)]">{prog.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1">{prog.description}</p>
                    <div className="flex items-center gap-2 pt-2 text-[10px] text-[var(--text-muted)]">
                      <span className="font-bold">{prog.author}</span>
                      <span>•</span>
                      <span>NIM {prog.nim}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    {prog.categoryName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Category Grid Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--text-main)]">Jelajahi Berdasarkan Kategori</h3>
          <Link to="/categories" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.slice(0, 6).map(cat => (
            <Link to={cat.path} key={cat.id} className="card-premium p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--text-main)]">
                  <CategoryIcon name={cat.icon} />
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full border border-slate-200 text-[var(--text-muted)]">
                  {cat.difficulty}
                </span>
              </div>
              <div>
                <h4 className="font-black text-sm text-[var(--text-main)]">{cat.name}</h4>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">{cat.description}</p>
              </div>
              <div className="text-[10px] font-bold text-indigo-600 pt-2 border-t border-[var(--border-color)] flex justify-between items-center">
                <span>{cat.programs.length} Program Mahasiswa</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
