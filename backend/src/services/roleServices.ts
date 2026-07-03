import { roleRepository } from "../repositories/roleRepository";
import type { Role } from "../types/role";

interface CreateRoleResult {
  success: boolean;
  roles: Role[];
  errors: {
    firstName?: string;
    role?: string;
  };
}

function getRoles() {
  return roleRepository.getRoles();
}

function createRole(
  firstName: string,
  lastName: string,
  role: string
): CreateRoleResult {
  const errors: {
    firstName?: string;
    role?: string;
  } = {};

  const roles = roleRepository.getRoles();

  const roleExists = roles.some(
    (person) => person.role.toLowerCase() === role.trim().toLowerCase()
  );

  if (firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  if (roleExists) {
    errors.role = "This role is already occupied.";
  }

  if (errors.firstName || errors.role) {
    return {
      success: false,
      roles,
      errors,
    };
  }

  const updatedRoles = roleRepository.createRole(
    firstName.trim(),
    lastName.trim(),
    role.trim()
  );

  return {
    success: true,
    roles: updatedRoles,
    errors: {},
  };
}

export const roleService = {
  getRoles,
  createRole,
};