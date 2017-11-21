'use strict';

import gulp from 'gulp';
import jscs from 'gulp-jscs';
import reporter from 'gulp-reporter';
import handleErrors from '../util/handleErrors';
import config from '../config';

gulp.task('jscs', () => {
	return gulp.src([config.scripts.src, '!app/js/templates.js', config.scripts.test, config.scripts.gulp])
		.pipe(jscs())
		.pipe(reporter({
			'beep': false
		}))
		.on('error', handleErrors);
});
