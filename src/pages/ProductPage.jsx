
import { Link, useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../services/productService';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';



function ProductPage() {

    const dispatch = useDispatch()

    const { id } = useParams();
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),

    })
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>Somwthing Went Wrong</p>
    }



    return (
        <div>
            <div
                key={product.id}
                className="mx-auto max-w-4xl p-6"
            >
                <img
                    className="mb-6 h-96 w-full rounded-lg object-contain"
                    src={product.image}
                    alt={product.name}
                    width="200"
                />

                <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                    {product.name}
                </h2>

                <p className="mb-3 text-xl font-medium text-gray-800">
                    ₹{product.price}
                </p>

                <p className="text-sm capitalize text-gray-500">
                    {product.category}
                </p>
                <button onClick={() => dispatch(addToCart(product))} >Add to Cart</button>
                <div>

                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductPage