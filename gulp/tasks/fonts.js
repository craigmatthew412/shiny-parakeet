'use strict';

import changed from 'gulp-changed';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config';

gulp.task('fonts', () => {
	return gulp.src(config.fonts.src)
		.pipe(changed(config.fonts.dest)) //Ignore unchanged files
		.pipe(gulp.dest(config.fonts.dest))
		.pipe(browserSync.stream());
});
