import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--color-bg-base)",
        elevated: "var(--color-bg-elevated)",
        muted: "var(--color-bg-muted)",
        ink: "var(--color-text-primary)",
        sub: "var(--color-text-secondary)",
        surface: {
          dark: "var(--color-surface-dark)",
          "dark-muted": "var(--color-surface-dark-muted)",
        },
        brand: {
          start: "var(--color-brand-start)",
          mid: "var(--color-brand-mid)",
          end: "var(--color-brand-end)",
        },
        accent: {
          about: "var(--color-accent-about)",
          cases: "var(--color-accent-cases)",
          contact: "var(--color-accent-contact)",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-unbounded)", "var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": [
          "clamp(2.75rem,6vw+1rem,4.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        h2: [
          "clamp(2rem,3vw+1rem,2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.025em" },
        ],
        h3: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h4: ["1.25rem", { lineHeight: "1.35" }],
      },
      maxWidth: {
        content: "1400px",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
      transitionDuration: {
        motion: "350ms",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
