import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: import.meta.env.GITHUB_CLIENT_ID,
        client_secret: import.meta.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      return new Response('Error: ' + tokenData.error_description, { status: 400 });
    }

    // Return HTML page that posts the token to the CMS
    const html = '<!DOCTYPE html><html><head><title>Authenticating...</title></head><body><script>' +
      'window.opener.postMessage({token: "' + tokenData.access_token + '", provider: "github"}, window.location.origin);' +
      'window.close();' +
      '</script></body></html>';

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'inline',
      },
    });

  } catch (error) {
    console.error('OAuth error:', error);
    return new Response('OAuth authentication failed.', { status: 500 });
  }
};
