import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TreatmentOptions() {
    const [selectedIllness, setSelectedIllness] = useState("");
    const [illnesses, setIllnesses] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/illnesses') 
            .then(response => {
                setIllnesses(response.data);
            })
            .catch(error => {
                console.error('Error fetching illness data', error);
            });
    }, []);

    const handleIllnessChange = (event) => {
        setSelectedIllness(event.target.value);
    };

    return (
        <div>
            <label>
                Select an Illness:
                <select value={selectedIllness} onChange={handleIllnessChange}>
                    <option value="">--Select Illness--</option>
                    {illnesses.map((illness, index) => (
                        <option key={index} value={illness.name}>
                            {illness.name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default TreatmentOptions;