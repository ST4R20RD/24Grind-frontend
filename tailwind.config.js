/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chinBlackDark: "#111111",
        chinBlack: "#161616",
        eerieBlack: "#1C1C1C",
        lustRed: "#E31C25",
        ueRed: "#BB000E",
      },
    },
  },
  plugins: [],
};
