// ---------------------------------------------------------------------
// File: src/fanout.ts  (Queue Consumer)
// ---------------------------------------------------------------------
export default {
  async queue(batch: MessageBatch<Uint8Array>, env: Env, ctx: ExecutionContext) {
    const targets = (env.TARGET_URLS ?? "").split(/\s*,\s*/).filter(Boolean);
    const promises: Promise<any>[] = [];

    for (const msg of batch.messages) {
      for (const url of targets) {
        promises.push(
          fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: msg.body
          }).catch(err => console.error("fanout error", err))
        );
      }
      msg.ack();
    }

    await Promise.all(promises);
  }
} satisfies QueueHandler<Env>;
