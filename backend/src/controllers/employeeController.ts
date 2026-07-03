import { Request, Response } from "express";
import { employeeService } from "../services/employeeServices";

export function getDepartments(req: Request, res: Response) {
  const departments = employeeService.getDepartments();
  res.json(departments);
}