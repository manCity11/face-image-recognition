const path = require('path');

module.exports = {
  langs: ['fr'],
  port: 8080,
  src: {
    appPath: path.resolve(__dirname, '../src'),
    indexHtml: './src/index.html',
    entries: {
      app: ['./src/main.js'],
    },
  },
  dest: {
    distPath: path.resolve(__dirname, '../dist/root'),
    tmp: '.tmp',
    locales: 'dist',
  },
  output: {
    publicPath: '/',
  },
};
