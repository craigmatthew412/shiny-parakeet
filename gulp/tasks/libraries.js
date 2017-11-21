'use strict';

import changed from 'gulp-changed';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import browserSync from 'browser-sync';
import config from '../config';

gulp.task('libraries', () => {
	return gulp.src(config.libraries.src)
		.pipe(changed(config.buildDir + config.libraries.dest)) //Ignore unchanged files
		.pipe(gulp.dest(config.buildDir + config.libraries.dest))
		.pipe(gulpif(browserSync.active, browserSync.reload({
			'stream': true,
			'once': true
		})));
});
