/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accenture: {
          purple: '#A100FF',
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F2F2F2',
          darkGray: '#4D4D4D',
          lightGray: '#E6E6E6',
        },
      },
    },
  },
  plugins: [],
}