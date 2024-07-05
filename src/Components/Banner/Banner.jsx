import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./BannerStyle.css";
import { useEffect, useState } from "react";

const Banner = ({ handleLogout }) => {
  const storedUser = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;
  const [name, setName] = useState("");

  useEffect(() => {
    if (storedUser && storedUser.name.length > 0) {
      setName(
        storedUser.name.charAt(0).toUpperCase() + storedUser.name.slice(1)
      );
    }
  }, [storedUser]);
  return (
    <div className="banner">
      <div className="banner-image">
        <div className="title">
          <h1 style={{ color: "black" }}>WIKIHUNT</h1>
        </div>
        <div className="btnLog">
          {!storedUser || !storedUser.isLogged ? (
            <>
              <NavLink
                className="btn btn-secondary"
                to="/register"
                element={<Register />}
              >
                Inscription
              </NavLink>
              <NavLink
                className="btn btn-primary"
                to="/login"
                element={<Login />}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
              <p>
                Welcome 
              <NavLink className="btn btn-info" to="/profile">
                {name}
              </NavLink>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Banner;
