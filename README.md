# gulp-quick-start

## Особенности:

---

- используется препроцессор [SCSS](https://sass-lang.com/)
- используется CSS-сетка [smart-grid](https://github.com/dmitry-lavrik/smart-grid) на основе Bootstrap для быстрой адаптивной вёрстки
- используется [normalize.css](https://github.com/necolas/normalize.css/)
- используется [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- используется [gulp-file-includer](https://github.com/haoxins/gulp-file-include) для разделения html на компоненты
- Все файлы сразу складываются в папку /builds, все минимизируется и компилируется прям во время верстки.

---

## Установка

---

- Установите с официального сайта [NodeJS](https://nodejs.org/en/) или с помощью [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (Node Version Manager)
- Установите `gulp` глобально: `npm i --global gulp-cli`
- После установке необходимого, перейдите в папку со скачанным проектом
- Установите необходимые зависимости введя в терминал команду: `npm i`
- для запуска проекта введите в терминале: `gulp` (режим разработки)

! Если всё этапы пройдены верно, должен открыться браузер с запущенным локальным сервером.

---

## Правила именования файлов/папок

---

- `html` Все компоненты, куски секций и файлы стилей должны перед названием файла иметь префикс `_` который означает что это не самостоятельный файл, а тот что включается куда-то, пример: `_cards.html` `_cards.scss`. Html компоненты находятся в папке `html/components/`, scss компоненты находятся в папке `scss/components/` - помимо префикса перед названием именоваться файлы должны в стиле **snake_case**
- `html` данные в папке `html/data` должны именоваться с использованием названия компонента или секции к которой они принадлежат, используя при этом **_camelCase_** стиль, пример: `cardsData.json` или `componentCardsData.json`
- `html` секции должны находиться в папке `html/sections/` в проекте для одностраничных сайтов, для многостраничных проектов должны создаваться подкаталоги в папке `html/sections/`, имя подкатолога должно совпадать с именем страници, например: `html/sections/general_page/` в подкатологе храним секции, принадлежащие этой странице - тот же пример касается и файлов стилей в каталоге: `scss/sections` и `scss/sections/your_page_name/`

## Рабочая папка проекта:

---

```
./src
├── fonts
├── html
│   ├── components
│   │   └── _component_name.html
│   ├── data
│   │   └── componentData.json
│   ├── sections
│   │   ├── page_name
│   │   │   └── _page_section_name.html
│   │   ├── _footer.html
│   │   └── _header.html
│   └── index.html
├── img
├── js
│   └── main.js
└── scss
    ├── components
    │   └── _component_name.scss
    ├── sections
    │   ├── page_name
    │   │   └── _page_section_name.scss
    │   ├── _footer.scss
    │   └── _header.scss
    ├── stylesheets
    │    ├── _animation-libs.scss
    │    ├── _base-color.scss
    │    ├── _buttons.scss
    │    ├── _helpers.scss
    │    ├── _reset.scss
    │    ├── _smart-grid.scss
    │    ├── _stylesheets.scss
    │    └── _typografy.scss
    └── main.scss
```

> _Рассмотрим файловую структуру более детальнее:_

#### HTML

---

- `fonts` -> папка содержащая шрифты
- `html` -> папка содержащая подпапки с кусками кода, компонентами и данными.
  - `components` -> папка с html компонентами
  - `data` -> храним здесь данные в формате `.json`
  - `sections` -> папка содержащая в себе подкатологи с названием страниц, внутри которых секции для этих страниц (многостраничная вёрстка)
    - `page_name` -> папки для внутренних страниц сайта, содержащие в себе названия секций для текущей страницы.
  - `index.html` -> входной файл, в который подключаем всё необходимое.

---

#### IMG

---

- `img` -> папка содержащая в себе изображения и т.д.

---

#### JS

---

- `js` -> папка содержащая в себе `.js` файлы

---

#### SCSS

---

- `scss` -> папка с коллекцией стилей для проекта
  - `components` -> папка содержащая в себе файлы стилей компонент.
  - `sections` -> папка содержащая в себе подкатологи с названием страниц (многостраничный режим вёрстки), и содержащая стили для этих секций.
    - `page_name` -> папки для внутренних страниц сайта, содержащие в себе стили для секций текущей страницы
  - `stylesheets` -> папка с коллекцией предопределённых файлов стилей, независимых ни от чего, и которые подключаются первее всего, прежде подключения всех остальных стилей касающихся проекта
    - `_stylesheets.scss` -> входной файл в который подключаются все файлы стилей внутри родительского каталога т.е. внутри `stylesheets`, сам файл подключается в `main.scss` - который является входным файлом.
  - `main.scss` -> входной и главный файл стилей, в которые подключаются все файлы стилей находящиеся внутри родительской папки.

## Сторонние библиотеки

---

- все сторонние библиотеки устанавливаются в папку `node_modules`
  - для их загрузки воспользуйтеcь командой `npm i package_name`
  - установка (пакеты необходимые для разработки) devDependencies `npm i package_name --save-dev`
  - установка (пакеты от которых зависит проект) dependencies `npm i package_name --save`
  - для подключения в проект нужно отредактировать gulpfile.js в тех тасках, в которых подключаются необходимые пакеты, например если это файлы стилей то в таске css-lib в массив подключаемых файлов добавить путь до скачанной библиотеки.

## Немного о CSS-сетке smart-grid

---

В сборщик включена CSS-сетка [smart-grid](https://github.com/dmitry-lavrik/smart-grid) от [Дмитрия Лаврика](https://dmitrylavrik.ru/). Она позволяет избавиться от
лишних классов в разметке за счёт использования примесей в SCSS и ускоряет адаптивную вёрстку. Конфигурация уже настроена в соответствии с сеткой [Bootstrap](https://getbootstrap.com/). За улучшение сетки спасибо [Алексеевичу](https://github.com/andreyalexeich)

P.S. Полезный ресурс [smart-grid](https://grid4web.ru/)
Пример использования:

**SCSS**

```scss
.items {
  @include row-flex();
  @include md(justify-content, center);

  .item {
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

## Использование gulp-file-includer:

---

Предпологается что в папке "`./src/html`" будут находиться необходимые файлы для верстки

- В папке "`sections/page_name/`" лежат `.html` компоненты для страниц и их необходимых секций, а в основном файле `index.html` находятся вызовы этих компонентов.
- Так же для компонентов и различных кусков, в папке `/html/data/` должны быть файлы формата `.json`

- Чтобы вызвать html компонент необходимо написать @@include('your_folder/your_page_dir_name/your_file_name.html') пример см. ниже:
  **HTML**

```HTML
<body>
    @@include('sections/your_page_dir_name/_your_page_section_name.html')
</body>
```

- Так же настроен контекст для более функциональных компонентов. Принимает параметры `true` и `false` - по умолчанию `false`, поэтому писать все свойства контекста в данных не обязательно. Контекст содержит несколько определенных свойств, которые нужно передавать перед проверками. Список свойств:

```
context: {
    titleMode: false, // -> по умолчанию нет заголовка
    descriptionMode: false, // -> по умолчанию нет описания
    hiddenBlock: false, // -> по умолчанию нет скрываемого блока
    imageMode: false, // -> по умолчанию нет изображения
    onlyTitle: false, // -> режим только заголовка по умолчанию откл.
},
```

---

#### Пройдёмся чуть более подробнее с примерами

> Предположим что у нас один сложный компонент, но на странице их должно быть несколько, и в некоторых случаях они должны чем-то отличаться друг от друга, например у блока есть скрытый контент при наведении/фокусе на блок - этот скрытый контент должен появляться, и у него внутри должен быть **заголовок** и **описание**, а перед этим должна быть просто картинка.
> <br> <br>
> У второго блока должа быть картинка, без скрытого блока и ничего не должно происходить при наведении/фокусе на блок.
> <br><br>
> Так же существует третий блок, у которого должен быть только один заголовк, без картинки на весь блок, и без скрытого контента.
> <br><br>
> Теперь рассмотрим как распечатать такой компонент, создав всего один файл с `html` кодом, но прописав внутрь условия при которых так или иначе что-то должно будет происходить при вызове этого компонента.

_`html` компонент с логикой:_

```
<article class="info-card @@classModif">
  @@if (imageMode === true) {
      <figure class="info-card__figure">
        <img
          src="@@previewPath"
          alt="Decor element"
          class="info-card__preview" />
      </figure>
  }

  @@if (onlyTitle === true) {
    <p class="info-card__title">@@cardTitle</p>
  }

  @@if (hiddenBlock === true) {
      <div class="info-card__hidden">

        @@if (titleMode === true) {
            <p class="info-card__title">@@cardTitle</p>
        }

        @@if (descriptionMode === true) {
            <p class="info-card__description">@@cardDescription</p>
        }
      </div>
  }
</article>
```

> Рассмотрим подробнее первый вариант описаный выше, когда нам при наведении нужно показывать только заголовок и описание в данном компоненте, а в спокойном состоянии должна быть только картинка на весь блок.
> <br><br>
> Для этого мы в `.json` файле с данными пропишем следующее:

```
[
  {
    "imageMode": true,
    "previewPath": "img/decor/women.jpeg",
    "hiddenBlock": true,
    "titleMode": true,
    "descriptionMode": true,
    "classModif": "info-card__garanty",
    "cardTitle": "Гарантия сроков",
    "cardDescription": "если не Выполним в заявленные сроки, то сделаем скидку 50% или подарим приятный бонус"
  },
]
```

> Рассмотрим подробнее в строке с `"hiddenBlock": true,` -> мы говорим что да, нам нужен скрытый блок, так же мы говорим что нам нужен заголовок в этом скрытом блоке за это отвечает: `"titleMode": true,`, за описание отвечает: `"descriptionMode": true,` > <br><br>
> В условии ещё было сказано о картинке, поэтому мы задали: `"imageMode": true,`.
> <br><br>
> С этим разобрались, теперь нам надо передать данные за это отвечает всё остальное в массиве т.е.:

```
    "previewPath": "img/decor/women.jpeg", // Путь до картинки
    "classModif": "info-card__garanty", // модификатор класса
    "cardTitle": "Гарантия сроков", // заголовок
    "cardDescription": "если не Выполним в заявленные сроки, то сделаем скидку 50% или подарим приятный бонус" // описание
```

<br>
> Теперь рассмотрим второй вариант, когда нам не нужно ничего, только картинка, массив с данными будет выглядеть следующим образом:

```
[
  {
    "imageMode": true,
    "previewPath": "img/decor/women.jpeg",
    "classModif": "info-card__preview_1"
  }
]
```

<br>

> И так в строке `"imageMode": true,` -> мы сообщаем что нам нужна картинка, дальше просто как и в предыдущем примере передаём необходимые данные, модификатор класса и путь до картинки.

## <br>

<br>
> Рассмотрим третий вариант, по условию в нём должен быть один заголовок, не должно быть картинки, не должно быть скрытого контента, и для этого случая у нас есть опция в контексте:

<br>

```
[
  {
    "onlyTitle": true,
    "classModif": "info-card__info",
    "cardTitle": "сервис , который дарит свободу"
  }
]
```

</br>
> ```"onlyTitle": true,``` -> как раз таки для этого и нужен, сообщаем что нам нужен один заголовок, ну и передаём остальные данные в массиве, в итоге давайте соединим все это в один массив с данными, пример:
<br>

```
[
  {
    "imageMode": true,
    "previewPath": "img/decor/women.jpeg",
    "hiddenBlock": true,
    "titleMode": true,
    "descriptionMode": true,
    "classModif": "info-card__garanty",
    "cardTitle": "Гарантия сроков",
    "cardDescription": "если не Выполним в заявленные сроки, то сделаем скидку 50% или подарим приятный бонус"
  },
  {
    "imageMode": true,
    "previewPath": "img/decor/women.jpeg",
    "classModif": "info-card__preview_1"
  },
  {
    "onlyTitle": true,
    "classModif": "info-card__info",
    "cardTitle": "сервис , который дарит свободу"
  }
]
```

<br>
> Массив мы создали, но как же теперь этот компонент вызвать или распечатать?
<br>
Просто, плагин ```gulp-file-include``` предоставляет нам не только условия, и запись опций в контекст, но и такой метод как распечатка данных используя подстановку данных из файла или сразу в шаблоне, но мы будем использовать первый способ.
<br><br>
Метод принимает в себя два параметра:
<br>
**путь до компонента** и **путь до данных компонента в формате ```.json```**  пример вызова такого метода:
<br>
<code>@@loop('component_path.html', 'componentDataPath.json')</code>

---

#### Реальный пример

---

_Рассмотрим реальный пример, с подстановкой данных, и последующим рендерингом html кода:_
<br>

> Предположим у нас есть компонент `_cards.html` расположенный по пути: `html/components/_cards.html`, он фун-ный и его нужно распечатать с помощью `@@loop` в файле \_about.html по пути `html/sections/general_page/_about.html`:

```
<section class="about">
    <div class="container">
        <div class="row">
            @@loop('components/_cards.html', "../html/data/abouCardsData.json")
        </div>
    </div>
</section>
```

> Да, очень важно в указании данных использовать вот такой путь: `../html/data/yourComponentDataName.json` то же самое касается и вызова компонента: `components/your_component_name.html` > <br><br>
> На выходе мы получим вот такой отрендеренный `html` код:

```
<section class="about">
    <div class="container">
        <div class="row">

          <article class="info-card info-card__garanty">
            <figure class="info-card__figure">
              <img src="img/decor/women.jpeg" alt="Decor element" class="info-card__preview" />
            </figure>
            <div class="info-card__hidden">
              <p class="info-card__title">Гарантия сроков</p>
              <p class="info-card__description">если не Выполним в заявленные сроки, то сделаем скидку 50% или подарим приятный бонус</p>
            </div>
          </article>

          <article class="info-card info-card__preview_1">
            <figure class="info-card__figure">
              <img src="img/decor/women.jpeg" alt="Decor element" class="info-card__preview" />
            </figure>
          </article>

          <article class="info-card info-card__info">
            <p class="info-card__title">сервис , который дарит свободу</p>
          </article>

        </div>
    </div>
```

---
