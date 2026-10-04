import apiHandler from '../server/api/routines';

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return apiHandler.fetch(request, env);
    }

    return new Response('Workout Tracker API is active. Query /api/warmup or /api/cooldown.', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
