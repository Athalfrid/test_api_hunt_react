import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ConsommableDetails = () => {

    const navigate = useNavigate();
  const { id } = useParams();
  const [consommable, setConsommable] = useState(null);

  useEffect(() => {
    const fetchConsommable = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/consumable/${id}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setConsommable(data);
      } catch (error) {
        console.error('Error fetching consommable:', error);
      }
    };

    fetchConsommable();
  }, [id]);

  if (!consommable) {
    return <div>Chargement du détails de l'item n°{id}...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">{consommable.name}</h1>
          <div className="row">
            <div className="col-md-6">
              <img src={consommable.image} alt={consommable.name} className="img-fluid mb-3" />
            </div>
            <div className="col-md-6">
              <p className="card-text">{consommable.description}</p>
              <p><strong>Effects:</strong> {consommable.effects}</p>
              <p><strong>Type:</strong> {consommable.type}</p>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/consommable')}>
        Retour
      </button>
    </div>
  );
};

export default ConsommableDetails;
