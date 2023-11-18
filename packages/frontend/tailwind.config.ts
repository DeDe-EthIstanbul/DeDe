import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          background: "#FAF6DB",
          text: "#FEFEF2",
          accent: "#FFD562",
          danger: "#F75C5A",
          success: "#30a46c",
          secondary: "#659098",
          primary: "#023039",
        },
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
export default config;
