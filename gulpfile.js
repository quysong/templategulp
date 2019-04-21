var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer   = require('gulp-autoprefixer');

var AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(concat('styles.scss'))
        .pipe(gulp.dest('scss/merged'))        
        .pipe(sass())
        .pipe(rename('styles.min.css'))
        .pipe(cssmin())
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS,
            cascade: false
        }))
        .pipe(gulp.dest('html/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('html/js/parts/*.js')
        .pipe(concat('main.js'))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('html/js/merged'))
        .pipe(uglify())
        .pipe(gulp.dest('html/js/'));
    
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: 'localhost:8080/testGulp/html/index.html'
    });

    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['html/js/*.js'], browserSync.reload);
    gulp.watch(['html/css/*'], browserSync.reload);    
    gulp.watch(['html/*'], browserSync.reload);
});

var template = require('gulp-template-html');
gulp.task("build-template", function() {
    return gulp.src("./src/pages/*.html")
    .pipe(template("./src/template/_layout.html"))
    .pipe(gulp.dest("./html"));
    });

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch', 'build-template']);