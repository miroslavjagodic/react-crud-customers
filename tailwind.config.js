/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      letterSpacing: {
        widest: '.225em',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

