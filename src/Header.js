import React from "react";
import Nav from "./Nav";
import { Route, Link } from "react-router-dom";
import Details from "./Details";
import logo from "./images/fork-spoon-1.jpeg";

function Header(props) {
  return (
    <header className="main-header">
      {/* <img className="headerImage" src={logo} alt="Logo" /> */}
      <h1 style={{ fontFamily: "Impact" }}>Square Meals</h1>

      <nav>
        {/* <Nav /> */}
        <Link className="navBarLink" to="/">
          Home
        </Link>
        <Link className="navBarLink" to="/meal">
          Meals
        </Link>
        <Link to="/details">Fast Foods</Link>
      </nav>
    </header>
  );
}

export default Header;
