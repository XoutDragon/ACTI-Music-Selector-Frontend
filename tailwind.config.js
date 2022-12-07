/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        88: '22rem',
      },
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      maxWidth: (theme) => ({
        xss: '10rem',
      }),
      screens: {
        xss: '375px',
        xs: '425px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};