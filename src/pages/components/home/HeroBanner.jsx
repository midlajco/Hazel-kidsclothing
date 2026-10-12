
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <section className="relative h-full w-full overflow-hidden bg-[#F8F5F0]">
      {/* Full-screen hero image */}
      <img
        src="/images/hero/hero.png"
        alt="Child wearing comfortable neutral-coloured clothing"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Hero text */}
      <div className="relative z-10 flex h-full items-center px-6 pt-20 md:px-12 lg:px-[7.8%]">
        <div className="max-w-[650px]">
          <h1 className="font-serif text-4xl font-normal leading-[1.02] tracking-[-0.035em] text-[#1D1D1B] sm:text-5xl md:text-6xl lg:text-[6.5rem]">
            Soft and
            <br />
            comfortable
            <br />
            for our kids
          </h1>

          <Link
            to="/shop"
            className="mt-8 inline-flex items-center gap-3 border border-[#292721] px-6 py-4 text-xs tracking-[0.18em] text-[#292721] transition-colors hover:bg-[#292721] hover:text-white md:mt-10"
          >
            SHOP COLLECTION
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
