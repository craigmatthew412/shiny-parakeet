'use strict';

import url from 'url';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gutil from 'gulp-util';
import config from '../config';

gulp.task('browserSync', () => {
	const DEFAULT_FILE = 'index.html';
	const ASSET_EXTENSION_REGEX = new RegExp(`\\b(?!\\?)\\.(${config.assetExtensions.join('|')})\\b(?!\\.)`, 'i');
	const MOCK_API_PATH = '/api';

	browserSync.init({
		'server': {
			'baseDir': config.buildDir,
			'middleware': (req, res, next) => {
				const fileHref = url.parse(req.url).href;

				if (req.url.indexOf(MOCK_API_PATH) > -1) {
					//Don't rewrite to default file
					gutil.log('Mock API Request: ', req.url);
				}
				else if (!ASSET_EXTENSION_REGEX.test(fileHref)) {
					req.url = `/${DEFAULT_FILE}`;
				}

				return next();
			}
		},
		'port': config.browserPort,
		'ui': {
			'port': config.UIPort
		},
		'ghostMode': {
			'links': false
		}
	});
});
