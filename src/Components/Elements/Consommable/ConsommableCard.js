import React from "react";
import "./Consommable.css";

const ConsommableCard = ({ item, fetchData }) => {
  return (
    <div className="card" id="divCardFull">
      <div className="" id="divGauche">
        <img
          src={item.image ? item.image : require("../../../img/logo192.png")}
          alt={item.name}
          className="card-img-left"
        />
        {/**TODO: Enlever le if dans le chemin de l'image */}
      </div>
      <div className="d-flex" id="divDroite">
        <div className="d-flex justify-content-around" id="divNameType">
          <h5 className="card-title">{item.name.toUpperCase()}</h5>
          <div className="d-flex column" id="divType">
            <p className="ml-2">Catégorie :</p>
            <i>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</i>
          </div>
        </div>
        <div className="d-flex" id="divDescEffBtn">
          <div className="d-flex row" id="divDescEff">
            <p className="card-text text-truncate">{item.description}</p>
            <p className="card-text text-truncate">
              <strong>Effects:</strong> <i>{item.effects}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsommableCard;
