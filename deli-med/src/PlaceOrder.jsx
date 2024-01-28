import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function PlaceOrder() {
    const [medicines, setMedicines] = useState([]);
    const location = useLocation();
    const illnessId = new URLSearchParams(location.search).get('illnessId');

    useEffect(() => {
        if (illnessId) {
            axios.get(`http://127.0.0.1:5000/illnesses/${illnessId}/medicines`)
                .then(response => {
                    setMedicines(response.data);
                })
                .catch(error => {
                    console.error('Error fetching medicines for illness', error);
                });
        }
    }, [illnessId]);

    return (
        <div>
            <h2>Prescription for Illness ID {illnessId}</h2>
            <div>
                {medicines.map((medicine) => (
                    <div key={medicine.id}>
                        <h1>{medicine.name}</h1>
                        <p>{medicine.description}</p>
                        <p>Price: ${medicine.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaceOrder;
