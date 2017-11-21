'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import streamify from 'gulp-streamify';
import gutil from 'gulp-util';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import gulpInject from 'gulp-inject';
import del from 'del';
import config from '../config';
import handleErrors from '../util/handleErrors';

function buildStyleSheet(source) {
	const createSourcemap = process.env.NODE_ENV !== 'production' || config.styles.prodSourcemap;

	function rebundle() {
		gutil.log('Deleting any existing stylesheets...');

		//Delete any existing revisions
		del([config.fingerprint.styles.clean.revision]);

		gutil.log('Bundling stylesheets...');

		return gulp.src(source)
			.pipe(gulpif(createSourcemap, sourcemaps.init()))
			.pipe(sassGlob())
			.pipe(sass({
				'sourceComments': process.env.NODE_ENV !== 'production',
				'outputStyle': process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
				'includePaths': config.styles.sassIncludePaths
			}))
			.on('error', handleErrors)
			.pipe(autoprefixer({
				'browsers': ['last 2 versions', '> 1%', 'ie 8']
			}))
			.pipe(gulpif(
				createSourcemap,
				sourcemaps.write(process.env.NODE_ENV === 'production' ? './' : null))
			)
			.pipe(streamify(rev()))
			.pipe(gulp.dest(config.styles.dest))
			.pipe(streamify(rev.manifest()))
			.pipe(gulp.dest(config.styles.dest));
	}

	function replace() {
		gutil.log('Replacing bundled stylesheet revisions...');

		return gulp.src(config.fingerprint.styles.replace)
			.on('error', handleErrors)
			.pipe(revReplace({
				'manifest': gulp.src(`${config.styles.dest}/rev-manifest.json`),
				'replaceInExtensions': ['.css', '.map']
			}))
			.pipe(gulp.dest(config.styles.dest));
	}

	function inject() {
		gutil.log('Injecting bundled stylesheet...');

		return gulp.src(config.inject.src)
			.on('error', handleErrors)
			.pipe(gulpInject(gulp.src(config.inject.styles.src, { 'read': false }), {
				'starttag': config.inject.styles.tag,
				'ignorePath': config.inject.styles.ignore,
				'removeTags': process.env.NODE_ENV !== 'development',
				'addRootSlash': false,
				'transform': (filepath) => {
					return `<link rel="stylesheet" type="text/css" href="${filepath}">`;
				}
			}))
			.pipe(gulp.dest(config.inject.dest))
			.pipe(gulpif(browserSync.active, browserSync.reload({ 'stream': true })));
	}

	return rebundle().on('finish', () => {
		replace().on('finish', () => {
			inject().on('finish', () => {
				gutil.log('Finished processing stylesheet...');
			});
		});
	});
}

gulp.task('styles', () => {
	return buildStyleSheet(config.styles.src);
});
