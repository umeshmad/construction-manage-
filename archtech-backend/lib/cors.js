const ALLOWED_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

export function getCorsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || ALLOWED_ORIGIN,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function corsHeaders() {
  return getCorsHeaders(ALLOWED_ORIGIN);
}

// Wraps a NextResponse (or Response) and adds CORS headers to it
export function withCors(response) {
  const headers = corsHeaders();
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}