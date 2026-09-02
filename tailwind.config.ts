import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          950: '#040814',
          900: '#070f26',
          850: '#0b1636',
          800: '#11224d',
          700: '#1c356e',
          600: '#2a4b8f',
          500: '#3d67b3',
          400: '#5c86d4',
          300: '#8baaf0',
          200: '#bed1fa',
          100: '#e1eafd',
          50: '#f8fafc',
        },
        gold: {
          900: '#46380b',
          800: '#6e5610',
          700: '#947515',
          600: '#ba941c',
          500: '#d4af37',
          400: '#e5c453',
          300: '#edd67c',
          200: '#f5e7a9',
          100: '#faf3d4',
          50: '#fdfbf2',
        },
        slate: {
          950: '#080c14',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'glow-blue': '0 0 30px -5px rgba(42, 75, 143, 0.35)',
        'card-elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'neumorph-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.09), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)',
        'neumorph-dark-inset': 'inset 0 2px 5px 0 rgba(0, 0, 0, 0.6), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.05)',
        'neumorph-dark-btn': '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'neumorph-light': '6px 6px 16px rgba(163, 177, 198, 0.35), -6px -6px 16px rgba(255, 255, 255, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'neumorph-light-inset': 'inset 2px 2px 5px rgba(163, 177, 198, 0.35), inset -2px -2px 5px rgba(255, 255, 255, 0.8)',
        'neumorph-light-btn': '3px 3px 8px rgba(163, 177, 198, 0.4), -3px -3px 8px rgba(255, 255, 255, 0.9)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': "radial-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;
