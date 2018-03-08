var
  gulp = require('gulp'),
  jade = require('gulp-jade'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  yaml = require('yamljs'),
  lodash = require('lodash'),
  webpack = require('webpack-stream');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/css'))
    .pipe(reload({stream: true}));
});

gulp.task('jade', function() {
  var data = {
    lng: 'en',
    section: {},
    component: {}
  };
  data.component.header = yaml.load('./yaml/component/header.yaml');
  data.component.footer = yaml.load('./yaml/component/footer.yaml');
  data.section.hero = yaml.load('./yaml/section/hero.yaml');
  data.section.aboutMe = yaml.load('./yaml/section/about-me.yaml');
  data.section.resume = yaml.load('./yaml/section/resume.yaml');
  data.section.services = yaml.load('./yaml/section/services.yaml');
  data.section.contact = yaml.load('./yaml/section/contact.yaml');
  function compile(data, lng) {
    let locals = lodash.cloneDeep(data);
    locals.lng = lng;
    return gulp.src('./jade/index.jade')
      .pipe(jade({
        pretty: true,
        locals: locals
      }))
      .pipe(gulp.dest('./www/' + lng))
      .pipe(reload({stream: true}));
  }
  compile(data, 'en');
  compile(data, 'ru');
});

gulp.task('js', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('www/'))
    .pipe(reload({stream: true}));
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
  gulp.watch('./yaml/**/*.yaml', ['js', 'jade']);
});

gulp.task('default', [ 'sass', 'jade', 'js' ]);