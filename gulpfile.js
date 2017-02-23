var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    // webkits and filters are taken care of, you dont need to code it manually
    prefix = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');
    plumber = require('gulp-plumber');


// COMPILE SASS TASK

//  styles is the name of the task, followed by it's functionality
 gulp.task('styles', function(){
// source file
 gulp.src('./scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
        style: 'expanded'
    }))
    .pipe(prefix('last 2 versions'))
// pipes to destination
    .pipe(gulp.dest('./css'))
// tell browserSync to reload
    .pipe(browserSync.reload({stream: true}));
 });

// BROWSERSYNC TASK

gulp.task('serve', function(){

// initializing browsersync, telling it where to serve from

    browserSync.init({
        server: './',
        online: true
    });

// watch for any changes, every scss file in the scss directory and running the styles task everytime something changes. whenever this runs, browserSync
// will reload all your browser
    gulp.watch('./scss/*.scss', ['styles']);
// upon change of any html will reload browserSync
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// IMAGE TASK (compress and optimize images automatically)

gulp.task('image', function(){
    gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'));
});

// SCRIPTS TASK
//UGLIFY (cuts down file size)
gulp.task('scripts', function(){
    gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./build/minjs'));
});


// WATCH TASK
// WATCHES JS
gulp.task('watch', function(){
    // the comma [] means, when js files change, run this task.
    gulp.watch('./js/*.js', ['scripts']);
});

// RUN TASK! include the tasks that ive created in an order that makes sense. in other words, run this when i run gulp

gulp.task('default', ['serve', 'scripts', 'styles', 'watch']);
