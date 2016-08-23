var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    gulpmocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('compile', function() {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}));
});

gulp.task('default', ['compile'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env : {
            'PORT' : 5000,
            'ConnectionString' : 'mongodb://localhost/RESTApi'
        },
        ext: 'js',
        ignore: ['./node_modules/**']
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting....');
        });
});

gulp.task('Test', function(){
    env({vars: {ConnectionString: 'mongodb://localhost/RESTApi_Test'}});
    gulp.src('Tests/**/*.js')
    .pipe(gulpmocha({reporter: 'nyan'}));
});
