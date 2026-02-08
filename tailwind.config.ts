import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#14B8A6",
          light: "#5EEAD4",
          dark: "#0D9488",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          light: "#67E8F9",
          dark: "#0891B2",
        },
      },
    },
  },
  plugins: [],
};
export default config;
