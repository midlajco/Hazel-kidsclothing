
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
            <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] text-[#332E29]">
                <p className="text-xs uppercase tracking-[0.3em]">
                    Loading...products
                </p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] text-[#332E29]">
                <p className="text-xs uppercase tracking-[0.3em]">
                    Failed to losd Products
                </p>
            </div>
        )
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] text-[#332E29]">
                <p className="text-xs uppercase tracking-[0.3em]">
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
        <div className="min-h-screen bg-[#FAF8F4] text-[#332E29]">

            {/* Header */}
            <div className="mx-auto max-w-7xl px-5 pb-12 pt-12 sm:px-8 sm:pt-16 lg:px-12">

                <div className="flex flex-col justify-between gap-5 border-b border-[#DDD5CA] pb-8 md:flex-row md:items-end">
                    <div>
                        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.35em] text-[#9A8069]">
                            HAZEL — LITTLE THINGS, BIG LOVE
                        </p>

                        <h1 className="font-serif text-5xl font-normal tracking-wide sm:text-6xl">
                            Shop
                        </h1>
                    </div>

                    <p className="max-w-xs text-sm leading-6 text-[#82776D] md:text-right">
                        Thoughtfully chosen essentials for little ones.
                    </p>
                </div>

                {/* Filters */}
                <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">

                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className="w-full rounded-none border border-[#DDD5CA] bg-white/70 px-4 py-3.5 text-sm text-[#332E29] outline-none transition placeholder:text-[#A49A90] focus:border-[#8D7661] focus:bg-white"
                    />

                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="w-full rounded-none border border-[#DDD5CA] bg-white/70 px-4 py-3.5 text-xs uppercase tracking-[0.15em] text-[#51483F] outline-none transition focus:border-[#8D7661] focus:bg-white"
                    >
                        <option value="all">All Categories</option>
                        <option value="babies">Babies</option>
                        <option value="boys">Boys</option>
                        <option value="girls">Girls</option>
                    </select>

                    <select
                        onChange={(e) => setSort(e.target.value)}
                        value={sort}
                        className="w-full rounded-none border border-[#DDD5CA] bg-white/70 px-4 py-3.5 text-xs uppercase tracking-[0.15em] text-[#51483F] outline-none transition focus:border-[#8D7661] focus:bg-white"
                    >
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>

                </div>
            </div>

            {/* Products */}
            <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-12">

                {filteredProducts.length === 0 ? (
                    <div className="border-y border-[#DDD5CA] py-20 text-center">
                        <p className="font-serif text-2xl text-[#51483F]">
                            No products found
                        </p>
                        <p className="mt-3 text-sm text-[#82776D]">
                            Try another search or category.
                        </p>
                    </div>
                ) :
                    (
                        <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            {sortedProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="group"
                                >
                                    <Link to={`/product/${product.id}`}>

                                        <div className="relative overflow-hidden bg-[#F0EBE3]">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                width="200"
                                                className="h-80 w-full object-contain p-6 transition duration-500 ease-out group-hover:scale-105 sm:h-96"
                                            />
                                        </div>

                                        <div className="mt-4">

                                            <div className="flex items-start justify-between gap-3">
                                                <h2 className="text-sm font-medium leading-6 tracking-wide text-[#332E29] transition-colors group-hover:text-[#94785F]">
                                                    {product.name}
                                                </h2>

                                                <p className="whitespace-nowrap text-sm font-medium text-[#332E29]">
                                                    ₹{product.price}
                                                </p>
                                            </div>

                                            <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[#96877A]">
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
