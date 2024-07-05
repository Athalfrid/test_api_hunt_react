import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
const TraitDetails = ({ requiredRole }) => {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [search, setSearch] = useState("");
  const userLogged = localStorage.getItem('userLogged') ?  JSON.parse(localStorage.getItem('userLogged')) : null;

  useEffect(() => {
    if (!userLogged.isLogged) {
      navigate("/403");
    }
    if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });

  const fetchConsommable = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/trait`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des traits !"
        );
      }
      const jsonData = await response.json();
      setTraits(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConsommable();
  });
  const handleEdit = (trait) => {
    // Fonction pour gérer l'édition d'un trait
    console.log("Edit trait with id:", trait._id);
    navigate(`/admin/traits/edit/${trait._id}`);
  };

  const handleDelete = async (trait) => {
    console.log(`trying to delete ${trait._id}`);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/consumable/${trait._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("trait deleted");
      fetchConsommable();
    } catch (error) {
      console.error("Error deleting trait:", error);
    }
    setTraits((prevTraits) =>
      prevTraits.filter((item) => item._id !== trait._id)
    );
  };

  if (loading) {
    return <div>Chargement du détails des items</div>;
  }

  if (error) {
    return (
      <div>
        Erreur lors de la récupération des éléments : <br />
        {error}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-2 mb-2">
        <button className="btn btn-info mt-2">
          <Link className="nav-link" to="/admin/consommable/create">
            Ajouter Trait
          </Link>
        </button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <input
          className="mx-2"
          name="search"
          type="text"
          placeholder="Rechercher un trait"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div style={{ maxHeight: "450px", overflowY: "auto", marginTop: "20px" }}>
        <table className="table table-striped table-bordered">
          <tbody>
            {traits
              .filter((trait) =>
                trait.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((trait) => (
                <tr key={trait._id}>
                  <td>{trait.name.toUpperCase()}</td>
                  <td>{trait.lvlUnlocked ? 'Déverrouillé rang : '+trait.lvlUnlocked : ''}</td>
                  <td>
                    {trait.category.charAt(0).toUpperCase() +
                      trait.category.slice(1)}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(trait)}
                    >
                      Modifier
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(trait)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TraitDetails;
