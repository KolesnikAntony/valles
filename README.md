# АРЕНДУЙ верстка

## Установка

Запустить GIT BASH в папке где ты хранишь свои проекты
и выполни эти команды

- git clone https://gitlab.com/YuriKalnin/frontend_arenda.git
- cd frontend_arenda 
- git branch название_твоей_ветки
- git checkout название_твоей_ветки
- npm i (может затянутся на минут 5)
- gulp build
- gulp
- Не закрывай GIT BASH так как запущен gulp server и gulp watch
- запусти свой браузер и напиши там url http://localhost:2019

## Разработка

### UI KIT

Для основы выбран готовый шаблон верстки, находится здесь: app/now-ui-kit-master/index.html

Открыть для просмотра можно по абсолютной ссылке как обычный html, например в строке бразера 
- D:\code\frontend-arenda-kvartir\app\now-ui-kit-master\index.html
- D:\code\frontend-arenda-kvartir\app\now-ui-kit-master\examples\landing-page.html
- D:\code\frontend-arenda-kvartir\app\now-ui-kit-master\examples\login-page.html
- D:\code\frontend-arenda-kvartir\app\now-ui-kit-master\examples\profile-page.html

UI уже подключен в основную сброку

### Важно

В папке build не должно быть никаких файлов, все файлы добавляются в папке app, 
затем с по мощью gulp эти данные переносятся в папку build, подробное описание задач
в файле gulpfile.js

### Важно

Пути необходимо указывать везде относительные, то есть, я подключаю картинку так: 
../img/star.png а не так /build/html/img/star.png
Тоже самое относится и к sass и к js, даже если путь будет таким ../../../../../file.png
все равно исходиники подключать необходимо так. 

### Описание директории app
 
- fonts - шрифты
- fonts/Circle - шрифт Circle
- fonts/nucleo - шрифт иконок nucleo
- html - верстка
- html/inc - подключаемые части html
- icons - иконки для спрайта в форате png 
- (в верстке иконка подключается так < div class="icon-название_картинки">< /div>)
- img - все картинки которые участвуют в верстке
- js - файлы js скриптов
- sass - все файлы стилей 
- app/sass/bootstrap - bootstrap переменные здесь: app/sass/bootstrap/_variables.scss
- app/sass/include - твои кастомные стили
- app/sass/now-ui-kit - это готовый шаблон, переменные здесь: app/sass/now-ui-kit/_variables.scss
- app/sass/styles.scss - основной файл стилей, в нем желательно писать только инклуды,
а сами стили выносить в папку app/sass/include
- vendor - директория где находятся библеотеки и плагины
- vendor/НАЗВАНИЕ_ПЛАГИНА

## Подключение плагина

- Скачали плагин, положили в папку app/vendor 
- (аналогично если пакет качаем через npm то берем из папки node_modules)
- Получилось так app/vendor/плагин_который_скачали
- Открыли файл gulpfile.js и нашли var path 
- В переменной path.libs.js.files - указали файл к js коду плагина
- В переменной path.libs.css.files - указали файл к css коду плагина
- Остановить и запустить зановка команду gulp
- Иницилазиция плагина происходит в файле app/js/script.js

