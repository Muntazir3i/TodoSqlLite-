// backend/db.js
import Database from 'better-sqlite3';

const db = new Database('todo.db');

// Create table if not exists
db.prepare(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        done BOOLEAN NOT NULL DEFAULT 0
    )
`).run();

export default db;



