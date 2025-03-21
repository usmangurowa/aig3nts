import { tool, generateText } from "ai";
import { z } from "zod";
import { modelProvider } from "../models";

export const calculate = tool({
  description:
    "Performs calculations related to cryptocurrency, DeFi, and Web3. Includes conversions, APY calculations, potential profit/loss, and other financial computations.",
  parameters: z.object({
    calculationRequest: z
      .string()
      .nonempty()
      .describe(
        "The calculation to perform, including the necessary values and units. Example: 'Calculate the APY for staking 10 ETH at 5% for 1 year.' or 'Convert 1 BTC to USD.'"
      )
  }),
  execute: async (args) => {
    const { calculationRequest } = args;

    try {
      const result = await generateText({
        model: modelProvider.languageModel("chat-model-small"),
        system: `
        You are a cryptocurrency and Web3 calculation assistant. 
        Your task is to accurately perform financial calculations based on the user's request. 
        Provide the answer with the correct units and a brief explanation. 
        Ensure you handle different calculation types, including:
          - Currency conversions (e.g., BTC to USD, ETH to EUR).
          - APY and ROI calculations.
          - Potential profit/loss estimations.
          - Gas fee calculations.
          - Any other crypto-related financial calculations.
        If a calculation is impossible due to insufficient information, state that.
        `,
        messages: [
          {
            role: "user",
            content: calculationRequest
          }
        ]
      });
      return result;
    } catch (error) {
      console.error("Error performing crypto calculation:", error);
      return `Error performing crypto calculation `;
    }
  }
});
