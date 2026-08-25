/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#ffffff',
        line: '#e2e8f0',
        slate: '#64748b',
        amber: '#f59e0b',
        'amber-dark': '#d97706',
        success: '#10b981',
        danger: '#ef4444',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}