import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error <%= error.message %>'
      }))
    )                                                         // error notification
    .pipe(fonter({formats: ['ttf']}))                         // convert otf to ttf
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))      // put files to folder
}

export const ttfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error <%= error.message %>'
      }))
    )                                                         // error notification
    .pipe(fonter({formats: ['woff']}))                        // convert ttf to woff
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))           // put files to folder
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))  // find ttf files
    .pipe(ttf2woff2())                                        // cpnvert ttf to woff2
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))           // put files to folder
}

export const fontsStyle = () => {
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`

  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly
        for (var i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0]
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            let fontWeigth = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
            if (fontWeigth.toLocaleLowerCase() === 'thin') {
              fontWeigth = 100
            } else if (fontWeigth.toLocaleLowerCase() === 'extralight') {
              fontWeigth = 200
            } else if (fontWeigth.toLocaleLowerCase() === 'light') {
              fontWeigth = 300
            } else if (fontWeigth.toLocaleLowerCase() === 'medium') {
              fontWeigth = 500
            } else if (fontWeigth.toLocaleLowerCase() === 'semobold') {
              fontWeigth = 600
            } else if (fontWeigth.toLocaleLowerCase() === 'bold') {
              fontWeigth = 700
            } else if (fontWeigth.toLocaleLowerCase() === 'extrabold' || fontWeigth.toLocaleLowerCase() === 'heavy') {
              fontWeigth = 800
            } else if (fontWeigth.toLocaleLowerCase() === 'black') {
              fontWeigth = 900
            } else {
              fontWeigth = 400
            }

            fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName}; \n\tfont-display: swap; \n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.ttf") format("ttf"), url("../fonts/${fontFileName}.otf") format("otf"); \n\tfont-weight: ${fontWeigth}; \n\tfont-style: normal;\n}\r\n`, 
              cb
            )

            newFileOnly = fontFileName
          }
        }
      } else {
        console.log('File scss/fonts.scss already exists. For update you shuld delete it');
      }
    }
  })

  return app.gulp.src(`${app.path.srcFolder}`)
  function cb() {  }
}
