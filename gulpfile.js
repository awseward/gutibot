'use strict';

const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');

gulp.task('default', require('gulp-task-listing'));

gulp.task('clean', function() {
  return del(['./dist/*']);
});

gulp.task('build', ['clean'], function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});
