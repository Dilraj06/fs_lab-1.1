import { Show, SignInButton, UserButton } from "@clerk/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/employees" className="nav-link">
          Employees
        </NavLink>

        <NavLink to="/organization" className="nav-link">
          Organization
        </NavLink>
      </div>

      <div className="auth-area">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="login-button" type="button">
              Login
            </button>
          </SignInButton>
        </Show>

        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}