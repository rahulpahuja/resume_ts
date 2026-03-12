/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable manual toggling
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#1e40af',
        },
        secondary: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        accent: {
          light: '#fbbf24',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        marqueeLeft: 'marquee-left 30s linear infinite',
        marqueeRight: 'marquee-right 30s linear infinite',
        slideInUp: 'slideInUp 0.8s ease-out',
        slideInDown: 'slideInDown 0.8s ease-out',
        glow: 'glow 2s ease-in-out infinite',
        pulse-slow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)' 
          },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};