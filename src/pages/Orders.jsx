import React from 'react'
import { getOrederByUser } from '../services/orderService'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate,Link } from 'react-router-dom';

function Orders() {
    const user = useSelector((state) => state.authentication.user);
    const navigate =useNavigate();

 const { data: orders, isLoading, isError,error } = useQuery({
        queryKey: ["orders", user?.id],
        queryFn: () => getOrederByUser(user.id),
        enabled: !!user?.id
    });
    
    if (!user) {
        return (
            <div className="p-6 text-center">
                <h1>Please login to view your orders.</h1>
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        )
    }




   
    if (isLoading) {
        return <p className="p-6">Loading your orders...</p>
    }

    if (isError) {
        return (
            <div className="p-6">
                <h1>Unable to load your orders.</h1>
                <p>{error.message}</p>
            </div>
        )
    }
    if (!orders || orders.length === 0) {
        return (
            <div className="p-6 text-center">
                <h1>My Orders</h1>
                <p>You haven't placed any orders yet.</p>
                <Link to="/shop">Start shopping</Link>
            </div>
        )
    }

    console.log(orders)
    return (
        <div>
            <h1>My Orders</h1>

            {orders?.map((order) => (
                <div key={order.id}>
                    <h2>Order #{order.id}</h2>
                    <p>Total: ₹{order.total}</p>
                    <p>Status: {order.status}</p>
                    <p>
                        Date: {new Date(
                            order.createdAt || order.date
                        ).toLocaleString()}
                    </p>

                    <h3>Items</h3>

                    {order.items.map((item) => (
                        <div key={item.productId}>
                            <p>{item.name}</p>
                            <p>Price: ₹{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Orders
