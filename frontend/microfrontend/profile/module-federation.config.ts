export const mfConfig = {
  name: "profile",
  exposes: {
    './EditProfilePopup': './src/components/EditProfilePopup.js',
    './EditAvatarPopup': './src/components/EditAvatarPopup.js'
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
