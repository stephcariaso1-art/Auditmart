module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          'c7': '#C7C7C6',
          'a1': '#A1A1A1',
          '7c': '#7C7B7B',
          '57': '#575655',
          '36': '#363534',
          '15': '#151413',
          '12': '#121110',
          '0f': '#0F0E0D',
          '0b': '#0B0A0A',
          '07': '#070706',
        },
        brand: {
          DEFAULT: '#C7C7C6',
          highlight: '#C7C7C6',
          dark: '#070706',
          accent: '#A1A1A1',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        'squircle': '28px',
        'squircle-sm': '18px',
        'squircle-lg': '36px',
        'pill': '9999px',
      },
      boxShadow: {
        'glow': '0 0 25px rgba(199, 199, 198, 0.14)',
        'dock': '0 12px 36px rgba(0, 0, 0, 0.65)',
        'card': '0 8px 24px rgba(0, 0, 0, 0.40)',
      }
    },
  },
  plugins: [],
};
