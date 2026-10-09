import { Link, useNavigate, useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productService';
import { useDispatch, useSelector } from 'react-redux';
import { updatedCart, getCartByUser, createCart } from '../services/cartService';
import { useEffect } from 'react';




function ProductPage() {


    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authentication.user)

    const { id } = useParams();
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),

    })



    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black">
                <p className="text-sm uppercase tracking-[0.2em]">Loading...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black">
                <p className="text-sm uppercase tracking-[0.2em]">
                    Somwthing Went Wrong
                </p>
            </div>
        )
    }

    const handleAddToCart = async (id) => {
        if (user) {

            let cart = await getCartByUser(user.id);

            if (!cart) {
                cart = await createCart(user.id)
            }


            const newItem = {
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            }
            let updatedItems

            const existingItem = cart.items.find(
                (item) => item.productId === product.id
            )
            if (existingItem) {
                updatedItems = cart.items.map((item) =>
                    item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            else {
                updatedItems = [
                    ...cart.items,
                    newItem
                ];
            }

            const response = await updatedCart(cart.id, updatedItems)


        };


    }







    return (
        <div className="min-h-screen bg-white text-black">
            <div
                key={product.id}
                className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-2 md:items-center"
            >
                <div className="flex items-center justify-center border border-black">
                    <img
                        className="h-[500px] w-full object-contain"
                        src={product.image}
                        alt={product.name}
                        width="200"
                    />
                </div>

                <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gray-500">
                        {product.category}
                    </p>

                    <h2 className="mb-4 text-4xl font-light uppercase tracking-wide">
                        {product.name}
                    </h2>

                    <p className="mb-8 text-2xl font-medium">
                        ₹{product.price}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className="w-full border border-black bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black md:w-auto"
                    >
                        Add To Cart
                    </button>

                    <div className="mt-8 border-t border-black pt-6">
                        <p className="text-sm leading-7 text-gray-600">
                            Premium essentials designed for little ones.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage