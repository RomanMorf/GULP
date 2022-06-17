import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

import cleanCss from 'gulp-clean-css'        // compress css file
import webpcss from 'gulp-webpcss'           // webp images
import autoPrefixer from 'gulp-autoprefixer' // crossbrouser prefixes
import groupCssMediaQueries from 'gulp-group-css-media-queries'


const sass = gulpSass(dartSass)

export const scss = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(                        // error notification
      app.plugins.notify.onError({
        title: 'SCSS',
        message: 'Error <%= error.message %>'
      })
    )) 
    .pipe(app.plugins.replace(/@img\//g, '../img/'))  // replace path
    .pipe(sass({                                      // compiling css file
      outputStyle: 'expanded'
    })) 
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      )
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserlist: ["last 3 version"],
          cascade: true
        })
      )
    )
    .pipe(
        app.plugins.if(
          app.isBuild,
          webpcss({
          webpClass: '.webp',
          noWebpClass: '.no-webp'
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))        // uncomment if you need nocompressed file
    .pipe(cleanCss())
    .pipe(rename({                                  // change name for file
      extname: ".min.css"
    })) 
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream())
}