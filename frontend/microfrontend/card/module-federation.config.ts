export const mfConfig = {
  name: "card",
  exposes: {
    './AddPlacePopup': './src/components/AddPlacePopup.js',
    './Card': './src/components/Card.js',
  },
  shared: ["react", "react-dom"],
};
