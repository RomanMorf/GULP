import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'

export const images = () => {
  return app.gulp.src(app.path.src.images, { sourcemaps: true })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'JS',
        message: 'Error <%= error.message %>'
      }))
    )                                               // error notification
    .pipe(app.plugins.newer(app.path.build.images)) // check for update images
    .pipe(app.plugins.if(
      app.isBuild,
      webp()
    ))
    .pipe(app.plugins.if(                           // put images to folder
      app.isBuild,
      app.gulp.dest(app.path.build.images)
    ))     
    .pipe(app.plugins.if(                           // get images on path
      app.isBuild,
      app.gulp.src(app.path.src.images)
    ))        
    .pipe(app.plugins.if(                           // check for update images
      app.isBuild,
      app.plugins.newer(app.path.build.images)
    )) 
    .pipe(app.plugins.if(
      app.isBuild,
      imagemin({
      progressive: true,
      svgPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    })))                                            // optimize images
    .pipe(app.gulp.dest(app.path.build.images))     // put images to folder
    .pipe(app.gulp.src(app.path.src.svg))           // get only svg on path
    .pipe(app.gulp.dest(app.path.build.images))     // put images to folder
    .pipe(app.plugins.browsersync.stream())         // refresh browser on change
}
