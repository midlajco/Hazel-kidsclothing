
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    useMutation,
    useQuery,
    useQueryClient
} from '@tanstack/react-query';
import { getCartByUser, updatedCart } from '../services/cartService';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const user = useSelector(
        (state) => state.authentication.user
    );

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!user && !storedUser) {
            navigate("/login");
        }
    }, [user, navigate]);

    const {
        data: cart,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["cart", user?.id],
        queryFn: () => getCartByUser(user.id),
        enabled: !!user?.id
    });

    const cartMutation = useMutation({
        mutationFn: ({ id, items }) => updatedCart(id, items),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart", user.id]
            });
        }
    });

    if (!user) return null;

    if (isLoading) return <p>Loading cart...</p>;

    if (isError) return <p>Failed to load cart.</p>;

    const handleQ = (id, change) => {
        const updatediItems = cart.items.map((item) =>
            item.productId === id
                ? {
                    ...item,
                    quantity: item.quantity + change
                }
                : item
        );

        cartMutation.mutate({
            id: cart.id,
            items: updatediItems
        });
    };

    const handleRemove = (id) => {
        const updatediItems = cart.items.filter(
            (item) => item.productId !== id
        );

        cartMutation.mutate({
            id: cart.id,
            items: updatediItems
        });
    };

    const handleEmptyCart = () => {
        cartMutation.mutate({
            id: cart.id,
            items: []
        });
    };

    const totalPrice = cart?.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div>
            {cart?.items.length === 0 && (
                <p>Your cart is empty.</p>
            )}

            {cart?.items.map((item) => (
                <div key={item.productId}>
                    <img
                        src={item.image}
                        alt={item.name}
                        width="100"
                    />

                    <h1>{item.name}</h1>
                    <h1>{item.price}</h1>
                    <h1>{item.quantity}</h1>

                    <button
                        onClick={() => handleQ(item.productId, 1)}
                    >
                        +
                    </button>

                    <button
                        onClick={() => handleQ(item.productId, -1)}
                    >
                        -
                    </button>

                    <button
                        onClick={() => handleRemove(item.productId)}
                    >
                        remove from cart
                    </button>
                </div>
            ))}

            <h1>TOTAl ={totalPrice}</h1>

            <button onClick={() => handleEmptyCart()}>
                Empty Cart
            </button>
        </div>
    );
}

export default Cart;
