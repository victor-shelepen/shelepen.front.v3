var
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  webpack = require('webpack-stream');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'))
    .pipe(reload({stream: true}));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./jade/index.jade')
    .pipe(jade({
      pretty: true,
      locals: {
        greeting: 'Hi'
      }
    }))
    .pipe(gulp.dest('./www'))
    .pipe(reload({stream: true}));
});

gulp.task('js', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('www/'));
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'www/'
    }
  });
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./jade/**/*.jade', ['jade']);
  gulp.watch('./js/**/*.js', ['js']);
});
