"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQueryController = exports.generateSqlControllerrr = exports.generateSqlController = void 0;
const axios_1 = __importDefault(require("axios"));
const generate_1 = __importDefault(require("../generate"));
const pg_1 = require("pg");
const generateSqlController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ error: "Please provide text to analyze" });
            return;
        }
        // Send request to Flask ML service
        const response = yield axios_1.default.post("http://127.0.0.1:5000/generate_sql", {
            text,
        });
        res.json(Object.assign({ success: true }, response.data));
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to get prediction" });
    }
});
exports.generateSqlController = generateSqlController;
const generateSqlControllerrr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queryDescription, schema } = req.body;
    try {
        const prompt = `
      Database Schema:
      ${JSON.stringify(schema, null, 2)}

      Query description:
      ${queryDescription}

      Generate a properly formatted SQL query based on the schema and query descripton.
      If the description is out of scope of the schema, return "Invalid query".
    `;
        let sqlQuery = yield (0, generate_1.default)(prompt);
        if (sqlQuery.toLowerCase() === "invalid query") {
            res.status(400).json({ customMessage: "The request is out of the scope of the database schema" });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
});
exports.generateSqlControllerrr = generateSqlControllerrr;
const executeQueryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { connectionString, schema, sqlQuery } = req.body;
    if (!connectionString || !schema || !sqlQuery) {
        res.status(400).json({ error: "Connection string, schema and SQL query are required" });
        return;
    }
    const client = new pg_1.Client({ connectionString });
    try {
        yield client.connect();
        const prompt = `
      Format this particular sql query according to the postgresql syntax by properly enclosing table names and column names in quotes.
      Also make sure to use the correct table names and column names according to the database schema.
      
      Query:
      ${sqlQuery}

      Database Schema:
      ${JSON.stringify(schema, null, 2)}

      Dont add any extra comments or explanations.
      `;
        let formattedSqlQuery = yield (0, generate_1.default)(prompt);
        if (formattedSqlQuery.startsWith('```sql')) {
            formattedSqlQuery = formattedSqlQuery.replace(/```sql|```/g, '').trim();
        }
        console.log("formatted query: ", formattedSqlQuery);
        // Execute the SQL query
        const result = yield client.query(formattedSqlQuery);
        // Return the rows fetched from the query
        res.status(200).json({ success: true, data: result.rows });
    }
    catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({ error: "Failed to execute SQL query" });
    }
    finally {
        yield client.end();
    }
});
exports.executeQueryController = executeQueryController;
