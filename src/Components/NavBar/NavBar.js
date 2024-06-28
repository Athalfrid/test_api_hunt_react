import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar(){
    return (
        <div className="navbar">
            <NavLink exact to="/chasseur" activeclassname="active">Chasseurs</NavLink>
            <NavLink exact to="/traits" activeclassname="active">Traits</NavLink>
            <NavLink exact to="/armes" activeclassname="active">Armes</NavLink>
            <NavLink exact to="/munitions-speciales" activeclassname="active">Munitions spéciales</NavLink>
            <NavLink exact to="/outils" activeclassname="active">Outils</NavLink>
            <NavLink exact to="/consommable" activeclassname="active">Consommables</NavLink>
            <NavLink exact to="/enemie" activeclassname="active">Enemies</NavLink>
            <NavLink exact to="/loot" activeclassname="active">Loots</NavLink>
        </div>
    )
}

export default NavBar;