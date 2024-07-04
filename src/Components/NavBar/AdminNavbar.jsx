import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = ({ handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="w-100 d-flex align-items-center">
          <div>
            <h3 className="navbar-brand">WIKIHUNT - Administration</h3>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/consommable/list">
                  Liste des Consommables
                </Link>
              </li>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/consommable/create">
                  Ajouter Consommable
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/traits/list">
                  Liste des traits
                </Link>
              </li>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/traits/create">
                  Ajouter trait
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/armes/list">
                  Liste des armes
                </Link>
              </li>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/armes/create">
                  Ajouter Armes
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  );
};

export default AdminNavbar;
