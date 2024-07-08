import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateTrait = ({requiredRole}) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [lvlUnlocked, setLevelUnlocked] = useState("");
  const userLogged = localStorage.getItem('userLogged') ?  JSON.parse(localStorage.getItem('userLogged')) : null;

  useEffect(() => {
    if (!userLogged) {
      navigate("/403");
    } else if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });
  
  const listCategory = [
    { id: 1, libelle: "Offensif" },
    { id: 2, libelle: "Défensif" },
    { id: 3, libelle: "Mouvement" },
    { id: 4, libelle: "Support" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/trait", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, category, description, cost,lvlUnlocked }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Consommable created:", data);
      navigate("/traits");
    } catch (error) {
      console.error("Error creating consommable:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="form-group m-2">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du trait"
            required
            m-2
            p-2
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="type">Catégorie</label>
          <select
            className="form-control m-2 p-2"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Sélectionnez une catégorie
            </option>
            {listCategory.map((cat) => (
              <option key={cat.id} value={cat.libelle}>
                {cat.libelle}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group m-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="effects">Coût</label>
          <input
            type="number"
            min={0}
            max={10}
            className="form-control m-2 p-2"
            id="effects"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Coût"
            required
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="effects">Rang d'obtention</label>
          <input
            type="number"
            min={1}
            max={100}
            className="form-control m-2 p-2"
            id="effects"
            value={lvlUnlocked}
            onChange={(e) => setLevelUnlocked(e.target.value)}
            placeholder="Rang d'obtention"
            required
          />
        </div>
        <div className="d-flex column justify-content-center">
          <button type="submit" className="btn btn-primary mt-2">
            Ajouter le trait
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center mt-2">
        <button
          className="btn btn-info"
          onClick={() => navigate("/traits")}
        >
          Retour
        </button>
      </div>
    </>
  );
};

export default CreateTrait;
