const del = require('del');
const gulp = require('gulp');
const { dest } = require('./build-config');

/**
 * Clean dist, tmp folders
 */
module.exports = gulp.task('clean', (cb) => {
  const dirs = [dest.distPath];

  return del(dirs, cb);
});
