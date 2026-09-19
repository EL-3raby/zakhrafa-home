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
        primary: {
          DEFAULT: "#0B3D42", // dark teal
          dark: "#07262A",
          light: "#12555C",
          subtle: "#EDF5F6",
        },
        accent: {
          DEFAULT: "#E17F3F", // warm orange
          hover: "#C96A2D",
          light: "#FDF3EB",
          muted: "#F3B084",
        },
        brand: {
          teal: "#0B3D42",
          orange: "#E17F3F",
          cream: "#FAF9F5",
          surface: "#F8F9FA",
          dark: "#1A202C",
        },
      },
      fontFamily: {
        sans: ["var(--font-alexandria)", "var(--font-cairo)", "sans-serif"],
        arabic: ["var(--font-alexandria)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
