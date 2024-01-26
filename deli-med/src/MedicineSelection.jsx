import React from 'react';

function MedicineSelection({ medicines }) {
  return (
    <div>
      <h2>Medicines:</h2>
      <ul>
        {medicines.map(medicine => (
          <li key={medicine.id}>
            <strong>Name:</strong> {medicine.name}<br />
            <strong>Description:</strong> {medicine.description}<br />
            <strong>Price:</strong> {medicine.price}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MedicineSelection;
