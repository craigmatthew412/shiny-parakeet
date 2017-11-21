'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('browserify', (done) => {
	runSequence('browserify.application', 'browserify.vendor', done);
});
