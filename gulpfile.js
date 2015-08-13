var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

gulp.task('default', function() {
	return gulp.src("./preparetransition.js")
		.pipe(uglify())
		.pipe(rename("preparetransition.min.js"))
		.pipe(gulp.dest('./'))
});