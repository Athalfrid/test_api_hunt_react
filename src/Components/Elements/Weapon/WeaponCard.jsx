import React from "react";
import './style/styleWeapon.css';

const WeaponCard = ({ weapon, onClick }) => {
  return (
    <div
      className="list-group-item list-group-item-action column weapon-card"
      onClick={onClick}
    >
      <img className="imgWeapon" src={weapon.image ? weapon.image : require('../../../img/logo192.png')} alt={weapon.name} />
      <p className="weapon-name">{weapon.name.charAt(0).toUpperCase() + weapon.name.slice(1)}</p>
    </div>
  );
};

export default WeaponCard;
