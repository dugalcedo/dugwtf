import { json, error } from "@sveltejs/kit"
import { readFileSync } from "fs"
// @ts-ignore - use asm.js build to avoid WASM file resolution issues on Vercel
import initSqlJs from "sql.js/dist/sql-asm.js"
import type { RequestHandler } from "@sveltejs/kit"

let db: Awaited<ReturnType<typeof initSqlJs>> extends infer SQL ? (SQL extends { Database: new (...args: any[]) => infer D } ? D : never) : never

async function getDb() {
	if (!db) {
		const SQL = await initSqlJs()
		const buffer = readFileSync("data/everynoise.db")
		db = new SQL.Database(buffer)
	}
	return db
}

export const GET: RequestHandler = async ({ url }) => {
	const database = await getDb()
	const id = url.searchParams.get("id")

	let sample: { id: number; artist: string; title: string; url: string; genreName: string } | undefined

	if (id) {
		const stmt = database.prepare("SELECT id, artist, title, url, genreName FROM samples WHERE id = ?")
		stmt.bind([id])
		if (stmt.step()) {
			const row = stmt.getAsObject()
			sample = row as unknown as typeof sample
		}
		stmt.free()
	} else {
		const stmt = database.prepare("SELECT id, artist, title, url, genreName FROM samples ORDER BY RANDOM() LIMIT 1")
		if (stmt.step()) {
			const row = stmt.getAsObject()
			sample = row as unknown as typeof sample
		}
		stmt.free()
	}

	if (!sample) {
		return error(500, "failed to query sample")
	}

	const addStmt = database.prepare("SELECT id, artist, title, url FROM additionalSamples WHERE parentSampleId = ?")
	addStmt.bind([sample.id])
	const additionalSamples: { id: number; artist: string; title: string; url: string }[] = []
	while (addStmt.step()) {
		additionalSamples.push(addStmt.getAsObject() as unknown as { id: number; artist: string; title: string; url: string })
	}
	addStmt.free()

	return json({
		...sample,
		additionalSamples,
	})
}
