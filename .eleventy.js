
// const xmlFiltersPlugin = require('eleventy-xml-plugin');
const codeStyleHooks = require('eleventy-plugin-code-style-hooks');
const elasticlunr = require("elasticlunr"); // search function
const CleanCSS  = require("clean-css");

module.exports = function (eleventyConfig) {
  // Add Plugins
  eleventyConfig.addPlugin(codeStyleHooks);

  // API CONFIG GOES HERE
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    // strict_filters: true
  });

  // Add XML filters plugin
  // eleventyConfig.addPlugin(xmlFiltersPlugin);

  eleventyConfig.addWatchTarget("./_dev/assets/css/");
  // eleventyConfig.addWatchTarget("./_dev/assets/sass/");
  // Passthrough file copy '_dev/assets/' to '_production/assets' with no template processing
  eleventyConfig.addPassthroughCopy("./_dev/assets");

  // Create drafts - https://giustino.blog/how-to-drafts-eleventy/
  const now = new Date();
  const publishedPosts = (post) => post.date <= now && !post.data.draft;
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("_dev/posts/**/**/*.md").filter(publishedPosts).reverse();
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1).sort().reverse();
  }

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return filterTagList([...tagSet]);
  });

  // Search 
  // https://www.raymondcamden.com/2019/10/20/adding-search-to-your-eleventy-static-site-with-lunr
  // https://www.belter.io/eleventy-search/
  eleventyConfig.addFilter("search", function (collection) {
    // what fields we'd like our index to consist of
    var index = elasticlunr(function () {
      // this.addField("title")
      // this.setRef("id");
    });
    // loop through each page and add it to the index
    collection.filter(publishedPosts).forEach((page) => {
      index.addDoc({
        id: page.url,
        title: page.template.frontMatter.data.title,
        tags: page.template.frontMatter.data.tags,
      });
    });
    return index.toJSON();
  });

  eleventyConfig.addCollection("postsSearch", collection => {
    return [...collection.getFilteredByGlob("_dev/posts/**/*.md")];
    // return [...collection.getFilteredByGlob("_dev/demo/")];
  });

  eleventyConfig.addFilter("reversePosts", function (value) {
    let result = value.reverse();
    return result;
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // RETURN OBJECTS HERE
  return {
    dir: {
      // Define input directory for development
      input: "_dev",
      // Define output directory for production files
      output: "_production",
      // Define default directory for partials and includes
      includes: "./_includes",
      // Define default directory for layout files
      layouts: "./_layouts",
    }
  };
};