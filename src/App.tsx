import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentCard from "./components/DepartmentCard";
import AddEmployeeForm from "./components/AddEmployeeForm";

import { departments as startingDepartments }
from "./data/departments";

import type { Department }
from "./types/Employee";

function App() {

  const [searchText, setSearchText] =
    useState("");

  const [departments, setDepartments] =
    useState<Department[]>(
      startingDepartments
    );

  const totalEmployees =
    departments.reduce(

      (total, department) =>

        total +
        department.employees.length,

      0
    );

  function addEmployee(

    firstName: string,
    lastName: string,
    departmentName: string

  ) {

    const updatedDepartments =
      departments.map((department) => {

        if (
          department.name ===
          departmentName
        ) {

          return {

            ...department,

            employees: [

              ...department.employees,

              {
                firstName,
                lastName,
              },

            ],

          };

        }

        return department;

      });

    setDepartments(updatedDepartments);

  }

  return (
    <>

      <Header />

      <main>

        <section className="intro">

          <h2>
            Departments & Employees
          </h2>

          <p className="total">
            Total Employees:
            {" "}
            {totalEmployees}
          </p>

          <input
            type="text"
            placeholder="Search employees..."
            value={searchText}
            onChange={(event) =>
              setSearchText(
                event.target.value
              )
            }
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

        <AddEmployeeForm
          departments={departments}
          onAddEmployee={addEmployee}
        />

      </main>

      <Footer />

    </>
  );
}

export default App;