const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
    try {
        const db = require('./db.js');
        const schemaPath = path.join(__dirname, '..', 'schema.sql');
        const schemaSQL = await fs.readFile(schemaPath, 'utf8');

        const statements = schemaSQL
            .split(';')
            .map(s => s.trim())
            .filter(Boolean);

        for (const stmt of statements) {
            await db.query(stmt);
        }

        const tables = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

        tables.rows.forEach(t => console.log(`• ${t.table_name}`));
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    } finally {
        const db = require('./db.js');
        if (db.end) await db.end();
    }
}

if (require.main === module) initializeDatabase();
module.exports = initializeDatabase;
