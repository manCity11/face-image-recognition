module.exports = () => {
  const webpack = require('webpack');
  const path = require('path');
  const { src, port } = require('./build-config');

  const indexHtml = require('./webpack-loaders/indexHtml')();
  const scriptLoader = require('./webpack-loaders/script-loader')();
  const styleLoader = require('./webpack-loaders/style-loader')();

  const config = {
    mode: 'development',
    entry: src.entries,
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [scriptLoader, styleLoader],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // put alias here
      },
    },
    plugins: [
      indexHtml,
      new webpack.HotModuleReplacementPlugin(),

      new webpack.ProvidePlugin({
        _: 'lodash',
      }),
    ],
    devServer: {
      port,
    },
  };

  return config;
};
