import pg from "pg";

const connectionString = process.env.DB_CONNECTION_STRING;
const client = new pg.Client({ connectionString });

async function resetDB() {
  try {



    await client.connect();
    await client.query('DROP TABLE "books"');
  } catch (error) {
    console.error(error.stack);
  } finally {
    await client.end();
  }
}
// resetDB();

async function updateDB() {
  await client.connect();

  try {
    const query = `
    CREATE TABLE "books" (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        author_id INTEGER,
        title TEXT,
        published_date DATE,
        FOREIGN KEY (author_id) REFERENCES authors(id)
      );
    `;

    await client.query(query); // Execute the query
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    await client.end(); // Close the database connection
  }
}

// updateDB();

async function insertBook() {
  try {
    await client.connect();
    const query = `
    INSERT INTO books (author_id, title, published_date)
    VALUES
    (1, 'Animal Farm', '1945-08-17'),
    (2, 'Harry Potter and the Chamber of Secrets', '1998-07-02'),
    (3, 'The Hobbit', '1937-09-21');
    `;
    await client.query(query);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.end();
  }
}
insertBook();
