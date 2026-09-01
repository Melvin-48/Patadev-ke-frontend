/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing tokens
        ink: '#0f172a',
        paper: '#ffffff',
        line: '#e2e8f0',
        slate: '#64748b',
        amber: '#f59e0b',
        'amber-dark': '#d97706',
        success: '#10b981',
        danger: '#ef4444',

        // PataDev Ke design system
        primary: {
          DEFAULT: '#1769FF',
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#1769FF',
          600: '#1257D6',
          700: '#0D45AD',
        },
        navy: {
          DEFAULT: '#07152F',
          700: '#0D2249',
          800: '#09193A',
          900: '#07152F',
        },
        surface: '#F5F8FC',
        'soft-blue': '#EFF6FF',
        'hero-text': '#172033',
        'muted': '#64748B',
        'border-subtle': '#E2E8F0',
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'radial-blue': 'radial-gradient(ellipse 80% 60% at 60% 0%, rgba(23,105,255,0.07) 0%, transparent 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-5px)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.6s ease-out both',
        'fade-up-200': 'fade-up 0.6s 0.2s ease-out both',
        'fade-up-400': 'fade-up 0.6s 0.4s ease-out both',
        'float':       'float 4s ease-in-out infinite',
        'float-slow':  'float-slow 6s ease-in-out infinite',
        'marquee':     'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
