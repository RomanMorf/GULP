import gulp from 'gulp'

import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

// tasks
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { js } from './gulp/tasks/js.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
import { svgSprive } from './gulp/tasks/svgSprive.js'
import { zip } from './gulp/tasks/zip.js'
import { ftp } from './gulp/tasks/ftp.js'

global.app = {                                                                  // create global 'app'
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

function watcher() {                                                            // watch for changes in files
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)
const mainTasks = gulp.parallel(copy, html, scss, js, images)                    // paralel - do tasks paralel

const dev = gulp.series(reset, fonts, mainTasks, gulp.parallel(watcher, server)) // series - do tasks one after another
const build = gulp.series(reset, fonts, mainTasks)
const deployZip = gulp.series(reset, fonts, mainTasks, zip)
const deployFTP = gulp.series(reset, fonts, mainTasks, ftp)

export { svgSprive }
export { dev }
export { build }
export { deployZip }
export { deployFTP }

// default task
gulp.task('default', dev)
