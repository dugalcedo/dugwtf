import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { DATABASE_URL } from '$env/static/private'

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