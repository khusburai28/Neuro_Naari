/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8faf0',
          100: '#eef4d6',
          200: '#dde9ad',
          300: '#c7db7f',
          400: '#b2cd51',
          500: '#9ACD32', // YellowGreen
          600: '#7ba428',
          700: '#5d7b1e',
          800: '#3e5214',
          900: '#1f290a',
        },
        accent: {
          50: '#f0faf2',
          100: '#d6f4dc',
          200: '#ade9b9',
          300: '#7fdb91',
          400: '#51cd69',
          500: '#32cd50',
          600: '#28a441',
          700: '#1e7b31',
          800: '#145221',
          900: '#0a2910',
        }
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
};