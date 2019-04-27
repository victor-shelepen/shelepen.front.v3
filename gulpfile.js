const
  { src, dest, parallel, watch } = require('gulp');
  fs = require('fs-extra'),
  pug = require('gulp-pug'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-sass'),
  yaml = require('yamljs'),
  lodash = require('lodash'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  merge = require('merge-stream'),
  webpack = require('webpack-stream');

function sassTask() {
  return src('sass/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('./www/static/css'));
}

function buildTask() {
  const buildDirName = 'build';
  const sourceDirName = 'www';
  if (fs.ensureDirSync(buildDirName)) {
    fs.removeSync(buildDirName);
    fs.mkdirSync(buildDirName);
    fs.mkdirSync(buildDirName + '/static');
  }
  [
    'static/css',
    'static/js',
    'en',
    'ru',
    'ua',
    'static/images',
    'index.html',
    'CNAME'
  ].forEach((item) => {
    fs.copySync(
      sourceDirName + '/' + item,
      buildDirName + '/' + item
    );
  });

  return Promise.resolve();
}

function pugTask() {
  const data = {
    lng: 'en',
    section: {},
    component: {}
  };
  data.component.header = yaml.load('./yaml/component/header.yaml');
  data.component.footer = yaml.load('./yaml/component/footer.yaml');
  data.section.hero = yaml.load('./yaml/section/hero.yaml');
  data.section.aboutMe = yaml.load('./yaml/section/about-me.yaml');
  data.section.blog = yaml.load('./yaml/section/blog.yaml');
  data.section.portfolio = yaml.load('./yaml/section/portfolio.yaml');
  data.section.resume = yaml.load('./yaml/section/resume.yaml');
  data.section.services = yaml.load('./yaml/section/services.yaml');
  data.section.contact = yaml.load('./yaml/section/contact.yaml');

  function compile(data, lng) {
    const locals = lodash.cloneDeep(data);
    locals.lng = lng;
    return src('./pug/index.pug')
      .pipe(pug({
        pretty: true,
        locals: locals
      }))
      .pipe(dest('./www/' + lng));
  }

  return merge(
    compile(data, 'en'),
    compile(data, 'ru'),
    compile(data, 'ua')
  );
}

function jsTask() {
  return src('js/app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(dest('www/static'));
}

function compileVendorTask() {
  return src([
    './www/node_modules/hammerjs/hammer.js',
    './www/node_modules/jquery/dist/jquery.min.js',
    './www/node_modules/materialize-css/dist/js/materialize.min.js'
   ])
    .pipe(concat('vendor.js'))
    .pipe(dest('./www/static/js/'));
}

function buildServerTask() {
  return browserSync({
    server: {
      baseDir: 'build/'
    }
  });
}

function serveTask() {
  browserSync({
    server: {
      baseDir: 'www/'
    }
  });
  watch('./sass/**/*.sass', sassTask)
    .on('change', browserSync.stream);
  watch('./pug/**/*.pug', pugTask)
    .on('change', browserSync.stream);
  watch('./js/**/*.js', jsTask)
    .on('change', browserSync.stream);
  watch('./yaml/**/*.yaml', parallel(pugTask, jsTask))
    .on('change', browserSync.stream);
}

const defaultTask = parallel(sassTask, pugTask, jsTask, compileVendorTask);

exports.sass = sassTask;
exports.pug = pugTask;
exports.js = jsTask;
exports.compileVendor = compileVendorTask;
exports.build = buildTask;
exports.buildServer = buildServerTask;
exports.serve = serveTask;
exports.default = defaultTask;