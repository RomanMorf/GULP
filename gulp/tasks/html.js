import fileinclude from "gulp-file-include"
import webpHtmlNosvg from "gulp-webp-html-nosvg"
import versionNUmber from "gulp-version-number"

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(                    // error notification
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error <%= error.message %>'
      })
    )) 
    .pipe(fileinclude())                          // merge files
    .pipe(app.plugins.replace(/@img\//g, 'img/')) // replace path
    .pipe(app.plugins.if(                         // for webp images
      app.isBuild, 
      webpHtmlNosvg()
    )) 
    .pipe(app.plugins.if(                         // add version for files
      app.isBuild, 
      versionNUmber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [
            'css',
            'js',
          ],
        },
        'output': {
          'file': 'gulp/vervion.json'
        },
      }))
    ) 
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream())       // for realtime page update
}