import { tool } from "ai";
import { z } from "zod";
import { search as ddSearch, SafeSearchType } from "duck-duck-scrape";

export const scrape = tool({
  description:
    "Scrape a list of urls from the internet and extract the content, this should include images, text, and other media",
  parameters: z
    .array(z.string().nonempty().describe("Link to the page to scrape"))
    .describe("List of urls to scrape"),
  execute: async (args) => {}
});
