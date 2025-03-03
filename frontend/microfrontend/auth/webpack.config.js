// webpack.config.js for Auth
module.exports = {
    name: "auth",
    filename: "App.js",
    exposes: {
        './Auth': './src/components/App',
    },
    shared: ["react", "react-dom"]
};
