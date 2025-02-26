/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './app/**/*.{js,tsx,ts,jsx}',
    './App.{js,jsx,ts,tsx}',
    './features/**/*.{js,tsx,ts,jsx}',
    './components/**/*.{js,tsx,ts,jsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Regular', 'System'],
        'poppins-light': ['Poppins-Light', 'System'],
        'poppins-medium': ['Poppins-Medium', 'System'],
        'poppins-bold': ['Poppins-Bold', 'System'],
        'poppins-semibold': ['Poppins-SemiBold', 'System'],
        'poppins-italic': ['Poppins-Italic', 'System'],
      },
    },
  },
  plugins: [],
};

