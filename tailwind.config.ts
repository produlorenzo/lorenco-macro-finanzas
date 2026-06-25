import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#071421",
        ink: "#f7fbff",
        muted: "#b8c5d6",
        line: "#38516b",
        accent: "#d7ae5f",
        brass: "#f0c978",
        night: "#030912",
        "night-soft": "#0b1a2a"
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        rule: "inset 0 -1px 0 rgba(215, 174, 95, 0.36)"
      }
    },
  },
  plugins: [typography],
};

export default config;
