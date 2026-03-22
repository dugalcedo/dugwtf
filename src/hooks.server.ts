import { connectToPostgresqlDb, keepDbAlive } from '$lib/server/db/connect';

connectToPostgresqlDb()
keepDbAlive()

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  return response;
}