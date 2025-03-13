export const mfConfig = {
  name: "auth",
  exposes: {
    './Login': './src/components/Login.js',
    './Register': './src/components/Register.js',
  },
  shared: ["react", "react-dom"],
};
