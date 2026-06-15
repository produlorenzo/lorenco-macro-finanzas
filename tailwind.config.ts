import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f7f2ea",
        ink: "#171412",
        muted: "#6d645c",
        line: "#d9cdbf",
        accent: "#8f3f2f",
        brass: "#9f7a3a",
        night: "#11100f",
        "night-soft": "#1b1917"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        rule: "inset 0 -1px 0 rgba(143, 63, 47, 0.24)"
      }
    },
  },
  plugins: [typography],
};

export default config;
