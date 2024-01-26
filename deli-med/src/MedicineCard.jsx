import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MedicineCard({ medicine, onOrder, onCancel }) {
    const [orderStatus, setOrderStatus] = useState(null);

    const handleOrder = () => {
        setOrderStatus('Ordered successfully');
        onOrder(medicine.id);
        alert('Ordered successfully'); // Show an alert when ordered
    };

    const handleCancelOrder = () => {
        setOrderStatus((prevOrderStatus) => {
            if (prevOrderStatus === 'Ordered successfully') {
                onCancel(medicine.id);
                alert('Order canceled'); // Show an alert when canceled
                return 'Order canceled'; // Update order status to 'Order canceled'
            } else {
                alert('No order to cancel'); // Inform the user that there's no order to cancel
                return prevOrderStatus; // Keep the order status unchanged
            }
        });
    };

    return (
        <div className={`medicationContainer ${orderStatus ? 'ordered' : ''}`}>
            <h4>{medicine.name}</h4>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            <p>Quantity: {medicine.quantity}</p>
            <div className="buttonContainer">
                <Link to={`/order/${medicine.id}`}>
                    <button className={`orderButton ${orderStatus ? 'success' : ''}`} onClick={handleOrder} disabled={orderStatus}>
                        {orderStatus || 'Order'}
                    </button>
                </Link>
                <button className="cancelButton" onClick={handleCancelOrder} disabled={!orderStatus}>
                    Cancel Order
                </button>
            </div>
            {orderStatus && <p>{orderStatus}</p>}
        </div>
    );
}

export default MedicineCard;