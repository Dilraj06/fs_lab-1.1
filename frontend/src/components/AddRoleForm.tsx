import { useState } from "react";

import { useFormInput } from "../hooks/useFormInput";
import { roleService } from "../services/roleService";
import type { Role } from "../types/Role";

interface AddRoleFormProps {
  onRolesChange: (roles: Role[]) => void;
}

export default function AddRoleForm({
  onRolesChange,
}: AddRoleFormProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const role = useFormInput("");

  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormMessage("");
    firstName.setMessage("");
    role.setMessage("");

    const result = roleService.createRole(
      firstName.value,
      lastName.value,
      role.value
    );

    if (!result.success) {
      if (result.errors.firstName) {
        firstName.setMessage(result.errors.firstName);
      }

      if (result.errors.role) {
        role.setMessage(result.errors.role);
      }

      return;
    }

    onRolesChange(result.roles);

    firstName.reset("");
    lastName.reset("");
    role.reset("");

    setFormMessage("Organization role added successfully.");
  }

  return (
    <section className="employee-form-section">
      <h2>Add Organization Role</h2>

      <p>Add a new person to the leadership and management list.</p>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roleFirstName">First Name</label>

          <input
            id="roleFirstName"
            type="text"
            value={firstName.value}
            onChange={firstName.handleChange}
            placeholder="Enter first name"
          />

          {firstName.message && (
            <p className="form-message">{firstName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="roleLastName">Last Name</label>

          <input
            id="roleLastName"
            type="text"
            value={lastName.value}
            onChange={lastName.handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="roleTitle">Role</label>

          <input
            id="roleTitle"
            type="text"
            value={role.value}
            onChange={role.handleChange}
            placeholder="Enter role"
          />

          {role.message && (
            <p className="form-message">{role.message}</p>
          )}
        </div>

        {formMessage && <p className="success-message">{formMessage}</p>}

        <button type="submit">Add Role</button>
      </form>
    </section>
  );
}