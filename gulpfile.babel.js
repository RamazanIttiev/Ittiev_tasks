import { src, dest, series, parallel, watch } from 'gulp';
import del from 'del';
import scss from 'gulp-sass';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import cleanCSS from 'gulp-clean-css';
import browserSync from 'browser-sync';
import include from 'gulp-file-include';
import autoprefixer from 'gulp-autoprefixer';

const dirs = {
  src: 'src',
  build: 'build',
};

const prod = {
  css: `${dirs.build}/css`,
  scss: `${dirs.build}/css`,
  images: `${dirs.build}/assets/img`,
  icons: `${dirs.build}/assets/icons`,
  fonts: `${dirs.build}/assets/fonts`,
  scripts: `${dirs.build}/js`,
};

const sources = {
  styles: `${dirs.src}/scss/**/*.scss`,
  html: `${dirs.src}/*.html`,
  images: `${dirs.src}/assets/img/*`,
  icons: `${dirs.src}/assets/icons/*`,
  fonts: `${dirs.src}/assets/fonts/*`,
  scripts: `${dirs.src}/js/**/*.js`,
};

export const clear = () => del(dirs.build);

export const html = () => {
  return src(sources.html)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(dest(dirs.build))
    .pipe(browserSync.stream());
};

export const styles = () => {
  return src(sources.styles)
    .pipe(scss())
    .pipe(
      rename({
        suffix: '.min',
        prefix: '',
      }),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
      }),
    )
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      }),
    )
    .pipe(dest(prod.css))
    .pipe(browserSync.stream());
};

export const images = () => {
  return src(sources.images).pipe(imagemin()).pipe(dest(prod.images));
};

export const icons = () => {
  return src(sources.icons).pipe(dest(prod.icons));
};

export const fonts = () => {
  return src(sources.fonts).pipe(dest(prod.fonts));
};

export const reload = () => {
  return (
    browserSync.init({
      server: dirs.build,
    }),
    watch(sources.html, series(html)),
    watch(sources.styles, series(styles))
  );
};

export const dev = series(clear, parallel(html, styles, images, icons, fonts), reload);

export default dev;
