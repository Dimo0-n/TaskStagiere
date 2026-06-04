/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f8f8',
          100: '#e7eaeb',
          500: '#657174',
          700: '#394244',
          900: '#151a1c',
        },
        legal: {
          50: '#f4f7f6',
          100: '#dfe8e5',
          600: '#35695d',
          700: '#295249',
          900: '#172f2a',
        },
        accent: {
          500: '#b27737',
          600: '#93612f',
        },
      },
      boxShadow: {
        soft: '0 16px 48px rgba(21, 26, 28, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
