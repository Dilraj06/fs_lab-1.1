import { Request, Response } from "express";
import { roleService } from "../services/roleServices";

export function getRoles(req: Request, res: Response) {
   const roles = roleService.getRoles();
  res.json(roles);
}