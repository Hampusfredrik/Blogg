import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, redirect }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirect to GitHub OAuth
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', import.meta.env.GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('scope', 'repo');
    githubAuthUrl.searchParams.set('redirect_uri', 'https://blogg-brown-two.vercel.app/api/auth');
    
    return redirect(githubAuthUrl.toString());
  }

  try {
    // Exchange code for token
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

    const accessToken = tokenData.access_token;

    // Return HTML that posts message to parent window
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Authenticating...</title>
    <script>
        (function() {
            // Post the token to the parent window (CMS)
            if (window.opener) {
                window.opener.postMessage({
                    token: '${accessToken}',
                    provider: 'github'
                }, '*');
                window.close();
            } else {
                // Fallback if window.opener is not available
                document.body.innerHTML = '<p>Authentication successful! You can close this window.</p>';
            }
        })();
    </script>
</head>
<body>
    <p>Authenticating...</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': 'inline',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    return new Response('Authentication failed: ' + error.message, { status: 500 });
  }
};