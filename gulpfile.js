const project_folder = require('path').basename(__dirname)
const source_folder = '#src'
const PORT = 3000

// Paths
const path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/*.ttf',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
  },
  clean: './' + project_folder + '/',
}

// Plugin imports
const { src, dest, series, parallel, watch } = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileInclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglifyes = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webphtml = require('gulp-webp-html')

const browserSync = () => {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/',
    },
    port: PORT,
    notify: false,
  })
}

const html = () =>
  src(path.src.html)
    .pipe(fileInclude())
    .pipe(webphtml())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())

const clean = () => del(path.clean)

const css = () =>
  src(path.src.css)
    .pipe(
      scss({
        outputStyle: 'expanded',
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      })
    )
    // Uploading a file (not compressed)
    .pipe(dest(path.build.css))
    // Compress and upload the second css (already compressed)
    .pipe(clean_css())
    .pipe(
      rename({
        extname: '.min.css',
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())

const js = () =>
  src(path.src.js)
    .pipe(fileInclude())
    .pipe(dest(path.build.js))
    .pipe(
      uglifyes({
        sourceMap: {
          filename: 'script.js',
        },
      })
    )
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())

const images = () =>
  src(path.src.img)
    .pipe(
      webp({
        quality: 70,
      })
    )
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3, // from 0 to 7
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())

const watchFiles = () => {
  watch([path.watch.html], html)
  watch([path.watch.css], css)
  watch([path.watch.js], js)
  watch([path.watch.img], images)
}

const build = series(clean, parallel(js, css, html, images))
const watchMyFiles = parallel(build, watchFiles, browserSync)

exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watchMyFiles = watchMyFiles
exports.default = watchMyFiles
