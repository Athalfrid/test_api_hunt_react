import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const WeaponDetails = ({requiredRole}) => {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const userLogged = localStorage.getItem('userLogged') ?  JSON.parse(localStorage.getItem('userLogged')) : null;

  useEffect(() => {
    if (!userLogged) {
      navigate("/403");
    } else if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });

  const fetchWeapons = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/weapon`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des armes !"
        );
      }
      const jsondData = await response.json();
      setWeapons(jsondData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWeapons();
  }, []);

  const handleEdit = (weapon) => {
    // Fonction pour gérer l'édition d'un weapon
    console.log("Edit weapon with id:", weapon._id);
    navigate(`/admin/armes/edit/${weapon._id}`);
  };

  const handleDelete = async (weapon) => {
    console.log(`trying to delete ${weapon._id}`);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/weapon/${weapon._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("weapon deleted");
      fetchWeapons();
    } catch (error) {
      console.error("Error deleting weapon:", error);
    }
    setWeapons((prevWeapons) =>
      prevWeapons.filter((item) => item._id !== weapon._id)
    );
  };

  if (loading) {
    return <div>Chargement de la liste des armes...</div>;
  }
  if (error) {
    return (
      <div>
        Erreur lors de la récupération des éléments :<br />
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-2">
          <Link className="btn btn-info" to="/admin/armes/create">
            Ajouter Armes
          </Link>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <input
          className="mx-2"
          name="search"
          type="text"
          placeholder="Rechercher une arme"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table table-striped table-bordered">
        <tbody>
          {weapons
            .filter((weapon) =>
              weapon.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((weapon) => (
              <tr key={weapon._id}>
                <td>{weapon.name.toUpperCase()}</td>
                <td>{weapon.type.toUpperCase()}</td>
                <td>
                  {weapon.typeMunition.charAt(0).toUpperCase() +
                    weapon.typeMunition.slice(1)}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(weapon)}
                  >
                    Modifier
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(weapon)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeaponDetails;
