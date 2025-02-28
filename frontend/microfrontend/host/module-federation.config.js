export const mfConfig = {
  name: "host",
  remotes: {
    auth: "auth@http://localhost:8081/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "19.0.0", eager: true },
    "react-dom": { singleton: true, requiredVersion: "19.0.0", eager: true },
    "react-router-dom": { singleton: true, requiredVersion: "5.2.0", eager: true },
  },
};
