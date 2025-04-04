/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        david: ["DavidLibre", "serif"],
        jakarta: ["PlusJakartaSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
