import "./Enemie.css";

const EnemieCard = ({ enemie }) => {
  return (
    <div className="card h-100 mt-3">
      <div className="card-body d-flex row">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{enemie.name}</h5>
        </div>
        <p className="card-text">{enemie.type}</p>
        <p className="card-text">{enemie.health}</p>
        <p className="card-text">{enemie.damage}</p>
        <p className="card-text">{enemie.behavior}</p>

      </div>
    </div>
  );
};

export default EnemieCard;
