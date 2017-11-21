'use strict';

import gulp from 'gulp';
import {
	protractor,
	webdriver_update, //jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
	webdriver
} from 'gulp-protractor';
import config from '../config';
import testServer from '../util/testServer';

gulp.task('webdriverUpdate', webdriver_update); //jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
gulp.task('webdriver', webdriver);
gulp.task('protractor', ['build.prod', 'webdriverUpdate', 'webdriver'], (cb) => {
	testServer({
		'port': config.testPort,
		'dir': config.buildDir
	}).then((server) => {
		gulp.src('test/e2e/**/*.js')
			.pipe(protractor({
				'configFile': config.test.protractor
			}))
			.on('error', (err) => {
				//Make sure failed tests cause gulp to exit non-zero
				throw err;
			}).on('end', () => {
				server.close(cb);
			});
	});
});
