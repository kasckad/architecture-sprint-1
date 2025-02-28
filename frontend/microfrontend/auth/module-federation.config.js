export const mfConfig = {
  name: "auth",
  filename: "remoteEntry.js",
  exposes: {
    "./Login": "./src/components/Login",
    "./Register": "./src/components/Register",
  },
  shared: {
    react: { singleton: true, requiredVersion: "19.0.0", eager: true },
    "react-dom": { singleton: true, requiredVersion: "19.0.0", eager: true },
    "react-router-dom": { singleton: true, requiredVersion: "5.2.0", eager: true },
  },
};
