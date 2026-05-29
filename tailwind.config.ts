import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shoprite: {
          red: "#E30613",
          "red-dark": "#B8050F",
          "red-light": "#FF1A2A",
          dark: "#1A1A1A",
          grey: "#333333",
          "grey-mid": "#666666",
          "grey-light": "#F5F5F5",
          "grey-border": "#E5E5E5",
          gold: "#F5A623",
          green: "#2E7D32",
          "green-light": "#E8F5E9",
        },
      },
      fontFamily: {
        display: ["'Barlow Condensed'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      animation: {
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.32,0.72,0,1)",
        "fade-in": "fadeIn 0.2s ease-out",
        "bounce-once": "bounceOnce 0.4s ease-out",
        "pulse-red": "pulseRed 1.5s ease-in-out infinite",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceOnce: {
          "0%, 100%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.3)" },
          "60%": { transform: "scale(0.95)" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(227, 6, 19, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(227, 6, 19, 0)" },
        },
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.12)",
        drawer: "-8px 0 40px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
