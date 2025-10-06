import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ 
    client_id: import.meta.env.GITHUB_CLIENT_ID 
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
};



