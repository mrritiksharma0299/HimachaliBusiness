import { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const CATEGORY_LABELS = {
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

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80";

function PopularBusinesses() {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);

        const response = await api.get("/businesses/");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        const activeBusinesses = data
          .filter((business) => business.is_active !== false)
          .slice(0, 4);

        setBusinesses(activeBusinesses);
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleBusinessClick = (id) => {
    navigate(`/business/${id}`);
  };

  const handleViewAll = () => {
    navigate("/businesses");
  };

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Discover
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Popular Businesses
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              Discover some of the most popular local businesses
              across Himachal Pradesh.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={handleViewAll}
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500 sm:inline-flex"
          >
            View All Businesses

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Business Grid */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:mt-10
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] animate-pulse bg-slate-200" />

                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

                  <div className="my-4 border-t border-slate-100" />

                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))
          ) : businesses.length > 0 ? (
            businesses.map((business) => {
              const image =
                business.images?.length > 0
                  ? business.images[0].image
                  : FALLBACK_IMAGE;

              return (
                <article
                  key={business.id}
                  onClick={() => handleBusinessClick(business.id)}
                  className="
                    group
                    cursor-pointer
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >
                  {/* Business Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                    <img
                      src={image}
                      alt={business.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Verified Badge */}
                    {business.is_verified && (
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-xs font-semibold text-blue-950 shadow-sm">
                        <BadgeCheck
                          size={15}
                          className="text-blue-600"
                        />

                        Verified
                      </div>
                    )}

                    {/* Category */}
                    <span className="absolute bottom-3 left-3 rounded-full bg-blue-950/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                      {CATEGORY_LABELS[business.category] ||
                        business.category}
                    </span>
                  </div>

                  {/* Business Information */}
                  <div className="p-4 sm:p-5">

                    {/* Business Name */}
                    <h3 className="truncate text-base font-bold text-blue-950 transition-colors group-hover:text-amber-500 sm:text-lg">
                      {business.name}
                    </h3>

                    {/* Location */}
                    <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-500"
                      />

                      <span className="line-clamp-1">
                        {business.location || "Location not provided"}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-slate-100" />

                    {/* Rating */}
                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-1.5">
                        <Star
                          size={16}
                          fill="currentColor"
                          className="text-amber-400"
                        />

                        <span className="text-sm font-semibold text-slate-800">
                          New
                        </span>
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        Business
                      </span>

                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-blue-950">
                No businesses available yet.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Businesses will appear here once they are added.
              </p>
            </div>
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={handleViewAll}
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-blue-950
              px-5
              py-2.5
              text-sm
              font-semibold
              text-blue-950
              transition-all
              duration-200
              hover:bg-blue-950
              hover:text-white
              active:scale-[0.98]
            "
          >
            View All Businesses

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

      </div>
    </section>
  );
}

export default PopularBusinesses;