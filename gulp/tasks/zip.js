import del from 'del'
import zipPlugin from 'gulp-zip'

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`)               // delete old archive
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(                      // error notification
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error <%= error.message %>'
      }))
    )
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))  // create zip folder
    .pipe(app.gulp.dest('./'))                      // put to folder
}