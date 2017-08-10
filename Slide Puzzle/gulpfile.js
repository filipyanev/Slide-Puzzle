var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less-sourcemap');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var del = require('del');
var uglify = require('gulp-uglify');
var js_obfuscator = require('gulp-js-obfuscator');
var util = require('gulp-util');
var runSequence = require('run-sequence');
var jsonModify = require('gulp-json-modify');
var htmlReplace = require('gulp-html-replace');
var zip = require('gulp-zip');
var wait = require('gulp-wait');
var folder_name;

//  buildTypeScript to compile TS files into src/game.js
//  buildGameDevWatch to compile TS files into src/game.js and watch for changes
//  buildGame to create build folder

gulp.task('cleanBuildFolder', function () {
    // Deleting everything in the build folder
    return del([
        "*" + (util.env.theme ? util.env.theme : 'bgmenu')
    ])
});

gulp.task('buildTypeScript', function () {
    //All folders with typescripts files needs to be added here
    return gulp.src(['./src/Scripts/**/*.ts', './src/app-chef-game-container/**/*.ts'])
        .pipe(typescript({
            module: 'commonjs',
            target: 'ES5',
            out: 'game.js',
            outDir: './src',
            sourceMap: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./src'))
});

gulp.task('combineAndCopyJS', function () {
    //All javascript we need to combine here
    return gulp.src(['./src/game.js'])
        .pipe(concat('game.js'))
        .pipe(uglify())
        .pipe(js_obfuscator())
        .pipe(gulp.dest(folder_name));
});

gulp.task('copyAssets', function () {
    return gulp.src(['./src/Assets/**', '!./src/Assets/PlatfromSpecificAssets/**/*',
            './src/Config/gameConfig.json', './src/*.css', './src/app-chef-game-container/*.json',
            './src/index.html', './src/app-chef-game-container/Assets/**/*'], {"base": "./src"})
        .pipe(gulp.dest(folder_name));
});

gulp.task('copyPlatformAssets', function () {
    return gulp.src(['./src/Assets/PlatfromSpecificAssets/' + (util.env.theme ? util.env.theme : 'bgmenu') + '/**/*'],
        {"base": "./src"})
        .pipe(gulp.dest(folder_name));
});

gulp.task('setFolderName', function () {
    var today = new Date();
    var mn = today.getMinutes();

    if (mn < 10) {
        mn = '0' + mn;
    }

    var hh = today.getHours() + "" + mn;
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = "d" + dd + '_m' + mm + "_h" + hh;
    folder_name = './build_' + today + "_" + (util.env.theme ? util.env.theme : 'bgmenu');
});

gulp.task('modifyConfig', function () {
    gulp.src('src/Config/gameConfig.json')
        .pipe(jsonModify({
            key: "theme",
            value: (util.env.theme ? util.env.theme : 'bgmenu')
        }))
        .pipe(jsonModify({
            key: "canRunLocally",
            value: "false"
        }))
        .pipe(gulp.dest(folder_name + '/Config/'))
});

gulp.task('modifyIndex', function () {
    gulp.src('./src/index.html')
        .pipe(htmlReplace({
            js: '<script type="text/javascript"> ' +
            'var path = decodeURIComponent(window.location.search.match(/&phaser=([a-z0-9\._/:%]+)/i)[1]); ' +
            'var script = document.createElement("script"); ' +
            'script.async = false; script.src = path;  ' +
            'document.body.appendChild(script);' +
            '</script> ' +
                
            '<script type="text/javascript">' +
            'var path = decodeURIComponent("game.js");' +
            ' var script = document.createElement("script");' +
            ' script.async = false; script.src = path; ' +
            'document.body.appendChild(script);' +
            '</script>'
        }))
        .pipe(gulp.dest(folder_name))
});

gulp.task('zipGame', function () {
    return gulp.src(folder_name + '/**/*')
        .pipe(wait(5000))
        .pipe(zip(folder_name + '.zip'))
        .pipe(gulp.dest(folder_name));
});

gulp.task('buildGame', runSequence('setFolderName', 'cleanBuildFolder', 'buildTypeScript', 'combineAndCopyJS', 'copyAssets', 'modifyConfig', 'modifyIndex', 'copyPlatformAssets', 'zipGame'));