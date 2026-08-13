/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./lib/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74",
          400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c",
          800: "#9a3412", 900: "#7c2d12",
        },
        paw: {
          cream: "#fffbeb", warm: "#fef3c7", gold: "#f59e0b",
          navy: "#0f172a", forest: "#166534", rose: "#e11d48",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        paw: "0 20px 50px -12px rgba(234,88,12,0.25)",
      },
    },
  },
  plugins: [],
};