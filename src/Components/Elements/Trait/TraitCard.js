import React, { useState } from "react";
import "./style/styleTrait.css";

const TraitCard = ({ trait }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(()=> {
        setIsFlipped(false)
    },4000)
  };

  return (
    <div className="card-container" onClick={handleFlip}>
      <div className={`card ${isFlipped ? "flipped" : ""}`}>
        <div className="card-front">
          <img
            src={trait.image ? trait.image : require("../../../img/logo192.png")}
            alt={trait.name}
            className="card-img-top"
            draggable={false}
          />
          <h5 className="card-title">{trait.name.toUpperCase()}</h5>
        </div>
        <div className="card-back">
            <span>Effet :</span>
          <p className="card-description">{trait.description}</p>
          <div className="cost"><i style={{marginRight:'4px'}}>Coût :</i>{trait.cost} pts</div>
        </div>
      </div>
    </div>
  );
};

export default TraitCard;
