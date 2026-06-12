import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Menu, Info, Compass, HelpCircle } from 'lucide-react';
import { categories } from '../../data/categories';

export default function TopBar({ onMenuClick, theme, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Get current page title matching the path
  const getPageTitle = () => {
    if (location.pathname === '/') return 'Dashboard';
    if (location.pathname === '/categories') return 'Kategori';
    if (location.pathname === '/search') return 'Pencarian';
    if (location.pathname === '/about') return 'Tentang';
    if (location.pathname.startsWith('/category/')) {
      const catId = location.pathname.split('/').pop();
      const cat = categories.find(c => c.id === catId);
      return cat ? `Kategori: ${cat.name}` : 'Detail Kategori';
    }
    if (location.pathname.startsWith('/program/')) {
      return 'Detail Program';
    }
    return 'DiskritProgram';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex items-center justify-between px-4 md:px-6 border-b border-[var(--border-color)] bg-[var(--bg-card)]/80 backdrop-blur-md transition-colors"
      style={{ height: 64 }}>
      
      {/* Left side: mobile toggle & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-sidebar)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <h1 className="text-base md:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
          <span className="hidden md:inline-block w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          {getPageTitle()}
        </h1>
      </div>

      {/* Center: Search input */}
      <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center max-w-xs w-full relative">
        <Search size={16} className="absolute left-3 text-[var(--text-muted)]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari program mahasiswa..."
          className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-main)] outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
      </form>

      {/* Right side: controls */}
      <div className="flex items-center gap-3">
        <Link to="/about" className="p-2 rounded-lg hover:bg-[var(--bg-sidebar)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all" title="Tentang">
          <Info size={18} />
        </Link>
        
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
