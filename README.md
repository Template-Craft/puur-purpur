# gulp-quick-start

# Особенности:
* используется препроцессор [SCSS](https://sass-lang.com/)
* используется CSS-сетка [smart-grid](https://github.com/dmitry-lavrik/smart-grid) на основе Bootstrap для быстрой адаптивной вёрстки
* используется [normalize.css](https://github.com/necolas/normalize.css/)
* используется [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
* используется [gulp-file-includer](https://github.com/haoxins/gulp-file-include) для разделения html на компоненты
* теперь все файлы сразу складываются в папку /builds, все минимизируется и компилируется прям во время верстки.


# Установка
* установите [NodeJS](https://nodejs.org/en/)
* установите сборку с помощью: [Git](https://git-scm.com/downloads): ```git clone https://github.com/Ko2doo/gulp-task-manager.git```
* установите ```gulp``` глобально: ```npm i --global gulp-cli```
* после установке необходимого, перейдите в папку со скачанным проектом
* скачайте необходимые зависимости введя в терминал команду: ```npm i```
* для запуска проекта введите в терминале: ```gulp``` (режим разработки)

! Если всё этапы пройдены верно, должен открыться браузер с запущенным локальным сервером.

# Файловая структура:

```txt
gulp-task-manager
|-- src
|   |-- fonts
|   |-- html
|   |   |-- section
|   |   |-- index.html
|   |
|   |-- img
|   |-- js
|   |-- scss
|       |-- blocks
|       |-- stylesheets
|
|--- .gitignore
|---  gulpfile.js
|---  LICENSE
|---  package-lock.json
|---  package.json
|---  readme.md
```

* Папка ```src``` - используется во время разработки:
    * шрифты: ```src/fonts```
    * JS-файлы: ```src/js```
    * html компоненты сайта: ```src/html/section/```
    * главный файл в котором прописываются вызовы компонентов: ```src/html/index.html```
    * SCSS-файлы: ```src/scss```
* Папка ```build``` - папка, в которую складывается готовый проект (прям по время разработки)

# Команды
* ```gulp``` - запуск сервера для разработки проекта

# Сторонние библиотеки
* все сторонние библиотеки устанавливаются в папку ```node_modules```
    * для их загрузки воспользуйтеcь командой ```npm i package_name```
    * установка (пакеты необходимые для разработки) devDependencies ```npm i package_name --save-dev```
    * установка (пакеты от которых зависит проект) dependencies ```npm i package_name --save```
    * для подключения в проект нужно отредактировать gulpfile.js в тех тасках, в которых подключаются необходимые пакеты, например если это файлы стилей то в таске css-lib в массив подключаемых файлов добавить путь до скачанной библиотеки.

# Немного о CSS-сетке smart-grid
В сборщик включена CSS-сетка [smart-grid](https://github.com/dmitry-lavrik/smart-grid) от [Дмитрия Лаврика](https://dmitrylavrik.ru/). Она позволяет избавиться от
лишних классов в разметке за счёт использования примесей в SCSS и ускоряет адаптивную вёрстку. Конфигурация уже настроена в соответствии с сеткой [Bootstrap](https://getbootstrap.com/). За улучшение сетки спасибо [Алексеевичу](https://github.com/andreyalexeich)

P.S. Полезный ресурс [smart-grid](https://grid4web.ru/)
Пример использования:

**SCSS**
```scss
.items{
    @include row-flex();
    @include md(justify-content, center);

    .item{
        @include col();
        @include size(3);
        @include size-md(5);
        @include size-xs(10);
    }
}
```
**Результат**
```css
.items {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
}
.items .item {
    box-sizing: border-box;
    margin-left: 15px;
    margin-right: 15px;
    word-wrap: break-word;
    width: calc(100% / 12 * 3 - 30px);
}
@media screen and (max-width: 992px) {
    .items {
        justify-content: center;
    }
    .items .item {
        width: calc(100% / 12 * 5 - 30px);
    }
}
@media screen and (max-width: 576px) {
    .items .item {
        width: calc(100% / 12 * 10 - 30px);
    }
}
```

# Использование gulp-file-includer:
Предпологается что в папке "src/html" будут находиться необходимые файлы для верстки
* В папке "section" лежат html компоненты, а в основном файле index.html находятся вызовы этих компонентов.

* Чтобы вызвать html компонент необходимо написать @@include('your_folder/your_file_name.html') пример см. ниже:
**HTML**
```HTML
<body>
    @@include('sections/header.html')
</body>
```

# Что внутри папки stylesheets?
* Предпологается что все глобальные стили будут храниться в этой папке, изначально она уже не пуста в ней содержится несколько полезных миксинов, сетка смарт-грид, файл reset.scss содержит сбросы некоторых стандартных стилей.
* в файле helpers.scss находятся полезные миксины и функции пример их использования:

* функции ```em($px)```, ```rem($px)``` переводят пиксели в em или rem:
**SCSS**
```scss
.header{
	padding: rem(30) 0 rem(25);
}
```
**Результат**
```css
.header{
	padding: 1.875rem 0 1.5625rem;
}
```
:Внимание!: тоже самое и с функцией em()

* миксин ```font($size, $weight)```
**SCSS**
```scss
.header{

	& > p:first-child{
		@include font(em(14), 600);
		text-align: center;
	}
}
```
**Результат**
```css
.header > p:first-child {
  font-size: 0.875em;
  font-weight: 600;
  text-align: center;
}
```

# Css переменные

Реализована совместимость со старыми браузерами не поддерживающими нововведения CSS, для подключения совместимости в файле: /stylesheets/default-css-variables.scss необходимо:
в переменной $compatibility пнаписать true, по умолчанию false.

Если не нужна совместимость просто писать как и раньше.


# Подключение scss файлов для страниц:
* в папке scss находится файл: main.scss
* в папке stylesheets храним глобальные стили
* в папке blocks храним стили секций сайта, подключаем секции в файле main.scss
