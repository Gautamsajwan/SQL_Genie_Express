"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseController_1 = require("../controllers/databaseController");
const router = express_1.default.Router();
router.post("/fetch-schema", databaseController_1.getDatabaseSchema);
exports.default = router;
