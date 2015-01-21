### Gulp Utilities

Ferramentas para [GulpJS](http://gulpjs.com)

Lista de repos:

- [connect-multi](https://www.npmjs.com/package/gulp-connect-multi) Server, livereload
  
  ```javascript
  gulp.task('serve', connect.server({
  root: ['build'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'chrome' // if not working OS X browser: 'Google Chrome'
  }
}));
```


- [gulp-stylus](https://www.npmjs.com/package/gulp-stylus) Pega arquivos .styl e compila em .css para a /build

  ```javascript
	gulp.task('stylus',function(){
  gulp.src('./src/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});
  ```

- [main-bower-files](https://www.npmjs.com/package/main-bower-files) pega os arquivos principais do pacote bower. Exige override caso os principais não funcionem automaticamente. Neste caso, recomendo usar a pasta /lib

  ```javascript
	gulp.task('bower', function(){
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('./build/lib/bowerfiles'))
    .pipe(connect.reload());
})```

- [gulp-inject](https://www.npmjs.com/package/gulp-inject) + [stream-series](https://www.npmjs.com/package/stream-series) Inject injeta em arquivos .html. Stream-series concatena as streams (gulp.src()'s') para serem injetadas.

```javascript
gulp.task('inject',['lib','bower', 'stylus', 'js'], function(){
  var libCss = gulp.src('./build/lib/**.css');
  var baseJs = gulp.src('./build/lib/bowerfiles/**.js', {name: 'bower'});
  var libJs = gulp.src('./build/lib/**.js');
  var customCSS = gulp.src('./build/css/**.css');
  var customJs = gulp.src('./build/js/**.js');
  
  var sources = series(libCss, baseJs, libJs, customCSS, customJs)
  gulp.src('./src/**.html')
    .pipe(inject(sources, { relative: true, ignorePath: '../build/' }))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());

})
```