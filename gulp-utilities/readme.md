### Gulp Utilities

Ferramentas para [GulpJS](http://gulpjs.com)

Lista de repos:

- [connect-multi](https://www.npmjs.com/package/gulp-connect-multi) Server, livereload
  ex: ```
  gulp.task('serve', connect.server({
  root: ['build'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'chrome' // if not working OS X browser: 'Google Chrome'
  }
}));```

- [gulp-stylus](https://www.npmjs.com/package/gulp-stylus)