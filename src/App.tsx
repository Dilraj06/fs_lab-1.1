import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DepartmentCard from "./components/DepartmentCard";
import { departments } from "./data/departments";

function App() {
  const [searchText, setSearchText] = useState("");

  const totalEmployees = departments.reduce(
    (total, department) => total + department.employees.length,
    0
  );

  return (
    <>
      <Header />

      <main>
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
      </main>

      <Footer />
    </>
  );
}

export default App;