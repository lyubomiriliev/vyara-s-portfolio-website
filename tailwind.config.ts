// tailwind.config.ts
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2560px',
        '4xl': '3840px',
      },
      colors: {
        bg: { primary: "#0A0A0F", secondary: "#111118", tertiary: "#16161F" },
        accent: {
          pink: "#E040A0",
          violet: "#FFB76C",
          blue: "#9B59F5",
          orange: "#FFB76C",
          purple: "#9B59F5",
        },
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #E040A0, #FFB76C, #9B59F5)",
        "gradient-subtle":
          "linear-gradient(135deg, rgba(224,64,160,0.15), rgba(255,183,108,0.15))",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(255,183,108,0.2)",
        "glow-pink": "0 0 40px rgba(224,64,160,0.3)",
        "glow-violet": "0 0 40px rgba(255,183,108,0.3)",
        "glow-orange": "0 0 40px rgba(255,183,108,0.3)",
        "glow-purple": "0 0 40px rgba(155,89,245,0.3)",
      },
      borderRadius: { pill: "999px" },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        body: ["var(--font-sans)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-25%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-18px) scale(1.04)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.30" },
        },
      },
      animation: {
        marquee: "marquee 80s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
