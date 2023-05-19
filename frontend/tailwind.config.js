/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202225",
        secondary: "#5865f2",
        tertiary: "#2F3136",
        slate: "#e2e8f0",
        gray: colors.neutral,
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, 10px)" },
          "50%": { transform: "translate(0, 0)" },
          "75%": { transform: "translate(-10px, -10px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      transformOrigin: {
        // Needed for 3D rotation
        "500": "500",
      },
    },
  },
  plugins: [],
};

