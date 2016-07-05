'use strict';

var gulp= require('gulp'),
    browserSync= require('browser-sync').create(),
    reload= browserSync.reload,
    rename= require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),<% if(includeSass){ %>
    sass= require('gulp-ruby-sass'),<% } %>
    eslint = require('gulp-eslint');
<% if(includeSass){ %>
gulp.task('sass',function(){
  return sass('./asset/styles/*.scss',{ sourcemap: true,style: 'expanded' })
    .on('error',function(err){
      console.log('Error',err.message);
    })
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./asset/styles'))
    .pipe(reload({stream: true}));
});
<% } %>
gulp.task('lint', function () {
  return gulp.src(['./asset/scripts/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
<% if(includeSass){ %>
gulp.task('serve',['sass','lint'],function(){ <% } else { %>
gulp.task('serve',['lint'],function(){ <% } %>
  browserSync.init({
    server: "./"
  });
  gulp.watch('./asset/styles/*.scss', ['sass']);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./asset/scripts/**/*.js").on('change', reload);
});