const gulp = require('gulp'); // Подключаем Gulp
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const qcmq = require('gulp-group-css-media-queries');
const smartgrid = require('smart-grid');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include'); // Для подключения файлов друг в друга
const del = require('del');

// Таск для компиляции SCSS в CSS
gulp.task('scss', function(callback) {
	return gulp.src('src/scss/**/*.scss')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'Styles',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( sourcemaps.init() )
		.pipe( sass() )
		.pipe( autoprefixer({
			overrideBrowserslist: ['last 4 versions']
		}) )
		.pipe(qcmq()) //группировка медиа запросов
		.pipe(cssnano()) //минификация css
		.pipe(rename({suffix: '.min'}))
		.pipe( sourcemaps.write('./maps/') )
		.pipe( gulp.dest('./build/css/') )
		.pipe( browserSync.stream() )
	callback();
});

// настройки сетки smart-grid
gulp.task('smart-grid', (cb) => {
  smartgrid('src/scss/stylesheets/', {
    outputStyle: 'scss',
    filename: '_smart-grid',
    columns: 12, // number of grid columns
    offset: '1.875rem', // gutter width - 30px
    mobileFirst: false,
    mixinNames: {
        container: 'container'
    },
    container: {
      maxWidth: '1170px',
      fields: '0.9375rem' // side fields - 15px
    },
    breakPoints: {
      xs: {
          width: '20rem' // 320px
      },
      sm: {
          width: '36rem' // 576px
      },
      md: {
          width: '48rem' // 768px
      },
      lg: {
          width: '62rem' // 992px
      },
      xl: {
          width: '75rem' // 1200px
      }
    }
  });
  cb();
});

// Таск для сборки HTML и шаблонов
gulp.task('html', function(callback) {
	return gulp.src('./src/html/*.html')
		.pipe( plumber({
			errorHandler: notify.onError(function(err){
				return {
					title: 'HTML include',
			        sound: false,
			        message: err.message
				}
			})
		}))
		.pipe( fileinclude({ prefix: '@@' }) )
		.pipe( gulp.dest('./build/') )
		.pipe(browserSync.reload({ stream: true }))
	callback();
});

// объединям все css библиотеки в одну
gulp.task('css-lib', function() {
  return gulp.src([
      'node_modules/normalize.css/normalize.css',
    ])
    .pipe(concat('libs.css'))
    .pipe(cssnano()) // минификация
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./build/css/libs'))
    .pipe(browserSync.reload({stream: true}));
});

// Копирование Изображений
gulp.task('copy:img', function(callback) {
	return gulp.src('./src/img/**/*.*')
	  .pipe(gulp.dest('./build/img/'))
	callback();
});

// Копирование шрифтов
gulp.task('copy:fonts', function(callback) {
	return gulp.src('./src/fonts/**/*.*')
	  .pipe(gulp.dest('./build/fonts/'))
	callback();
});

// Копирование Скриптов
gulp.task('copy:js', function(callback) {
	return gulp.src('./src/js/**/*.*')
	  .pipe(gulp.dest('./build/js/'))
	callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task('watch', function() {
// Слежение за HTML и обновление браузера
	watch(['./src/*.html'],
		gulp.parallel( browserSync.reload ));

	// Следим за картинками и скриптами и обновляем браузер
	watch( ['./build/js/**/*.*', './build/img/**/*.*', './build/fonts/**/*.*'], gulp.parallel(browserSync.reload) );

	// Запуск слежения и компиляции SCSS с задержкой
	watch('./src/scss/**/*.scss', function(){
		setTimeout( gulp.parallel('scss'), 500 )
	})

	// Слежение за HTML и сборка страниц и шаблонов
	watch('./src/html/**/*.html', gulp.parallel('html'))

	// Следим за картинками и скриптами, и копируем их в build
	watch('./src/img/**/*.*', gulp.parallel('copy:img'))
	watch('./src/fonts/**/*.*', gulp.parallel('copy:fonts'))
	watch('./src/js/**/*.*', gulp.parallel('copy:js'))

});

// Задача для старта сервера из папки app
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		},
		notify: false
	})
});

gulp.task('clean:build', function() {
	return del('./build')
});

// Дефолтный таск (задача по умолчанию)
// Запускаем одновременно задачи server и watch
gulp.task(
		'default',
		gulp.series(
			gulp.parallel('clean:build'),
			gulp.parallel('scss', 'html', 'css-lib', 'copy:img', 'copy:fonts', 'copy:js'),
			gulp.parallel('server', 'watch'),
			)
	);
