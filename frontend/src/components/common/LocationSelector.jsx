import {
  MapPin,
  Navigation,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const popularLocations = [
  "Mandi",
  "Shimla",
  "Kullu",
  "Kangra",
  "Chamba",
  "Solan",
  "Hamirpur",
  "Dharamshala",
];

function LocationSelector({ location, onLocationChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const panelRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handlePopularLocation = (selectedLocation) => {
    onLocationChange(selectedLocation);
    setSearchTerm("");
    setIsOpen(false);
    setLocationError("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      return;
    }

    onLocationChange(value);
    setSearchTerm("");
    setIsOpen(false);
    setLocationError("");
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(
        "Location services are not supported by your browser."
      );
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        onLocationChange({
          name: "Current Location",
          latitude,
          longitude,
        });

        setLocationLoading(false);
        setIsOpen(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            "Location permission was denied. Please allow location access."
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationError(
            "Your location could not be determined."
          );
        } else if (error.code === error.TIMEOUT) {
          setLocationError(
            "Location request timed out. Please try again."
          );
        } else {
          setLocationError(
            "Unable to get your current location."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  const displayLocation =
    typeof location === "string"
      ? location
      : location?.name || "Select Location";

  return (
    <div
      ref={panelRef}
      className="relative"
    >
      {/* Location Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setLocationError("");
        }}
        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
          isOpen
            ? "border-blue-950 bg-blue-50 text-blue-950"
            : "border-slate-200 text-slate-600 hover:border-blue-950 hover:text-blue-950"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <MapPin size={17} />

        <span className="max-w-[125px] truncate">
          {displayLocation}
        </span>
      </button>

      {/* Location Panel */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h3 className="font-semibold text-blue-950">
                Choose Location
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Find businesses near you
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-950"
              aria-label="Close location selector"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="p-4">
            <form onSubmit={handleSearch}>
              <div className="flex items-center rounded-lg border border-slate-300 focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100">
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
                  placeholder="Search city, district or area..."
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  type="submit"
                  className="mr-1 rounded-md bg-amber-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-600"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Current Location */}
          <div className="px-4">
            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={locationLoading}
              className="flex w-full items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-left transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-950">
                <Navigation size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-950">
                  {locationLoading
                    ? "Finding your location..."
                    : "Use My Current Location"}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Allow browser location access
                </p>
              </div>
            </button>
          </div>

          {/* Error */}
          {locationError && (
            <div className="mx-4 mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs leading-5 text-red-600">
              {locationError}
            </div>
          )}

          {/* Popular Locations */}
          <div className="mt-4 border-t border-slate-100 px-4 pb-4 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Popular Locations
            </p>

            <div className="grid grid-cols-2 gap-2">
              {popularLocations.map((popularLocation) => (
                <button
                  key={popularLocation}
                  type="button"
                  onClick={() =>
                    handlePopularLocation(
                      popularLocation
                    )
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-left text-sm text-slate-700 transition hover:border-blue-950 hover:bg-blue-50 hover:text-blue-950"
                >
                  <span className="flex items-center gap-2">
                    <MapPin
                      size={15}
                      className="text-amber-500"
                    />

                    {popularLocation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationSelector;