
import { Link } from "react-router-dom";


function Footer() {
  const headingStyle =
    "mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-black";

  const linkStyle =
    "text-sm text-black/65 transition-colors duration-200 hover:text-black";

  return (
    <footer className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:px-10 md:px-12 md:pt-20 lg:px-16">

        {/* Main footer content */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-5 md:gap-x-10">

          {/* Brand */}
          <div className="col-span-2 max-w-sm md:col-span-2">
            <Link
              to="/"
              className="inline-block font-serif text-5xl tracking-tight"
            >
              hazel
            </Link>

            <p className="mt-5 max-w-[320px] text-sm leading-6 text-black/65">
              Thoughtfully designed clothing for little ones.
              Soft, comfortable and made for everyday
              childhood moments.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className={headingStyle}>Shop</h3>

            <ul className="flex flex-col gap-3.5">
              <li>
                <Link to="/shop" className={linkStyle}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop" className={linkStyle}>
                  All Clothing
                </Link>
              </li>
              <li>
                <Link to="/shop?category=babies" className={linkStyle}>
                  Babies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=boys" className={linkStyle}>
                  Boys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=girls" className={linkStyle}>
                  Girls
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={headingStyle}>Company</h3>

            <ul className="flex flex-col gap-3.5">
              <li>
                <Link to="/" className={linkStyle}>
                  About Hazel
                </Link>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  Sustainability
                </Link>
              </li>
              <li>
                <a href="mailto:support@hazel.com" className={linkStyle}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h3 className={headingStyle}>Customer Care</h3>

            <ul className="flex flex-col gap-3.5">
              <li>
                <a href="mailto:support@hazel.com" className={linkStyle}>
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className={linkStyle}>
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="mt-14 border-t border-black/10 pt-6 md:mt-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Copyright */}
            <p className="text-xs text-black/55 sm:text-sm">
              © {new Date().getFullYear()} Hazel. All rights reserved.
            </p>

            {/* Social and legal links */}
            <div className="flex flex-wrap items-center gap-5">

            

             

              <Link to="/" className={`${linkStyle} ml-1`}>
                Privacy Policy
              </Link>

              <Link to="/" className={linkStyle}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
