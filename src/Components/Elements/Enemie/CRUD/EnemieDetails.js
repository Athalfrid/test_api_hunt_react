import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EnemieDetails = ({ requiredRole }) => {
  const userLogged = localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged"))
    : null;
  const [enemies, setEnemies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!userLogged) {
      navigate("/403");
    } else if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });

  useEffect(() => {
    fetchEnnemies();
  });

  const fetchEnnemies = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/enemie`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des ennemies !"
        );
      }
      const jsonData = await response.json();
      setEnemies(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  if (loading) {
    return <div>Chargement du détails des ennemies.</div>;
  }
  if (error) {
    <div>
      Erreur lors de la récupération des éléments : <br />
      {error}
    </div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-2 mb-4">
        <Link className="btn btn-info " to="/admin/ennemie/create">
          Ajouter ennemie
        </Link>
      </div>
      <table className="table table-striped table-bordered">
        <tbody>
          {enemies.map((ennemie) => (
            <tr key={ennemie._id}>
              <td>{ennemie.name.toUpperCase()}</td>
              <td>
                {ennemie.type.charAt(0).toUpperCase() + ennemie.type.slice(1)}
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(ennemie)}
                >
                  Modifier
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ennemie)}
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

export default EnemieDetails;

/*
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    health: { type: Number, required: true },
    damage: { type: Number, required: true },
    behavior: { type: String, required: true },

*/
