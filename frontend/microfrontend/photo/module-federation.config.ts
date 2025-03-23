export const mfConfig = {
  name: "photo",
  exposes: {
    './AddPlacePopup': './src/components/AddPlacePopup.tsx',
    './Cards': './src/components/Cards'
  },
  shared: ["react", "react-dom"],
};
