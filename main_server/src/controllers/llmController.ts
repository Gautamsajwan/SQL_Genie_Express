import axios from "axios";
import { Request, Response, RequestHandler } from "express";
import generate from "../generate";
import { Client } from "pg";

export const generateSqlController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ error: "Please provide text to analyze" });
      return;
    }

    // Send request to Flask ML service
    const response = await axios.post("http://127.0.0.1:5000/generate_sql", {
      text,
    });

    res.json({
      success: true,
      ...response.data
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to get prediction" });
  }
};

export const generateSqlControllerrr: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const {queryDescription, schema} = req.body;
  
  try {
    const prompt = `
      Database Schema:
      ${JSON.stringify(schema, null, 2)}

      Query description:
      ${queryDescription}

      Generate a properly formatted SQL query based on the schema and query descripton.
      If the description is out of scope of the schema, return "Invalid query".
    `;
    let sqlQuery = await generate(prompt);

    if(sqlQuery.toLowerCase() === "invalid query") {
      res.status(400).json({ customMessage: "The request is out of the scope of the database schema" })
      return;
    }
    
    if (sqlQuery.startsWith('```sql')) {
      sqlQuery = sqlQuery.replace(/```sql|```/g, '').trim();
    }
    // sqlQuery = sqlQuery
    //   .split('\n') // Split into lines
    //   .map(line => line.trim()) // Trim each line
    //   .join('\n');

    res.json({ query: sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const executeQueryController = async (req: Request, res: Response): Promise<void> => {
  const { connectionString, schema, sqlQuery } = req.body;

  if (!connectionString || !schema || !sqlQuery) {
    res.status(400).json({ error: "Connection string, schema and SQL query are required" });
    return;
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    
    const prompt = `
      Format this particular sql query according to the postgresql syntax by properly enclosing table names and column names in quotes.
      Also make sure to use the correct table names and column names according to the database schema.
      
      Query:
      ${sqlQuery}

      Database Schema:
      ${JSON.stringify(schema, null, 2)}

      Dont add any extra comments or explanations.
      `;
      let formattedSqlQuery = await generate(prompt);

    if (formattedSqlQuery.startsWith('```sql')) {
      formattedSqlQuery = formattedSqlQuery.replace(/```sql|```/g, '').trim();
    }

    console.log("formatted query: ", formattedSqlQuery)

    // Execute the SQL query
    const result = await client.query(formattedSqlQuery);

    // Return the rows fetched from the query
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({ error: "Failed to execute SQL query" });
  } finally {
    await client.end();
  }
};