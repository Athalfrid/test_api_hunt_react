import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWeapon = ({ userLogged, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userLogged);
    if (!userLogged.isLogged) {
      navigate("/403");
    }
    if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });
  const tabTypeWeapon = [
    { id: 1, name: "■ □ □" },
    { id: 2, name: "■ ■ □" },
    { id: 3, name: "■ ■ ■" },
  ];

  const initialWeaponState = {
    name: "",
    type: tabTypeWeapon[0].name, // Initialiser avec le premier type
    damage: "",
    lightCaCdamage: "",
    heavyCaCdamage: "",
    range: "",
    ammoCapacity: "",
    price: "",
    typeMunition: "compact", // Initialiser avec une valeur par défaut
  };

  const [weapon, setWeapon] = useState(initialWeaponState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeapon({
      ...weapon,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(weapon);
    try {
      const response = await fetch("http://localhost:3000/api/v1/weapon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weapon),
      });
      const data = await response.json();
      console.log("Weapon added:", data);
      navigate("/armes");
    } catch (error) {
      console.error("Error adding weapon:", error);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter une nouvelle arme</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={weapon.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type d'arme</label>
          <select
            className="form-select"
            name="type"
            value={weapon.type}
            onChange={handleChange}
            required
          >
            {tabTypeWeapon.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Dommage</label>
          <input
            type="number"
            className="form-control"
            name="damage"
            value={weapon.damage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dommage léger au Cac</label>
          <input
            type="number"
            className="form-control"
            name="lightCaCdamage"
            value={weapon.lightCaCdamage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dommage lourd au Cac</label>
          <input
            type="number"
            className="form-control"
            name="heavyCaCdamage"
            value={weapon.heavyCaCdamage}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Portée</label>
          <input
            type="number"
            className="form-control"
            name="range"
            value={weapon.range}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Capacité en munitions</label>
          <input
            type="number"
            className="form-control"
            name="ammoCapacity"
            value={weapon.ammoCapacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type de munition</label>
          <select
            className="form-select"
            name="typeMunition"
            value={weapon.typeMunition}
            onChange={handleChange}
            required
          >
            <option value="compacte">Compact</option>
            <option value="moyenne">Moyenne</option>
            <option value="longue">Longue</option>
            <option value="pompe">Pompe</option>
            <option value="special">Spéciale</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={weapon.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter l'arme
        </button>
      </form>
    </div>
  );
};

export default CreateWeapon;
