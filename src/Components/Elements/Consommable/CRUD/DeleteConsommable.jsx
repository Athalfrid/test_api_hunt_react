import React from 'react';
import { useParams } from 'react-router-dom';

const DeleteConsommable = () => {
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/consommable/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Consommable deleted');
    } catch (error) {
      console.error('Error deleting consommable:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Consommable</button>
    </div>
  );
};

export default DeleteConsommable;
