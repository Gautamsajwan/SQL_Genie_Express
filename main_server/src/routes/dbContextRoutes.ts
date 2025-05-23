import express from "express";
import { getDatabaseSchema } from "../controllers/databaseController";

const router = express.Router();

router.post("/fetch-schema", getDatabaseSchema);

export default router;