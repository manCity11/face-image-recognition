module.exports = (cb) => {
  const webpack = require('webpack');
  const config = require('./webpack.config')();
  const colorsSupported = require('supports-color');
  const gutil = require('gulp-util');

  return webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      modules: false,
      assets: false,
      children: false,
      warnings: false,
    }));
    cb();
  });
};
