# gulp-htmlnano
[![npm version](https://badge.fury.io/js/gulp-htmlnano.svg)](http://badge.fury.io/js/gulp-htmlnano)
[![Build Status](https://travis-ci.org/maltsev/gulp-htmlnano.svg?branch=master)](https://travis-ci.org/maltsev/gulp-htmlnano)

Minify HTML with [htmlnano](https://github.com/maltsev/htmlnano).


## Install
```
npm install --save-dev gulp-htmlnano
```


## Usage
```js
var gulp = require('gulp');
var htmlnano = require('gulp-htmlnano');
var options = {
    removeComments: false
};

gulp.task('default', function() {
    return gulp
        .src('./index.html')
        .pipe(htmlnano(options))
        .pipe(gulp.dest('./build'));
});
```
