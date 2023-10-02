// import path from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'url';

import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import gulp from 'gulp'; // Подключаем Gulp
import gulpIf from 'gulp-if';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';

import * as dartsass from 'sass';
import gulpsass from 'gulp-sass';

import gulpPostCss from 'gulp-postcss';
import sortMediaQueries from 'postcss-sort-media-queries';

import smartgrid from 'smart-grid';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import mincss from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';

import concat from 'gulp-concat';
import plumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include'; // Для подключения файлов друг в друга
import { deleteAsync } from 'del';

import beautify from 'gulp-beautify';

const sass = gulpsass(dartsass);

const styleLibCollection = [
  'node_modules/normalize.css/normalize.css',
  'node_modules/animate.css/animate.css',
];

// Глобальные переменные с проверкой режима разработки:
const isBuild = process.argv.includes('--build'); //  -> Проверяем режим продакшена
const isDev = !process.argv.includes('--build'); //   -> Проверяем режим разработки

// Таск для компиляции SCSS в CSS
const styles = () => {
  return (
    gulp
      .src('./src/styles/main.scss')
      .pipe(gulpIf(isDev, sourcemaps.init({ largeFile: true })))
      .pipe(
        plumber({
          errorHandler: notify.onError(function (err) {
            return {
              title: 'Styles',
              sound: false,
              message: err.message,
            };
          }),
        }),
      )
      .pipe(sass.sync().on('error', sass.logError))
      // Группировка медиа-запросов
      .pipe(
        gulpPostCss([
          sortMediaQueries({
            sort: 'desktop-first',
          }),
        ]),
      )
      .pipe(
        autoprefixer({
          cascade: true,
          grid: true,
          overrideBrowserslist: ['last 6 versions'],
        }),
      )
      .pipe(
        gulpIf(
          isBuild,
          mincss({
            compatibility: 'ie8',
            level: {
              1: {
                specialComments: 0,
                removeEmpty: true,
                removeWhitespace: true,
              },
              2: {
                mergeMedia: true,
                removeEmpty: true,
                removeDuplicateFontRules: true,
                removeDuplicateMediaBlocks: true,
                removeDuplicateRules: true,
                removeUnusedAtRules: false,
              },
            },
          }),
        ),
      )
      .pipe(plumber.stop())
      .pipe(gulpIf(isDev, sourcemaps.write('./sourcemaps/')))
      .pipe(gulp.dest('./build/styles/'))
      .pipe(browserSync.stream())
  );
};

// настройки сетки smart-grid
const smartGrid = () => {
  smartgrid('src/scss/stylesheets/', {
    outputStyle: 'scss',
    filename: '_smart-grid',
    columns: 12, // number of grid columns
    offset: '1.25rem', // gutter width - 20px
    mobileFirst: false,
    mixinNames: {
      container: 'container',
    },
    container: {
      maxWidth: '1320px',
      fields: '0.625rem', // side fields - 15px
    },
    breakPoints: {
      xs: {
        width: '20rem', // 320px
      },
      sm: {
        width: '36rem', // 576px
      },
      md: {
        width: '48rem', // 768px
      },
      lg: {
        width: '62rem', // 992px
      },
      xl: {
        width: '75rem', // 1200px
      },
    },
  });
};

// Таск для сборки HTML и шаблонов
const htmlRender = () => {
  return gulp
    .src('./src/html/*.html')
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'HTML include',
            sound: false,
            message: err.message,
          };
        }),
      }),
    )
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: path.resolve(__dirname, './src/html/'),
        context: {
          titleMode: false, // -> по умолчанию нет заголовка
          descriptionMode: false, // -> по умолчанию нет описания
          hiddenBlock: false, // -> по умолчанию нет скрываемого блока
          imageMode: false, // -> по умолчанию нет изображения
          onlyTitle: false, // -> режим только заголовка по умолчанию откл.
          elementName: 'article',
        },
      }),
    )
    .pipe(
      beautify.html({
        indent_size: 2,
        preserve_newlines: false,
      }),
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({ stream: true }));
};

const scripts = () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'Js script',
            sound: false,
            message: err.message,
          };
        }),
      }),
    )
    .pipe(plumber.stop())
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.reload({ stream: true }));
};

// объединям все css библиотеки в одну
const cssLibConcat = () => {
  return gulp
    .src(styleLibCollection)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('./build/styles/'))
    .pipe(browserSync.reload({ stream: true }));
};

// Асинхронная фун-ия для копирование файлов
const copyFiles = async () => {
  // создаём массив Map, в котором храним:
  // value -> это путь до дир-ии (build) в которую закидываем файлы
  // key -> это пути до файлов, которые нужно закинуть в дир-ию build
  const filesCollection = await new Map([
    ['./src/fonts/**/*.*', './build/fonts/'],
    ['./src/img/**/*.*', './build/img/'],
  ]);

  // Перебираем массив Map, вытаскиваем пары: value, key - далее записываем значения в переменные,
  // и подставляем это всё ниже в return
  await filesCollection.forEach((value, key) => {
    // console.log(`Папка для копирования: ${value}: \nПапка с исходниками: ${key}`);
    let fileSrcPath = key; // -> fileSrcPath присваивает значение key
    let fileBuildPath = value; // -> fileBuildPath присваивает значение value

    return gulp.src(`${fileSrcPath}`).pipe(gulp.dest(`${fileBuildPath}`));
  });
};

// следим за файлами
function watcher() {
  gulp.watch('./src/html/**/*.html', htmlRender);
  gulp.watch('./src/html/data/*.json', gulp.parallel(htmlRender)).on('change', browserSync.reload);
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/img/**/*.*');
}

// Задача для старта сервера из папки app
const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
    notify: false,
    port: 8008,
  });
};

// Уничтожение файлов в папке build/
const prodFldrClean = () => {
  return deleteAsync('./build');
};

// Теперь используем два режима разработки
const tasksCollection = gulp.parallel(copyFiles, htmlRender, cssLibConcat, styles, scripts);

const dev = gulp.series(prodFldrClean, tasksCollection, gulp.parallel(watcher, server));
const build = gulp.series(prodFldrClean, tasksCollection);

// Экспорт сценариев:
export { dev };
export { build };

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task('default', dev);
