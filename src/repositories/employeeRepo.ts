import { departments as startingDepartments } from "../data/departments";
import type { Department, Employee } from "../types/Employee";

let departments: Department[] = structuredClone(startingDepartments);

function getDepartments() {
  return departments;
}

function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
) {
  const newEmployee: Employee = {
    firstName,
    lastName,
  };

  departments = departments.map((department) => {
    if (department.name === departmentName) {
      return {
        ...department,
        employees: [...department.employees, newEmployee],
      };
    }

    return department;
  });

  return departments;
}

export const employeeRepo = {
  getDepartments,
  createEmployee,
};