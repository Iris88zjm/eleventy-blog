
// const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
// import codeStyleHooks from 'eleventy-plugin-code-style-hooks';
const elasticlunr = require("elasticlunr"); // search function
const fs = require("fs");

module.exports = function(eleventyConfig) {
  // Add Plugins
  // eleventyConfig.addPlugin(codeStyleHooks);

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

  // Search active posts
  eleventyConfig.addFilter("search", function (collection) {
    let urlObj = {data: []};
    collection.forEach((page, index) => {
      let pageObj = {
        id: (index + 1),
        url: page.url,
        title: page.template._frontMatter.data.title,
        description: page.template._frontMatter.data.pageDescription,
        tags: page.template._frontMatter.data.tags,
      }
      urlObj.data[index] = pageObj;
    })
    try {
      fs.writeFileSync(
        `_dev/assets/data/searchPost.json`, JSON.stringify(urlObj, undefined, 2)
        );
    } catch (e) {
      console.log("Error: ", e);
    }
  });

  eleventyConfig.addCollection("postsSearch", collection => {
    return [...collection.getFilteredByGlob("_dev/posts/**/*.md").filter(publishedPosts)];
  });

  eleventyConfig.addFilter("reversePosts", function (value) {
    let result = value.reverse();
    return result;
  });

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
  }
};