module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto, sans-serif"],
      },
      spacing: {
        18: "72px",
        70: "270px",
      },
      container:{
        padding:'2rem',
        center:'true'
      },
      screens:{
        sm:'640px',
        md:'768px',
      }
    },
  },
  plugins: [],
};
