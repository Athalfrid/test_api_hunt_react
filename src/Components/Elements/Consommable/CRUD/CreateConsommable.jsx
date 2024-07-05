import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateConsommable = ({requiredRole}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [effects, setEffects] = useState("");
  const [price, setPrice] = useState("");  
  const userLogged = localStorage.getItem('userLogged') ?  JSON.parse(localStorage.getItem('userLogged')) : null;

  useEffect(() => {
    if (!userLogged.isLogged) {
      navigate("/403");
    }
    if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/v1/consumable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type, description, effects, price }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/admin/consommable/list");
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
            placeholder="Nom du consommable"
            required
            m-2
            p-2
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type de consommable"
            required
          />
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
          <label htmlFor="effects">Effets</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="effects"
            value={effects}
            onChange={(e) => setEffects(e.target.value)}
            placeholder="Effets"
            required
          />
        </div>
        <div className="form-group m-2">
          <label htmlFor="effects">Prix</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="effects"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Prix"
            required
          />
        </div>
        <div className="d-flex column justify-content-center">
          <button type="submit" className="btn btn-primary mt-2">
            Ajouter le consommable
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-center mt-2">
        <button
          className="btn btn-info"
          onClick={() => navigate("/admin/consommable/list")}
        >
          Retour
        </button>
      </div>
    </>
  );
};

export default CreateConsommable;
