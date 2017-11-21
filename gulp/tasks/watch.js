'use strict';

import gulp from 'gulp';
import config from '../config';

gulp.task('watch', ['browserSync'], () => {
	global.isWatching = true;

	//Scripts are automatically watched and rebundled by Watchify inside Browserify task
	gulp.watch(config.scripts.src, ['lint']);
	gulp.watch(config.styles.src, ['styles']);
	gulp.watch(config.images.src, ['images']);
	gulp.watch(config.fonts.src, ['fonts']);
	gulp.watch(config.views.src, ['views.inject', 'styles']);
});
