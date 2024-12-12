const fs = import("fs");
const NOT_FOUND_PATH = "/public/404.html";

export default async function(eleventyConfig) {

  eleventyConfig.addWatchTarget('tailwind.config.js');
  eleventyConfig.addWatchTarget('tailwind.css');

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/images/**/*.png");
  eleventyConfig.addPassthroughCopy("src/images/**/*.svg");
  eleventyConfig.addPassthroughCopy("src/images/**/*.webp");

  eleventyConfig.addPassthroughCopy({ "src/favicon": "/images/favicon/" });

  eleventyConfig.addFilter("justYear", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy');
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
			"md",
			"njk",
			"html"
		],
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};

export const config = {
  dir: {
    input: "src",
    output: "public",
    includes: "/_includes",
    data: "_data"
  }
};
