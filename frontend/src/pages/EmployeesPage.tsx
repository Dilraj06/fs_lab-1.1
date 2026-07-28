import { useMemo, useState } from "react";
import { Show, SignInButton } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";

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

async function fetchEmployees(): Promise<ApiEmployee[]> {
  const response = await fetch("http://localhost:3001/employees");

  if (!response.ok) {
    throw new Error("Failed to load employees");
  }

  return response.json();
}

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

  const [localDepartments, setLocalDepartments] = useState<Department[] | null>(
    null
  );

  const {
  data: employees,
  isLoading,
  isError,
  isFetching,
  refetch,
} = useQuery({
  queryKey: ["employees"],
  queryFn: fetchEmployees,
});

  const departments = useMemo(() => {
    if (localDepartments) {
      return localDepartments;
    }

    if (employees && employees.length > 0) {
      return groupEmployeesByDepartment(employees);
    }

    return startingDepartments;
  }, [employees, localDepartments]);

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employees.length,
    0
  );

  return (
    <>
      <section className="intro">
        <h2>Departments & Employees</h2>

        {isLoading && <p className="total">Loading employees...</p>}

        {isError && (
          <p className="total">
            Backend is not available, showing local employee data.
          </p>
        )}

        <p className="total">Total Employees: {totalEmployees}</p>

         <p className="total">
           Data managed with TanStack Query
            {isFetching ? " - refreshing..." : " - ready"}
            </p>

            <button
             className="login-button"
             type="button"
             onClick={() => refetch()}
             >
              Refresh Data
            </button>

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
          onDepartmentsChange={setLocalDepartments}
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