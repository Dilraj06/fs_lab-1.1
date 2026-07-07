import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();

app.use(cors());
app.use(express.json());

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        role: true,
      },
    });

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});