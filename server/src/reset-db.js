const readline = require('readline');
const db = require('./db.js');
const initDB = require('./init-db.js');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function resetDatabase() {
    const answer = await new Promise(r =>
        rl.question('Drop all tables and recreate? (yes/no): ', r)
    );
    if (answer !== 'yes') return rl.close();

    const tables = await db.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema='public';
  `);

    for (const t of tables.rows) {
        await db.query(`DROP TABLE IF EXISTS "${t.table_name}" CASCADE`);
    }

    await initDB();
    rl.close();
    await db.end();
}

if (require.main === module) resetDatabase();
