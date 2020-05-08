module.exports = () => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { src } = require('../build-config');

  const options = {
    template: src.indexHtml,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
    },
  };

  return new HtmlWebpackPlugin(options);
};
