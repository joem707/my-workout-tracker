import apiHandler from '../server/api/routines';

export interface Env {
  DB: D1Database;
  ASSETS?: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Route API requests
    if (url.pathname.startsWith('/api/')) {
      return apiHandler.fetch(request, env);
    }

    // Serve static frontend assets
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Assets binding not detected. Ensure dist folder is uploaded and binding is configured.', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
