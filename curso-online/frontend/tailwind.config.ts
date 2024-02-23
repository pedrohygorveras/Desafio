import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        app: {
          primary: "#cf2020",
          secondary: "#ecedef",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#d0d5df",
          "base-300": "#ecedef",
        },
      },
      {
        dark: {
          primary: "#cf2020",
          secondary: "#525355",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#121212",
          "base-200": "#525355",
          "base-300": "#27282b",
        },
      },
    ],
  },
};
export default config;
