import { Hono } from "hono";
import { agents } from "@/ai/agents";
import {
  CoreMessage,
  type Message,
  convertToCoreMessages,
  createDataStreamResponse,
  smoothStream,
  streamText
} from "ai";
import { modelProvider } from "@/ai/models";
import { nanoid } from "nanoid";
import { search } from "@/ai/tools/search";

const chat = new Hono();

chat.post("/:agent", async (c) => {
  const agent = c.req.param("agent");
  const agentData = agents.find((a) => a.id === agent);

  const body = await c.req.json();

  const messages = convertToCoreMessages(body.messages);

  if (!agentData) {
    return c.json({ error: "Agent not found" }, 404);
  }

  //   return c.json(agentData);

  return createDataStreamResponse({
    status: 200,
    statusText: "OK",
    execute: async (dataStream) => {
      const result = streamText({
        model: modelProvider.languageModel("chat-model-small"),
        system: agentData.initial_prompt,
        messages,
        maxSteps: 20,
        experimental_transform: smoothStream({ chunking: "word" }),
        experimental_generateMessageId: nanoid,
        experimental_continueSteps: true,
        tools: {
          search
        },
        onStepFinish(event) {
          // console.log('onStepFinish', event);
        },
        onFinish: async ({ response, reasoning }) => {
          console.log("onFinish", { response, reasoning });
        },
        experimental_telemetry: {
          isEnabled: true,
          functionId: "stream-text"
        }
      });

      result.mergeIntoDataStream(dataStream, {
        sendReasoning: true
      });

      const steps = await result.steps;
      console.dir(steps, { depth: null });
      console.log("total steps", steps.length);
    },

    onError: (error) => {
      console.log(error);
      return "Oops, an error occured!";
    }
  });
});

export { chat };
