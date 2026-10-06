import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/productService"
import { useState } from "react";

function Shop() {

    const [searchTerm, setSearchTerm] = useState("");




    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
    if (isLoading) {
        return <p>Loading...products</p>
    }
    if (isError) {
        return <p>Failed to losd Products</p>
    }
    if (!products || products.length === 0) {
        return <p>No products found.</p>;
    }
    
    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="min-h-screen bg-pink-50 px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">
                Shop
            </h1>
            <div >
                <input type="text"
                    onChange={(e) => setSearchTerm( e.target.value)}
                    value={searchTerm}
                    className="border " />

            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-xl bg-white p-4 shadow-sm"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            width="200"
                            className="mb-4 w-full rounded-lg object-cover"
                        />

                        <h2 className="text-lg font-semibold text-gray-800">
                            {product.name}
                        </h2>

                        <p className="mt-2 font-medium text-pink-600">
                            {product.price}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {product.category}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Shop