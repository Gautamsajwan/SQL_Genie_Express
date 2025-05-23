import express from 'express';
import { executeQueryController, generateSqlController, generateSqlControllerrr } from '../controllers/llmController';

const router = express.Router()

router.post('/generateSql', generateSqlController)
router.post('/generateSqlll', generateSqlControllerrr)
router.post('/executeQuery', executeQueryController)

export default router