import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCartByUser, updatedCart } from '../services/cartService'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createOrder } from '../services/orderService';

function CheckOut() {
    const navigate = useNavigate();
    const user = useSelector(
        (state) => state.authentication.user
    );
    const { data: cart, isLoading, isError } = useQuery({
        queryKey: ["Cart", user?.id],
        queryFn: () => getCartByUser(user.id),
        enabled: !!user?.id
    })

    if (isLoading) return <p>Loading checkout...</p>;

    if (isError) return <p>Failed to load checkout.</p>;
    if (!cart) {
        return (
            <div className="p-6">
                <h1>Your cart is empty.</h1>

                <button onClick={() => navigate("/cart")}>
                    Back to Cart
                </button>
            </div>
        );
    }

    const total = cart?.items.reduce((total, item) => total + item.price * item.quantity, 0)

    const handleOrder = async () => {
        if (cart.items.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        const orderData = {
            userId: user.id,
            items: cart.items,
            total: total,
            status: "pending",
            date: new Date().toISOString(),

        }


        try {
            await createOrder(orderData)
            await updatedCart(cart.id, []);
            alert("Order placed successfully!");
             navigate("/orders");
        }
        catch (error) {
            console.error("Order process failed:", error);
            alert("Something went wrong. Please check your order and cart.");
        }
       

    }




    return (
        <div>
            <h1>Order Summary </h1>
            {
                cart.items.map((item) => (
                    <div key={item.productId}>
                        <p>{item.name}</p>
                        <p>{item.price * item.quantity}</p>



                    </div>
                ))
            }
            {
                <h2>Total :{total}</h2>

            }
            {cart.items.length > 0 && (
  <button onClick={handleOrder}>Place Order</button>
)}
            
        </div>
    )
}

export default CheckOut