const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  return {
    entry: "./index.tsx",
    context: path.resolve(__dirname),
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "bundle.js",
      publicPath: isDev ? "http://localhost:4000/" : "/static/",
      clean: true,
    },
    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },
    module: {
      rules: [
        { test: /\.tsx?$/, use: "babel-loader", exclude: /node_modules/ },
        { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      ],
    },
    devServer: isDev ? {
      port: 4000, hot: true, historyApiFallback: true,
      headers: { "Access-Control-Allow-Origin": "*" },
    } : undefined,
    plugins: isDev ? [
      new HtmlWebpackPlugin({ template: "./templates/frontend/dev/index.html" })
    ] : [],
    devtool: isDev ? "eval-source-map" : "source-map",
  };
};