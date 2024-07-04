import { NavLink } from "react-router-dom";
import Login from "../Login/Login";

const NotLogged = () => {
    return(
        <div className="container mt-5">
            <h1 className="text-center">403 - Acces Unauthorized</h1>
            <p className="text-center">Sorry, the page you are looking for requires you to login</p>
            <div className="d-flex justify-content-center">
            <NavLink
                className="btn btn-primary"
                to="/login"
                element={<Login />}>Go to login</NavLink>
            </div>
        </div>
    )
}

export default NotLogged;