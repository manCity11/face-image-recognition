const gulp = require('gulp');

const clean = require('./tasks/clean');
const bundle = require('./tasks/bundle');
const connect = require('./tasks/connect');

gulp.task('clean', clean);
gulp.task('build', gulp.series('clean', bundle));
gulp.task('serve', connect);
