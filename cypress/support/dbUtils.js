const { Client } = require("pg");

const config = {
  host: 'localhost',
  port: 5432,
  user: 'user',
  password: 'password',
  database: 'mydatabase',
};

async function queryDatabase(query, params = []) {
  const client = new Client(config);
  await client.connect();

  try {
    const res = await client.query(query, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  } finally {
    await client.end();
  }
}

module.exports = {
  queryDatabase,
};
