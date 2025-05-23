// configuring GOOGLE AI Client here
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // make data from .env file available

const googleAPIKey = process.env.GOOGLEAI_API_KEY;

if (!googleAPIKey) {
  console.error("GOOGLEAI_API_KEY is not set");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(googleAPIKey); // this object is used to make calls to google ai

export default genAI;
