import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, getAuth } from "@clerk/express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function requireLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Authorization header:", req.headers.authorization ? "sent" : "missing");

  const { userId } = getAuth(req);

  console.log("Clerk userId:", userId);

  if (!userId) {
    res.status(401).json({ error: "User not authenticated" });
    return;
  }

  next();
}

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

app.post("/employees", requireLoggedIn, async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    if (!firstName || !lastName || !department) {
      res.status(400).json({ error: "Missing employee fields" });
      return;
    }

    const employeeRole = await prisma.role.upsert({
      where: { name: "Employee" },
      update: {},
      create: { name: "Employee" },
    });

    const employee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        department,
        roleId: employeeRole.id,
      },
      include: {
        role: true,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee" });
  }
});

app.post("/roles", requireLoggedIn, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Role name is required" });
      return;
    }

    const role = await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    res.status(201).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create role" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});