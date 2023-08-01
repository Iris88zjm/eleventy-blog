import pkg from 'gulp';
import rev from "gulp-rev"; // Static asset revisioning by appending content hash to filenames, unicorn.css → unicorn-d41d8cd98f.css
import revCollector from "gulp-rev-collector"; // Static asset revision data collector from manifests, generated from different streams, and replace their links in html template.
import cleanCSS from "gulp-clean-css"; // Minify css
import htmlmin from "gulp-htmlmin"; // Minify HTML
import terser from "gulp-terser"; // Compressed es6+ code
import cleanFile from 'gulp-clean'; // remove file or folder
import tap from 'gulp-tap'; // Easily tap into a pipeline.
import fs from 'fs';
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
  return src(["_production/assets/js/", "_production/assets/css/"], { read: false, allowEmpty: true })
    .pipe(cleanFile())
}

export async function writeFruitData() {
  let files = [],
    tempMenu = [],
    // fruitMenu = {},
    fruitData = [];
  files = fs.readdirSync('_dev/_data/fruits');
  files.forEach(function (file) {
    let fruitFile = fs.readFileSync(`_dev/_data/fruits/${file}`, { encoding: 'utf8', flag: 'r' });
    let jsonData = JSON.parse(fruitFile.toString());
    // console.log(jsonData)
    jsonData.data.map((fruitInfo) => {
      fruitData.push(fruitInfo);
      tempMenu.push({
        "familyName": fruitInfo.familyName,
        "genuName": fruitInfo.genuName
      })
    })
  })

  let fruitMenu = tempMenu.map(item => {
    return { familyName: item.familyName, genuNames: [] }
  })
  let hash = {}; //数组去重
  fruitMenu = fruitMenu.reduce((item, next) => {
    hash[next.familyName] ? "" : hash[next.familyName] = true && item.push(next);
    return item
  }, [])
  tempMenu.map(menu => {
    for (let i in fruitMenu) {
      if (menu.familyName == fruitMenu[i].familyName) {
        if (fruitMenu[i].genuNames.indexOf(menu.genuName) < 0) {
          fruitMenu[i].genuNames.push(menu.genuName);
        }
      }
    }
  })

  try {
    fs.writeFileSync(
      `_dev/assets/data/fruitList.json`, JSON.stringify(fruitData, undefined, 2)
    );
    fs.writeFileSync(
      `_dev/assets/data/fruitMenu.json`, JSON.stringify(fruitMenu, undefined, 2)
      // `_dev/_data/fruitMenu.json`, JSON.stringify(fruitMenu, undefined, 2)
    );
  } catch (e) {
    console.log("Error: ", e);
  }
}

export const packCSSJS = series(
  removeOldCssJs,
  parallel(minifyCss, minifyJs, minifyHTML),
  parallel(revCss, revJs),
  revCollect
);