'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpInject from 'gulp-inject';
import config from '../config';
import handleErrors from '../util/handleErrors';

gulp.task('analytics', () => {
	gutil.log('Injecting analytics script...');

	return gulp.src(config.inject.src)
		.on('error', handleErrors)
		.pipe(gulpInject(gulp.src(''), {
			'starttag': config.inject.scripts.analytics.tag,
			'removeTags': process.env.NODE_ENV !== 'development',
			'ignorePath': config.inject.scripts.analytics.ignore,
			'empty': true,
			'addRootSlash': false,
			'transform': () => {
				return `<script type="text/javascript" src="${config.inject.scripts.analytics.src[process.env.NODE_ENV]}"></script>`;
			}
		}))
		.pipe(gulp.dest(config.inject.dest));
});
