const { src, dest, series, parallel, watch } = require('gulp')
const concat = require('gulp-concat')
const autoprefixers = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const htmlMin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()
const image = require('gulp-image')
const clean = require('gulp-clean')
// const uglifyJS = require('gulp-uglify-es').default
const uglifyJS = require('gulp-uglify')
const babel = require('gulp-babel')

const uglify = () => {
    return src('src/script.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglifyJS())
    .pipe(dest('dist'))
}

const libs = () => {
    return src('src/libs/*.js')
    .pipe(dest('dist/libs'))
}

const stylesBuild = () => {
    return src(['src/styles/style.css', 'src/styles/media.css'])
        .pipe(concat('style.min.css'))
        .pipe(autoprefixers({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/styles'))
}

const styles = () => {
    return src(['src/styles/style.css', 'src/styles/media.css'])
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream())
}

const htmlMinifyBuild = () => {
    return src('src/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('dist'))
}

const htmlMinify = () => {
    return src('src/*.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const browSync = () => {
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
}

const images = () => {
    return src([
        'src/img/*.jpg',
        'src/img/*.png',
        'src/img/*.svg',
        'src/img/*.jpeg',
    ])
    .pipe(image())
    .pipe(dest('dist/img'))
}

const fonts = () => {
    return src([
        'src/fonts/*.woff',
        'src/fonts/*.woff2',
    ])
    .pipe(dest('dist/fonts'))
}

const cleanDist = () => {
    return src('dist')
        .pipe(clean())
}

watch([ 'src/fonts/*woff', 'src/fonts/*woff2'], fonts)
watch('src/*.html', htmlMinify)
watch('dist/*.html').on('change', browserSync.reload)
watch('src/styles/*.css', styles)
watch('src/*.js', uglify)

exports.styles = styles
exports.htmlMinify = htmlMinify
exports.browSync = browSync

exports.default = parallel(fonts, libs, htmlMinify, styles, uglify, images, browSync)
exports.build = series(cleanDist, libs, fonts, images, uglify, stylesBuild, htmlMinifyBuild)
