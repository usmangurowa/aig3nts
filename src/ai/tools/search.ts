import { tool } from "ai";
import { z } from "zod";
import { search as ddSearch, SafeSearchType } from "duck-duck-scrape";

export const search = tool({
  description: "Search for the latest information on the internet",
  parameters: z.object({
    query: z.string().nonempty().describe("The search query to use")
  }),
  execute: async (args) => {
    try {
      const searchResults = await ddSearch(args.query, {
        safeSearch: SafeSearchType.STRICT
      });

      if (searchResults.noResults) {
        return "No results found";
      }

      return searchResults;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return "An error occurred while searching the internet";
    }
  }
});
