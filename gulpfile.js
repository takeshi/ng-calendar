var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var sass = require('gulp-sass');
var gulpRemoveHtml = require('gulp-remove-html');
var rimraf = require('rimraf');

gulp.task('build-prod', ['clean'], function () {
    return gulp.src('public/index.html')
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build'], function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('build', ['build-prod', 'copy', 'sass'], function () {
    return gulp.src('app/client/app.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', ['clean'], function () {
    return gulp.src('./app/client/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/build/client'));
});

gulp.task('copy', ['clean'], function () {
    return gulp.src(
        [
            'node_modules/**/font-awesome.css',
            'node_modules/font-awesome/fonts/**',
            'node_modules/**/dist/zone.js',
            'node_modules/**/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
        ],
        { base: 'node_modules' }
    )
        .pipe(gulp.dest('dist/node_modules'));
});

gulp.task('clean', (done) => {
    rimraf('./dist', done);
});