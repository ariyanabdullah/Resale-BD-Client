/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        resaletheme: {
          primary: "#31797e",
          secondary: "#31797e",
          accent: "#3A4256",
          footer: "#4a5556",
          neutral: "#ebf4f3",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
