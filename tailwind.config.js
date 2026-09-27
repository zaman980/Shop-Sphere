/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3F4EF",
        ink: "#14181C",
        pine: {
          DEFAULT: "#2F5D50",
          light: "#3E7566",
          dark: "#20413A",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0BE55",
        },
        clay: "#8B5E4A",
        line: "#DEDCD3",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 24, 28, 0.06), 0 1px 0 rgba(20, 24, 28, 0.04)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        slideIn: "slideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        slideUp: "slideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        fadeIn: "fadeIn 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
