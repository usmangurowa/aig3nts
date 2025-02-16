import { google } from "@ai-sdk/google";

import { customProvider } from "ai";

export const DEFAULT_CHAT_MODEL: string = "chat-model-small";

export const modelProvider = customProvider({
  languageModels: {
    "chat-model-small": google("gemini-2.0-flash-lite-preview-02-05"),
    "chat-model-large": google("gemini-2.0-flash"),
    "chat-model-reasoning": google("gemini-2.0-flash-thinking-exp-01-21"),
    "title-model": google("gemini-2.0-flash-lite-preview-02-05")
  }
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: "chat-model-small",
    name: "Small model",
    description: "Small model for fast, lightweight tasks"
  },
  {
    id: "chat-model-large",
    name: "Large model",
    description: "Large model for complex, multi-step tasks"
  },
  {
    id: "chat-model-reasoning",
    name: "Reasoning model",
    description: "Uses advanced reasoning"
  }
];
