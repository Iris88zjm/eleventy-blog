
// const xmlFiltersPlugin = require('eleventy-xml-plugin');
const codeStyleHooks = require('eleventy-plugin-code-style-hooks');

module.exports = function(eleventyConfig) {
  // Add Plugins
  eleventyConfig.addPlugin(codeStyleHooks);

  // API CONFIG GOES HERE
  eleventyConfig.setLiquidOptions({
      dynamicPartials: true,
      // strict_filters: true
  });

  // Add XML filters plugin
  // eleventyConfig.addPlugin(xmlFiltersPlugin);

  eleventyConfig.addWatchTarget("./_dev/assets/sass/");
  // Passthrough file copy '_dev/assets/' to '_production/assets' with no template processing
  eleventyConfig.addPassthroughCopy("./_dev/assets");

  eleventyConfig.addCollection("posts", function(collection) {
      return collection.getFilteredByGlob("_dev/posts/**/**/*.md");
  });

  function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  }
  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  eleventyConfig.addFilter("reversePosts", function(value) {
    let result = value.reverse();
    return result;
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