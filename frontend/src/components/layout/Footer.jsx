import { Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import logo from "../../assets/logo.svg";
import { useAuth } from "../../context/AuthContext";

const categories = [
  "Hotels & Homestays",
  "Food & Restaurants",
  "Repair & Mechanics",
  "Home Services",
  "Healthcare",
];

const exploreLinks = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Businesses", path: "/businesses" },
  { name: "Offers", path: "/offers" },
  { name: "About Us", path: "/about" },
];

function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="border-t border-blue-900 bg-blue-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* =========================
            Main Footer
        ========================== */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* =========================
              Brand
          ========================== */}
          <div>
            <NavLink
              to="/"
              className="inline-flex items-center gap-3"
              aria-label="Himachali Business Home"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Himachali Business"
                  className="h-10 w-10"
                />
              </div>

              <div className="leading-none">
                <div className="text-lg font-bold tracking-wide text-white">
                  HIMACHALI
                </div>

                <div className="mt-1 text-sm font-bold tracking-[0.18em] text-amber-400">
                  BUSINESS
                </div>
              </div>
            </NavLink>

            <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100">
              Discover, connect and grow with local businesses
              across Himachal Pradesh.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-800 text-blue-100 transition duration-200 hover:border-amber-400 hover:bg-amber-400 hover:text-blue-950"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-800 text-blue-100 transition duration-200 hover:border-amber-400 hover:bg-amber-400 hover:text-blue-950"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-800 text-blue-100 transition duration-200 hover:border-amber-400 hover:bg-amber-400 hover:text-blue-950"
              >
                <FaLinkedinIn size={16} />
              </a>

            </div>
          </div>

          {/* =========================
              Explore
          ========================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="text-sm text-blue-100 transition-colors duration-200 hover:text-amber-400"
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* =========================
              Popular Categories
          ========================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Popular Categories
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to="/categories"
                  className="text-sm text-blue-100 transition-colors duration-200 hover:text-amber-400"
                >
                  {category}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* =========================
              Contact
          ========================== */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4">

              {/* Location */}
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <p className="text-sm leading-6 text-blue-100">
                  Himachal Pradesh, India
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <a
                  href="mailto:hello@himachalibusiness.com"
                  className="break-all text-sm text-blue-100 transition-colors duration-200 hover:text-amber-400"
                >
                  hello@himachalibusiness.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-400"
                />

                <a
                  href="tel:+910000000000"
                  className="text-sm text-blue-100 transition-colors duration-200 hover:text-amber-400"
                >
                  +91 00000 00000
                </a>
              </div>

            </div>

            {/* Register Business */}
            {!isAuthenticated && (
              <NavLink
                to="/register"
                className="mt-7 inline-flex rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-amber-600"
              >
                Register Your Business
              </NavLink>
            )}
          </div>
        </div>

        {/* =========================
            Bottom Footer
        ========================== */}
        <div className="mt-12 flex flex-col gap-4 border-t border-blue-800 pt-6 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-blue-200">
            © {new Date().getFullYear()} Himachali Business.
            All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">

            <NavLink
              to="/privacy-policy"
              className="text-blue-200 transition-colors duration-200 hover:text-amber-400"
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="/terms-and-conditions"
              className="text-blue-200 transition-colors duration-200 hover:text-amber-400"
            >
              Terms & Conditions
            </NavLink>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
