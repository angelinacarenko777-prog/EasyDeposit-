/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{html,js}",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a2b4b",
      }
    },
  },
  plugins: [],
}