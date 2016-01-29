var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var config = {

    jsFiles: ['*.js', 'src/**/*.js']    
    
};

gulp.task('styles', function() {
    return gulp.src(config.jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
    var injectOptions = {
      ignorePath: '/public'  
    };
    
    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['styles', 'inject'], function() {
   var options = {
       script: 'app.js',
       delay: 1,
       env: {
           'PORT': process.env.PORT || 5000
       },
       watch: config.jsFiles
   };
   return nodemon(options)
        .on('restart', function() {
           console.log('restarting...'); 
        });
});