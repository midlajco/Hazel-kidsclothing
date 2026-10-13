import { Link } from "react-router-dom";

const categories = [
  {
    name: "BABIES",
    value: "babies",
    image: "/images/categories/babies.png",
  },
  {
    name: "BOYS",
    value: "boys",
    image: "/images/categories/boys.png",
  },
  {
    name: "GIRLS",
    value: "girls",
    image: "/images/categories/girls.png",
  },
];

function CatagorySection() {
  return (
    <section className="bg-[#FAF8F4] px-5 py-16 md:px-10 md:py-20 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        {/* Section heading */}
        <div className="mb-10 text-center md:mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#29251F]">
            Shop by Category
          </p>

          <p className="mt-3 text-base text-[#777067] md:text-lg">
            Thoughtfully made for every little moment
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.value}
              to={`/shop?category=${category.value}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-[#EAE4DB]"
            >
              <img
                src={category.image}
                alt={`Shop ${category.name.toLowerCase()}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/15" />

              {/* Category label */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-8 text-white">
                <h2 className="font-serif text-3xl tracking-wide drop-shadow-sm md:text-4xl">
                  {category.name}
                </h2>

                <span className="mt-3 text-xs tracking-[0.22em]">
                  SHOP NOW&nbsp; →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CatagorySection;