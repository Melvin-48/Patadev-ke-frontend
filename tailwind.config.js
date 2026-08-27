/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // PataDev Ke design tokens - deliberately not the generic
        // cream+terracotta or black+neon defaults. Deep indigo reads as
        // technical/trustworthy (this platform moves client money), warm
        // amber carries craft and energy without leaning on literal flag
        // colors.
        ink: '#14163B',
        paper: '#FAF9F5',
        amber: {
          DEFAULT: '#E8A33D',
          dark: '#C97F1E',
        },
        slate: '#5B6178',
        line: '#E4E2DC',
        success: '#2F855A',
        danger: '#C0392B',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '10px',
      },
    },
  },
  plugins: [],
};
