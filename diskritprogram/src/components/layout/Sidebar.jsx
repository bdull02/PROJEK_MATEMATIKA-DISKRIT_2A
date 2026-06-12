import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/categories';
import * as LucideIcons from 'lucide-react';
import {
  LayoutDashboard, Compass, Search, Info, X, Moon, Sun
} from 'lucide-react';

// Dynamic icon component helper
function CategoryIcon({ name, className, size = 18 }) {
  const IconComponent = LucideIcons[name] || LucideIcons.HelpCircle;
  return <IconComponent className={className} size={size} />;
}

export default function Sidebar({ mobileOpen, onMobileClose, theme, toggleTheme }) {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[var(--bg-sidebar)] border-r border-[var(--border-color)]">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border-color)]">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md">
          <span className="text-white font-black text-sm">∑</span>
        </div>
        <div>
          <div className="text-[var(--text-main)] font-black text-sm leading-tight uppercase tracking-wider">DiskritRepository</div>
          <div className="text-[var(--text-muted)] text-[10px]">Student Program Hub</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-extrabold block px-2 mb-2">Menu Utama</span>
        
        <NavLink to="/" end className={({ isActive }) => 
          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
          }`
        }>
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/categories" className={({ isActive }) => 
          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
          }`
        }>
          <Compass size={16} />
          <span>Kategori</span>
        </NavLink>

        <NavLink to="/search" className={({ isActive }) => 
          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
          }`
        }>
          <Search size={16} />
          <span>Pencarian</span>
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => 
          `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
          }`
        }>
          <Info size={16} />
          <span>Tentang</span>
        </NavLink>

        {/* Separator / Category Links */}
        <div className="pt-4 border-t border-[var(--border-color)] my-4">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-extrabold block px-2 mb-2">Daftar Kategori</span>
          <div className="space-y-0.5">
            {categories.map((cat) => {
              const isActive = location.pathname === cat.path;
              return (
                <NavLink 
                  key={cat.id} 
                  to={cat.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-main)]'
                  }`}
                >
                  <CategoryIcon name={cat.icon} className="flex-shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden md:flex flex-col w-[280px]">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 w-[280px] z-50 md:hidden flex flex-col"
              initial={{ x: -280 }} 
              animate={{ x: 0 }} 
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[var(--border-color)] text-[var(--text-muted)]"
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
