import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicineSelection({ selectedIllness, user }) {
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryAddress, setDeliveryAddress] = useState("");

    useEffect(() => {
        if (!selectedIllness) return;

        axios.get(`http://127.0.0.1:5000/illnesses/${selectedIllness}/medicines`)
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('Error fetching medicine data', error);
            });
    }, [selectedIllness]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        // Update the total price based on the selectedMedicine's price
        setTotalPrice(event.target.value * (selectedMedicine ? selectedMedicine.price : 0));
    };

    const handleDeliveryAddressChange = (event) => {
        setDeliveryAddress(event.target.value);
    };

    const handleOrderClick = () => {
        // Assuming you have user information stored in state or context
        // Replace User.id with the correct reference to the user ID
        axios.post('http://127.0.0.1:5000/orders', {
            userId: user.id,
            medicineId: selectedMedicine ? selectedMedicine.id : null,
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

export default MedicineSelection;
