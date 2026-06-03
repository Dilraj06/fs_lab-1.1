import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/employees"
        className="nav-link"
      >
        Employees
      </NavLink>

      <NavLink
        to="/organization"
        className="nav-link"
      >
        Organization
      </NavLink>
    </nav>
  );
}