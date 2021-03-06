'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import streamify from 'gulp-streamify';
import watchify from 'watchify';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';
import debowerify from 'debowerify';
import ngAnnotate from 'browserify-ngannotate';
import bulkify from 'bulkify';
import envify from 'envify';
import gutil from 'gulp-util';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import gulpInject from 'gulp-inject';
import del from 'del';
import rename from 'gulp-rename';
import config from '../config';
import bundleLogger from '../util/bundleLogger';
import handleErrors from '../util/handleErrors';

//Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {
	const shouldCreateSourcemap = process.env.NODE_ENV !== 'production' || config.browserify.prodSourcemap;

	let bundler = browserify({
		'entries': [`${config.sourceDir}js/${file}`],
		'debug': shouldCreateSourcemap,
		'cache': {},
		'packageCache': {},
		'fullPaths': process.env.NODE_ENV === 'development'
	});

	if (process.env.NODE_ENV === 'development') {
		bundler = watchify(bundler);

		bundler.on('update', () => {
			rebundle().on('finish', () => {
				replace().on('finish', () => {
					inject().on('finish', () => {
						gutil.log('Finished processing application JavaScript files on update...');
					});
				});
			});
		});
	}

	const transforms = [
		{
			'name': babelify,
			'options': {}
		},
		{
			'name': debowerify,
			'options': {}
		},
		{
			'name': ngAnnotate,
			'options': {}
		},
		{
			'name': 'brfs',
			'options': {}
		},
		{
			'name': bulkify,
			'options': {}
		},
		{
			'name': envify,
			'options': {}
		}
	];

	transforms.forEach((transform) => {
		bundler.transform(transform.name, transform.options);
	});

	function copyEnvironmentSettings() {
		gutil.log('Copying Environment Settings file...');

		//Copy the Environment Settings
		return gulp.src(`${config.properties.environment.src}environment.${global.environment}.js`)
			.pipe(rename(config.properties.environment.dest))
			.pipe(gulp.dest(config.properties.dest))
			.on('error', handleErrors);
	}

	function rebundle() {
		bundleLogger.start();

		//Delete any existing revisions
		del(config.fingerprint.scripts.application.clean.revision);

		const stream = bundler.bundle();
		const sourceMapLocation = process.env.NODE_ENV === 'production' ? './' : '';

		return stream
			.on('error', handleErrors)
			.on('end', bundleLogger.end)
			.pipe(source(file))
			.pipe(gulpif(shouldCreateSourcemap, buffer()))
			.pipe(gulpif(shouldCreateSourcemap, sourcemaps.init({
				'loadMaps': true
			})))
			.pipe(gulpif(process.env.NODE_ENV === 'production', streamify(uglify({
				'compress': {
					'drop_console': true
				} //eslint-disable-line camelcase
			}))))
			.pipe(gulpif(shouldCreateSourcemap, sourcemaps.write(sourceMapLocation)))
			.pipe(streamify(rev()))
			.pipe(gulp.dest(config.scripts.dest))
			.pipe(streamify(rev.manifest(config.fingerprint.scripts.application.manifest)))
			.pipe(gulp.dest(config.scripts.dest));
	}

	function replace() {
		gutil.log('Replacing revisioned application JavaScript...');

		return gulp.src(config.fingerprint.scripts.application.replace)
			.pipe(revReplace({
				'manifest': gulp.src(`${config.scripts.dest}/${config.fingerprint.scripts.application.manifest}`),
				'replaceInExtensions': ['.js', '.map']
			}))
			.pipe(gulp.dest(config.scripts.dest));
	}

	function inject() {
		gutil.log('Injecting revisioned application JavaScript...');

		return gulp.src(config.inject.src)
			.on('error', handleErrors)
			.pipe(gulpInject(gulp.src(config.inject.scripts.application.src, { 'read': false }), {
				'starttag': config.inject.scripts.application.tag,
				'ignorePath': config.inject.scripts.application.ignore,
				'removeTags': process.env.NODE_ENV !== 'development',
				'addRootSlash': false,
				'transform': (filepath) => {
					return `<script type="text/javascript" src="${filepath}"></script>`;
				}
			}))
			.pipe(gulp.dest(config.inject.dest))
			.pipe(gulpif(browserSync.active, browserSync.reload({
				'stream': true,
				'once': true
			})));
	}

	return copyEnvironmentSettings().on('finish', () => {
		rebundle().on('finish', () => {
			replace().on('finish', () => {
				if (process.env.NODE_ENV !== 'development') {
					//Delete any existing revisions
					del(config.fingerprint.scripts.application.clean.manifest);
				}

				inject().on('finish', () => {
					gutil.log('Finished processing application JavaScript files...');
				});
			});
		});
	});
}

gulp.task('browserify.application', () => {
	return buildScript('app.js');
});
