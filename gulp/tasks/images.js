'use strict';

import changed from 'gulp-changed';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import config from '../config';

gulp.task('images', () => {
	return gulp.src(config.images.src)
		.pipe(changed(config.images.dest)) //Ignore unchanged files
		.pipe(gulpif(process.env.NODE_ENV === 'production', imagemin())) //Optimize
		.pipe(gulp.dest(config.images.dest))
		.pipe(browserSync.stream());
});
