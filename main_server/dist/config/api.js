"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// configuring GOOGLE AI Client here
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // make data from .env file available
const googleAPIKey = process.env.GOOGLEAI_API_KEY;
if (!googleAPIKey) {
    console.error("GOOGLEAI_API_KEY is not set");
    process.exit(1);
}
const genAI = new generative_ai_1.GoogleGenerativeAI(googleAPIKey); // this object is used to make calls to google ai
exports.default = genAI;
