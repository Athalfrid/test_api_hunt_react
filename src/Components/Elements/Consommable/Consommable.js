import React, { useEffect, useState } from "react";
import ConsommableCard from "./ConsommableCard";
import "./Consommable.css";

function Consommable() {
  const [consummables, setConsummables] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/consumable");
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des consommables !"
        );
      }
      const jsonData = await response.json();

      // Organiser les consommables par type
      const groupedByType = jsonData.reduce((acc, item) => {
        const typeKey = item.type.toLowerCase();
        (acc[typeKey] = acc[typeKey] || []).push(item);
        return acc;
      }, {});
      console.log(groupedByType)

      setConsummables(groupedByType);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
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

  if (Object.keys(consummables).length === 0) {
    return (
      <div className="container">
        <div className="d-flex row">
          <h2 className="text-center my-4">Aucune donnée enregistrée !</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">Consommables</h2>
      {Object.keys(consummables).map((type) => (
        <div key={type} className="encard mb-4">
          <h4 className="my-4">
            {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
            <span>({consummables[type].length})</span>
          </h4>
          <div className="grid-container">
            {consummables[type].map((item) => (
              <div className="grid-item" key={item._id}>
                <ConsommableCard item={item} fetchData={fetchData} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Consommable;
