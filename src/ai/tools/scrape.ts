import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import { userAgents } from "../utils";

export const scrape = tool({
  description:
    "Scrape a list of urls from the internet and extract the content, this should include images, text, and other media",
  parameters: z
    .array(z.string().url().nonempty().describe("Link to the page to scrape"))
    .min(1)
    .max(5)
    .describe("List of urls to scrape"),
  execute: async (args) => {
    let urls = args.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.href;
    });

    urls = Array.from(new Set(urls));

    const scrapedUrls = [];

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const result = await axios.get(url, {
            headers: {
              "User-Agent":
                userAgents[Math.floor(Math.random() * userAgents.length)]
            }
          });
          return result.data;
        } catch (error) {
          console.error(`Error scraping ${url}:`, error);
          return null;
        } finally {
          scrapedUrls.push(url);
        }
      })
    );

    return results.filter((result) => result !== null);
  }
});
