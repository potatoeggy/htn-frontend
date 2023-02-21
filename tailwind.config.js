const lineClamp = require("@tailwindcss/line-clamp");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
};
