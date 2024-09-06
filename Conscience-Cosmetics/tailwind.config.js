/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#ff7600', // Define your beige color here
      },
    },
  },
  plugins: [require('daisyui')],
}
