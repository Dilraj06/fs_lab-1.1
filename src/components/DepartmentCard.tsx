import type { Department } from "../types/Employee";

interface DepartmentCardProps {
  department: Department;
  searchText: string;
}

export default function DepartmentCard({
  department,
  searchText,
}: DepartmentCardProps) {
  const filteredEmployees = department.employees.filter((employee) =>
    `${employee.firstName} ${employee.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  if (filteredEmployees.length === 0) {
    return null;
  }

  return (
    <article className="department-card">
      <h3>{department.name}</h3>

      <p className="employee-count">
        {filteredEmployees.length} Employee(s)
      </p>

      <ul>
        {filteredEmployees.map((employee) => (
          <li key={`${employee.firstName}-${employee.lastName}`}>
            {employee.firstName} {employee.lastName}
          </li>
        ))}
      </ul>
    </article>
  );
}