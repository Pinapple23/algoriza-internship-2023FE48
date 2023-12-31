/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      },
    },
    fontFamily: {
      WorkSans: ["Work Sans, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
    },
  },
  plugins: [],
};

