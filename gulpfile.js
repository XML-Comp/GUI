var gulp = require('gulp');
var packager = require('electron-packager')
var clean = require('gulp-clean')

gulp.task('default', function(){
    packager({
        dir: './',
        all: true,
        icon: './images/XMLCompare',
        name: "XML Comparer",
        out: "./dist"
    }, (err, appPaths) =>{
        if(err){
            console.log(err.message)
        }else{
            console.log(appPaths)
        }
    })
})

gulp.task('clean', () => {
    gulp.src('./dist')
        .pipe(clean())
})