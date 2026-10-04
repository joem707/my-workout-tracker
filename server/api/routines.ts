export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/warmup") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM warmup_exercises ORDER BY sequence_order ASC"
      ).all();
      return Response.json(results);
    }

    if (url.pathname === "/api/cooldown") {
      const { results } = await env.DB.prepare(
        "SELECT * FROM cooldown_exercises ORDER BY sequence_order ASC"
      ).all();
      return Response.json(results);
    }

    return new Response("Not Found", { status: 404 });
  }
};
