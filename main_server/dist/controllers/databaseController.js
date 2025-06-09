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
exports.getDatabaseSchema = void 0;
const fetchDBContext_1 = require("../utils/fetchDBContext");
const getDatabaseSchema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { connectionString } = req.body;
    if (!connectionString) {
        res.status(400).json({ error: "Connection string is required" });
        return;
    }
    try {
        const schema = yield (0, fetchDBContext_1.fetchDatabaseSchema)(connectionString);
        res.json({ success: true, schema });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getDatabaseSchema = getDatabaseSchema;
