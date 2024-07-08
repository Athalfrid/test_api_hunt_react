import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditWeapon = ({requiredRole}) => {
  const { id } = useParams();

  const userLogged = localStorage.getItem('userLogged') ?  JSON.parse(localStorage.getItem('userLogged')) : null;

  useEffect(() => {
    if (!userLogged) {
      navigate("/403");
    } else if (requiredRole && userLogged.role !== requiredRole) {
      navigate("/402");
    }
  });

  const tabTypeWeapon = [
    { id: 1, name: "■ □ □" },
    { id: 2, name: "■ ■ □" },
    { id: 3, name: "■ ■ ■" },
  ];
  const [weapon, setWeapon] = useState({
    name: "",
    type: "",
    damage: "",
    lightCaCdamage: "",
    heavyCaCdamage: "",
    range: "",
    ammoCapacity: "",
    price: "",
    typeMunition: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!userLogged.token || userLogged.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchWeapon = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/weapon/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }
        const data = await response.json();
        setWeapon({
          name: data.name,
          type: data.type,
          damage: data.damage,
          lightCaCdamage: data.lightCaCdamage,
          heavyCaCdamage: data.heavyCaCdamage,
          range: data.range,
          ammoCapacity: data.ammoCapacity,
          price: data.price,
          typeMunition: data.typeMunition,
        });
        setLoading(false); // Change setLoading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchWeapon();
  }, [API_URL, id, userLogged, navigate]);

  const handleSubmit = async (e) => {
    const token = userLogged.token;
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/v1/weapon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(weapon),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK!");
      }

      const data = await response.json();
      console.log("Weapon updated:", data);
      navigate("/admin/armes/list");
    } catch (error) {
      console.log("Error updating weapon:", error);
    }
  };

  if (loading) {
    return <div>Chargement en cours</div>;
  }

  if (error) {
    return (
      <div>
        Erreur lors du chargement :<br />
        {error}
      </div>
    );
  }

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
            value={weapon.name}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                name: e.target.value,
              }))
            }
            placeholder="Nom"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Taille arme
          </label>
          <select
            className="form-select"
            name="type"
            value={weapon.type}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                type: e.target.value,
              }))
            }
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
          <label htmlFor="damage" className="form-label">
            Dommage
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="damage"
            value={weapon.damage}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                damage: e.target.value,
              }))
            }
            placeholder="Dommage"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lightCaCdamage" className="form-label">
            Dégâts légers au CaC
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="lightCaCdamage"
            value={weapon.lightCaCdamage}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                lightCaCdamage: e.target.value,
              }))
            }
            placeholder="Dégâts légers au CaC"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="heavyCaCdamage" className="form-label">
            Dégâts lourds au CaC
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="heavyCaCdamage"
            value={weapon.heavyCaCdamage}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                heavyCaCdamage: e.target.value,
              }))
            }
            placeholder="Dégâts lourds au CaC"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="range" className="form-label">
            Portée
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="range"
            value={weapon.range}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                range: e.target.value,
              }))
            }
            placeholder="Portée"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ammoCapacity" className="form-label">
            Capacité munition
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="ammoCapacity"
            value={weapon.ammoCapacity}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                ammoCapacity: e.target.value,
              }))
            }
            placeholder="Capacité munition"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Prix
          </label>
          <input
            type="number"
            min={0}
            className="form-control"
            id="price"
            value={weapon.price}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                price: e.target.value,
              }))
            }
            placeholder="Prix"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="typeMunition" className="form-label">
            Type de munition
          </label>
          <select
            className="form-select"
            name="typeMunition"
            value={weapon.typeMunition}
            onChange={(e) =>
              setWeapon((prevWeapon) => ({
                ...prevWeapon,
                typeMunition: e.target.value,
              }))
            }
            required
          >
            <option value="compacte">Compact</option>
            <option value="moyenne">Moyenne</option>
            <option value="longue">Longue</option>
            <option value="pompe">Pompe</option>
            <option value="special">Spéciale</option>
          </select>
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
          onClick={() => navigate("/admin/armes/list")}
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default EditWeapon;
