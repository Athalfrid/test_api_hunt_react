import { useEffect, useState } from "react";
import WeaponCard from "./WeaponCard";
import "./style/styleWeapon.css";
import FilterWeapon from "./Filter/FilterWeapon";

function Weapon() {
  const [weapons, setWeapons] = useState([]);
  const [filteredWeapons, setFilteredWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    typeMunition: "",
    type: "",
    sortPrice: "",
  });

  // Fonction pour récupérer les armes depuis l'API
  const getWeapons = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/weapon");
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des armes !"
        );
      }
      const jsonData = await response.json();
      setWeapons(jsonData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  // Effet pour charger les armes au montage du composant
  useEffect(() => {
    getWeapons();
  }, []);

  // Effet pour appliquer les filtres et le tri sur les armes
  useEffect(() => {
    let filtered = [...weapons]; // Copie des armes pour éviter les mutations directes

    // Filtrage par nom
    if (filters.search) {
      filtered = filtered.filter((weapon) =>
        weapon.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtrage par type de munition
    if (filters.typeMunition) {
      filtered = filtered.filter(
        (weapon) => weapon.typeMunition === filters.typeMunition
      );
    }

    // Filtrage par type
    if (filters.type) {
      filtered = filtered.filter((weapon) => weapon.type === filters.type);
    }

    // Tri par prix
    if (filters.sortPrice) {
      filtered.sort((a, b) =>
        filters.sortPrice === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredWeapons(filtered);
  }, [filters, weapons]); // Déclenche l'effet lorsque filters ou weapons changent

  // Gestion du changement des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Gestion du clic sur une arme
  const handleWeaponClick = (weapon) => {
    setSelectedWeapon(weapon); // Met à jour l'arme sélectionnée
  };

  // Affichage en cours de chargement
  if (loading) {
    return (
      <div className="container">
        <p className="text-center">Chargement en cours ...</p>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="container">
        <p className="text-center">Erreur : {error}</p>
      </div>
    );
  }

  // Affichage des armes et de leurs détails
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="weapon-details">
            {selectedWeapon ? (
              <>
                <div className="weapon-info">
                  <h3 className="weapon-name">{selectedWeapon.name}</h3>
                  <div className="weapon-details">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Type</th>
                          <td>{selectedWeapon.type}</td>
                        </tr>
                        <tr>
                          <th scope="row">Type de munition</th>
                          <td>{selectedWeapon.typeMunition}</td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage</th>
                          <td>{selectedWeapon.damage}</td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage coup léger</th>
                          <td>{selectedWeapon.lightCaCdamage}</td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage coup fort</th>
                          <td>{selectedWeapon.heavyCaCdamage}</td>
                        </tr>
                        <tr>
                          <th scope="row">Portée</th>
                          <td>{selectedWeapon.range}</td>
                        </tr>
                        <tr>
                          <th scope="row">Capacité en munition</th>
                          <td>{selectedWeapon.ammoCapacity}</td>
                        </tr>
                        <tr>
                          <th scope="row">Prix</th>
                          <td>{selectedWeapon.price} $</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="weapon-info">
                  <h3 className="weapon-name"><span></span></h3>
                  <div className="weapon-details">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th scope="row">Type</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Type de munition</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage coup léger</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Dommage coup fort</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Portée</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Capacité en munition</th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row">Prix</th>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <FilterWeapon
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          <div className="weapon-list">
            <h4>Armes</h4>
            <div className="list-group">
              {filteredWeapons.map((weapon) => (
                <WeaponCard
                  key={weapon._id}
                  weapon={weapon}
                  onClick={() => handleWeaponClick(weapon)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weapon;
