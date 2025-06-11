import express from "express";
import { PrismaClient } from "@prisma/client";
import modelRoutes from './routes/modelRoutes';
import userRoutes from './routes/userRoutes';
import dbContextRoutes from './routes/dbContextRoutes';
import cors from "cors";
import 'dotenv/config'

export const prisma = new PrismaClient(); // Prisma Client
const app = express();

console.log(process.env.CORS_ORIGIN)

// middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use('/', modelRoutes);
app.use('/user', userRoutes);
app.use('/', dbContextRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

// Export for Vercel (serverless)
export default app;