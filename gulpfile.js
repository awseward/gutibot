'use strict';

const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');

gulp.task('list', () => {
  require('child_process').exec('gulp --tasks', (error, stdout, stderr) => {
    console.log(stdout);

    if (stderr && std != '') {
      console.error(stderr);
    }
    if (error) {
      console.error(error);
    }
  });
});

gulp.task('default', ['list']);

gulp.task('clean', () => {
  return del(['./dist/*']);
});

gulp.task('build', ['clean'], () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});
