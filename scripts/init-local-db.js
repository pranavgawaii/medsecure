const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is missing');
  process.exit(1);
}

const client = new Client({
  connectionString,
});

async function init() {
  try {
    await client.connect();
    console.log('Connected to database');

    const sqlPath = path.join(__dirname, '01-init-database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Running SQL script...');
    await client.query(sql);
    console.log('Database initialized successfully with tables and seed data.');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await client.end();
  }
}

init();
