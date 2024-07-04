import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditConsommable = ({ userLogged }) => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [effects, setEffects] = useState("");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!userLogged.token.length === 0 || userLogged.role !== "admin") {
      navigate("/login");
    }
    const fetchConsommable = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/consumable/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setType(data.type);
        setEffects(data.effects);
      } catch (error) {
        console.error("Error fetching consommable:", error);
      }
    };

    fetchConsommable();
  }, [id, navigate, userLogged,API_URL]);

  const handleSubmit = async (e) => {
    const token = userLogged.token;
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/v1/consumable/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description, type, effects }),
        }
      );
      navigate("/admin/consommable/list");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Consommable updated:", data);
    } catch (error) {
      console.error("Error updating consommable:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="effects" className="form-label">
            Effets
          </label>
          <textarea
            className="form-control"
            id="effects"
            value={effects}
            onChange={(e) => setEffects(e.target.value)}
            placeholder="Effets"
            rows="3"
          ></textarea>
        </div>
        <div className="d-flex column justify-content-center">
          <button type="submit" className="btn btn-primary mt-2">
            Modifier
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
    </div>
  );
};

export default EditConsommable;
