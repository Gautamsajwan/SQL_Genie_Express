import { Request, RequestHandler, Response } from "express";
import { fetchDatabaseSchema } from "../utils/fetchDBContext";

export const getDatabaseSchema: RequestHandler = async(req: Request, res: Response): Promise<void> => {
  const { connectionString } = req.body;

  if (!connectionString) {
    res.status(400).json({ error: "Connection string is required" });
    return
  }

  try {
    const schema = await fetchDatabaseSchema(connectionString);
    res.json({ success: true, schema });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}