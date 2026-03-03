import { connectToPostgresqlDb } from '$lib/server/db/connect';

connectToPostgresqlDb()

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  return response;
}