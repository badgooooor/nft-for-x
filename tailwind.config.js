module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sandy-brown": "#eeb746",
        "white-pink": "#fff4f9",
        "light-pink": "#f4c9e7",
        "hot-pink": "#e342ac",
        "light-blue": "#b2d7df",
        "dark-slate-blue": "#3f23c4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
