// ---------------------------------------------------------------------
// File: src/hmac.ts
// ---------------------------------------------------------------------
import { webcrypto as _crypto } from "node:crypto";
export async function verifySignature(body: ArrayBuffer, headerSig: string, secret: string): Promise<boolean> {
  const algo = { name: "HMAC", hash: "SHA-256" } as const;
  const keyData = new TextEncoder().encode(secret);
  const key = await crypto.subtle.importKey("raw", keyData, algo, false, ["sign"]);
  const sig = await crypto.subtle.sign(algo, key, body);
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return expected === headerSig.toLowerCase();
}
