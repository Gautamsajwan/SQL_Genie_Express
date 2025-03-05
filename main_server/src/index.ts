import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import modelRoutes from './routes/modelRoutes'
import cors from "cors";

export const prisma = new PrismaClient(); // Prisma Client

const port = process.env.PORT || 4000;
const app = express();

// middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json("Express + TypeScript Server");
});
app.use('/', modelRoutes);

const startServer = async() => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.error(error.message)
  }
}

startServer();
