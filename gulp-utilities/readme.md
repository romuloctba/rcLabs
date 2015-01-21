### Gulp Utilities

Ferramentas para [GulpJS](http://gulpjs.com)

Lista de repos:

- [connect-multi](https://www.npmjs.com/package/gulp-connect-multi) Server, livereload
  
  ex:
  ```javascript
  gulp.task('serve', connect.server({
  root: ['build'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'chrome' // if not working OS X browser: 'Google Chrome'
  }
}));```


- [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) Pega arquivos .styl e compila em .css para a /build

  ex:
  ```javascript
	gulp.task('stylus',function(){
  gulp.src('./src/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});
  ```

- [main-bower-files](https://www.npmjs.com/package/main-bower-files) pega os arquivos principais do pacote bower. Exige override caso os principais não funcionem automaticamente. Neste caso, recomendo usar a pasta /lib

  ex:
  ```javascript
	gulp.task('bower', function(){
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('./build/lib/base'))
    .pipe(connect.reload());
})```