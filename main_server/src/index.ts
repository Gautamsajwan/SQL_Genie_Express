import express from "express";
import { PrismaClient } from "@prisma/client";
import modelRoutes from './routes/modelRoutes';
import userRoutes from './routes/userRoutes';
import dbContextRoutes from './routes/dbContextRoutes';
import cors from "cors";

export const prisma = new PrismaClient(); // Prisma Client

const port = process.env.PORT || 4000;
const app = express();

// middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Adjust the origin as needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});
app.use('/', modelRoutes);
app.use('/user', userRoutes);
app.use('/', dbContextRoutes);

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
