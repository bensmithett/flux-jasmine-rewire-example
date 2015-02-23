const RewireWebpackPlugin = require("rewire-webpack");

const webpackConfig = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  },
  plugins: [new RewireWebpackPlugin()]
};

const karmaConfig = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["Chrome"],
    singleRun: true,
    files: ["app/**/*.test.js"],
    preprocessors: {
      "app/**/*.test.js": ["webpack"]
    },
    webpack: webpackConfig,
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-chrome-launcher")
    ]
  });
};

module.exports = karmaConfig;
