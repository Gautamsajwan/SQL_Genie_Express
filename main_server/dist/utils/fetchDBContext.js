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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDatabaseSchema = fetchDatabaseSchema;
const pg_1 = require("pg");
function fetchDatabaseSchema(connectionString) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({ connectionString });
        try {
            yield client.connect();
            // Query to fetch table and column details
            const result = yield client.query(`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
            const schema = result.rows.reduce((acc, row) => {
                if (!acc[row.table_name]) {
                    acc[row.table_name] = [];
                }
                acc[row.table_name].push({ column: row.column_name, type: row.data_type });
                return acc;
            }, {});
            return schema;
        }
        catch (error) {
            console.error("Error fetching database schema:", error);
            throw new Error("Failed to fetch database schema");
        }
        finally {
            yield client.end();
        }
    });
}
