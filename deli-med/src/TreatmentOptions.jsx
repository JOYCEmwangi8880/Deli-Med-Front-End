// Import the necessary styles from App.css or use inline styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
import MedicineCardComponent from './MedicineCard'; // Change the name here


function MedicineCard({ medicine, onOrder }) {
    const [ordered, setOrdered] = useState(false);

    const handleOrder = () => {
        // Perform any necessary actions related to placing an order
        // For demonstration purposes, we'll just set the state to ordered
        setOrdered(true);
        onOrder(medicine.id);
    };

    const handleCancelOrder = () => {
        // Perform any necessary actions related to canceling an order
        // For demonstration purposes, we'll just set the state to not ordered
        setOrdered(false);
    };

    return (
        <div className={`medicationContainer ${ordered ? 'ordered' : ''}`}>
            <h4>{medicine.name}</h4>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            <p>Quantity: {medicine.quantity}</p>
            <div className="buttonContainer">
                <Link to={`/order/${medicine.id}`}>
                    <button className={`orderButton ${ordered ? 'success' : ''}`} onClick={handleOrder}>
                        {ordered ? 'Ordered' : 'Order'}
                    </button>
                </Link>
                {ordered && (
                    <button className="cancelButton" onClick={handleCancelOrder}>
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
}

function TreatmentOptions() {
    const [selectedIllness, setSelectedIllness] = useState("");
    const [medicines, setMedicines] = useState([]);
    const [illnesses, setIllnesses] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/illnesses`) 
            .then(response => {
                setIllnesses(response.data);
            })
            .catch(error => {
                console.error('Error fetching illness data', error);
            });
    }, []);

    const handleIllnessChange = async (event) => {
        setSelectedIllness(event.target.value);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/medicines?illness=${event.target.value}`);
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicine data', error);
        }
    };

    const handleOrder = (medicineId) => {
        // Handle the order logic here (e.g., make API call to place an order)
        console.log(`Order placed for medicine with ID: ${medicineId}`);
    };

    return (
        <div className="container">
            <h1>Select an Illness:</h1>
            <label>
                <select value={selectedIllness} onChange={handleIllnessChange}>
                    <option value="">--Select Illness--</option>
                    {illnesses.map((illness) => (
                        <option key={illness.id} value={illness.name}>
                            {illness.name} - {illness.description}
                        </option>
                    ))}
                </select>
            </label>

            {/* Display selected illness along with medications */}
            {selectedIllness && (
                <div className="selectedIllnessContainer">
                    <h2>{selectedIllness}</h2>
                    <p>{illnesses.find((illness) => illness.name === selectedIllness).description}</p>
                    <h3>Medications:</h3>

                    {/* Use grid layout for medication cards */}
                    <div className="medicationGrid">
                    {medicines.map((medicine) => (
    <MedicineCardComponent key={medicine.id} medicine={medicine} onOrder={handleOrder} />
))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TreatmentOptions;
