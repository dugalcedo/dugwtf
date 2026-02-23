import { json, error } from "@sveltejs/kit"
import Database from "better-sqlite3"
import type { RequestHandler } from "@sveltejs/kit"

const db = new Database("data/everynoise.db", { readonly: true })

export const GET: RequestHandler = ({ url }) => {
	const id = url.searchParams.get("id")

	let sample: { id: number; artist: string; title: string; url: string; genreName: string } | undefined

	if (id) {
		sample = db.prepare("SELECT id, artist, title, url, genreName FROM samples WHERE id = ?").get(id) as typeof sample
	} else {
		sample = db.prepare("SELECT id, artist, title, url, genreName FROM samples ORDER BY RANDOM() LIMIT 1").get() as typeof sample
	}

	if (!sample) {
		return error(500, "failed to query sample")
	}

	const additionalSamples = db.prepare("SELECT id, artist, title, url FROM additionalSamples WHERE parentSampleId = ?").all(sample.id) as { id: number; artist: string; title: string; url: string }[]

	return json({
		...sample,
		additionalSamples,
	})
}
