var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	header = require('gulp-header'),
	pkg = require('./package.json');

gulp.task('default', function() {
	return gulp.src("./preparetransition.js")
		.pipe(uglify())
		.pipe(rename("preparetransition.min.js"))
		.pipe(header("/* "+pkg.header+" */\n"))
		.pipe(gulp.dest('./'))
});
