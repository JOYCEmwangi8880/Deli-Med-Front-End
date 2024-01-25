import React, { useState, useEffect } from 'react';
import axios from 'axios';


function IllnessDropdown() {
    const [selectedIllness, setSelectedIllness] = useState("");
    const [illnesses, setIllnesses] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000//illnesses') 
            .then(response => {
                setIllnesses(response.data);
            })
            .catch(error => {
                console.error('Error fetching illness data', error);
            });
    }, []);

    useEffect(() => {
        if (!selectedIllness) return;

        axios.get(`http://127.0.0.1:500/illnesses/${selectedIllness}/medicines`) 
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('Error fetching medicine data', error);
            });
    }, [selectedIllness]);

    const handleIllnessChange = (event) => {
        setSelectedIllness(event.target.value);
    };

    const handleMedicineChange = (event) => {
        setSelectedMedicine(event.target.value);
        setTotalPrice(event.target.value * event.target.dataset.price);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        setTotalPrice(event.target.value * selectedMedicine.price);
    };

    const handleDeliveryAddressChange = (event) => {
        setDeliveryAddress(event.target.value);
    };

    const handleOrderClick = () => {
        axios.post('http://127.0.0.1:5000/orders', {
            userId: userId,
            medicineId: selectedMedicine.id,
            quantity: quantity,
            totalPrice: totalPrice,
            deliveryAddress: deliveryAddress
        })
        .then(response => {
            console.log('Order created successfully', response.data);
        })
        .catch(error => {
            console.error('Error creating order', error);
        });
    };

    return (
        <div>
            <button onClick={handleCommonIllnessesClick}>Common Illnesses Encountered</button>
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
            <div>{selectedIllness && <p>Selected Illness: {selectedIllness}</p>}</div>
            {medicines.map((medicine, index) => (
                <div key={index}>
                    <img src={medicine.image} alt={medicine.name} />
                    <p>Name: {medicine.name}</p>
                    <p>Price: ${medicine.price}</p>
                    <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
                    <p>Total Price: ${totalPrice}</p>
                    <input type="text" value={deliveryAddress} onChange={handleDeliveryAddressChange} placeholder="Enter Delivery Address" />
                    <button onClick={handleOrderClick}>Order</button>
                </div>
            ))}
        </div>
    );
}

export default IllnessDropdown;