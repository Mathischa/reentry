/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up':   'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':      'fadeIn 0.25s ease-out forwards',
        'glow-pulse':   'glowPulse 2.5s ease-in-out infinite',
        'pulse-slow':   'glowPulse 4s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards',
        'briefing-in':  'briefingIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in':     'scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        briefingIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px) scale(0.99)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionDuration: {
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
