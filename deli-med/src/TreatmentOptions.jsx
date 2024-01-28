import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function TreatmentOptions() {
    const [illnesses, setIllnesses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/illnesses')
            .then(response => {
                setIllnesses(response.data);
            })
            .catch(error => {
                console.error('Error fetching illness data', error);
            });
    }, []);

    function handleClick(illnessId) {
        navigate(`/PlaceOrder?illnessId=${illnessId}`);
    }

    return (
        <div>
            <h2>Select an Illness:</h2>
            <div>
                {illnesses.map((illness) => (
                    <div key={illness.id}>
                        <p>{illness.id}</p>
                        <h1>{illness.name}</h1>
                        <p>{illness.description}</p>
                        <button onClick={() => handleClick(illness.id)}>Check out our prescription </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default TreatmentOptions;