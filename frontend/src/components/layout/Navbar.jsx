import {
  Search,
  User,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo.svg";
import LocationSelector from "../common/LocationSelector";
import { useAuth } from "../../context/AuthContext";

const popularLocations = [
  "shimla",
  "manali",
  "kullu",
  "mandi",
  "kangra",
  "dharamshala",
  "solan",
  "bilaspur",
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const routerLocation = useLocation();

  /*
   * Location comes from the URL.
   * This keeps Navbar and Businesses page synchronized.
   */
  const urlParams = new URLSearchParams(routerLocation.search);
  const selectedLocation = urlParams.get("location") || "";

  useEffect(() => {
    const currentSearch =
      new URLSearchParams(routerLocation.search).get("search") || "";

    setSearchTerm(currentSearch);
  }, [routerLocation.search]);

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      return;
    }

    const normalizedValue = value.toLowerCase();

    /*
     * If the user searches a known district/city,
     * treat it as a LOCATION search.
     */
    if (popularLocations.includes(normalizedValue)) {
      navigate(
        `/businesses?location=${encodeURIComponent(
          normalizedValue
        )}`
      );
    } else {
      /*
       * Otherwise treat it as a normal business/service search.
       * Preserve the currently selected location.
       */
      const params = new URLSearchParams();

      params.set("search", value);

      if (selectedLocation) {
        params.set("location", selectedLocation);
      }

      navigate(`/businesses?${params.toString()}`);
    }

    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchTerm("");
  };

  const handleMobileSearchToggle = () => {
    setSearchOpen((prev) => !prev);
    setMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
    setSearchOpen(false);
  };

  const handleLocationChange = (location) => {
    /*
     * LocationSelector can return either:
     *
     * "Shimla"
     *
     * or:
     *
     * {
     *   name: "Current Location",
     *   latitude,
     *   longitude
     * }
     */

    const params = new URLSearchParams();

    if (typeof location === "string") {
      const normalizedLocation = location.trim().toLowerCase();

      if (normalizedLocation) {
        params.set("location", normalizedLocation);
      }
    } else if (location?.latitude && location?.longitude) {
      params.set("location", "current");
      params.set("latitude", location.latitude);
      params.set("longitude", location.longitude);
    }

    navigate(
      params.toString()
        ? `/businesses?${params.toString()}`
        : "/businesses"
    );

    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Himachali Business Home"
        >
          <img
            src={logo}
            alt="Himachali Business"
            className="h-11 w-11"
          />

          <div className="leading-none">
            <div className="text-[17px] font-bold tracking-wide text-blue-950">
              HIMACHALI
            </div>

            <div className="mt-1 text-[15px] font-bold tracking-[0.18em] text-amber-500">
              BUSINESS
            </div>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {[
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: "Businesses", path: "/businesses" },
            { name: "Offers", path: "/offers" },
            { name: "About Us", path: "/about" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="group relative py-7 text-sm font-medium"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`transition-colors duration-200 ${
                      isActive
                        ? "text-blue-950"
                        : "text-slate-600 group-hover:text-blue-950"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`absolute bottom-4 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-amber-500 transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Desktop Search */}
          <div className="relative">
            <button
              type="button"
              aria-label="Open search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((prev) => !prev)}
              className={`rounded-full p-2.5 transition ${
                searchOpen
                  ? "bg-blue-50 text-blue-950"
                  : "text-slate-600 hover:bg-slate-100 hover:text-blue-950"
              }`}
            >
              {searchOpen ? (
                <X size={20} />
              ) : (
                <Search size={20} />
              )}
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                <form
                  onSubmit={handleSearch}
                  className="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100"
                >
                  <Search
                    size={18}
                    className="ml-3 shrink-0 text-slate-400"
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    placeholder="Search businesses..."
                    autoFocus
                    className="min-w-0 flex-1 border-none bg-transparent px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    className="bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Search
                  </button>
                </form>

                <p className="mt-3 px-1 text-xs text-slate-500">
                  Search by business name, service, category, or district.
                </p>
              </div>
            )}
          </div>

          {/* Location */}
          <LocationSelector
            location={selectedLocation}
            onLocationChange={handleLocationChange}
          />

          {/* Authentication */}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                aria-label="My Profile"
                className="flex items-center gap-2 rounded-lg border border-blue-950 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
              >
                <User size={17} />
                Profile
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setSearchOpen(false);
                }}
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-lg border border-blue-950 px-4 py-2 text-sm font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
              >
                Register Business
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          <button
            type="button"
            aria-label="Open search"
            aria-expanded={searchOpen}
            onClick={handleMobileSearchToggle}
            className={`rounded-full p-2 transition ${
              searchOpen
                ? "bg-blue-50 text-blue-950"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            {searchOpen ? (
              <X size={20} />
            ) : (
              <Search size={20} />
            )}
          </button>

          <NavLink
            to={isAuthenticated ? "/profile" : "/login"}
            aria-label={isAuthenticated ? "My Profile" : "Account"}
            className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <User size={21} />
          </NavLink>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={handleMobileMenuToggle}
            className={`rounded-lg p-2 transition ${
              mobileMenuOpen
                ? "bg-blue-50 text-blue-950"
                : "text-blue-950 hover:bg-slate-100"
            }`}
          >
            {mobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 shadow-sm lg:hidden">
          <form
            onSubmit={handleSearch}
            className="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <Search
              size={18}
              className="ml-3 shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search businesses..."
              autoFocus
              className="min-w-0 flex-1 border-none bg-transparent px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              className="bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">

            {[
              { name: "Home", path: "/" },
              { name: "Categories", path: "/categories" },
              { name: "Businesses", path: "/businesses" },
              { name: "Offers", path: "/offers" },
              { name: "About Us", path: "/about" },
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `relative rounded-lg px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-950"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}

                    {isActive && (
                      <span className="absolute bottom-2 left-4 h-[2px] w-8 rounded-full bg-amber-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            <div className="mt-3 flex gap-3 border-t border-slate-100 pt-4">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-blue-950 py-2.5 text-center text-sm font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                  >
                    <User size={17} />
                    Profile
                  </NavLink>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 rounded-lg bg-amber-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg border border-blue-950 py-2.5 text-center text-sm font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 rounded-lg bg-amber-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
