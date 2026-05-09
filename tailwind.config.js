/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf8f3",
          100: "#f9ede1",
          200: "#f2d9c2",
          300: "#e8be99",
          400: "#dc9c6e",
          500: "#d4824d",
          600: "#c66a3f",
          700: "#a55336",
          800: "#854432",
          900: "#6c3a2b",
          950: "#3a1c15",
        },
        wine: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#f9d2d9",
          300: "#f4adb9",
          400: "#ec7e94",
          500: "#df5471",
          600: "#c9345a",
          700: "#a82649",
          800: "#8c2341",
          900: "#78213c",
          950: "#420d1d",
        },
        coffee: {
          50: "#f6f3f0",
          100: "#e8e0d8",
          200: "#d3c4b4",
          300: "#b9a089",
          400: "#a58468",
          500: "#96725a",
          600: "#815e4d",
          700: "#694a40",
          800: "#583f39",
          900: "#4c3733",
          950: "#2a1c1a",
        },
        cream: {
          50: "#fdfcfa",
          100: "#f8f5f0",
          200: "#f0e9de",
          300: "#e5d8c5",
          400: "#d6c0a4",
          500: "#c9a988",
          600: "#b89070",
          700: "#9a755d",
          800: "#7e6150",
          900: "#675144",
          950: "#372a23",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        gradient: "gradient 8s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212, 130, 77, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(212, 130, 77, 0.6)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
