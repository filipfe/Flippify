module.exports = {
  content: ["./App.tsx", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#2386F1",
        darkPrimary: "#0CA236",
        light: "#F2F8FD",
        font: "#382E6D",
        p: "#8DA5B9",
        desc: "#B6C3B9",
        wrong: "#EE3354",
        stroke: "#E3E8E4",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
