var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');
gulp.task('html', function () {
	gulp.src('./src/index.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist'));
});
gulp.task('css', function () {
	gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/css'));
});
gulp.task('js', function () {
	gulp.src('./src/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('./dist/js'));
})
gulp.task('watch', function () {
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/css/*.less', ['css']);
	gulp.watch('./src/js/*.js', ['js']);
});
gulp.task('server', function () {
	connect.server({
		port: 8090,
		livereload: true
	});
});
gulp.task('default', ['html', 'css', 'watch', 'server', 'js']);
