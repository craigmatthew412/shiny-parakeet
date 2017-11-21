'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint';
import reporter from 'gulp-reporter';
import config from '../config';
import handleErrors from '../util/handleErrors';

gulp.task('eslint', () => {
	return gulp.src([config.scripts.src, '!app/js/templates.js', config.scripts.test, config.scripts.gulp])
		.pipe(eslint())
		.pipe(reporter({
			'beep': false
		}))
		.on('error', handleErrors);
});
