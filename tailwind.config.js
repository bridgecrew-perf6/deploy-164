module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    screens: {
      'xsm': { 'min': '268px' },
      'sm': { 'min': '568px' },
      'md': { 'min': '768px' },
      'lg': { 'min': '1024px' },
      'xl': { 'min': '1224px' },
      '2xl': { 'min': '1424px' },
      '3xl': { 'min': '1724px' },
    },
    extend: {
      fontFamily: {
        "exo-nav": ["Exo", "sans-serif"],
        "gudea-paragraph": ["Gudea", "sans-serif"],
        "khand-headers": ["Khand", "sans-serif"],
        "quattrocento-sans": ["Quattrocento Sans", "sans-serif"],
      },
      colors: {
        main: "#ce061e",
        "main-black": "#212121",
        'light-black': '#171717'
      },
      gridTemplateColumns: {
        main: "minmax(0, 1fr) minmax(0, 2fr) minmax(0, 1fr) ",
        "template-one": "minmax(180px, 1fr) 1fr minmax(180px, 1fr)",
        "template-one-xl": "minmax(320px, 1fr) 1fr minmax(320px, 1fr)",
        "template-two": "1fr 640px 1fr",
      },
      boxShadow: {
        post: "",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
