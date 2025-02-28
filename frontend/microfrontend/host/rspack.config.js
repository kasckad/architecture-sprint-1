import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";


import { mfConfig } from "./module-federation.config.js";
import {fileURLToPath} from "node:url";

const isDev = process.env.NODE_ENV === "development";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.jsx",
  },
  resolve: {
    extensions: ["...", ".js", ".jsx"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
  },
  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "host",
    // publicPath must be configured if using manifest
    publicPath: "http://localhost:8080/",
  },

  experiments: {
    css: false,
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/i,
        type: 'javascript/auto',
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx:true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin(mfConfig),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
