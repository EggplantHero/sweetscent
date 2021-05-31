import React from "react";
import { GiLindenLeaf } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="navbar">
      <span className="navbar-brand user-select-none mx-5" href="/">
        <GiLindenLeaf /> Sweet Scent
      </span>
    </nav>
  );
};

export default Navbar;
