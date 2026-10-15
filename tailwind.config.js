/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FACC15',       // Primary vibrant yellow from DOT Hub logo
          'yellow-hover': '#EAB308',
          'yellow-dark': '#CA8A04',
          'yellow-light': '#FEF08A',
          'yellow-50': '#FEFCE8',
          dark: '#0B0F17',         // Rich deep black/slate
          'dark-nav': '#0F172A',
          'dark-card': '#1E293B',
          gray: '#334155',
          muted: '#64748B',
          surface: '#F8FAFC',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand-glow': '0 0 25px -5px rgba(250, 204, 21, 0.3)',
        'subtle-card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'hover-card': '0 12px 24px -6px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}

