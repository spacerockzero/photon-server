const gulp = require('gulp');
const uglify = require('gulp-uglify');

const jsFiles = [
  './node_modules/usertiming-compression/src/usertiming-compression.js',
  './node_modules/resourcetiming-compression/src/resourcetiming-compression.js',
  './node_modules/lz-string/libs/lz-string.min.js'
];

gulp.task('js', () => {
  return gulp.src(jsFiles)
    .pipe(uglify())
    .pipe(gulp.dest('./public/test'))
});

gulp.task('watch', ['js'], () => {
  gulp.watch(jsFiles, ['js'], (e) => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
})

gulp.task('build', ['js']);
