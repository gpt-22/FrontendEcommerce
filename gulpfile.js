
// variables & consts 
const
    gulp = require('gulp') 
    browserSync = require('browser-sync').create()
    nunjucks = require('gulp-nunjucks-render')
    less = require('gulp-less')
    autoprefixer = require('gulp-autoprefixer')
    cleanCSS = require('gulp-clean-css')
    rename = require('gulp-rename')
    
const 
    sourceFolder = 'src'
    projectFolder = 'dist'
    path = {
        src: {
            html: [sourceFolder + '/*/*.html'],
            css: sourceFolder + '/static/styles/style.less',
            js: sourceFolder + '/static/js/**/*.js',
            img: sourceFolder + '/static/images/**/*.{jpg,JPG,png,PNG,svg,SVG,gif,GIF,ico,ICO,webp,WEBP}',
        },
        watch: {
            html: sourceFolder + '/**/*.html',
            css: sourceFolder + '/static/styles/**/*.less',
            js: sourceFolder + '/static/js/**/*.js',
            img: sourceFolder + '/static/images/**/*.{jpg,JPG,png,PNG,svg,SVG,gif,GIF,ico,ICO,webp,WEBP}',
        },
        build: {
            html: projectFolder + '/',
            css: projectFolder + '/static/styles/',
            js: projectFolder + '/static/js/',
            img: projectFolder + '/static/images/',
        },
        clean: './' + projectFolder + '/',
    }


// live reload
function runBrowserSync(params) {
    browserSync.init({
        server: { 
            baseDir: './' + projectFolder + '/',
            index: 'templates/catalog.html',
            routes: {
                "/": "./dist/templates/"
            }
        },
        port: 3000,
        open: false,
        notify: false,
    })
}

// watch tasks
function watchHTML() {
    return gulp.src(path.src.html)
    .pipe(nunjucks({
        path: './' + sourceFolder + '/',
        data: {
            pageTitles: {
                men: "Мужчины",
                menClothes: "Мужская одежда",
                menShoes: "Мужская обувь",
                women: "Женщины",
                womenClothes: "Женская одежда",
                womenShoes: "Женская обувь",
                cart: "Корзина",
                checkout: "Оформление заказа",
                orderDetail: "Заказ",
            }    
        }
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream())
}

function watchCSS() {
    return gulp.src(path.src.css)
    .pipe(less())
    .pipe(autoprefixer({
            overrideBrowserlist: ['last 5 versions'],
            cascade: true
        }))
    .pipe(gulp.dest(path.build.css))
    .pipe(cleanCSS()) // minification
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream())
}

function watchJS() {
    return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream())
}

function watchImages() {
    return gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], watchHTML)
    gulp.watch([path.watch.css], watchCSS)
    gulp.watch([path.watch.js], watchJS)
    gulp.watch([path.watch.img], watchImages)
}


// delete result folder to rewrite
const del = require('del')
function clean(params) {
    return del(path.clean)
}


// run
exports.html = watchHTML
exports.css = watchCSS
exports.js = watchJS
exports.images = watchImages

const build = gulp.series(clean, gulp.parallel(watchHTML, watchCSS, watchJS, watchImages))
const watch = gulp.parallel(build, watchFiles, runBrowserSync)
exports.build = build
exports.watch = watch

exports.default = watch
