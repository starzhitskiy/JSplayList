'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function buildStyles() {
	return gulp.src('./scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
}

gulp.task('styles', buildStyles);

//Production
function buildProdStyles() {
	return gulp.src('./scss/style.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
}

gulp.task('styles-prod', buildProdStyles);


function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('./scss/**/*', buildStyles);
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("./js/**/*.js").on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task(
	'default',
	gulp.series(
		gulp.parallel(buildStyles),
		watch
	)
);