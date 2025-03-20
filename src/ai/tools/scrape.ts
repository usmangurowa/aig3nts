import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import { userAgents } from "../utils";
import { NodeHtmlMarkdown } from "node-html-markdown";

const nhm = new NodeHtmlMarkdown(
  /* options (optional) */ {},
  /* customTransformers (optional) */ undefined,
  /* customCodeBlockTranslators (optional) */ undefined
);

export const scrape = tool({
  description:
    "Scrape a list of urls from the internet and extract the content, this should include images, text, and other media",
  parameters: z.object({
    urls: z
      .array(z.string().nonempty().describe("Link to the page to scrape"))
      .describe("List of urls to scrape")
  }),
  execute: async (args) => {
    let urls = args.urls.map((url) => {
      const parsedUrl = new URL(url);
      return parsedUrl.href;
    });

    urls = Array.from(new Set(urls));

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const result = await axios.get(url, {
            headers: {
              "User-Agent":
                userAgents[Math.floor(Math.random() * userAgents.length)]
            }
          });
          if (result.data) {
            if (typeof result.data === "string") {
              return nhm.translate(result.data);
            }
            return result.data;
          }
          return null;
        } catch (error) {
          console.error(`Error scraping ${url}:`, error);
          return null;
        }
      })
    );

    return results.filter((result) => result !== null);
  }
});
