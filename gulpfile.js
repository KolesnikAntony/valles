'use strict';
var buildConf = require('./build.conf')
var tools = {
    gulp: require('gulp'),
    sass: require('gulp-sass'),
    concat: require('gulp-concat'),
    livereload: require('gulp-livereload'),
    connect: require('gulp-connect'),
    spritesmith: require('gulp.spritesmith'),
    htmlrender: require('gulp-htmlrender'),
}
var path = {
    libs: {
        js: {
            files: [
                './app/now-ui-kit-master/assets/js/core/jquery.min.js',
                './app/now-ui-kit-master/assets/js/core/popper.min.js',
                './app/now-ui-kit-master/assets/js/core/bootstrap.min.js',
                './app/now-ui-kit-master/assets/js/plugins/bootstrap-switch.js',
                './app/now-ui-kit-master/assets/js/plugins/nouislider.min.js',
                // './app/now-ui-kit-master/assets/js/plugins/bootstrap-datepicker.js',
                './app/vendor/fotorama-4.6.4/fotorama.js',
                './app/vendor/airpicker/datepicker.js',
                './node_modules/swiper/dist/js/swiper.min.js',


            ],
            name: 'libs.min.js',
            path: buildConf.path.build + '/js',
        },
        css: {
            files: [
                './node_modules/swiper/dist/css/swiper.min.css',
                './app/now-ui-kit-master/assets/demo/demo.css',
                './app/vendor/fotorama-4.6.4/fotorama.css',
                './app/vendor/airpicker/datepicker.css',
                buildConf.path.build + '/css/icons_sprite.css',
            ],
            name: 'libs.min.css',
            path: buildConf.path.build + '/css',
        }
    },
    styles: {
        files: ['./app/sass/styles.scss'],
        path: buildConf.path.build + '/css'
    },
    js: {
        files: [
            './app/now-ui-kit-master/assets/js/now-ui-kit.js',
            './app/js/script.js',
        ],
        name: 'script.min.js',
        path: buildConf.path.build + '/js',
    },
    fonts: {
        files: ['./app/fonts/**/*'],
        path: buildConf.path.build + '/fonts'
    },
    img: {
        files: ['./app/img/**/*'],
        path: buildConf.path.build + '/img'
    },
    json: {
        files: ['./app/json/**/*'],
        path: buildConf.path.build + '/json'
    },
    watch: [buildConf.path.build + '/js/**/*.js', buildConf.path.build + '/html/*.html', buildConf.path.build + '/css/*.css']
}
tools.gulp.task('sprite', function() {

    var nameImg = 'icons_sprite';

    var spriteData =
        tools.gulp.src('./app/icons/*.*')
        .pipe(tools.spritesmith({
            imgName: nameImg + '.png',
            cssName: nameImg + '.css',
            algorithm: 'left-right',
            cssFormat: 'css',
            imgPath: '../img/icons/' + nameImg + '.png',
            padding: 10,
            cssVarMap: function(sprite) {
                sprite.name = sprite.name
            }
        }));

    spriteData.img.pipe(tools.gulp.dest(buildConf.path.build + '/img/icons/'));
    spriteData.css.pipe(tools.gulp.dest(buildConf.path.build + '/css/'));
});
tools.gulp.task('fonts', function() {
    tools.gulp.src(path.fonts.files)
        .pipe(tools.gulp.dest(path.fonts.path));
});
tools.gulp.task('json', function() {
    tools.gulp.src(path.json.files)
        .pipe(tools.gulp.dest(path.json.path));
});
tools.gulp.task('img', function() {
    tools.gulp.src(path.img.files)
        .pipe(tools.gulp.dest(path.img.path));
});
tools.gulp.task('styles', function() {
    tools.gulp.src(path.styles.files)
        .pipe(tools.sass().on('error', tools.sass.logError))
        .pipe(tools.gulp.dest(path.styles.path));
});
tools.gulp.task('libs:css', ['sprite'], function() {
    return tools.gulp.src(path.libs.css.files)
        .pipe(tools.concat(path.libs.css.name))
        .pipe(tools.gulp.dest(path.libs.css.path))
});
tools.gulp.task('html', function() {
    return tools.gulp.src('app/html/**/*.html', { read: false })
        .pipe(tools.htmlrender.render())
        .pipe(tools.gulp.dest(buildConf.path.build + '/html'));
});
tools.gulp.task('js:libs', function() {
    return tools.gulp.src(path.libs.js.files)
        .pipe(tools.concat(path.libs.js.name))
        .pipe(tools.gulp.dest(path.libs.js.path));
});
tools.gulp.task('js', function() {
    return tools.gulp.src(path.js.files)
        .pipe(tools.concat(path.js.name))
        .pipe(tools.gulp.dest(path.js.path));
});
tools.gulp.task('build', ['libs:css', 'styles', 'js:libs', 'html', 'fonts', 'img', 'js', 'json']);
tools.gulp.task('server', function() {
    tools.connect.server({
        root: buildConf.path.build,
        port: 2020,
        livereload: true
    });
});
tools.gulp.task('livereoload', function() {
    tools.gulp.src(path.libs.js.files)
        .pipe(tools.connect.reload());
});
tools.gulp.task('watch', function() {
    //
    tools.gulp.watch(path.watch, ['livereoload']);
    //
    tools.gulp.watch('./app/js/**/*.js', ['js']);
    //
    tools.gulp.watch('./app/html/**/*.html', ['html']);
    tools.gulp.watch('./app/html/inc/index/*.html', ['html']);
    //
    tools.gulp.watch('./app/sass/**/*.scss', ['styles']);
});

switch (buildConf.env) {
    case "frontend":
        tools.gulp.task('default', ['build', 'server', 'watch']);
        break;
    case "backend":
        tools.gulp.task('default', ['build', 'server', 'watch']);
        break;
}