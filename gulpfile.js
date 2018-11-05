let gulp =          require('gulp');
let sass =          require('gulp-sass');
let browserSync =   require('browser-sync');
let del =           require('del');

gulp.task('browserSync', function(){
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    })
});

gulp.task('sass', function(){
    del.sync('app/css/sass-style.css');
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['browserSync', 'sass'], function(){
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch'], function(){});

gulp.task('clean', function(){
   return del.sync('dist/**/*');
});

gulp.task('build', ['clean', 'sass'], function(){
    let buildCss = gulp.src([
        'app/css/**/*'
    ])
        .pipe(gulp.dest('dist/css'));

    let buildlib = gulp.src('app/lib/**/*')
        .pipe(gulp.dest('dist/lib'));

    let buildProperties = gulp.src('app/properties/**/*')
        .pipe(gulp.dest('dist/properties'));

    let buildImg = gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));

      let buildfonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    let buildJs = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

});