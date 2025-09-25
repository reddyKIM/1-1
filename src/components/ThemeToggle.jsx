import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sk-energy-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme('system');
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    if (theme === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-neutral" role="group" aria-label="테마 전환">
      <button
        type="button"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="flex items-center gap-2 rounded-full border border-neutral/30 bg-white/80 px-3 py-1.5 text-neutral shadow-sm transition hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-slate-900/70"
        aria-pressed={theme === 'dark'}
      >
        <span aria-hidden="true">{theme === 'dark' ? '🌙' : '🌞'}</span>
        {theme === 'dark' ? '다크 모드' : '라이트 모드'}
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        className="rounded-full border border-transparent px-3 py-1.5 text-neutral/70 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-pressed={theme === 'system'}
      >
        시스템 기본
      </button>
    </div>
  );
}

function applyTheme(preference) {
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const nextTheme = preference === 'system' ? (systemPrefersDark ? 'dark' : 'light') : preference;
  root.dataset.theme = nextTheme;
  root.classList.toggle('dark', nextTheme === 'dark');
}
