const { Pool } = require('pg');
require('dotenv').config();

const config = process.env.DATABASE_URL
  ? {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
  }
  : {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'anamnesis',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '',
    ssl: process.env.NODE_ENV === 'production',
  };

const pool = new Pool(config);

module.exports = {
  connect: () => pool.connect(),
  query: (q, p) => pool.query(q, p),
  end: () => pool.end(),
};
