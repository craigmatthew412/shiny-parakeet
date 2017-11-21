'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import htmlmin from 'gulp-htmlmin';
import templateCache from 'gulp-angular-templatecache';
import streamify from 'gulp-streamify';
import rev from 'gulp-rev';
import revReplace from 'gulp-rev-replace';
import gulpInject from 'gulp-inject';
import del from 'del';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import config from '../config';
import handleErrors from '../util/handleErrors';

//Views task
gulp.task('views', ['views.inject'], () => {
});

gulp.task('views.copy', () => {
	if (!global.isWatching) {
		gutil.log('Starting views.copy stream...');

		//Put our index.html in the dist folder
		const indexFile = gulp.src(config.views.index)
			.pipe(gulp.dest(config.buildDir))
			.on('finish', () => {
				gutil.log('Finished with views.copy stream!');
			});

		return indexFile;
	}
});

gulp.task('views.compile', ['views.copy'], () => {
	gutil.log('Starting views.compile stream...');

	//Delete any existing revisions
	del(config.fingerprint.scripts.templates.clean.revision);
	del(config.views.testSrc);

	//Process any other view files from app/views
	const views = gulp.src(config.views.src)
		.pipe(htmlmin({
			'collapseBooleanAttributes': true,
			'collapseWhitespace': true,
			'removeAttributeQuotes': true,
			'removeComments': true,
			'removeRedundantAttributes': true,
			'removeScriptTypeAttributes': true,
			'removeStyleLinkTypeAttributes': true
		}))
		.pipe(templateCache({
			'standalone': true
		}))
		.pipe(gulpif(process.env.NODE_ENV === 'test', gulp.dest(config.views.dest.test)))
		.pipe(streamify(rev()))
		.pipe(gulp.dest(config.views.dest.fingerprint))
		.pipe(streamify(rev.manifest(config.fingerprint.scripts.templates.manifest)))
		.pipe(gulp.dest(config.views.dest.fingerprint))
		.on('finish', () => {
			gutil.log('Finished with views.compile stream!');
		});

	return views;
});

gulp.task('views.replace', ['views.compile'], () => {
	gutil.log('Starting views.replace stream...');

	const replaceFile = gulp.src(config.fingerprint.scripts.templates.replace)
		.pipe(revReplace({
			'manifest': gulp.src(`${config.scripts.dest}/${config.fingerprint.scripts.templates.manifest}`),
			'replaceInExtensions': ['.js', '.map']
		}))
		.pipe(gulp.dest(config.scripts.dest))
		.on('finish', () => {
			if (process.env.NODE_ENV === 'production') {
				//Delete any existing revisions
				del(config.fingerprint.scripts.templates.clean.manifest);
			}

			gutil.log('Finished with views.replace stream!');
		});

	return replaceFile;
});

gulp.task('views.inject', ['views.replace'], () => {
	gutil.log('Starting views.inject stream...');

	const injectFile = gulp.src(config.inject.src)
		.on('error', handleErrors)
		.pipe(gulpInject(gulp.src(config.inject.scripts.templates.src, { 'read': false }), {
			'starttag': config.inject.scripts.templates.tag,
			'ignorePath': config.inject.scripts.templates.ignore,
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
		})))
		.on('finish', () => {
			gutil.log('Finished with views.inject stream!');
		});

	return injectFile;
});
