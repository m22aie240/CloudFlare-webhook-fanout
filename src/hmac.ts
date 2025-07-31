// ---------------------------------------------------------------------
// File: src/hmac.ts
// ---------------------------------------------------------------------
import { webcrypto as _crypto } from "node:crypto";
const subtle = (globalThis.crypto ?? _crypto).subtle;

export async function verifySignature(
  body: ArrayBuffer,
  headerSig: string,
  secret: string,
): Promise<boolean> {
  const algo = { name: "HMAC", hash: "SHA-256" } as const;
  const key = await subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    algo,
    false,
    ["sign"],
  );
  const buf = await subtle.sign(algo, key, body);
  const expected = [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  return expected === headerSig.toLowerCase();
}
