import apiHandler from '../server/api/routines';

export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Route API requests to the D1 routines handler
    if (url.pathname.startsWith('/api/')) {
      return apiHandler.fetch(request, env);
    }

    // Serve the compiled React app
    return env.ASSETS.fetch(request);
  }
};
