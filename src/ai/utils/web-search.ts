import axios from "axios";
import { nhm } from ".";

export const searchDuckDuckGo = async (query: string) => {
  try {
    // http://duckduckgo.com/?q=example
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get(
      `https://duckduckgo.com/html/?q=${encodedQuery}`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );

    // Combine Results and RelatedTopics for more comprehensive search results

    return nhm.translate(response.data);
  } catch (error) {
    console.error("Error searching DuckDuckGo:", error);
    throw new Error("Failed to search DuckDuckGo");
  }
};
