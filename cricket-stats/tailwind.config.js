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
          50: '#f0f3f5',
          100: '#dce4e8',
          200: '#bccbd2',
          300: '#94aab3',
          400: '#6f8b96',
          500: '#53707c',
          600: '#425a65',
          700: '#364952',
          800: '#253745', // Borders / dividers
          900: '#11212D', // Card / panel
          950: '#06141B', // Page background
        },
        surface: {
          50: '#f0f3f5',
          100: '#dce4e8',
          200: '#bccbd2',
          300: '#94aab3',
          400: '#6f8b96',
          500: '#53707c',
          600: '#425a65',
          700: '#364952',
          800: '#253745', // Borders / dividers
          900: '#11212D', // Card / panel
          950: '#06141B', // Page background
        },
        primary: {
          50: '#f3f5fc',
          100: '#e5ea98', // A highlight tone
          200: '#ccd4f0',
          300: '#a7b8e4',
          400: '#7e96d4',
          500: '#4A5C8A', // Muted labels -> Using as base primary
          600: '#44537d',
          700: '#384466',
          800: '#303953',
          900: '#2a3147',
          950: '#191d2c',
        },
        accent: {
          50: '#f2fafa',
          100: '#e0f4f4',
          200: '#c3e8e9',
          300: '#9ad5d7',
          400: '#69b8bb',
          500: '#4a9c9f',
          600: '#3a7d81',
          700: '#326569',
          800: '#2e5356',
          900: '#294548',
          950: '#162b2d',
        },
        custom: {
          bg: '#06141B',
          card: '#11212D',
          border: '#253745',
          muted: '#4A5C8A',
          secondary: '#9BA8AB',
          primary: '#CCD0CF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(74, 92, 138, 0.3)',
        'glow-lg': '0 0 50px rgba(74, 92, 138, 0.5)',
        'glow-accent': '0 0 30px rgba(37, 55, 69, 0.3)',
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
