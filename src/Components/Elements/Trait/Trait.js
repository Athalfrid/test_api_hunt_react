import React, { useEffect, useState } from "react";
import "./style/styleTrait.css";
import TraitCard from "./TraitCard";
import FilterTrait from "./Filter/FilterTrait";

function Trait() {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const listCategory = [
    { id: 1, libelle: "Offensif" },
    { id: 2, libelle: "Défensif" },
    { id: 3, libelle: "Mouvement" },
    { id: 4, libelle: "Support" },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/trait");
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération de la liste des traits !"
        );
      }
      const jsonData = await response.json();
      setTraits(jsonData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilterCategory = (category) => {
    setFilterCategory((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredTraits = traits
    .filter((trait) =>
      trait.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((trait) =>
      filterCategory.length > 0 ? filterCategory.includes(trait.category) : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.cost - b.cost;
      } else if (sortOrder === "desc") {
        return b.cost - a.cost;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="container">
        <p className="text-center">Chargement en cours ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="text-center">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-2">
      <h2 className="text-center my-4">Traits</h2>
      <FilterTrait
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        sortOrder={sortOrder}
        handleSortOrder={handleSortOrder}
        listCategory={listCategory}
        filterCategory={filterCategory}
        toggleFilterCategory={toggleFilterCategory}
        setFilterCategory={setFilterCategory}
      />
      {filteredTraits.length === 0 ? (
        <div className="text-center">Aucun trait trouvé.</div>
      ) : (
        <div className="grid-container">
          {filteredTraits.map((trait) => (
            <div key={trait._id} className="grid-item">
              <TraitCard trait={trait} fetchData={fetchData} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Trait;
