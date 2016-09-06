// generated on 2016-06-03 using generator-webapp 2.1.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
    return gulp.src('src/styles/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({stream: true}));
});

function lint(files, options) {
    return gulp.src(files)
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('src/scripts/**/*.js', {
        fix: true
    })
        .pipe(gulp.dest('src/scripts'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js', {
        fix: true,
        env: {
            mocha: true
        }
    })
        .pipe(gulp.dest('test/spec/**/*.js'));
});

gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src('src/*.html')
        .pipe($.useref({searchPath: ['.tmp', 'src', '.']}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
        .pipe(gulp.dest('dist'));
});

gulp.task('html2js',() => {
    return gulp.src('src/views/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.ngHtml2js({
            moduleName: "ngMagicalInput",
            prefix: "views/"
        }))
        .pipe(gulp.dest(".tmp/scripts"))
})

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts', 'fonts'], () => {
    browserSync({
        notify: false,
        port: 8000,
        // proxy:{
        //     target:'http://172.16.134.20',
        //     ws:true,
        //
        // },
        // serveStatic:['.tmp', 'src'],
        //middleware:[{
        //  route: "/api/*"
        //}]
        server: {
         baseDir: ['.tmp', 'src'],
        }
    });

gulp.watch([
    'src/*.html',
]).on('change', reload);

gulp.watch('src/styles/**/*.scss', ['styles']);
gulp.watch('src/scripts/**/*.js', ['scripts']);
gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 8010,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

gulp.watch('src/scripts/**/*.js', ['scripts']);
gulp.watch('test/spec/**/*.js').on('change', reload);
gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {

    gulp.src('src/*.html')
    .pipe(wiredep({
        "overrides": {
            "font-awesome": {
                "main": "css/font-awesome.css"
            },
            "jquery-tmpl": {
                "main": ["jquery.tmpl.min.js","jquery.tmplPlus.min.js"]
            }
        },
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('build', ['lint','html2js', 'html'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
    gulp.start('build');
});
