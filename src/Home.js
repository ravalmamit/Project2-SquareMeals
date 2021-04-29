import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/fork-spoon-1.jpeg";

function Home(props) {
  return (
    <div>
      <img className="homeImage" src={logo} alt="Logo" />

      <Link to="/meal">
        <h2 className="homeHeading">KNOW WHAT YOU EAT.</h2>
      </Link>
    </div>
  );
}

export default Home;
