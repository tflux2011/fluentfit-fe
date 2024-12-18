/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#80cba0',
          600: '#1a73e8',
          700: '#1a73e8',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
  variants: {
    extend: {
      backgroundColor: ['hover'], // Ensure hover is enabled
    },
  },
}

