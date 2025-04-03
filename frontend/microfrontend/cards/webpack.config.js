const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8083/",
    assetModuleFilename: 'assets/[hash][ext][query]'
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8083,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            // Для импорта SVG как React компонентов
            resourceQuery: /react/, // если имя файла содержит ?react
            use: ['@svgr/webpack'],
          },
          {
            // Для использования SVG как URL в CSS
            type: 'asset/resource',
            generator: {
              filename: 'images/[hash][ext][query]'
            }
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "cards",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './AddPlacePopup': './src/components/AddPlacePopup.js',
        './ImagePopup': './src/components/ImagePopup.js',
        './Card': './src/components/Card.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
