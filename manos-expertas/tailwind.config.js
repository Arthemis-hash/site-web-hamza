// tailwind.config.js - Version ES modules
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f1',
          100: '#d9e5db',
          200: '#b3ccb7',
          300: '#8db294',
          400: '#669870',
          500: '#4a6b52',
          600: '#3d5742',
          700: '#304332',
          800: '#232f22',
          900: '#161b16',
        },
        cream: {
          50: '#fefcf8',
          100: '#fdf9f1',
          200: '#fbf3e3',
          300: '#f8edd5',
          400: '#f5e7c7',
          500: '#f2e1b9',
          600: '#e8d19e',
          700: '#ddc183',
          800: '#d3b168',
          900: '#c8a14d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}