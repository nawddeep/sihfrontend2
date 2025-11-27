/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Indian Government Official Colors
        // Primary: Gov Navy (Authority and headers)
        govNavy: {
          50: '#f0f3f8',
          100: '#dde4f0',
          200: '#b8c5e0',
          300: '#93a6d0',
          400: '#5d75b8',
          500: '#1C3664', // Main navy
          600: '#1a3058',
          700: '#16274a',
          800: '#0f1a32',
          900: '#0a0f1f',
          950: '#050810',
        },
        // Saffron (Primary action color - from Indian flag)
        govSaffron: {
          50: '#fff9f0',
          100: '#ffe8d0',
          200: '#ffd4a3',
          300: '#ffbe76',
          400: '#ffaa4d',
          500: '#FF9933', // Main saffron
          600: '#e68a2d',
          700: '#cc7a26',
          800: '#b26a21',
          900: '#8d511a',
          950: '#5f3810',
        },
        // Green (Success states - from Indian flag)
        govGreen: {
          50: '#f0f9f4',
          100: '#dff1e6',
          200: '#bfe3ce',
          300: '#9ed5b6',
          400: '#5fb98a',
          500: '#138808', // Main green
          600: '#117a07',
          700: '#0d5e05',
          800: '#0a4803',
          900: '#072e02',
          950: '#041a01',
        },
        // Gold (Ashoka Chakra accent - premium touch)
        govGold: {
          50: '#fef9f0',
          100: '#fcefd0',
          200: '#fadfa3',
          300: '#f7c876',
          400: '#f4b74d',
          500: '#D4AF37', // Main gold
          600: '#c09a30',
          700: '#a67d27',
          800: '#8c641e',
          900: '#6b4815',
          950: '#4a3010',
        },
        // Gov Blue (Links and interactive elements)
        govBlue: {
          50: '#f0f4f9',
          100: '#dde7f0',
          200: '#bcc8e0',
          300: '#9aa9d0',
          400: '#6680c0',
          500: '#0066CC', // Main blue
          600: '#0055aa',
          700: '#004488',
          800: '#003366',
          900: '#001f40',
          950: '#001028',
        },
        // Neutral grays (backgrounds and borders)
        govGray: {
          50: '#fafafa',
          100: '#f5f5f5',
          150: '#eeeeee',
          200: '#e0e0e0',
          300: '#d9d9d9',
          400: '#b0b0b0',
          500: '#808080',
          600: '#666666',
          700: '#333333',
          800: '#1f1f1f',
          900: '#0a0a0a',
        },
        // Keep danger palette for alert states
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#DC143C', // Indian red
          600: '#c41230',
          700: '#a00d28',
          800: '#7c0a20',
          900: '#580718',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#138808', // Gov green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ashoka-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231C3664' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'tricolor-top': 'linear-gradient(to right, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)',
      },
      boxShadow: {
        'gov-sm': '0 1px 2px 0 rgba(28, 54, 100, 0.05)',
        'gov-md': '0 2px 4px 0 rgba(28, 54, 100, 0.1)',
        'gov-lg': '0 4px 12px 0 rgba(28, 54, 100, 0.15)',
        'gov-xl': '0 8px 24px 0 rgba(28, 54, 100, 0.2)',
        'saffron-glow': '0 0 10px rgba(255, 153, 51, 0.3)',
        'green-glow': '0 0 10px rgba(19, 136, 8, 0.3)',
        'gold-glow': '0 0 10px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
