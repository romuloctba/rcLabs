var bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    gulp = require('gulp'),
    series = require('stream-series'),
    connect = require('gulp-connect-multi')();


gulp.task('bower', function(){
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('./build/lib/base'))
    .pipe(connect.reload());
})
gulp.task('lib', function(){
	return gulp.src('./src/lib/**/*.*', { base: './src/'})
	.pipe(gulp.dest('./build'))
})
gulp.task('stylus',function(){
  gulp.src('./src/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});
gulp.task('js',function(){
  gulp.src('./src/js/**.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});
gulp.task('inject',['lib', 'stylus', 'js'], function(){
  
  var bowerz = gulp.src('./build/lib/base/**');
  var libCss = gulp.src('./build/lib/**.css');
  var libJs = gulp.src('./build/lib/**.js');
  var customCSS = gulp.src('./build/css/**.css');
  var customJs = gulp.src('./build/js/**.js');
  var sources = series(libCss, libJs, customCSS, customJs)

  gulp.src('./src/**.html')
  	.pipe(inject(bowerz, { relative: true, ignorePath: '../build', starttag: '<!-- bower:{{ext}} -->'  }))
    .pipe(inject(sources, { relative: true, ignorePath: '../build/' }))
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
})
gulp.task('serve', connect.server({
  root: ['build'],
  port: 1337,
  livereload: true,
  open: {
    browser: 'chrome' //OS X browser: 'Google Chrome'
  }
}));
gulp.task('watch', function () {
  gulp.watch(['./src/**.html'], ['inject']);
  gulp.watch(['./src/js/**.js'], ['js']);
  gulp.watch([bowerFiles()], ['bower','js']);
  gulp.watch(['./src/stylus/**.styl'], ['stylus']);
});
gulp.task('default', ['inject', 'serve', 'watch']);