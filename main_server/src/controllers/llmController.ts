import axios from "axios";
import { Request, Response } from "express";
import { RequestHandler } from "express";

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
