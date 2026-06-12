import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { Layers, Users, Code, BookOpen, Heart } from 'lucide-react';

const allPrograms = categories.flatMap(c => c.programs);
const uniqueStudents = [...new Set(allPrograms.map(p => p.author))];

const techStack = [
  { name: 'React 18', desc: 'UI Framework', icon: '⚛️' },
  { name: 'Vite', desc: 'Build Tool', icon: '⚡' },
  { name: 'React Router v7', desc: 'Routing', icon: '🔀' },
  { name: 'Tailwind CSS', desc: 'Styling Utility', icon: '🎨' },
  { name: 'Lucide React', desc: 'Iconography', icon: '✏️' },
  { name: 'HTML5 + JS', desc: 'Program Embeds', icon: '🌐' },
];

export default function About() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Hero */}
      <section className="text-center space-y-4 py-6">
        <div className="inline-flex items-center gap-2 badge-premium bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 mb-2">
          <BookOpen size={14} /> Repositori Program Mahasiswa
        </div>
        <h1 className="page-title text-4xl md:text-5xl">Tentang DiskritProgram</h1>
        <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Platform repositori interaktif untuk karya program simulasi dan kalkulator 
          Matematika Diskrit yang dibangun oleh para mahasiswa.
        </p>
      </section>

      {/* Mission Card */}
      <section className="card-premium p-8 md:p-10 space-y-4 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-950/20 border-indigo-100 dark:border-indigo-900/50">
        <h2 className="text-xl font-black text-[var(--text-main)]">Misi Kami</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          DiskritProgram hadir untuk mengumpulkan, menampilkan, dan memudahkan akses terhadap 
          karya program interaktif yang dibuat mahasiswa dalam mata kuliah Matematika Diskrit. 
          Setiap program adalah karya nyata yang mendemonstrasikan pemahaman konsep melalui 
          simulasi visual dan kalkulator interaktif—bukan sekadar teori di atas kertas.
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Mahasiswa dapat berbagi karya, saling belajar dari program satu sama lain, dan 
          menjadikan platform ini sebagai portofolio akademik bersama.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Code, label: 'Total Program', value: allPrograms.length, color: 'text-indigo-600' },
          { icon: Layers, label: 'Kategori Topik', value: categories.length, color: 'text-emerald-600' },
          { icon: Users, label: 'Kontributor', value: uniqueStudents.length, color: 'text-violet-600' },
          { icon: BookOpen, label: 'Konsep Diskrit', value: categories.length, color: 'text-amber-600' },
        ].map((s, i) => (
          <div key={i} className="card-premium p-5 text-center space-y-2">
            <s.icon size={22} className={`${s.color} mx-auto`} />
            <div className="text-2xl font-black text-[var(--text-main)]">{s.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Contributors */}
      <section className="space-y-5">
        <h2 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2">
          <Heart size={18} className="text-pink-500" /> Kontributor Program
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {uniqueStudents.map(student => {
            const prog = allPrograms.find(p => p.author === student);
            return (
              <Link
                key={student}
                to={prog ? `/program/${prog.id}` : '/'}
                className="card-premium p-4 flex flex-col items-center text-center gap-2 hover:border-indigo-400"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-white font-black text-sm flex items-center justify-center">
                  {student.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div className="text-xs font-bold text-[var(--text-main)] line-clamp-2 leading-tight">{student}</div>
                <div className="text-[9px] font-mono text-[var(--text-muted)]">{prog?.nim}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="space-y-5">
        <h2 className="text-lg font-black text-[var(--text-main)]">🛠 Teknologi yang Digunakan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {techStack.map(tech => (
            <div key={tech.name} className="card-premium p-4 flex items-center gap-3">
              <span className="text-2xl">{tech.icon}</span>
              <div>
                <div className="text-sm font-bold text-[var(--text-main)]">{tech.name}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{tech.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Kategori Overview */}
      <section className="space-y-5">
        <h2 className="text-lg font-black text-[var(--text-main)]">📚 Cakupan Topik Matematika Diskrit</h2>
        <div className="space-y-2">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={cat.path}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-indigo-400 hover:shadow-sm transition-all group"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: cat.color }}
              >
                {cat.programs.length}
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[var(--text-main)] group-hover:text-indigo-600 transition-colors">{cat.name}</div>
                <div className="text-[10px] text-[var(--text-muted)] line-clamp-1">{cat.description}</div>
              </div>
              <span className="text-[10px] font-bold text-[var(--text-muted)]">{cat.difficulty}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="card-premium p-8 text-center space-y-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">
        <h2 className="text-xl font-black">Mulai Eksplorasi Sekarang</h2>
        <p className="text-sm text-white/80">Jelajahi program interaktif dari para mahasiswa dan pelajari konsep Matematika Diskrit secara visual.</p>
        <div className="flex justify-center gap-3">
          <Link to="/categories" className="btn-premium-secondary bg-white text-indigo-700 border-white hover:bg-white/90 text-sm">
            Lihat Semua Kategori
          </Link>
          <Link to="/search" className="btn-premium-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 text-sm">
            Cari Program
          </Link>
        </div>
      </section>
    </div>
  );
}
