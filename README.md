# CloudFlare-webhook-fanout
A Cloudflare Workers + Queues service that takes one inbound webhook, verifies its HMAC signature, and fans the payload out to N destinations with per-target retries, exponential back-off and signing. Perfect for SaaS platforms that need “enterprise-grade” webhooks without running servers.

Project Skeleton
----------------
cf-webhook-fanout/
├── wrangler.toml
├── src/
│   ├── handler.ts         # verify & enqueue
│   ├── fanout.ts          # queue consumer
│   └── hmac.ts
├── test/
│   └── handler.test.ts
├── .github/workflows/ci.yml
├── README.md
└── LICENSE (MIT)



# cf‑webhook‑fanout

> **Cloudflare Workers + Queues** reference project that verifies an inbound webhook, queues the payload, and fans it out to multiple targets with at‑least‑once delivery.

### Quick start
```bash
npm i
npx wrangler dev --env local
```

### Env vars
| var | purpose |
|-----|---------|
| `WEBHOOK_SECRET` | HMAC shared secret |
| `TARGET_URLS`    | Comma‑separated list of endpoints |

### Roadmap
- [ ] Exponential back‑off & DLQ (Dead Letter Queue)
- [ ] Web UI (Pages) for managing targets
- [ ] Prometheus exporter via Trace Workers

---

## Next Steps (for us)
1. **Set WEBHOOK_SECRET as a Wrangler secret**: `wrangler secret put WEBHOOK_SECRET`.
2. **Push** this skeleton to GitHub, enable Actions CI (vitest) later.
3. Once this is merged, we’ll iterate on Projects 3 & 4.
