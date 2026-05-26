import { useState } from "react";
import type { Department } from "../types/Employee";

interface AddEmployeeFormProps {
  departments: Department[];

  onAddEmployee: (
    firstName: string,
    lastName: string,
    departmentName: string
  ) => void;
}

export default function AddEmployeeForm({
  departments,
  onAddEmployee,
}: AddEmployeeFormProps) {

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [departmentName, setDepartmentName] =
    useState(departments[0]?.name || "");

  const [message, setMessage] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setMessage("");

    if (firstName.trim().length < 3) {

      setMessage(
        "First name must be at least 3 characters."
      );

      return;
    }

    onAddEmployee(
      firstName.trim(),
      lastName.trim(),
      departmentName
    );

    setFirstName("");
    setLastName("");

    setDepartmentName(
      departments[0]?.name || ""
    );

    setMessage("Employee added successfully.");
  }

  return (
    <section className="employee-form-section">

      <h2>Add New Employee</h2>

      <p>
        Add a new employee to an existing department.
      </p>

      <form
        className="employee-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label htmlFor="firstName">
            First Name
          </label>

          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(event) =>
              setFirstName(event.target.value)
            }
            placeholder="Enter first name"
          />

        </div>

        <div className="form-group">

          <label htmlFor="lastName">
            Last Name
          </label>

          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(event) =>
              setLastName(event.target.value)
            }
            placeholder="Enter last name"
          />

        </div>

        <div className="form-group">

          <label htmlFor="department">
            Department
          </label>

          <select
            id="department"
            value={departmentName}
            onChange={(event) =>
              setDepartmentName(event.target.value)
            }
          >

            {departments.map((department) => (

              <option
                key={department.name}
                value={department.name}
              >
                {department.name}
              </option>

            ))}

          </select>

        </div>

        {message && (
          <p className="form-message">
            {message}
          </p>
        )}

        <button type="submit">
          Add Employee
        </button>

      </form>

    </section>
  );
}