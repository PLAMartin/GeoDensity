// Basic in-memory rate limiting for the waitlist endpoint. This state is
// single-process and resets on server restart or between serverless
// instances — acceptable for an MVP validation site, not a durable limiter.

type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const buckets = new Map<string, Bucket>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}
