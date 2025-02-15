import { handle } from "hono/vercel";
import app from "../hono-app";

export const runtime = "nodejs";

export const GET = handle(app);
export const POST = handle(app);
