import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      height: {
        'screen-content-height': 'calc(100vh - 110px)',
      },
      fontFamily: {
        display: ['var(--font-nm)', 'system-ui', 'sans-serif'],
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#1A202C',
        header: '#1c1c1c',
        text: '#f0e7db',
        primary: '#88FCAF',
        light: {
          background: '#ffffff',
          header: '#1c1c1c',
          text: '#1a202c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
