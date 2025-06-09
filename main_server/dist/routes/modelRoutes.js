"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const llmController_1 = require("../controllers/llmController");
const router = express_1.default.Router();
router.post('/generateSql', llmController_1.generateSqlController);
router.post('/generateSqlll', llmController_1.generateSqlControllerrr);
router.post('/executeQuery', llmController_1.executeQueryController);
exports.default = router;
