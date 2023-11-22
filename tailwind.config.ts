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
          50: '#f0fbfb',
          100: '#d8f4f5',
          200: '#b5e8ec',
          300: '#82d7de',
          400: '#5ac3cd',
          500: '#2da1ad',
          600: '#288292',
          700: '#266a78',
          800: '#275863',
          900: '#244955',
          950: '#133039',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dawn-pattern':
          'radial-gradient(100% 50% at 25% 100%, #feb2b2 0%, rgba(252, 184, 219, 0.75) 25%, rgba(239, 194, 250, 0.5) 50%, rgba(190, 227, 248, 0) 100%), linear-gradient(78deg, #d8f4f5 0%, #adecef 14.29%, #97e0e4 28.57%, #82d3d9 42.86%, #6ec7ce 57.14%, #5abac3 71.43%, #2da1ad 100%)',
      }
    },
  },
  plugins: [],
};

export default config;
