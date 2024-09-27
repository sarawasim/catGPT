/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sometype: ['"Sometype Mono"', "monospace"],
        roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
}
