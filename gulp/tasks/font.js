'use strict';

module.exports = function() {
  $.gulp.task('font', function() {
    return $.gulp.src('./source/fonts/**/*.*', { since: $.gulp.lastRun('font') })
      .pipe($.gulp.dest($.config.root + '/assets/fonts/'));
  });
};
