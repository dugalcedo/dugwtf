export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
  'Access-Control-Max-Age': '86400',
};


export function createCorsOptionsResponse() {
  return new Response(null, {
    status: 200,
    headers: CORS_HEADERS
  });
}

export function createCorsOptionsHandler() {
    return () => {
        return new Response(null, {
            status: 200,
            headers: CORS_HEADERS
        });
    }
}