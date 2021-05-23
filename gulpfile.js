const gulp = require('gulp');
const tsc = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const tsConfig = require("./tsconfig.json");

gulp.task('compile-ts', () => {
    return gulp.src('src/**/*.ts')
        .pipe(tsc({
            ...tsConfig,
            outFile: 'index.js'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('compile-ts', () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/*.ts", gulp.series('compile-ts'));
    gulp.watch("dist/*").on('change', browserSync.reload);
}));
