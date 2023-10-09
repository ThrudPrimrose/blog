module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blur: {
          '0%': { filter: "blur(0px)" },
          '100%': { filter: "blur(3px)" },
        }
      },
      animation: {
        blur: 'blur 0.1s linear',
      }
    },
  },
  plugins: [],
}
