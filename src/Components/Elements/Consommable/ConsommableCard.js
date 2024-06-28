import React from "react";
import { useNavigate } from "react-router-dom";
import "./Consommable.css";

const ConsommableCard = ({ item, fetchData }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/consommable/edit/${item._id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/consumable/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Consommable deleted");
      fetchData();
    } catch (error) {
      console.error("Error deleting consommable:", error);
    }
  };
  const handleDetails = () => {
    navigate(`/consommable/${item._id}`);
  };

  return (
    <div className="card d-flex row">
      <div className="d-flex divImg" id="divGauche">
        <img src={item.image} alt={item.name} className="card-img-left" />
      </div>
      <div className="d-flex row" id="divDroite">
        <div className="d-flex justify-content-around" id="divNameType">
          <h5 className="card-title">{item.name}</h5>
          <p>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
        </div>
        <div className="d-flex" id="divDescEffBtn">
          <div className="d-flex row" id="divDescEff">
            <p className="card-text text-truncate">{item.description}</p>
            <p className="card-text text-truncate">
              <strong>Effects:</strong> {item.effects}
            </p>
          </div>
          <div className="card-buttons d-flex column" id="divBtn">
            <button className="btn btn-info" onClick={handleDetails}>
              ℹ
            </button>
            <button className="btn btn-primary" onClick={handleEdit}>
              🖉
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsommableCard;

/**
 * 
 * 
 * <div className="card-body d-flex">
        <div className="d-flex  divImgTitle">
        </div>
        <div className="card-content d-flex column">
        <div className="card-content d-flex column">
          <div className="d-flex justify-content-between align-items-center">
          </div>
          <div className="p-2 d-flex row">
          </div>
        </div>
        <div className="card-buttons d-flex column">
        </div>
        </div>
      </div>
*/


//TODO:  Continuer affichage de la card