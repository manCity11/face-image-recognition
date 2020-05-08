module.exports = () => {
  const webpack = require('webpack');
  const serve = require('browser-sync');
  const webpackDevMiddelware = require('webpack-dev-middleware');
  const webpackHotMiddelware = require('webpack-hot-middleware');
  const historyApiFallback = require('connect-history-api-fallback');
  const colorsSupported = require('supports-color');
  const { port } = require('./build-config');
  const config = require('./webpack.config')();

  config.entry.app.unshift(
    'webpack-hot-middleware/client?reload=true&quiet=false',
  );

  config.plugins = config.plugins.concat([
    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    new webpack.HotModuleReplacementPlugin(),
  ]);

  global.compiler = webpack(config);
  serve({
    port,
    open: false,
    notify: false,
    server: {
      /*
       Browsersync will always serve the generated webpack bundle
       under the dist/root directory
      */
      baseDir: 'dist/root',
    },
    middleware: [
      historyApiFallback({
        index: '/index.html',
      }),
      webpackDevMiddelware(global.compiler, {
        hot: true,
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false,
          assets: false,
          children: false,
          warnings: false,
        },
        publicPath: config.output.publicPath,
      }),
      webpackHotMiddelware(global.compiler),
    ],
  });
};
