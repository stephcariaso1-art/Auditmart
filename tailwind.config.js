module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121214',
          800: '#1A1A1D',
          700: '#232327',
          600: '#2C2C31',
          500: '#3A3A40',
          400: '#54545C',
          300: '#8E8E93',
          200: '#C7C7CC',
          100: '#E5E5EA',
          50: '#F2F2F7',
        },
        brand: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
          accent: '#FF4D4D',
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
        'glow': '0 0 25px rgba(255, 255, 255, 0.12)',
        'dock': '0 12px 36px rgba(0, 0, 0, 0.55)',
        'card': '0 8px 24px rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
};
