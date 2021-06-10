import React from "react";
import { GiLindenLeaf } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav flex-row">
        <span className="navbar-brand user-select-none mx-4 my-auto align-items-center">
          <Link to="/" className="nav-link">
            <GiLindenLeaf /> Sweet Scent
          </Link>
        </span>
        <li className="nav-item p-2">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item p-2">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
