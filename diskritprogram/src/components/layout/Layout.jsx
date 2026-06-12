import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('diskrit-theme') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('diskrit-theme', theme);

    // Communicate theme to any embedded program iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
      iframe.contentWindow?.postMessage({ type: 'theme-change', theme }, '*');
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-200">
      <Sidebar 
        mobileOpen={mobileOpen} 
        onMobileClose={() => setMobileOpen(false)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <TopBar 
        onMenuClick={() => setMobileOpen(true)} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main
        className="transition-all duration-300"
        style={{ paddingTop: 64, paddingLeft: 0 }}
      >
        <div className="md:pl-[280px]">
          <div className="min-h-screen p-4 md:p-8">
            <Outlet context={{ theme }} />
          </div>
        </div>
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontFamily: 'inherit',
            fontSize: 14,
            borderRadius: 12,
          },
        }}
      />
    </div>
  );
}
