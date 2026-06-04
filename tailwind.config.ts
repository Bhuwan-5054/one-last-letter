import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: "#050816",
        night: "#090D18",
        card: "#111827",
        glow: "#1D2433",
        accent: "#D6B36A",
        accentSoft: "#E8CC8C",
        muted: "#A7B0C0",
        secondaryText: "#A7B0C0",
        warm: "#F2B8A0",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Georgia", "serif"],
        letter: ["Georgia", "serif"],
      },
      boxShadow: {
        premium: "0 25px 80px rgba(0,0,0,0.45)",
        gold: "0 0 45px rgba(214,179,106,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
