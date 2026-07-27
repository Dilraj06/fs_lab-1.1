import { useState } from "react";
import { Show, SignInButton } from "@clerk/react";

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

      <Show when="signed-in">
        <AddRoleForm onRolesChange={setRoles} />
      </Show>

      <Show when="signed-out">
        <section className="login-message">
          <h3>Want to add a new role?</h3>
          <p>Please log in to create new organization entries.</p>

          <SignInButton mode="modal">
            <button className="login-button" type="button">
              Login to add role
            </button>
          </SignInButton>
        </section>
      </Show>
    </>
  );
}