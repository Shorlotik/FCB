const buckets = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 25;

/**
 * Простой in-memory лимит по IP (для serverless — окно сбрасывается при холодном старте).
 * В проде лучше Redis / edge rate limit.
 */
export function checkRateLimit(key: string): { ok: true } | { ok: false } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return { ok: true };
  }
  if (b.count >= MAX_REQUESTS) {
    return { ok: false };
  }
  b.count += 1;
  return { ok: true };
}

export function clientKeyFromRequest(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "local";
}
