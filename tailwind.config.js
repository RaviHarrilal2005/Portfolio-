export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          900: '#001a33',
        },
        accent: {
          500: '#00a86b',
          600: '#008c5c',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'monospace'],
      },
      backdropBlur: {
        sm: '4px',
      },
    },
  },
  plugins: [],
};
