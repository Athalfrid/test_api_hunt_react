import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ConsommableDetails = ({ requiredRole }) => {
  const [consommables, setConsommables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userLogged = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;

    useEffect(() => {
      if (!userLogged) {
        navigate("/403");
      } else if (requiredRole && userLogged.role !== requiredRole) {
        navigate("/402");
      }
    });

  useEffect(() => {
    fetchConsommable();
  });
  const fetchConsommable = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/consumable`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des consommables !"
        );
      }
      const jsonData = await response.json();
      setConsommables(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleEdit = (consommable) => {
    // Fonction pour gérer l'édition d'un consommable
    console.log("Edit consommable with id:", consommable._id);
    navigate(`/admin/consommable/edit/${consommable._id}`);
  };

  const handleDelete = async (consommable) => {
    console.log(`trying to delete ${consommable._id}`);
    try {
      const response = await fetch(
        `${API_URL}/api/v1/consumable/${consommable._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Consommable deleted");
      fetchConsommable();
    } catch (error) {
      console.error("Error deleting consommable:", error);
    }
    setConsommables((prevConsommables) =>
      prevConsommables.filter((item) => item._id !== consommable._id)
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
      <div className="d-flex justify-content-center mt-2 mb-4">
        <Link className="btn btn-info" to="/admin/consommable/create">
          Ajouter Consommable
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <tbody>
          {consommables.map((consommable) => (
            <tr key={consommable._id}>
              <td>{consommable.name.toUpperCase()}</td>
              <td>
                {consommable.type.charAt(0).toUpperCase() +
                  consommable.type.slice(1)}
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(consommable)}
                >
                  Modifier
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(consommable)}
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

export default ConsommableDetails;
