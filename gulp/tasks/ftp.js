import { configFTP } from '../config/ftp.js'
import vinylFTP from 'vinyl-ftp'
import util from 'gulp-util'

export const ftp = () => {
  configFTP.log = util.log
  const ftpConnect = vinylFTP.create(configFTP)

  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(                                             // error notification
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error <%= error.message %>'
      }))
    )                                               
    .pipe(ftpConnect.dest(`sda1/${app.path.ftp}/${app.path.rootFolder}`))  // put images to folder
} 