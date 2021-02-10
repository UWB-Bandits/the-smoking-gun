import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav style={{ margin: "15px" }}>
      <Link to={"/"} style={{ margin: "15px" }}>
        <strong>Home</strong>
      </Link>
      <Link to={"/dashboard"} style={{ margin: "15px" }}>
        <strong>Dashboard</strong>
      </Link>
    </nav>
  );
}

export default Nav;
