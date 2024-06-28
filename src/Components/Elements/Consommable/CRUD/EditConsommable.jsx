import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditConsommable = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [effects, setEffects] = useState('');

  useEffect(() => {
    const fetchConsommable = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/consumable/${id}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setType(data.type);
        setEffects(data.effects);
      } catch (error) {
        console.error('Error fetching consommable:', error);
      }
    };

    fetchConsommable();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/consumable/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Consommable updated:', data);
    } catch (error) {
      console.error('Error updating consommable:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Nom" 
      />
      <input 
        type="text" 
        value={type} 
        onChange={(e) => setType(e.target.value)} 
        placeholder="Type" 
      />
      <input 
        type="text" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <input 
        type="text" 
        value={effects} 
        onChange={(e) => setEffects(e.target.value)} 
        placeholder="Effets" 
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditConsommable;
