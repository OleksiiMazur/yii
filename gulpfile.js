var gulp = require("gulp");
var livereload = require("gulp-livereload");
var imagemin = require('gulp-imagemin');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task('livereload', function (done) {

    gulp.src('./stylesheet/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./stylesheet/css'))
        .pipe(livereload());
    done();
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('./stylesheet/scss/**/*.scss', gulp.parallel(['livereload']));
});


gulp.task('image', function () {
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]));
});