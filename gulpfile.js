(function() {
  "use strict";

  var babel = require("gulp-babel");
  var del = require("del");
  var gulp = require("gulp");
  var gulpList = require("gulp-task-listing");

  gulp.task("help", gulpList);

  gulp.task("default", ["help"]);

  gulp.task("clean", function() {
    return del(["./dist/*"]);
  });

  gulp.task("build", ["clean"], function() {
    return gulp.src("src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("./dist"));
  });
})();
