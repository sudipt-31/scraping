const { JSDOM } = require("jsdom");

// Define the URL of the website you want to scrape
const url = "https://time.com/";

// Send a GET request to the URL
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((html) => {
    // Parse the HTML content of the page
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    var result = [];

    // Find the specific div you want to scrape
    for (var i = 0; i < 6; i++) {
      const targetDiv = doc.querySelectorAll(`.latest-stories__item`);
      const nthChildtargetDiv = targetDiv[i];

      // Extract the data from the div
      const title = nthChildtargetDiv.querySelector("h3").textContent.trim();
      const link = nthChildtargetDiv.querySelector("a").getAttribute("href");

      // Output the data
      const data = {
        title: title,
        link: link,
      };
      result.push(data);
    }

    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
