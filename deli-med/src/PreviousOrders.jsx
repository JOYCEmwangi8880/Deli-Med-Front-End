import React, { useState, useEffect } from 'react';

function PreviousOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch the first three orders made by the logged-in user
        id = localStorage.getItem(id)
        fetch(`http://127.0.0.1:5000/orders/user/${id}`) // Replace 1 with the actual user ID
            .then(response => response.json())
            .then(data => {
                // Set the fetched orders to state, limiting to the first three orders
                setOrders(data.slice(0, 3));
                
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []); // Empty dependency array to ensure useEffect runs only once on component mount

    const handleDelete = (orderId) => {
        // Remove the order from the state
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));

        // Send a request to delete the order from the backend
        fetch(`http://127.0.0.1:5000/orders/${orderId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete order');
            }
        })
        .catch(error => {
            console.error('Error deleting order:', error);
            // If deletion fails, re-fetch orders to ensure consistency with backend
            fetchOrders();
        });
    };

    return (
        <div>
            <h1>Orders for User</h1>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    <p>User ID: {order.user_id}</p>
                    <p>Medicine ID: {order.medicine_id}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Total Price: {order.total_price}</p>
                    <p>Delivery Address: {order.delivery_address}</p>
                    <button onClick={() => handleDelete(order.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default PreviousOrders;
