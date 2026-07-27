import { useEffect, useState } from "react";
import { Show, SignInButton } from "@clerk/react";

import DepartmentCard from "../components/DepartmentCard";
import AddEmployeeForm from "../components/AddEmployeeForm";

import { departments as startingDepartments } from "../data/departments";

import type { Department } from "../types/Employee";

type ApiEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
};

function groupEmployeesByDepartment(employees: ApiEmployee[]): Department[] {
  const groupedDepartments: Department[] = [];

  employees.forEach((employee) => {
    let department = groupedDepartments.find(
      (item) => item.name === employee.department
    );

    if (!department) {
      department = {
        name: employee.department,
        employees: [],
      };

      groupedDepartments.push(department);
    }

    department.employees.push({
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
  });

  return groupedDepartments;
}

export default function EmployeesPage() {
  const [searchText, setSearchText] = useState("");

  const [departments, setDepartments] =
    useState<Department[]>(startingDepartments);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetch("http://localhost:3001/employees");

        if (!response.ok) {
          return;
        }

        const employees: ApiEmployee[] = await response.json();
        const groupedDepartments = groupEmployeesByDepartment(employees);

        if (groupedDepartments.length > 0) {
          setDepartments(groupedDepartments);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadEmployees();
  }, []);

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employees.length,
    0
  );

  return (
    <>
      <section className="intro">
        <h2>Departments & Employees</h2>

        <p className="total">Total Employees: {totalEmployees}</p>

        <input
          type="text"
          placeholder="Search employees..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </section>

      <section className="department-grid">
        {departments.map((department) => (
          <DepartmentCard
            key={department.name}
            department={department}
            searchText={searchText}
          />
        ))}
      </section>

      <Show when="signed-in">
        <AddEmployeeForm
          departments={departments}
          onDepartmentsChange={setDepartments}
        />
      </Show>

      <Show when="signed-out">
        <section className="login-message">
          <h3>Want to add a new employee?</h3>
          <p>Please log in to create new employee entries.</p>

          <SignInButton mode="modal">
            <button className="login-button" type="button">
              Login to add employee
            </button>
          </SignInButton>
        </section>
      </Show>
    </>
  );
}