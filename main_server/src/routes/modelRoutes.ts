import express from 'express';
import { generateSqlController } from '../controllers/llmController';

const router = express.Router()

router.post('/generateSql', generateSqlController)

export default router