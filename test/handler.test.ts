// ---------------------------------------------------------------------
// File: test/handler.test.ts
// ---------------------------------------------------------------------
import { describe, it, expect, vi } from "vitest";
import handler from "../src/handler";

describe("handler.fetch", () => {
  it("returns 401 on bad signature", async () => {
    const req = new Request("https://worker.dev", { method: "POST", body: "{}" });
    const env: any = { FANOUT_QUEUE: { send: vi.fn() }, WEBHOOK_SECRET: "secret" };
    const res = await handler.fetch(req, env, {} as any);
    expect(res.status).toBe(401);
  });
});
