// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#131313",
        cardBG: "#212121",
        primary: "#EBB0FF",
        secondary: "#8ADBFF",
        textGray: "#A8A8A8",
        pinkGlow: "#D96FEA",
        blueGlow: "#257B9F",
      },
      boxShadow: {
        glow: "0px 0px 20px 5px rgba(255,111,216,0.5)",
        button: "0px 4px 15px rgba(255,111,216,0.75)",
      },
    },
  },
  plugins: [],
};
