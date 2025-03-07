import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

function NavBar({ userLogged }) {
  const storedUser = localStorage.getItem("userLogged")
  ? JSON.parse(localStorage.getItem("userLogged"))
  : null;
  return (
    <div className="navbar">
      <NavLink to="/" activeclassname="selected">
        Home
      </NavLink>
      <NavLink to="/chasseur" activeclassname="selected">
        Chasseurs
      </NavLink>
      <NavLink to="/traits" activeclassname="selected">
        Traits
      </NavLink>
      <NavLink to="/armes" activeclassname="selected">
        Armes
      </NavLink>
      <NavLink to="/outils" activeclassname="selected">
        Outils
      </NavLink>
      <NavLink to="/consommable" activeclassname="selected">
        Consommables
      </NavLink>
      <NavLink to="/enemie" activeclassname="selected">
        Enemies
      </NavLink>
      {storedUser && storedUser.isLogged && <NavLink>Forum<br/>(bientôt !)</NavLink>}
    </div>
  );
}

export default NavBar;