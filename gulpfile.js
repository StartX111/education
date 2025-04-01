const gulp = require('gulp');
const sass = require('gulp-dart-sass'); // Заменяем gulp-sass на gulp-dart-sass
const browserSync = require('browser-sync').create();
const del = require('del');

// Задача для запуска BrowserSync
function browserSyncTask() {
    browserSync.init({
        server: {
            baseDir: 'app', // Указываем корневую папку для сервера
        },
        notify: false, // Отключаем всплывающие уведомления
    });
}

// Задача для компиляции SASS
function sassTask() {
    return gulp
      .src('app/sass/**/*.sass') // Путь к исходным SASS-файлам
      .pipe(sass().on('error', sass.logError)) // Обрабатываем ошибки
      .pipe(gulp.dest('app/css')) // Куда сохранять скомпилированный CSS
      .pipe(browserSync.stream()); // Перезагружаем браузер
}

// Задача для очистки
function cleanTask() {
    return del('dist/**/*'); // Удаляем все файлы в папке dist
}

// Задача наблюдения за файлами
function watchTask() {
    gulp.watch('app/sass/**/*.sass', sassTask); // Следим за SASS-файлами
    gulp.watch('app/**/*.html').on('change', browserSync.reload); // Следим за HTML
    gulp.watch('app/css/**/*.css').on('change', browserSync.reload); // Следим за CSS
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload); // Следим за JS
}

// Задача сборки проекта
function buildTask() {
    // Копируем CSS
    gulp.src('app/css/**/*')
      .pipe(gulp.dest('dist/css'));

    // Копируем lib
    gulp.src('app/lib/**/*')
      .pipe(gulp.dest('dist/lib'));

    // Копируем properties
    gulp.src('app/properties/**/*')
      .pipe(gulp.dest('dist/properties'));

    // Копируем изображения
    gulp.src('app/img/**/*')
      .pipe(gulp.dest('dist/img'));

    // Копируем шрифты
    gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));

    // Копируем JS
    gulp.src('app/js/**/*')
      .pipe(gulp.dest('dist/js'));

    // Копируем HTML
    gulp.src('app/**/*.html')
      .pipe(gulp.dest('dist'));
}

// Определяем задачи
exports.browserSync = browserSyncTask;
exports.sass = sassTask;
exports.clean = cleanTask;
exports.watch = gulp.series(sassTask, gulp.parallel(browserSyncTask, watchTask)); // Сначала компиляция, потом наблюдение
exports.default = exports.watch;

// Задача build выполняет очистку, компиляцию и копирование
exports.build = gulp.series(cleanTask, sassTask, buildTask);