export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          card: '#1a1f3a',
          cyan: '#00f0ff',
          amber: '#ffaa00',
          green: '#00ff88',
          text: '#e0e0ff',
        },
      },
      fontFamily: {
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
};
