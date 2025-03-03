// webpack.config.js for Profile
module.exports = {
    name: "profile",
    filename: "App.js",
    exposes: {
        './Profile': './src/components/App',
    },
    shared: ["react", "react-dom"]
};
