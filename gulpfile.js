var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	mocha = require('gulp-mocha');

var paths = {
	scripts: './app/*',
	tests: './test/*'
};

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('js', function() {
	gulp.src(paths.scripts + '.js')
		.pipe(uglify())
		.pipe(concat('chainable-api.min.js'))
		.pipe(gulp.dest('./app'));
});

gulp.task("test", function() {
	return gulp.src(paths.tests)
		.pipe(mocha({
				reporter: "spec"
			})
			.on("error", handleError));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['js']);
	gulp.watch([paths.scripts, paths.tests], ["test"]);
});

gulp.task('default', ['watch']);