import { Client } from "pg";

export async function fetchDatabaseSchema(connectionString: string) {
  const client = new Client({ connectionString });

  try {
    await client.connect();

    // Query to fetch table and column details
    const result = await client.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);

    const schema = result.rows.reduce((acc: any, row: any) => {
      if (!acc[row.table_name]) {
        acc[row.table_name] = [];
      }
      acc[row.table_name].push({ column: row.column_name, type: row.data_type });
      return acc;
    }, {});

    return schema;
  } catch (error) {
    console.error("Error fetching database schema:", error);
    throw new Error("Failed to fetch database schema");
  } finally {
    await client.end();
  }
}

