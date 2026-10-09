import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/productService"
import { useState } from "react";

import { Link } from "react-router-dom";

function Shop() {

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("low");




    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black">
                <p className="text-sm uppercase tracking-[0.25em]">
                    Loading...products
                </p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black">
                <p className="text-sm uppercase tracking-[0.25em]">
                    Failed to losd Products
                </p>
            </div>
        )
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white text-black">
                <p className="text-sm uppercase tracking-[0.25em]">
                    No products found.
                </p>
            </div>
        );
    }

    const filteredProducts = products?.filter((product) => {
        const searchMatches =
            product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const catagoryMatches =
            category === "all" || product.category == category;

        return searchMatches && catagoryMatches
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === "low") {
            return a.price - b.price
        }
        else {
            return b.price - a.price
        }
    })







    return (
        <div className="min-h-screen bg-white text-black">

            {/* Header */}
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">

                <div className="flex flex-col justify-between gap-6 border-b border-black pb-8 md:flex-row md:items-end">
                    <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                            HAZEL
                        </p>

                        <h1 className="text-5xl font-light tracking-[0.15em]">
                            SHOP
                        </h1>
                    </div>

                    <p className="text-sm text-gray-500">
                        Essentials for little ones
                    </p>
                </div>

                {/* Filters */}
                <div className="mt-8 grid gap-4 md:grid-cols-3">

                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className="border border-black bg-white px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:bg-black focus:text-white focus:placeholder:text-gray-400"
                    />

                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="border border-black bg-white px-4 py-3 text-sm uppercase tracking-wider outline-none"
                    >
                        <option value="all">All</option>
                        <option value="babies">Babies</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                    </select>

                    <select
                        onChange={(e) => setSort(e.target.value)}
                        value={sort}
                        className="border border-black bg-white px-4 py-3 text-sm uppercase tracking-wider outline-none"
                    >
                        <option value="low">Low to High</option>
                        <option value="high">High to Low </option>
                    </select>

                </div>
            </div>


            {/* Products */}
            <div className="mx-auto max-w-7xl px-6 pb-20">

                {filteredProducts.length === 0 ? (
                    <div className="border-y border-black py-16 text-center">
                        <p className="text-sm uppercase tracking-[0.2em]">
                            No Products Found
                        </p>
                    </div>
                ) :
                    (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {sortedProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="group"
                                >
                                    <Link to={`/product/${product.id}`}>

                                        <div className="overflow-hidden border border-black bg-white">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                width="200"
                                                className="h-80 w-full object-contain p-6 transition duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="mt-4">

                                            <div className="flex items-start justify-between gap-4">
                                                <h2 className="text-sm font-medium uppercase tracking-wider">
                                                    {product.name}
                                                </h2>

                                                <p className="whitespace-nowrap text-sm">
                                                    ₹{product.price}
                                                </p>
                                            </div>

                                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                                                {product.category}
                                            </p>

                                        </div>

                                    </Link>
                                </div>

                            ))}

                        </div>
                    )}

            </div>

        </div>
    )
}

export default Shop