import { employeeRepository } from "../repositories/employeeRepository";
import type { Department } from "../types/department";

interface CreateEmployeeResult {
  success: boolean;
  departments: Department[];
  errors: {
    firstName?: string;
    department?: string;
  };
}

function getDepartments(): Department[] {
  return employeeRepository.getDepartments();
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

  const departments = employeeRepository.getDepartments();

  const departmentExists = departments.some(
    (d) => d.name === departmentName
  );

  if (firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters";
  }

  if (!departmentExists) {
    errors.department = "Department does not exist";
  }

  if (errors.firstName || errors.department) {
    return {
      success: false,
      departments,
      errors,
    };
  }

  const updatedDepartments = employeeRepository.createEmployee(
    firstName,
    lastName,
    departmentName
  );

  return {
    success: true,
    departments: updatedDepartments,
    errors: {},
  };
}

export const employeeService = {
  getDepartments,
  createEmployee,
};