module.exports = () => {
  const webpack = require('webpack');
  const path = require('path');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const { src, dest, port } = require('./build-config');

  const indexHtml = require('./webpack-loaders/indexHtml')();
  const scriptLoader = require('./webpack-loaders/script-loader')();
  const styleLoader = require('./webpack-loaders/style-loader')();

  const config = {
    mode: 'development',
    entry: src.entries,
    output: {
      path: dest.distPath,
      filename: 'bundle.js',
    },
    module: {
      rules: [scriptLoader, styleLoader],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        commons: path.resolve(__dirname, '../src/app/commons'),
      },
    },
    devtool: false, // for sourceMap
    plugins: [
      indexHtml,
      new webpack.HotModuleReplacementPlugin(),

      new webpack.ProvidePlugin({
        _: 'lodash',
        'face-api.js': 'face-api.js',
      }),

      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/recognition-models'),
          to: 'recognition-models',
        },
      ]),

      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/labeled-images'),
          to: 'labeled-images',
        },
      ]),

      new webpack.SourceMapDevToolPlugin({
        test: [/\.js$/],
        columns: false,
        exclude: /vendors/,
        moduleFilenameTemplate: '[resource-path]',
        fallbackModuleFilenameTemplate: '[resource-path]',
      }),
    ],
    devServer: {
      port,
    },
    node: {
      fs: 'empty',
    },
  };

  return config;
};
