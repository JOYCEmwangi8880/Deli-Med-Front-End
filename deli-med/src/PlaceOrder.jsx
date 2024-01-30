import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function PlaceOrder() {
    const [medicines, setMedicines] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const location = useLocation();
    const illnessId = new URLSearchParams(location.search).get('illnessId');
    const navigate = useNavigate();

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

    const handleMedicineChange = (event) => {
        setSelectedMedicine(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const orderData = {
            user_id: localStorage.getItem(id),  // Assuming user ID 1 for demonstration, you should obtain the user ID from the logged-in user
            medicine_id: selectedMedicine,
            quantity: quantity,
            total_price: parseFloat(selectedMedicine.price) * quantity,
            delivery_address: deliveryAddress
        };

        axios.post('http://127.0.0.1:5000/orders', orderData)
            .then(response => {
                console.log('Order created successfully:', response.data.message);
                // Optionally, redirect or show a success message
            })
            .catch(error => {
                console.error('Error creating order:', error);
                // Handle error: show error message to the user
            });
    };

    const handlePreviousOrdersClick = () => {
        // Navigate to the route for previous orders
        navigate('/PreviousOrders');
    };

    return (
        <div>
            <h2>Prescription for Illness ID {illnessId}</h2>
            <form onSubmit={handleSubmit}>
                <label>Select Medicine:</label>
                <select value={selectedMedicine} onChange={handleMedicineChange}>
                    <option value="">Select Medicine</option>
                    {medicines.map(medicine => (
                        <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                    ))}
                </select>
                <label>Quantity:</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                <label>Delivery Address:</label>
                <input type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                <button type="submit">Place Order</button>
                <button onClick={handlePreviousOrdersClick}>Previous Orders</button>
            </form>
        </div>
    );
}

export default PlaceOrder;
