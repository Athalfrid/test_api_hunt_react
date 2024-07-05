import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="w-100 d-flex align-items-center">
          <div className="px-5">
            <h3 className="navbar-brand">WIKIHUNT - Administration</h3>
          </div>
          <div className="navbar" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/consommable/list">
                  Liste des Consommables
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/traits/list">
                  Liste des traits
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/armes/list">
                  Liste des armes
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/outils/list">
                  Liste des outils
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/chasseur/list">
                  Liste des chasseurs
                </Link>
              </li>
              <span></span>
              <li style={{ border: "1px solid lightgrey" }}>
                <Link className="nav-link" to="/admin/ennemie/list">
                  Liste des ennemies
                </Link>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  );
};

export default AdminNavbar;
