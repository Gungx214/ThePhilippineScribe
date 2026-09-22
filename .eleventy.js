const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true
    })
  );

  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/articles/*.md")
      .reverse();
  });

  eleventyConfig.addFilter("displayDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("urlencode", (str) => {
    return encodeURIComponent(str);
  });

  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");

  return {
    pathPrefix: "/",

    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
