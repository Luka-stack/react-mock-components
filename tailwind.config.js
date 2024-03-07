/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data=mode="dark"]'],
  theme: {
    extend: {
      height: {
        px: '1px',
      },
      padding: {
        1.75: '0.4375rem',
      },
    },
  },
  plugins: [],
};
