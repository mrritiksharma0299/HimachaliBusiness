import { Search, MapPin } from "lucide-react";

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

function BusinessPageHeader({
  searchTerm,
  onSearchChange,
  location,
  onLocationChange,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      onSearchChange("");
      return;
    }

    const normalizedValue = value.toLowerCase();

    if (popularLocations.includes(normalizedValue)) {
      onLocationChange(normalizedValue);
      onSearchChange("");
      return;
    }

    onSearchChange(value);
  };

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
            Explore Himachal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Discover Local Businesses
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Find trusted businesses and services across Himachal Pradesh.
          </p>
        </div>

        {/* Search + Location */}
        <div className="mt-8 flex max-w-5xl flex-col gap-3 md:flex-row">

          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="flex min-w-0 flex-1 items-center rounded-xl border border-slate-300 bg-white shadow-sm transition focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100"
          >
            <Search
              size={20}
              className="ml-4 shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Search businesses..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
            />

            <button
              type="submit"
              className="mr-2 rounded-lg bg-blue-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
            >
              Search
            </button>
          </form>

          {/* Location */}
          <div className="flex items-center rounded-xl border border-slate-300 bg-white shadow-sm transition focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100 md:w-72">
            <MapPin
              size={20}
              className="ml-4 shrink-0 text-amber-500"
            />

            <select
              value={location}
              onChange={(event) =>
                onLocationChange(event.target.value)
              }
              className="w-full bg-transparent px-3 py-3.5 text-sm text-slate-700 outline-none sm:text-base"
            >
              <option value="">All Himachal Pradesh</option>

              <option value="shimla">Shimla</option>
              <option value="manali">Manali</option>
              <option value="kullu">Kullu</option>
              <option value="mandi">Mandi</option>
              <option value="kangra">Kangra</option>
              <option value="dharamshala">Dharamshala</option>
              <option value="solan">Solan</option>
              <option value="bilaspur">Bilaspur</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BusinessPageHeader;
