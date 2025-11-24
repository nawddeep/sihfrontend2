/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Government Portal Professional palette (navy / gold / neutral)
        primary: {
          50: '#f0f4f8',
          100: '#e9eefb',
          200: '#cfe0fb',
          300: '#9fb4f0',
          400: '#5f7bdc',
          500: '#1e40af', // Main navy
          600: '#17338f',
          700: '#111f56',
          800: '#0b1838',
          900: '#071033',
          950: '#0f1729',
        },
        // Gold Accent (authority / premium)
        accent: {
          50: '#fffaf0',
          100: '#fff4db',
          200: '#fde9b3',
          300: '#fbdb7a',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d78b09',
          700: '#b76f07',
          800: '#945607',
          900: '#6f3f04',
          950: '#4a2e03',
        },
        // Neutral / clean whites and grays for cards and surfaces
        dark: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#262626',
          800: '#171717',
          900: '#0f1729',
          950: '#0b0b0b',
        },
        // Keep danger and warning palettes for alert states
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
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
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2338bdf8' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(56, 189, 248, 0.3)',
        'glow-md': '0 0 20px rgba(56, 189, 248, 0.4)',
        'glow-lg': '0 0 30px rgba(56, 189, 248, 0.5)',
        'glow-danger': '0 0 20px rgba(239, 68, 68, 0.4)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)' },
        }
      }
    },
  },
  plugins: [],
};
