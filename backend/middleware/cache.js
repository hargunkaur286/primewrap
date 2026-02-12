const cacheStore = new Map();
const CLEANUP_INTERVAL_MS = 60 * 1000;

const cleanupCache = () => {
  const now = Date.now();
  for (const [key, entry] of cacheStore) {
    if (entry.expiry <= now) {
      cacheStore.delete(key);
    }
  }
};

setInterval(cleanupCache, CLEANUP_INTERVAL_MS);

export const cacheMiddleware = ({
  durationSeconds = 60,
  keyBuilder,
} = {}) => {
  if (durationSeconds <= 0) {
    throw new Error("cacheMiddleware durationSeconds must be > 0");
  }

  return (req, res, next) => {
    const cacheKey = keyBuilder
      ? keyBuilder(req)
      : `${req.method}:${req.originalUrl}`;

    const cachedEntry = cacheStore.get(cacheKey);
    if (cachedEntry && cachedEntry.expiry > Date.now()) {
      res.set("X-Cache", "HIT");
      return res.status(cachedEntry.status).json(cachedEntry.body);
    }

    res.set("Cache-Control", `public, max-age=${durationSeconds}`);

    const originalJson = res.json.bind(res);
    res.json = (body) => {
      cacheStore.set(cacheKey, {
        status: res.statusCode,
        body,
        expiry: Date.now() + durationSeconds * 1000,
      });
      res.set("X-Cache", "MISS");
      return originalJson(body);
    };

    next();
  };
};
