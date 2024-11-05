// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bona: ["'Bona Nova'", "serif"],
        raleway: ["'Raleway'", "serif"],
        arsenal: ["'Arsenal'", "serif"],
        montserrat: ["Montserrat", "serif"],
        lato: ["Lato", "serif"],
        merri: ["Merriweather Sans", "serif"],
      },
      colors: {
        dark: "#131313",
        cardBG: "#212121",
        primary: "#D96FEA",
        secondary: "#257B9F",
        textGray: "#A8A8A8",
        pinkGlow: "#D96FEA",
        blueGlow: "#257B9F",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        blink: {
          "0%, 50%": { opacity: 1 },
          "51%, 100%": { opacity: 0 },
        },
      },
      animation: {
        mobileScroll: "scroll 10s linear infinite",
        slowScroll: "scroll 55s linear infinite",
        blink: "blink 0.75s stepp(1, end) infinite",
      },
      blur: {
        "4xl": "80px",
        "5xl": "100px",
        "6xl": "120px",
      },
      boxShadow: {
        "glow-lg": "0 0 60px 20px rgba(255, 111, 216, 0.3)", // pinkish glow
        "glow-xl": "0 0 80px 30px rgba(135, 206, 250, 0.4)", // bluish glow
        "glow-xxl": "0 0 120px 40px rgba(255, 255, 255, 0.2)", // white glow for general softness
      },
    },
  },
  plugins: [],
};
