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
        paper: "#eef3f8",
        ink: "#132033",
        muted: "#5b6b80",
        line: "#d2dce9",
        accent: "#2563eb",
        brass: "#3b82f6",
        night: "#ffffff",
        "night-soft": "#f8fbff",
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
        rule: "inset 0 -1px 0 rgba(37, 99, 235, 0.28)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#26364b",
            maxWidth: "none",
            lineHeight: "1.75",
            a: {
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "650",
            },
            "a:hover": {
              color: "#1d4ed8",
              textDecoration: "underline",
            },
            h1: {
              color: "#132033",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "700",
            },
            h2: {
              color: "#132033",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "700",
            },
            h3: {
              color: "#132033",
              fontFamily: "var(--font-source-serif)",
              fontWeight: "650",
            },
            strong: {
              color: "#132033",
              fontWeight: "700",
            },
            blockquote: {
              color: "#475569",
              borderLeftColor: "#3b82f6",
              backgroundColor: "#f8fbff",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingRight: "1rem",
            },
            hr: {
              borderColor: "#d2dce9",
            },
            thead: {
              color: "#132033",
              borderBottomColor: "#d2dce9",
            },
            "tbody tr": {
              borderBottomColor: "#e1e8f2",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
