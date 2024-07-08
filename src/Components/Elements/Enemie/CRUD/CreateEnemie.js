import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEnemie = ({ requiredRole }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [health, setHealth] = useState("");
  const [damage, setDamage] = useState("");
  const [behavior, setBehavior] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/v1/enemie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type, health, damage, behavior }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navigate("/admin/ennemie/list");
    } catch (error) {
      console.error("Error creating ennemie:", error);
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
            placeholder="Nom de l'ennemie"
            required
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="name"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type d'ennemie"
            required
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="health">Santé</label>
          <input
            type="numeric"
            className="form-control m-2 p-2"
            id="health"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
            placeholder="Nom de l'ennemie"
            required
            min={0}
            max={1000}
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="damage">Dommage</label>
          <input
            type="numeric"
            className="form-control m-2 p-2"
            id="damage"
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
            placeholder="Dommages causés par l'ennemie"
            required
            min={0}
            max={150}
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="behavior">Comportement</label>
          <input
            type="text"
            className="form-control m-2 p-2"
            id="behavior"
            value={behavior}
            onChange={(e) => setBehavior(e.target.value)}
            placeholder="Nom de l'ennemie"
            required
          />
        </div>

        <div className="d-flex column justify-content-center">
          <button type="submit" className="btn btn-primary mt-2">
            Ajouter l'ennemie
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateEnemie;

/*
    name: { type: String, required: true },
    type: { type: String, required: true }, 
    health: { type: Number, required: true },
    damage: { type: Number, required: true },
    behavior: { type: String, required: true },

*/
