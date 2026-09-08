import {
  Search,
  ShieldCheck,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../../assets/hero-himachal.png";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Verified Businesses",
  },
  {
    icon: Star,
    title: "Real Reviews",
  },
  {
    icon: Tag,
    title: "Best Offers",
  },
  {
    icon: Users,
    title: "Local Services",
  },
];

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

function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      navigate("/businesses");
      return;
    }

    const normalizedValue = value.toLowerCase();

    /*
     * If the user searches a known district/city,
     * treat it as a LOCATION search.
     *
     * Example:
     * Mandi → /businesses?location=mandi
     * Kangra → /businesses?location=kangra
     * Shimla → /businesses?location=shimla
     */
    if (popularLocations.includes(normalizedValue)) {
      navigate(
        `/businesses?location=${encodeURIComponent(
          normalizedValue
        )}`
      );

      return;
    }

    /*
     * Otherwise, treat it as a normal business/service search.
     *
     * Example:
     * Prince Homestay → /businesses?search=Prince%20Homestay
     */
    navigate(
      `/businesses?search=${encodeURIComponent(value)}`
    );
  };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Dark navy overlay */}
      <div className="absolute inset-0 -z-10 bg-blue-950/70" />

      {/* Soft gradient for readable text */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950/95 via-blue-950/75 to-blue-950/20" />

      {/* Hero Content */}
      <div className="mx-auto flex min-h-[620px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">

          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Himachal Pradesh Business Directory
          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Discover &amp; Connect with
            <span className="block">
              Local Businesses Across{" "}
              <span className="text-amber-400">Himachal</span>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Find trusted businesses, verified professionals,
            local services, amazing offers, and everything you
            need across Himachal Pradesh.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mt-8 max-w-3xl"
          >
            <div className="flex flex-col overflow-hidden rounded-xl border border-white/30 bg-white shadow-2xl sm:flex-row">

              {/* Search Input */}
              <div className="flex min-w-0 flex-1 items-center">
                <Search
                  size={21}
                  className="ml-4 shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search businesses, services, or categories..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-amber-500 px-7 py-4 text-sm font-semibold text-white transition hover:bg-amber-600 sm:text-base"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </form>

          {/* Highlights */}
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-3 backdrop-blur-sm"
                >
                  <Icon
                    size={18}
                    className="shrink-0 text-amber-400"
                  />

                  <span className="text-xs font-medium text-white sm:text-sm">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
