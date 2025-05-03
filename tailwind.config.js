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
        "light-cream": "#EDE0D4",
        "soft-blush": "#E6CCB2",
        "warm-beige": "#DDB892",
        "muted-sand": "#B08968",
        "elegant-mocha": "#7F5539",
        "deep-bronze": "#9C6644",
      },
      fontFamily: {
        alice: ["var(--font-alice)", "serif"],
        alta: ["var(--font-alta)", "sans-serif"],
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "slide-down": "slideDown 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
