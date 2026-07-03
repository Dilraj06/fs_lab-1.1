import { useState } from "react";

import AddRoleForm from "../components/AddRoleForm";
import { roleRepo } from "../repositories/roleRepo";
import type { Role } from "../types/Role";

export default function OrganizationPage() {
  const [roles, setRoles] = useState<Role[]>(roleRepo.getRoles());

  return (
    <>
      <section className="organization-page">
        <h2>Leadership & Management</h2>

        <div className="organization-list">
          {roles.map((person) => (
            <div
              className="organization-card"
              key={`${person.firstName}-${person.lastName}-${person.role}`}
            >
              <span>
                {person.firstName} {person.lastName}
              </span>

              <strong>{person.role}</strong>
            </div>
          ))}
        </div>
      </section>

      <AddRoleForm onRolesChange={setRoles} />
    </>
  );
}