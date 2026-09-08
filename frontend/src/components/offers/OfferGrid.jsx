import { useEffect, useState } from "react";

import OfferCard from "./OfferCard";
import api from "../../services/api";

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

const categorySlugs = {
  hotel: "hotels-homestays",
  restaurant: "food-restaurants",
  repair: "repair-mechanics",
  home_service: "home-services",
  healthcare: "healthcare",
  retail: "shops-retail",
  travel: "travel-transport",
  beauty: "beauty-personal-care",
  education: "education-training",
  professional: "professional-digital-services",
};

const API_BASE_URL = "http://127.0.0.1:8000";

function OfferGrid({
  searchTerm,
  location,
  category,
  offerType,
  sortBy,
}) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/businesses/offers/");

        const offerData = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        const formattedOffers = await Promise.all(
          offerData.map(async (offer) => {
            let business = null;

            try {
              const businessResponse = await api.get(
                `/businesses/${offer.business}/`
              );

              business = businessResponse.data;
            } catch (businessError) {
              console.error(
                `Failed to fetch business ${offer.business}:`,
                businessError
              );
            }

            const firstImage = business?.images?.[0]?.image;

            let image = "";

            if (firstImage) {
              image = firstImage.startsWith("http")
                ? firstImage
                : `${API_BASE_URL}${firstImage}`;
            }

            const validUntil = new Date(offer.valid_until);
            const now = new Date();

            const remainingTime =
              validUntil.getTime() - now.getTime();

            const remainingDays = Math.max(
              0,
              Math.ceil(
                remainingTime / (1000 * 60 * 60 * 24)
              )
            );

            return {
              id: offer.id,
              businessId: offer.business,
              businessName:
                business?.name || "Local Business",

              title: offer.title,

              category:
                categoryLabels[business?.category] ||
                business?.category ||
                "Business",

              categorySlug:
                categorySlugs[business?.category] ||
                business?.category ||
                "",

              offerType: offer.discount
                ? "Discount"
                : "Special Deal",

              discount: offer.discount || "",

              location:
                business?.location ||
                "Himachal Pradesh",

              description:
                offer.description ||
                business?.short_description ||
                "",

              originalPrice: null,
              offerPrice: null,

              expires:
                remainingDays === 0
                  ? "Ends today"
                  : `${remainingDays} ${
                      remainingDays === 1
                        ? "day"
                        : "days"
                    } left`,

              validUntil: offer.valid_until,

              image,
            };
          })
        );

        setOffers(formattedOffers);
      } catch (err) {
        console.error("Failed to fetch offers:", err);
        setError("Unable to load offers.");
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedLocation = location.trim().toLowerCase();

  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      normalizedSearch === "" ||
      offer.title.toLowerCase().includes(normalizedSearch) ||
      offer.businessName
        .toLowerCase()
        .includes(normalizedSearch) ||
      offer.category
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesLocation =
      normalizedLocation === "" ||
      offer.location
        .toLowerCase()
        .includes(normalizedLocation);

    const matchesCategory =
      category === "" ||
      offer.categorySlug === category;

    const matchesOfferType =
      offerType === "" ||
      (offerType === "discount" &&
        offer.offerType === "Discount") ||
      (offerType === "deal" &&
        offer.offerType === "Special Deal") ||
      (offerType === "limited" &&
        offer.offerType === "Limited Time");

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesOfferType
    );
  });

  const sortedOffers = [...filteredOffers].sort(
    (a, b) => {
      if (sortBy === "discount-high") {
        return (
          parseInt(b.discount || "0") -
          parseInt(a.discount || "0")
        );
      }

      if (sortBy === "discount-low") {
        return (
          parseInt(a.discount || "0") -
          parseInt(b.discount || "0")
        );
      }

      if (sortBy === "ending-soon") {
        return (
          new Date(a.validUntil).getTime() -
          new Date(b.validUntil).getTime()
        );
      }

      if (sortBy === "latest") {
        return (
          new Date(b.validUntil).getTime() -
          new Date(a.validUntil).getTime()
        );
      }

      return 0;
    }
  );

  return (
    <section className="bg-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Results Header */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-950 sm:text-2xl lg:text-3xl">
              Latest Offers
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Discover exclusive deals from local businesses.
            </p>
          </div>

          {!loading && !error && (
            <p className="text-sm font-medium text-slate-500">
              {sortedOffers.length}{" "}
              {sortedOffers.length === 1
                ? "Offer"
                : "Offers"}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading offers...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-blue-950">
              Unable to load offers
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* Offer Grid */}
        {!loading &&
          !error &&
          sortedOffers.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                />
              ))}
            </div>
          )}

        {/* No Results */}
        {!loading &&
          !error &&
          sortedOffers.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-blue-950">
                No offers found
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

export default OfferGrid;