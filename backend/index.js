import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to Database");
    app.listen(3000);
  } catch (err) {
    console.error(" Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
