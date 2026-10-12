
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../../services/productService";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 4));
      } catch (err) {
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-white px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1600px]">
        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs tracking-[0.25em] text-[#8A8175]">
              THE LATEST
            </p>

            <h2 className="font-serif text-4xl text-[#292721] md:text-5xl">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden border-b border-[#292721] pb-1 text-sm text-[#292721] sm:inline-block"
          >
            View all
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="py-12 text-center text-sm text-gray-500">
            Loading products...
          </p>
        )}

        {/* Error state */}
        {!loading && error && (
          <p className="py-12 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Product grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="mb-4 aspect-[3/4] overflow-hidden bg-[#F5F1EB]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-sm text-[#292721] md:text-base">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm text-[#6D665D]">
                  ₹{product.price}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile view all link */}
        <div className="mt-8 sm:hidden">
          <Link
            to="/shop"
            className="border-b border-[#292721] pb-1 text-sm"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;
