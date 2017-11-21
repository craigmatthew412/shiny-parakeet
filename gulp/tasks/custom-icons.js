'use strict';

import gulp from 'gulp';
import shell from 'gulp-shell';

gulp.task('custom-icons', shell.task([
	'fontcustom compile'
]));
