module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'system-ui', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        gold: {
          300: '#d6bf92',
          400: '#c8aa6e',
          500: '#a08858',
          600: '#826f48',
        },
      },
    },
  },
  plugins: [],
};
