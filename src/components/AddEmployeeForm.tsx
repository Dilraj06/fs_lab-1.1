import { useState } from "react";

import type { Department } from "../types/Employee";
import { useFormInput } from "../hooks/useFormInput";
import { employeeService } from "../services/employeeService";

interface AddEmployeeFormProps {
  departments: Department[];
  onDepartmentsChange: (departments: Department[]) => void;
}

export default function AddEmployeeForm({
  departments,
  onDepartmentsChange,
}: AddEmployeeFormProps) {
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const departmentName = useFormInput(departments[0]?.name || "");

  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormMessage("");

    firstName.setMessage("");
    departmentName.setMessage("");

    const result = employeeService.createEmployee(
      firstName.value,
      lastName.value,
      departmentName.value
    );

    if (!result.success) {
      if (result.errors.firstName) {
        firstName.setMessage(result.errors.firstName);
      }

      if (result.errors.department) {
        departmentName.setMessage(result.errors.department);
      }

      return;
    }

    onDepartmentsChange(result.departments);

    firstName.reset("");
    lastName.reset("");
    departmentName.reset(departments[0]?.name || "");

    setFormMessage("Employee added successfully.");
  }

  return (
    <section className="employee-form-section">
      <h2>Add New Employee</h2>

      <p>Add a new employee to an existing department.</p>

      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>

          <input
            id="firstName"
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
          <label htmlFor="lastName">Last Name</label>

          <input
            id="lastName"
            type="text"
            value={lastName.value}
            onChange={lastName.handleChange}
            placeholder="Enter last name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>

          <select
            id="department"
            value={departmentName.value}
            onChange={departmentName.handleChange}
          >
            {departments.map((department) => (
              <option key={department.name} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>

          {departmentName.message && (
            <p className="form-message">{departmentName.message}</p>
          )}
        </div>

        {formMessage && <p className="success-message">{formMessage}</p>}

        <button type="submit">Add Employee</button>
      </form>
    </section>
  );
}