import "./styleFilter.css";

const FilterTrait = ({
  searchTerm,
  handleSearch,
  sortOrder,
  handleSortOrder,
  listCategory,
  filterCategory,
  toggleFilterCategory,
  setFilterCategory
}) => {



  const reset = () => {
    handleSearch({ target: { value: "" } });
    handleSortOrder({ target: { value: "" } });
    setFilterCategory([]);
  };

  return (
    <>
      <div className={`filter-container`}>
        <div className="d-flex justify-content-between mb-1 flex-wrap" style={{border:'1px dotted white',padding:'5px'}}>
          <div className="form-group mr-2">
            <label htmlFor="search">Rechercher : </label>
            <input
              type="text"
              name="search"
              className="form-control"
              placeholder="Rechercher par nom"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="form-group mr-2">
            <label htmlFor="sortOrder">Trier par coût : </label>
            <select
              className="form-control"
              value={sortOrder}
              onChange={handleSortOrder}
            >
              <option value="">Trier par coût</option>
              <option value="asc">Coût croissant</option>
              <option value="desc">Coût décroissant</option>
            </select>
          </div>
          {listCategory.map((cat) => (
            <button
              key={cat.id}
              className={`btn m-1 ${
                filterCategory.includes(cat.libelle)
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => toggleFilterCategory(cat.libelle)}
            >
              {cat.libelle}
            </button>
          ))}
          <div className="form-group d-flex justify-content-center align-items-center">
            <button
              className="form-control border-danger text-danger w-25 h-75"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterTrait;
