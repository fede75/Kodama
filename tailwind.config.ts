import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bark: {
          50: "#f7f4ef",
          100: "#e8dfd2",
          200: "#d6c2a9",
          300: "#c09f7f",
          400: "#a67a56",
          500: "#8b5e3c",
          600: "#724b32",
          700: "#593b29",
          800: "#402c1f",
          900: "#271c15"
        },
        ink: {
          50: "#f5f1eb",
          100: "#e6ddd2",
          200: "#cfc0af",
          300: "#b39b84",
          400: "#91745e",
          500: "#745745",
          600: "#5c4436",
          700: "#453329",
          800: "#2f221d",
          900: "#1a1310"
        },
        moss: {
          50: "#f5f8f1",
          100: "#e5eed8",
          200: "#cdddb6",
          300: "#aec88b",
          400: "#8cb061",
          500: "#6f9546",
          600: "#567538",
          700: "#41592d",
          800: "#2e3f22",
          900: "#1c2817"
        },
        clay: {
          50: "#fcf4ef",
          100: "#f5ddd0",
          200: "#ecbfa6",
          300: "#df9973",
          400: "#cf6f45",
          500: "#b95432",
          600: "#983f27",
          700: "#7a311f",
          800: "#5d271c",
          900: "#411d16"
        },
        mist: "#f3f0ea",
        paper: "#f8f1e7"
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(26, 19, 16, 0.28)",
        paper: "0 28px 80px -42px rgba(55, 36, 26, 0.34)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "serif"],
        display: ["var(--font-display)", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
