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
