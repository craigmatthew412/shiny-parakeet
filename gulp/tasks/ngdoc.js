'use strict';

import gulp from 'gulp';
import ngdocs from 'gulp-ngdocs';
import config from '../config';

gulp.task('ngdoc', () => {
	return gulp.src([config.jsdoc.src, '!app/js/templates.js', './README.md', '!app/js/properties/**/**.js'])
		.pipe(ngdocs.process({
			'html5Mode': false,
			'startPage': '/api',
			'title': 'Sample Docs Title'
		}))
		.pipe(gulp.dest(config.buildDir + config.jsdoc.dest));
});
