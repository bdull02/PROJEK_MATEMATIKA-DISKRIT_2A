import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Hash, ArrowRight, BookOpen } from 'lucide-react';
import { categories, difficultyColor } from '../data/categories';
import * as LucideIcons from 'lucide-react';

function CategoryIcon({ name, size = 20 }) {
  const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
  return <Icon size={size} />;
}

export default function CategoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find(c => c.id === id);

  if (!category) {
    return (
      <div className="text-center py-32 space-y-4">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-bold text-[var(--text-main)]">Kategori tidak ditemukan</h2>
        <p className="text-sm text-[var(--text-muted)]">ID kategori <code className="font-mono px-1.5 py-0.5 rounded bg-[var(--bg-input)]">{id}</code> tidak ada.</p>
        <button onClick={() => navigate('/categories')} className="btn-premium-primary mt-4">
          <ArrowLeft size={15} /> Kembali ke Kategori
        </button>
      </div>
    );
  }

  const badge = difficultyColor[category.difficulty];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Beranda</Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-indigo-600 transition-colors">Kategori</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-semibold">{category.name}</span>
      </nav>

      {/* Category Header Card */}
      <div
        className="relative rounded-3xl p-8 md:p-10 overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${category.color}dd, ${category.color}99)` }}
      >
        {/* Decorative blobs */}
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-black/10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <CategoryIcon name={category.icon} size={28} />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{category.name}</h1>
              <span
                className="badge-premium text-[10px] bg-white/20 text-white border-white/30"
              >
                {category.difficulty}
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-2xl leading-relaxed">{category.description}</p>
          </div>
          <div className="text-center bg-white/15 rounded-2xl px-6 py-4 backdrop-blur-sm shrink-0">
            <div className="text-3xl font-black">{category.programs.length}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1">Program</div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-600" />
          Daftar Program ({category.programs.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {category.programs.map((program, idx) => (
            <Link
              to={`/program/${program.id}`}
              key={program.id}
              className="card-premium p-6 flex flex-col gap-4 group"
            >
              {/* Top row: index + title */}
              <div className="flex gap-4 items-start">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0"
                  style={{ backgroundColor: category.color }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[var(--text-main)] group-hover:text-indigo-600 transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
                    {program.description}
                  </p>
                </div>
              </div>

              {/* Footer: author info + cta */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)]">
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1 font-bold text-[var(--text-main)]">
                    <User size={11} /> {program.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Hash size={11} /> {program.nim}
                  </span>
                </div>
                <span className="text-indigo-600 text-[10px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Buka <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="pt-2">
        <Link to="/categories" className="btn-premium-secondary text-sm">
          <ArrowLeft size={15} /> Kembali ke Semua Kategori
        </Link>
      </div>
    </div>
  );
}
