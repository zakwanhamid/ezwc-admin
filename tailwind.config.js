/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ezwcColor': '#529C4E', // replace '123456' with your hex color
      }
    },
  },
  plugins: [],
}

