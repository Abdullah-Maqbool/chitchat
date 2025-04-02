/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        animate1: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        animate2: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      fontFamily: {
        Honk: ["Honk", "system-ui"],
        Quicksand: ["Quicksand", "system-ui"],
        Archivo: ["Archivo", "system-ui"],
      },
    },
  },
  plugins: [],
};
