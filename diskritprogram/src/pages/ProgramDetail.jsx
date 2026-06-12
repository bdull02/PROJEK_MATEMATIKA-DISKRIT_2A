import { useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Hash, Tag, AlignLeft, Info,
  Maximize2, Minimize2, ExternalLink, AlertTriangle
} from 'lucide-react';
import { categories } from '../data/categories';

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [iframeError, setIframeError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);

  // Find the program and its parent category
  let program = null;
  let category = null;
  for (const cat of categories) {
    const found = cat.programs.find(p => p.id === id);
    if (found) { program = found; category = cat; break; }
  }

  if (!program || !category) {
    return (
      <div className="text-center py-32 space-y-4">
        <div className="text-6xl">😕</div>
        <h2 className="text-xl font-bold text-[var(--text-main)]">Program tidak ditemukan</h2>
        <p className="text-sm text-[var(--text-muted)]">
          ID <code className="font-mono px-1.5 py-0.5 rounded bg-[var(--bg-input)]">{id}</code> tidak ada dalam katalog.
        </p>
        <button onClick={() => navigate('/categories')} className="btn-premium-primary mt-4">
          <ArrowLeft size={15} /> Lihat Semua Kategori
        </button>
      </div>
    );
  }

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] flex-wrap">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Beranda</Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-indigo-600 transition-colors">Kategori</Link>
        <span>/</span>
        <Link to={category.path} className="hover:text-indigo-600 transition-colors">{category.name}</Link>
        <span>/</span>
        <span className="text-[var(--text-main)] font-semibold truncate max-w-xs">{program.title}</span>
      </nav>

      <div className="flex flex-col xl:flex-row gap-6 items-start">

        {/* ── Metadata Panel ─────────────────────────────────── */}
        <aside className="w-full xl:w-72 shrink-0 space-y-4">

          {/* Title card */}
          <div className="card-premium p-6 space-y-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-black"
              style={{ backgroundColor: category.color }}
            >
              {program.title[0]}
            </div>
            <h1 className="text-base font-black text-[var(--text-main)] leading-snug">
              {program.title}
            </h1>
            <span
              className="badge-premium text-[10px]"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
                borderColor: `${category.color}40`,
              }}
            >
              {category.name}
            </span>
          </div>

          {/* Info rows */}
          <div className="card-premium p-5 space-y-4">
            <InfoRow icon={<User size={14} />}     label="Pembuat"       value={program.author} />
            <InfoRow icon={<Hash size={14} />}     label="NIM"           value={program.nim} />
            <InfoRow icon={<Tag size={14} />}      label="Kategori"      value={category.name} />
            <InfoRow icon={<AlignLeft size={14} />} label="Deskripsi"    value={program.description} multiline />
            {program.sourceInfo && (
              <InfoRow icon={<Info size={14} />}   label="Sumber & Teknis" value={program.sourceInfo} multiline />
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <a
              href={program.embedPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium-primary w-full justify-center text-sm"
            >
              <ExternalLink size={14} /> Buka di Tab Baru
            </a>
            <Link to={category.path} className="btn-premium-secondary w-full justify-center text-sm">
              <ArrowLeft size={14} /> Kembali ke {category.name}
            </Link>
          </div>
        </aside>

        {/* ── Program Viewer ─────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* Browser chrome toolbar */}
          <div className="flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-mono text-[var(--text-muted)] hidden sm:inline truncate max-w-xs">
                {program.embedPath}
              </span>
            </div>
            {!iframeError && (
              <button
                onClick={handleFullscreen}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-indigo-600 border border-[var(--border-color)] px-3 py-1.5 rounded-lg bg-[var(--bg-card)] transition-all hover:border-indigo-400"
              >
                {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                {isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
              </button>
            )}
          </div>

          {/* Viewer area */}
          <div
            className="rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-md"
            style={{ minHeight: 520 }}
          >
            {iframeError ? (
              /* ── File not uploaded state ────────────────────── */
              <div className="flex flex-col items-center justify-center text-center py-24 px-8 space-y-4 bg-[var(--bg-card)]" style={{ minHeight: 520 }}>
                <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                  <AlertTriangle size={28} className="text-amber-500" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-main)]">File Program Belum Diunggah</h3>
                <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
                  File HTML untuk program ini belum tersedia di server.
                  Letakkan file program di:
                </p>
                <code className="text-xs font-mono px-4 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border-color)] break-all">
                  public{program.embedPath}
                </code>
                <p className="text-[11px] text-[var(--text-muted)] max-w-xs">
                  Setelah file diunggah, muat ulang halaman ini untuk melihat program.
                </p>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={program.embedPath}
                title={program.title}
                className="w-full bg-white"
                style={{ height: 520, border: 'none', display: 'block' }}
                allow="fullscreen"
                onError={() => setIframeError(true)}
                onLoad={(e) => {
                  // detect 404 via contentDocument if same-origin
                  try {
                    const doc = e.target.contentDocument;
                    if (doc && doc.title === '404') setIframeError(true);
                  } catch (_) { /* cross-origin, ignore */ }
                }}
              />
            )}
          </div>

          <p className="text-[10px] text-[var(--text-muted)] text-center">
            Program karya <strong className="text-[var(--text-main)]">{program.author}</strong> · NIM {program.nim} · {category.name}
          </p>
        </div>

      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, multiline }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-indigo-500 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
          {label}
        </div>
        <div className={`text-xs text-[var(--text-main)] ${multiline ? 'leading-relaxed' : 'font-semibold'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}
