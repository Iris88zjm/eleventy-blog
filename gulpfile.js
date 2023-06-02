import pkg from 'gulp';
import rev from "gulp-rev"; // Static asset revisioning by appending content hash to filenames, unicorn.css → unicorn-d41d8cd98f.css
import revCollector from "gulp-rev-collector"; // Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
import cleanCSS from "gulp-clean-css"; // Minify css
import htmlmin from "gulp-htmlmin"; // Minify HTML
import terser from "gulp-terser"; // Compressed es6+ code
import cleanFile from 'gulp-clean'; // remove file or folder
import tap from 'gulp-tap'; // Easily tap into a pipeline.
const { src, dest, series, parallel } = pkg;

function minifyCss() {
  return src("_dev/assets/css/**/*.css")
    .pipe(cleanCSS())
    .pipe(dest("_production/assets/css/"));
}
  
function minifyJs() {
  return src("_dev/assets/js/**/*.js")
    .pipe(terser({ warnings: true }))
    .pipe(dest("_production/assets/js/"));
}

function minifyHTML() {
  return src("_production/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("_production/"));
}

function revCss() {
  return src(["_production/assets/css/**/*.css", "!_production/assets/css/components/**/*.css"])
    .pipe(rev())
    .pipe(dest("_production/assets/css/"))
    .pipe(rev.manifest())
    .pipe(dest("rev/css"));
}

function revJs() {
  return src("_production/assets/js/**/*.js")
    .pipe(rev())
    .pipe(dest("_production/assets/js"))
    .pipe(rev.manifest())
    .pipe(dest("rev/js"));
}

function revCollect() {
  return src(["rev/**/*.json", "_production/**/*.html"])
    .pipe(revCollector({ replaceReved: true }))
    .pipe(
      tap(function (file) {
        if (file.path.slice(-5) === ".html") {
          // drop index.html from URLs
          file.contents = Buffer.from(
            file.contents
              .toString()
              .replace(
                /(https:\/\/([_0-9a-zA-Z-]+\.)?nanoleaf\.me\/([_0-9a-zA-Z-]+\/)?)?index\.html/,
                "$1"
              )
          );
        }
      })
    )
    .pipe(dest("_production"));
}

function removeOldCssJs() {
  return src(["_production/assets/js/", "_production/assets/css/"], {read: false, allowEmpty: true})
  .pipe(cleanFile())
}

export const packCSSJS = series(
    removeOldCssJs, 
    parallel(minifyCss, minifyJs, minifyHTML), 
    parallel(revCss, revJs), 
    revCollect
  );