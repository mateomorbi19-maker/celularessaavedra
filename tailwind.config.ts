import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Celulares Nuevos Saavedra — black + white + Apple-style blue accent
        csaccent: "#0A84FF",
        csaccentdark: "#0066CC",
        csblack: "#050505",
        cspanel: "#0F0F10",
        cspanel2: "#161618",
        cspanel3: "#1E1E21",
        csborder: "#27272A",
        csmuted: "#8A8A8E",
      },
      fontFamily: {
        display: ['"SF Pro Display"', "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
