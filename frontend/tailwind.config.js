/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      colors: {
        'background':'#FFEFCD',
        'column':'#FCF3E3',
        'card':'#E5D2B8',
        'gradient':'#815423',
        'taskunity': {
          '50': '#f0f3fd',
          '100': '#e4eafb',
          '200': '#ced7f7',
          '300': '#afbdf2',
          '400': '#8f9aea',
          '500': '#7479e0',
          '600': '#5d59d2',
          '700': '#4f4ab8',
          '800': '#423f98',
          '900': '#383877',
          '950': '#222145',
        },
      },
    },
  },
  plugins: [],
}