/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e7e7e9',
          200: '#d1d1d5',
          300: '#b0b0b6',
          400: '#888890',
          500: '#686870',
          600: '#505050',
          700: '#3d3d3d',
          800: '#2f2f2f',
          900: '#0a0a0f',
          950: '#050508',
        },
        surface: {
          50: '#f6f6fa',
          100: '#e7e7ed',
          200: '#d1d1d8',
          300: '#b0b0bc',
          400: '#888898',
          500: '#686874',
          600: '#50505c',
          700: '#3d3d48',
          800: '#2f2f3a',
          900: '#12121a',
          950: '#0a0a12',
        },
        primary: {
          50: '#f5f3ff',
          100: '#ebe9ff',
          200: '#d8d5fe',
          300: '#b9b6fc',
          400: '#8f8cf7',
          500: '#7c7cf0',
          600: '#6b6ae6',
          700: '#5858d7',
          800: '#4949c0',
          900: '#3e3da5',
          950: '#272747',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b0',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 50px rgba(139, 92, 246, 0.5)',
        'glow-accent': '0 0 30px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
