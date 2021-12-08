const colors = require('tailwindcss/colors');

module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.emerald[600],
          DEFAULT: colors.emerald[900],
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      borderRadius: ['first', 'last'],
      borderWidth: ['first', 'last'],
      textColor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
