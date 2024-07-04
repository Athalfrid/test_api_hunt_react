import { NavLink } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./BannerStyle.css";

const Banner = ({ userLogged, handleLogout }) => {
  return (
    <div className="banner">
      <div className="banner-image">
        <div className="title">
          <h1 style={{ color: "black" }}>WIKIHUNT</h1>
        </div>
        <div className="btnLog">
          {!userLogged.isLogged ? (
            <>
              <NavLink
                className="btn btn-primary"
                to="/login"
                element={<Login />}
              >
                Login
              </NavLink>
              <NavLink
                className="btn btn-secondary"
                to="/register"
                element={<Register />}
              >
                Inscription
              </NavLink>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
              <p>Welcome {userLogged.role}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Banner;
