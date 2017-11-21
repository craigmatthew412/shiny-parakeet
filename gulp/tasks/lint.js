'use strict';

import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('lint', (cb) => {
	runSequence(['eslint', 'jscs'], cb);
});
