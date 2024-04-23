/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: "Calligraffitti , cursive",
        primary: "Kaisei HarunoUmi , serif",
      },
      backgroundColor: {
        dark: "#496989",
        primary: "#58A399",
        secondary: "#A8CD9F",
      },
      colors: {
        dark: "#496989",
        primary: "#58A399",
        secondary: "#A8CD9F",
      },
    },
  },
  plugins: [],
};
