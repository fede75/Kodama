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
        mist: "#f3f0ea"
      },
      boxShadow: {
        card: "0 18px 40px -24px rgba(30, 41, 22, 0.32)"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Georgia", "Cambria", "\"Times New Roman\"", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
