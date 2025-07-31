# CloudFlare-webhook-fanout
A Cloudflare Workers + Queues service that takes one inbound webhook, verifies its HMAC signature, and fans the payload out to N destinations with per-target retries, exponential back-off and signing. Perfect for SaaS platforms that need “enterprise-grade” webhooks without running servers.
