import { roles as startingRoles } from "../data/roles";
import type { Role } from "../types/Role";

let roles: Role[] = structuredClone(startingRoles);

function getRoles() {
  return roles;
}

function createRole(
  firstName: string,
  lastName: string,
  role: string
) {
  const newRole: Role = {
    firstName,
    lastName,
    role,
  };

  roles = [...roles, newRole];

  return roles;
}

export const roleRepo = {
  getRoles,
  createRole,
};