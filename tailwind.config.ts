import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f3f5f3',
          100: '#e3e8e4',
          200: '#cdd6cf',
          300: '#aab8ad',
          400: '#7f907f',
          500: '#5d705d',
          600: '#4a5d57',
          700: '#3c4b46',
          800: '#323e3a',
          900: '#2b3431',
        },
        ivory: {
          DEFAULT: '#f8f9fa',
          50: '#fdfdfc',
          100: '#f8f9fa',
          200: '#f0f0f0',
        },
        charcoal: {
          DEFAULT: '#222222',
          light: '#3a3a3a',
          muted: '#6b6b6b',
        },
        olive: '#6b7a5a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'section': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '1280px',
      },
      transitionTimingFunction: {
        elegant: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        scaleIn: 'scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
