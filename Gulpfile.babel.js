/*****************************************************************************/
/* Imports */
/*****************************************************************************/
// - Main
import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';

// - Gulp modules
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

// - Gulp tasks
import images from './tasks/images';
import scripts from './tasks/scripts';
import serve from './tasks/serve';
import styles from './tasks/styles';

// - Browser sync
import browserSync from 'browser-sync';
export const bs = browserSync.create();
const reload = bs.reload;

/*****************************************************************************/
/* Tasks */
/*****************************************************************************/
// - Clean
gulp.task('clean:temp', cb => del('.tmp', cb));

// - Images
gulp.task('images', images);

// - SCSS/CSS Styles
gulp.task('styles', styles);

// - JS Scripts
gulp.task('scripts', scripts);
gulp.task('reloadScripts', ['scripts'], function () {
  reload();
});

// - Browser sync
gulp.task('serve', serve);

// - Default task to use when deving
gulp.task('default', (cb) => {
  return runSequence('styles', 'scripts', 'serve', cb);
});
