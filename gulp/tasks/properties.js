'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import config from '../config';
import handleErrors from '../util/handleErrors';

//Properties task
gulp.task('properties', (done) => {
	runSequence('properties.environment', done);
});

//Environment Properties
gulp.task('properties.environment', (done) => {
	gutil.log('Copying Environment Settings file...');

	//Copy the Environment Settings
	gulp.src(`${config.properties.environment.src}environment.${global.environment}.js`)
		.pipe(rename(config.properties.environment.dest))
		.pipe(gulp.dest(config.properties.dest))
		.on('error', handleErrors)
		.on('finish', () => {
			done();
		});
});
