import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { DATABASE_URL } from '$env/static/private'
import { userTable } from './schema';

let db: PostgresJsDatabase | null = null;

export function connectToPostgresqlDb() {
    try {
        db = drizzle(DATABASE_URL)
        console.log('connected to postgresql database')
        return db
    } catch (error) {
        console.error('failed connecting to postgresql database:', error)
        return null
    }
}

export function getPostgresDb() {
    if (db) return db;
    return connectToPostgresqlDb()        
}

export function keepDbAlive() {
    setInterval(async () => {
        const db = getPostgresDb()
        console.log("keeping db alive... db truthy: ", !!db)
        if (db) {
            const [user] = await db.select()
                .from(userTable)
                .limit(1)
            console.log("user:", user?.displayName)
        }
    }, 12 * 60 * 60 * 1000);
}