'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';

gulp.task('build.dev', ['clean'], (cb) => {
	cb = cb || function callback() {};

	//Check for CLI arguments
	if (typeof (global.environment) === 'string') {
		runSequence('views', 'properties', 'browserify', 'styles', ['images', 'fonts', 'libraries', 'lint', 'ngdoc'], 'watch', cb);
	}
	else {
		gutil.log('CLI argument --env is required for this task.  Please re-run with required arguments.');
	}
});
