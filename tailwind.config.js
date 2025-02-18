/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sc-black": "#000000",
        "sc-red": "#DD0000",
        "sc-yellow": "#FFCE00",
      },
      fontFamily: {
        sans: ["Product Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
