import "../style/styleWeapon.css";
const FilterWeapon = ({ filters, handleFilterChange }) => {
  const tabTypeWeapon = [
    { id: 1, name: "■ □ □" },
    { id: 2, name: "■ ■ □" },
    { id: 3, name: "■ ■ ■" },
  ];
  const tabTypeAmmo = [
    { id: 1, name: "compacte" },
    { id: 2, name: "moyenne" },
    { id: 3, name: "longue" },
    { id: 4, name: "pompe" },
    { id: 5, name: "spéciale" },
  ]

  return (
    <div className="weapon-filters mb-3">
      <h4>Filtres</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Recherche par nom"
        name="search"
        value={filters.search}
        onChange={handleFilterChange}
      />
      <div className="btn-group mb-2" role="group">
        {tabTypeAmmo.map((typeMunition) => (
          <button
            type="button"
            key={typeMunition.id}
            className={`btn btn-outline-primary ${
              filters.typeMunition === `${typeMunition.name}` ? "active" : ""
            }`}
            name="typeMunition"
            value={typeMunition.name}
            onClick={handleFilterChange}
          >
            {typeMunition.name.charAt(0).toUpperCase() + typeMunition.name.slice(1)}
          </button>
        ))}
        <button
          type="button"
          className={`reset btn btn-outline-danger ${
            filters.type === "" ? "active" : ""
          }`}
          name="typeMunition"
          value=""
          onClick={handleFilterChange}
        >
          Reset
        </button>
      </div>
      <div className="btn-group mb-2" role="group">
        {tabTypeWeapon.map((type) => (
          <button
            type="button"
            key={type.id}
            className={`btn btn-outline-primary ${
              filters.type === `${type.name}` ? "active" : ""
            }`}
            name="type"
            value={type.name}
            onClick={handleFilterChange}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </button>
        ))}
        <button
          type="button"
          className={`btn btn-outline-danger ${
            filters.type === "" ? "active" : ""
          }`}
          name="type"
          value=""
          onClick={handleFilterChange}
        >
          Reset
        </button>
      </div>
      <select
        className="form-select"
        name="sortPrice"
        value={filters.sortPrice}
        onChange={handleFilterChange}
      >
        <option value="">Trier par prix</option>
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
      </select>
    </div>
  );
};

export default FilterWeapon;
