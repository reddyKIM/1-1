/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        neutral: 'rgb(var(--color-neutral) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)'
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans KR"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        brand: '0 10px 30px -12px rgba(20, 70, 90, 0.35)'
      }
    }
  },
  plugins: []
};
