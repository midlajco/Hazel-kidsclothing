
import { Link } from "react-router-dom";
import { Search, UserRound, ShoppingBag } from "lucide-react";

function HomeNavbar() {
  return (
   <header className="absolute inset-x-0 top-0 z-30 h-20 w-full bg-[#FAF9F6]/95">
      <nav className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-[4.5%]">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-4xl tracking-tight text-[#1D1D1B]"
        >
          hazel
        </Link>

        {/* Category navigation */}
        <div className="hidden items-center gap-12 md:flex">
          <Link
            to="/shop?category=babies"
            className="font-serif text-lg text-[#1D1D1B] transition-opacity hover:opacity-60"
          >
            Babies
          </Link>

          <Link
            to="/shop?category=boys"
            className="font-serif text-lg text-[#1D1D1B] transition-opacity hover:opacity-60"
          >
            Boys
          </Link>

          <Link
            to="/shop?category=girls"
            className="font-serif text-lg text-[#1D1D1B] transition-opacity hover:opacity-60"
          >
            Girls
          </Link>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-5 text-[#1D1D1B] md:gap-7">
          {/* Search */}
          <Link
            to="/shop"
            aria-label="Search products"
            className="transition-opacity hover:opacity-60"
          >
            <Search size={24} strokeWidth={1.4} />
          </Link>

          {/* Account */}
          <Link
            to="/login"
            aria-label="My account"
            className="transition-opacity hover:opacity-60"
          >
            <UserRound size={24} strokeWidth={1.4} />
          </Link>

          {/* Shopping bag */}
          <Link
            to="/cart"
            aria-label="Shopping bag"
            className="relative transition-opacity hover:opacity-60"
          >
            <ShoppingBag size={24} strokeWidth={1.4} />
            

            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D1D1B] text-[9px] text-white">
              0
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default HomeNavbar;
