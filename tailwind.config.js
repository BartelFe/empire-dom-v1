/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ed: {
          black:  '#141414',
          shadow: '#282828',
          ink:    '#3c3c3c',
          gold:   '#c49a6c',
          goldHi: '#e8c290',
          goldLo: '#8a6d4b',
          gray:   '#d9dadb',
          blood:  '#7a0a14',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        imperial: '0.5em',
        edict: '0.35em',
      },
    },
  },
  plugins: [],
};
