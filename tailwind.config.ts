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
        paper: {
          DEFAULT: '#FAF7F0',
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#EFE9DD',
          300: '#E2DBD0',
          400: '#D2C8B4',
          500: '#B8AB92',
        },
        surface: {
          light: '#FFFDF9',
          dark: '#141622',
        },
        royal: {
          DEFAULT: '#5B3DF5',
          50: '#F1EFFF',
          100: '#E4DEFF',
          200: '#C8BBFF',
          300: '#AA94FF',
          400: '#8B7CFF',
          500: '#5B3DF5',
          600: '#482CE0',
          700: '#381EC2',
          800: '#2A1499',
          900: '#1C0B70',
          950: '#0E0442',
        },
        coral: {
          DEFAULT: '#FF5A5F',
          50: '#FFF0F1',
          100: '#FFE0E2',
          200: '#FFC2C5',
          300: '#FFA0A5',
          400: '#FF7D83',
          500: '#FF5A5F',
          600: '#E83E44',
          700: '#C4272C',
          800: '#9E1C20',
          900: '#7A1316',
        },
        ink: {
          DEFAULT: '#0A0B0E',
          950: '#0A0B0E',
          900: '#101116',
          850: '#141622',
          800: '#1D202C',
          700: '#323647',
          600: '#4A4F63',
          500: '#5E606A',
          400: '#8A8C99',
          300: '#B8B5C2',
          200: '#DAD7E2',
          100: '#EBE8F0',
          50: '#F8F4EA',
        },
        oxblood: {
          DEFAULT: '#801423',
          700: '#801423',
          600: '#9b1b2d',
          500: '#ba2338',
          400: '#d9455b',
        },
        vermilion: {
          DEFAULT: '#FF5A5F',
          500: '#FF5A5F',
          600: '#E83E44',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'brutal': '3px 3px 0px var(--border-color, #111218)',
        'brutal-sm': '2px 2px 0px var(--border-color, #111218)',
        'brutal-hover': '1px 1px 0px var(--border-color, #111218)',
        'royal': '3px 3px 0px #5B3DF5',
        'coral': '3px 3px 0px #FF5A5F',
        'tactile': 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
        'soft': '0 10px 30px -10px rgba(0, 0, 0, 0.05), 0 0 0 1px var(--border-color, rgba(0, 0, 0, 0.08))',
      },
      fontSize: {
        'fluid-hero': 'clamp(2.75rem, 6vw + 1rem, 5.5rem)',
        'fluid-h2': 'clamp(2rem, 4vw + 0.5rem, 3.25rem)',
        'fluid-h3': 'clamp(1.35rem, 2.5vw + 0.5rem, 2.15rem)',
      }
    },
  },
  plugins: [],
};
export default config;
