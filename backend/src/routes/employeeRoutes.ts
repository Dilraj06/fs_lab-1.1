import { Router } from "express";
import { getDepartments } from "../controllers/employeeController";

const router = Router();

router.get("/employees", getDepartments);

export default router;