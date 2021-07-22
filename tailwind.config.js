const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gray: colors.blueGray,
      primary: colors.blue,
      green: colors.emerald,
      // red: colors.rose,
      // orange: colors.amber,
      current: 'currentColor',
      transparent: 'transparent',
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
