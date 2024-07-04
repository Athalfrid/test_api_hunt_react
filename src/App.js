import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Consommable from "./Components/Elements/Consommable/Consommable";
import Enemie from "./Components/Elements/Enemie/Enemie";
import Hunter from "./Components/Elements/Hunter/Hunter";
import Tools from "./Components/Elements/Tools/Tools";
import Trait from "./Components/Elements/Trait/Trait";
import Weapon from "./Components/Elements/Weapon/Weapon";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/Error/NotFound";
import Register from "./Components/Register/Register";
import Banner from "./Components/Banner/Banner";

import EditConsommable from "./Components/Elements/Consommable/CRUD/EditConsommable";
import DeleteConsommable from "./Components/Elements/Consommable/CRUD/DeleteConsommable";
import CreateConsommable from "./Components/Elements/Consommable/CRUD/CreateConsommable";
import ConsommableDetails from "./Components/Elements/Consommable/CRUD/ConsommableDetails";

import TraitDetails from "./Components/Elements/Trait/CRUD/TraitDetails";
import CreateTrait from "./Components/Elements/Trait/CRUD/CreateTrait";
import EditTrait from "./Components/Elements/Trait/CRUD/EditTrait";
import DeleteTrait from "./Components/Elements/Trait/CRUD/DeleteTrait";

import CreateWeapon from "./Components/Elements/Weapon/CRUD/CreateWeapon";
import NotLogged from "./Components/Error/NotLogged";
import NotAdmin from "./Components/Error/NotAdmin";
import AdminNavbar from "./Components/NavBar/AdminNavbar";

function App() {
  const [userLogged, setUserLogged] = useState({
    userId: null,
    token: "",
    isLogged: false,
    role: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserLogged({ userId: null, token: "", isLogged: false, role: "" });
    if(userLogged.isLogged) {
      window.location.href = '/';
    }
  };

  return (
    <Router>
      <div className="App">
        <Banner userLogged={userLogged} handleLogout={handleLogout} />
        <NavBar userLogged={userLogged} />
        {userLogged.role === "admin" && <AdminNavbar />}
        <Routes>
          {/* Routes publiques */}
          <Route exact path="/" element={<Home userLogged={userLogged} />} />
          <Route exact path="/consommable" element={<Consommable />} />
          <Route exact path="/traits" element={<Trait />} />
          <Route exact path="/enemie" element={<Enemie />} />
          <Route exact path="/chasseur" element={<Hunter />} />
          <Route exact path="/outils" element={<Tools />} />
          <Route exact path="/armes" element={<Weapon />} />
          <Route
            exact
            path="/login"
            element={<Login setUserLogged={setUserLogged} />}
          />
          <Route exact path="/register" element={<Register />} />

          <Route
            path="/admin/consommable/:id"
            element={
              <ConsommableDetails
                userLogged={userLogged}
                requiredRole="admin"
              />
            }
          />
          <Route
            path="/admin/consommable/create"
            element={
              <CreateConsommable userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/consommable/edit/:id"
            element={
              <EditConsommable userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/consommable/delete/:id"
            element={
              <DeleteConsommable userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/traits/:id"
            element={
              <TraitDetails userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/traits/create"
            element={
              <CreateTrait userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/traits/edit/:id"
            element={<EditTrait userLogged={userLogged} requiredRole="admin" />}
          />
          <Route
            path="/admin/traits/delete/:id"
            element={
              <DeleteTrait userLogged={userLogged} requiredRole="admin" />
            }
          />
          <Route
            path="/admin/armes/create"
            element={
              <CreateWeapon userLogged={userLogged} requiredRole="admin" />
            }
          />
          {/* Route 402 - Not Admin */}
          <Route path="/402" element={<NotAdmin />} />
          {/* Route 403 - Not Logged */}
          <Route path="/403" element={<NotLogged />} />
          {/* Route 404 */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
