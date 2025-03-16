import { tool } from "ai";
import { z } from "zod";
import { search as ddSearch, SafeSearchType } from "duck-duck-scrape";

export const search = tool({
  description: "Search for the latest information on the internet",
  parameters: z.object({
    query: z.string().nonempty().describe("The search query to use")
  }),
  execute: async (args) => {
    const searchResults = await ddSearch(args.query, {
      safeSearch: SafeSearchType.STRICT
    });

    if (searchResults.noResults) {
      return "No results found";
    }

    return searchResults;
  }
});
