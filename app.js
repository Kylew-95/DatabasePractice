import pg from "pg";

const connectionString = process.env.DB_CONNECTION_STRING;

const client = new pg.Client({ connectionString });

await client.connect();
const id = 5;
const values = [id];
const query = `SELECT * FROM books WHERE id = $1`;

const result = await client.query(query, values);
console.log(result.rows);

await client.end();
