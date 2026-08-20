/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#f1f8f4',
          100: '#dcefe3',
          200: '#bce0cb',
          300: '#8cc9a8',
          400: '#57ab7f',
          500: '#348f61',
          600: '#24734c',
          700: '#1c5c3f',
          800: '#194a34',
          900: '#153d2c',
          950: '#0a2318',
        },
        emerald: {
          50: '#ecfdf6',
          100: '#d1faea',
          200: '#a7f3d6',
          300: '#6ee7bb',
          400: '#34d39c',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        leaf: {
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
        },
        navy: {
          50: '#f2f5f9',
          100: '#e2e8f2',
          200: '#c7d3e3',
          300: '#9fb2cc',
          400: '#6f89ae',
          500: '#4f6a91',
          600: '#3a5177',
          700: '#2d3f5f',
          800: '#1e2b45',
          900: '#131c30',
          950: '#0b1120',
        },
        risk: {
          low: '#16a34a',
          mid: '#d97706',
          high: '#dc2626',
        },
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(16, 24, 40, 0.04), 0 1px 3px 0 rgba(16, 24, 40, 0.06)',
        card: '0 2px 8px -2px rgba(16, 24, 40, 0.08), 0 1px 3px -1px rgba(16, 24, 40, 0.06)',
        lift: '0 8px 24px -8px rgba(16, 24, 40, 0.18)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0.97)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: 0, transform: 'translateX(16px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(16,185,129,0.35)' },
          '100%': { boxShadow: '0 0 0 10px rgba(16,185,129,0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.25s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
        shimmer: 'shimmer 1.6s infinite linear',
        'pulse-ring': 'pulseRing 1.6s cubic-bezier(0.4,0,0.6,1) infinite',
      },
    },
  },
  plugins: [],
}
