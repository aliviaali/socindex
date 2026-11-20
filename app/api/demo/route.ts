import { validateDemo } from "@/lib/demoValidation";

export const runtime = "nodejs";
const MAX_BODY_BYTES = 16_384;
const reply = (body: object, status = 200) => Response.json(body, {
  status, headers: { "Cache-Control": "no-store" },
});

export async function POST(request: Request) {
  // Only accept browser requests from this deployment (including preview deployments).
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return reply({ ok: false, error: "Invalid origin." }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply({ ok: false, error: "JSON required." }, 415);
  }
  const key = request.headers.get("idempotency-key");
  if (!key || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)) {
    return reply({ ok: false, error: "Invalid request ID." }, 400);
  }
  const reader = request.body?.getReader();
  if (!reader) return reply({ ok: false, error: "Missing body." }, 400);
  let input: unknown;
  try {
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        return reply({ ok: false, error: "Request too large." }, 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    input = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return reply({ ok: false, error: "Invalid JSON." }, 400);
  } finally {
    reader.releaseLock();
  }
  const { data, errors } = validateDemo(input);
  if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);

  const endpoint = process.env.DEMO_WEBHOOK_URL;
  const token = process.env.DEMO_WEBHOOK_TOKEN;
  if (!endpoint || !token) return reply({ ok: false, error: "Demo service is not configured." }, 503);
  try {
    if (new URL(endpoint).protocol !== "https:") throw new Error("HTTPS required");
  } catch {
    return reply({ ok: false, error: "Demo service is not configured." }, 503);
  }
  try {
    // Receiver must persist the lead before replying { accepted: true } and deduplicate by requestId.
    const upstream = await fetch(endpoint, {
      method: "POST", redirect: "error", cache: "no-store",
      headers: {
        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        "Idempotency-Key": key,
      },
      body: JSON.stringify({ requestId: key, ...data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstream.ok) return reply({ ok: false, error: "Could not save your request." }, 502);
    const result: unknown = await upstream.json();
    if (!result || typeof result !== "object" || !("accepted" in result) || result.accepted !== true) {
      return reply({ ok: false, error: "Your request was not acknowledged." }, 502);
    }
    return reply({ ok: true }, 201);
  } catch {
    return reply({ ok: false, error: "Demo service is temporarily unavailable." }, 502);
  }
}
