/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#041712',
          900: '#07231B',
          850: '#0B2E24',
          800: '#0E3B2E',
          700: '#144F3F',
          600: '#1B6551',
          500: '#2A826A',
        },
        gold: {
          50: '#FBF8EF',
          100: '#F5EED8',
          200: '#EBDCB1',
          300: '#DFC686',
          400: '#D5B45F',
          500: '#C5A059', // Primary brand gold
          600: '#B08B42',
          700: '#8F6E31',
          800: '#735729',
          900: '#5A4321',
        },
        ivory: {
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F3EDE0',
          300: '#E9DEC9',
          400: '#D7C7A8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'gold-subtle': '0 4px 20px -2px rgba(197, 160, 89, 0.15)',
        'gold-card': '0 10px 30px -5px rgba(7, 35, 27, 0.08), 0 0 1px 1px rgba(197, 160, 89, 0.2)',
        'gold-hover': '0 15px 35px -5px rgba(7, 35, 27, 0.15), 0 0 2px 1px rgba(197, 160, 89, 0.4)',
        'emerald-deep': '0 20px 40px -15px rgba(4, 23, 18, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #EBDCB1 0%, #C5A059 50%, #8F6E31 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, #FAF7F0 0%, #F5EED8 100%)',
        'emerald-gradient': 'linear-gradient(180deg, #041712 0%, #07231B 100%)',
      }
    },
  },
  plugins: [],
}
