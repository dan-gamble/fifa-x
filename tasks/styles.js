/*****************************************************************************/
/* Imports */
/*****************************************************************************/
// - Main
import gulp from 'gulp';

// - Gulp modules
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

// - Browser Sync
import browserSync from 'browser-sync';
const reload = browserSync.reload;

// - Project config
import config from './_config';

// - PostCSS
import autoprefixer from 'autoprefixer';
import quantityQueries from 'postcss-quantity-queries';
import willChange from 'postcss-will-change';

export default () => {
  // Browsers we support
  const autoprefixerBrowsers = [
    'last 2 versions'
  ];

  const postCSSProcessors = [
    quantityQueries,
    willChange,
    autoprefixer(autoprefixerBrowsers)
  ];

  return gulp.src(config.sass.src)
    // Only pass through changed files
    // .pipe($.changed(config.css.path, {extension: '.css'}))

    // Initialise source maps
    .pipe($.sourcemaps.init())

    // Process our SCSS to CSS
    .pipe($.sass({
      precision: 10,
      stats: true
    }).on('error', $.sass.logError))

    // PostCSS our vendor prefixes
    .pipe($.postcss(postCSSProcessors))

    // Convert viable px units to REM
    .pipe($.pxtorem())

    // Write our source map, the root is needed for Django funnyness
    .pipe($.sourcemaps.write('../maps', {
      includeContent: false,
      sourceRoot: () => {
        return '../../static'
      }
    }))

    // Place our CSS in the location we link to
    .pipe(gulp.dest(config.css.dist))

    // Stream the changes to Browser Sync
    .pipe(browserSync.stream({match: '**/*.css'}))

    // Spit out the size to the console
    .pipe($.size({title: 'styles'}));
}
