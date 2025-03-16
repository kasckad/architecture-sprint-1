export const mfConfig = {
  name: "host",
  exposes: {},
  shared: ["react", "react-dom"],
  remotes: {
    'auth': 'users@http://localhost:8082/remoteEntry.js',
    'card': 'users@http://localhost:8081/remoteEntry.js',
    'profile': 'users@http://localhost:8083/remoteEntry.js',
  }
};
