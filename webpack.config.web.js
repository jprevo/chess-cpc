const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "./web", from: "*.html", to: "./browser/" },
        { from: "./dist", to: "./browser/dist" },
        { from: "./font", to: "./browser/font" },
        { from: "./img", to: "./browser/img" },
        { from: "./js", to: "./browser/js" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: false,
};
