export const mfConfig = {
  name: "host",
  remotes: {
    auth: 'auth@http://localhost:3001/auth.js',
    gallery: 'gallery@http://localhost:3002/gallery.js',
    profile: 'profile@http://localhost:3003/profile.js',
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
