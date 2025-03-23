export const mfConfig = {
  name: "main",
  exposes: {},
  shared: ["react", "react-dom"],
  remotes: {
    "authentication": "authentication@http://localhost:8081/authentication.js",
    "photo": "photo@http://localhost:8082/photo.js"
  },
};
