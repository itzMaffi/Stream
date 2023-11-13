import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stream: {
          '50': '#f0fbfb',
          '100': '#d8f4f5',
          '200': '#b5e8ec',
          '300': '#82d7de',
          '400': '#5ac3cd',
          '500': '#2da1ad',
          '600': '#288292',
          '700': '#266a78',
          '800': '#275863',
          '900': '#244955',
          '950': '#133039',
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
