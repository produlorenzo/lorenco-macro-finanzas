import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx,json}",
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
        "night-soft": "#0b1a2a",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "Arial", "Helvetica", "sans-serif"],
        serif: [
          "var(--font-source-serif)",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
      },
      boxShadow: {
        rule: "inset 0 -1px 0 rgba(215, 174, 95, 0.36)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#dbe6f3",
            maxWidth: "none",
            a: {
              color: "#f0c978",
              textDecoration: "none",
              fontWeight: "600",
            },
            "a:hover": {
              color: "#d7ae5f",
              textDecoration: "underline",
            },
            h1: {
              color: "#f7fbff",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "700",
            },
            h2: {
              color: "#f7fbff",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "700",
            },
            h3: {
              color: "#f7fbff",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "600",
            },
            strong: {
              color: "#f7fbff",
              fontWeight: "700",
            },
            blockquote: {
              color: "#b8c5d6",
              borderLeftColor: "#d7ae5f",
            },
            hr: {
              borderColor: "#38516b",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
