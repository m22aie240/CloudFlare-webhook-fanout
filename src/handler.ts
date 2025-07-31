// ---------------------------------------------------------------------
// File: src/handler.ts  (HTTP Worker)
// ---------------------------------------------------------------------
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const secret = env.WEBHOOK_SECRET ?? "demo";
    const signatureHeader = request.headers.get("x-signature") ?? "";
    const bodyArray = await request.arrayBuffer();

    // 1️⃣ verify HMAC
    const ok = await verifySignature(bodyArray, signatureHeader, secret);
    if (!ok) return new Response("Invalid signature", { status: 401 });

    // 2️⃣ enqueue for fan‑out (fire‑and‑forget)
    const payload = new Uint8Array(bodyArray);
    await env.FANOUT_QUEUE.send(payload);

    return new Response("queued", { status: 202 });
  }
} satisfies ExportedHandler<Env>;

type Env = {
  FANOUT_QUEUE: Queue;
  WEBHOOK_SECRET?: string;
  TARGET_URLS?: string; // fallback
};

import { verifySignature } from "./hmac";
