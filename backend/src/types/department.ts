import type { Employee } from "./Employee";

export interface Department {
  name: string;
  employees: Employee[];
}