var
  gulp = require('gulp'),
  pug = require('gulp-pug'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  yaml = require('yamljs'),
  lodash = require('lodash'),
  fs = require('fs-extra'),
  webpack = require('webpack-stream');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./www/static/css'))
    .pipe(reload({stream: true}));
});

gulp.task('build', function() {
  var buildDirName = 'build';
  var sourceDirName = 'www';
  if (fs.ensureDirSync(buildDirName)) {
    fs.removeSync(buildDirName);
    fs.mkdirSync(buildDirName);
  }
  [
    'css',
    'js',
    'en',
    'ru',
    'ua',
    'images',
    'index.html',
    'CNAME'
  ].forEach((item) => {
    fs.copySync(
      sourceDirName + '/' + item,
      buildDirName + '/' + item
    );
  });
});

gulp.task('pug', function() {
  var data = {
    lng: 'en',
    section: {},
    component: {}
  };
  data.component.header = yaml.load('./yaml/component/header.yaml');
  data.component.footer = yaml.load('./yaml/component/footer.yaml');
  data.section.hero = yaml.load('./yaml/section/hero.yaml');
  data.section.aboutMe = yaml.load('./yaml/section/about-me.yaml');
  data.section.blog = yaml.load('./yaml/section/blog.yaml');
  data.section.resume = yaml.load('./yaml/section/resume.yaml');
  data.section.services = yaml.load('./yaml/section/services.yaml');
  data.section.contact = yaml.load('./yaml/section/contact.yaml');
  function compile(data, lng) {
    let locals = lodash.cloneDeep(data);
    locals.lng = lng;
    return gulp.src('./pug/index.pug')
      .pipe(pug({
        pretty: true,
        locals: locals
      }))
      .pipe(gulp.dest('./www/' + lng))
      .pipe(reload({stream: true}));
  }
  compile(data, 'en');
  compile(data, 'ru');
  compile(data, 'ua');
});

gulp.task('js', function() {
  return gulp.src('src/entry.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('www/static'))
    .pipe(reload({stream: true}));
});


gulp.task('compile_vendor', function () {
  gulp.src([
    './www/node_modules/hammerjs/hammer.js',
    './www/node_modules/jquery/dist/jquery.min.js',
    './www/node_modules/materialize-css/dist/js/materialize.min.js'
   ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/static/js/'));
});

gulp.task('build-server', function () {
  browserSync({
    server: {
      baseDir: 'build/'
    }
  });
});

gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'www/'
    }
  });
  gulp.watch('./sass/**/*.sass', ['sass']);
  gulp.watch('./pug/**/*.pug', ['pug']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./yaml/**/*.yaml', ['js', 'pug']);
});

gulp.task('default', [ 'sass', 'pug', 'js' ]);