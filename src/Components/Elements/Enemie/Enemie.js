import { useState, useEffect } from "react";
import EnemieCard from "./EnemieCard";
import "./Enemie.css";

function Enemie() {
  const [enemies, setEnemies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/enemie");
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération de la liste des ennemis"
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
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p className="text-center">Chargement en cours ...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <p className="text-center">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="row">
      {enemies.map((enemie) => (
        <div className="col-12 col-md-6 col-lg-4 mb-4" key={enemie._id}>
          <EnemieCard enemie={enemie} />
        </div>
      ))}
    </div>
  );
}

export default Enemie;
