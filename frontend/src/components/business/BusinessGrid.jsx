import { useEffect, useState } from "react";

import BusinessCard from "./BusinessCard";
import api from "../../services/api";

const categoryMap = {
  "hotels-homestays": "hotel",
  "food-restaurants": "restaurant",
  "repair-mechanics": "repair",
  "home-services": "home_service",
  healthcare: "healthcare",
  "shops-retail": "retail",
  "travel-transport": "travel",
  "beauty-personal-care": "beauty",
  "education-training": "education",
  "professional-digital-services": "professional",
};

const categoryLabels = {
  hotel: "Hotels & Homestays",
  restaurant: "Food & Restaurants",
  repair: "Repair & Mechanics",
  home_service: "Home Services",
  healthcare: "Healthcare",
  retail: "Shops & Retail",
  travel: "Travel & Transport",
  beauty: "Beauty & Personal Care",
  education: "Education & Training",
  professional: "Professional & Digital Services",
};

const API_BASE_URL = "http://127.0.0.1:8000";

function BusinessGrid({
  searchTerm,
  location,
  category,
  rating,
  verified,
  sortBy,
}) {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        const trimmedSearch = searchTerm.trim();
        const trimmedLocation = location.trim();

        if (trimmedSearch) {
          params.search = trimmedSearch;
        }

        if (trimmedLocation) {
          params.location = trimmedLocation;
        }

        if (category && categoryMap[category]) {
          params.category = categoryMap[category];
        }

        const response = await api.get("/businesses/", {
          params,
        });

        const businessData = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        const formattedBusinesses = businessData.map((business) => {
          const firstImage = business.images?.[0]?.image;

          let image = "";

          if (firstImage) {
            image = firstImage.startsWith("http")
              ? firstImage
              : `${API_BASE_URL}${firstImage}`;
          }

          return {
            id: business.id,
            name: business.name,
            category:
              categoryLabels[business.category] ||
              business.category,
            categorySlug: business.category,
            location: business.location,
            rating: null,
            reviews: 0,
            verified: business.is_verified,
            description: business.short_description,
            image,
          };
        });

        setBusinesses(formattedBusinesses);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
        setError("Unable to load businesses.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchTerm, location, category]);

  const filteredBusinesses = businesses.filter((business) => {
    const matchesRating =
      rating === "" ||
      (business.rating !== null &&
        business.rating >= Number(rating));

    const matchesVerified =
      verified === "" ||
      (verified === "verified" && business.verified) ||
      (verified === "unverified" && !business.verified);

    return matchesRating && matchesVerified;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (sortBy === "rating-high") {
      if (a.rating === null) return 1;
      if (b.rating === null) return -1;

      return b.rating - a.rating;
    }

    if (sortBy === "rating-low") {
      if (a.rating === null) return 1;
      if (b.rating === null) return -1;

      return a.rating - b.rating;
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return (
    <section className="bg-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950 sm:text-2xl lg:text-3xl">
              All Businesses
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Explore businesses and services across Himachal Pradesh.
            </p>
          </div>

          {!loading && !error && (
            <p className="text-sm font-medium text-slate-500">
              {sortedBusinesses.length}{" "}
              {sortedBusinesses.length === 1
                ? "Business"
                : "Businesses"}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading businesses...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-blue-950">
              Unable to load businesses
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* Business Cards */}
        {!loading && !error && sortedBusinesses.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && sortedBusinesses.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-blue-950">
              No businesses found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BusinessGrid;