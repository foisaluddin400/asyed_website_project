/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        secondary: "#F1FA3C",
        danger: "#F44336",
        light: "#F2F4F5",
        dark: "#1D3557",
      },
      fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      },
    },
      fontFamily: {
    nunito: ["var(--font-nunito)"],
  },
  },
  plugins: [],
};