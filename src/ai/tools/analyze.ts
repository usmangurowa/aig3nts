import { tool, generateText } from "ai";
import { z } from "zod";
import { modelProvider } from "../models";

export const analyze = tool({
  description:
    "Analyze the user's question and the search result or response, providing a summary or key insights.",
  parameters: z.object({
    question: z
      .string()
      .nonempty()
      .describe("The user's question or statement."),
    response: z
      .string()
      .optional()
      .describe("The search result or AI response, if available.")
  }),
  execute: async (args) => {
    const { question, response } = args;

    try {
      const result = await generateText({
        model: modelProvider.languageModel("chat-model-small"),
        system: `
        You are a smart AI analyzer. 
        Your task is to analyze the user's question and the provided response. 
        Provide a concise summary or key insights, highlighting relevant information.
        If the response is empty, or null, state that there was no response provided.
        `,
        messages: [
          {
            role: "user",
            content: question
          },
          {
            role: "assistant",
            content: response ? response : "There was no response provided."
          }
        ]
      });
      return result;
    } catch (error) {
      console.error("Error analyzing text:", error);
      return `Error analyzing data`;
    }
  }
});
