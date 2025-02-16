import { Hono } from "hono";
import { chat } from "./chat";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello AI-G3NTS!"
  });
});

app.route("/chat", chat);

export default app;
