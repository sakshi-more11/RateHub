/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        borderc: 'var(--border)',
        panelBg: 'var(--panel-bg)',
        panelText: 'var(--panel-text)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};