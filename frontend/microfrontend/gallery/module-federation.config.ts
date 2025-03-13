export const mfConfig = {
  name: "gallery",
  exposes: {
    './AddPlacePopup': './src/components/AddPlacePopup.js',
    './Card': './src/components/Card.js',
    './ImagePopup': './src/components/ImagePopup.js'
  },
  shared: [
    "react",
    "react-dom",
    {
      'shared-context_shared-library': {
        import: 'shared-context_shared-library',
        requiredVersion: require('../shared-library/package.json').version,
      },
    },
  ],
};
