const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bundleOutputDir = "./wwwroot/dist";
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");

module.exports = env => {
  const isDevBuild = !(env && env.prod);

  const sharedConfig = () => ({
    stats: { modules: false },
    context: __dirname,
    resolve: { extensions: [".js"] },
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: /ClientApp/,
          loader: "vue-loader",
          options: {
            loaders: {
              scss: "vue-style-loader!css-loader!sass-loader",
              sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
            }
          }
        },
        {
          test: /\.css$/,
          use: isDevBuild
            ? ["style-loader", "css-loader"]
            : ExtractTextPlugin.extract({ use: "css-loader?minimize" })
        },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: "url-loader?limit=25000" }
      ]
    },
    output: {
      path: path.join(__dirname, bundleOutputDir),
      filename: "[name].js",
      publicPath: "dist/"
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(isDevBuild ? "development" : "production")
        }
      }),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./wwwroot/dist/vendor-manifest.json")
      })
    ].concat(
      isDevBuild
        ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map", // Remove this line if you prefer inline source maps
              moduleFilenameTemplate: path.relative(
                bundleOutputDir,
                "[resourcePath]"
              ) // Point sourcemap entries to the original file locations on disk
            })
          ]
        : [
            // Plugins that apply in production builds only
            new UglifyJSPlugin(),
            new ExtractTextPlugin("site.css")
          ]
    )
  });

  const clientBundleConfig = merge(sharedConfig(), {
    entry: { main: "./ClientApp/client.js" },
    output: {
      path: path.join(__dirname, "wwwroot/dist")
    }
  });

  const serverBundleConfig = merge(sharedConfig(), {
    target: "node",
    entry: { "main-server": "./ClientApp/server.js" },
    output: {
      libraryTarget: "commonjs2",
      path: path.join(__dirname, "wwwroot/dist")
    }
  });

  return [clientBundleConfig, serverBundleConfig];
};
