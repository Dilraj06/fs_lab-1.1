import { employeeRepo } from "../repositories/employeeRepo";
import type { Department } from "../types/Employee";

interface CreateEmployeeResult {
  success: boolean;
  departments: Department[];
  errors: {
    firstName?: string;
    department?: string;
  };
}

function createEmployee(
  firstName: string,
  lastName: string,
  departmentName: string
): CreateEmployeeResult {
  const errors: {
    firstName?: string;
    department?: string;
  } = {};

  const departments = employeeRepo.getDepartments();

  const departmentExists = departments.some(
    (department) => department.name === departmentName
  );

  if (firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  if (!departmentExists) {
    errors.department = "Please select an existing department.";
  }

  if (errors.firstName || errors.department) {
    return {
      success: false,
      departments,
      errors,
    };
  }

  const updatedDepartments = employeeRepo.createEmployee(
    firstName.trim(),
    lastName.trim(),
    departmentName
  );

  return {
    success: true,
    departments: updatedDepartments,
    errors: {},
  };
}

export const employeeService = {
  createEmployee,
};