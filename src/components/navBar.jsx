import React from "react";
import { Link, NavLink } from "react-router-dom";
import { capitalize } from "../utils/capitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-danger bg-danger mb-3">
      <Link className="navbar-brand text-white" to="/">
        <FontAwesomeIcon icon={faLeaf} /> Sweet Scent
      </Link>
      <div className="navbar-collapse">
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link text-white" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link text-white" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link text-white" to="/">
                {capitalize(user.name)}
              </NavLink>
              <NavLink className="nav-item nav-link text-white" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
