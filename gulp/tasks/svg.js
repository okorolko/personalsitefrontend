'use strict';

module.exports = function() {
  $.gulp.task('svg', function() {
    return $.gulp.src('./source/img/icons/*.svg')
    .pipe($.gulp.dest($.config.root + '/assets/img/icons'))
  });
};
