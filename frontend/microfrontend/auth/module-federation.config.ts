export const mfConfig = {
  name: "auth",
  exposes: {
    './Header': './src/components/Header.js',
    './Login': './src/components/Login.js',
    './Register': './src/components/Register.js',
  },
  shared: ["react", "react-dom"],
};
