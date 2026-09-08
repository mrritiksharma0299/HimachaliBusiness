
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80";

function BusinessUpdates() {
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
          .sort((a, b) => {
            const dateA = a.created_at
              ? new Date(a.created_at)
              : new Date(0);

            const dateB = b.created_at
              ? new Date(b.created_at)
              : new Date(0);

            return dateB - dateA;
          })
          .slice(0, 3);

        setBusinesses(activeBusinesses);
      } catch (error) {
        console.error("Failed to fetch business updates:", error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleViewAll = () => {
    navigate("/businesses");
  };

  const handleBusinessClick = (id) => {
    navigate(`/business/${id}`);
  };

  const formatDate = (date) => {
    if (!date) {
      return "Recently added";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              From Local Businesses
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Business Updates
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              Discover the latest businesses joining and updating
              their presence on Himachali Business.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={handleViewAll}
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500 sm:inline-flex"
          >
            View All Updates

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Updates Grid */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:mt-10
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="aspect-[16/9] animate-pulse bg-slate-200" />

                <div className="space-y-3 p-4 sm:p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
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

                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

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

                    {/* Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Update Label */}
                    <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-950 shadow-sm">
                      Business Update
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">

                    {/* Business */}
                    <div className="flex items-center gap-2">

                      <h3 className="truncate text-sm font-bold text-blue-950 sm:text-base">
                        {business.name}
                      </h3>

                      {business.is_verified && (
                        <BadgeCheck
                          size={16}
                          className="shrink-0 text-blue-600"
                        />
                      )}

                    </div>

                    {/* Location */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
                      <MapPin
                        size={15}
                        className="shrink-0 text-amber-500"
                      />

                      <span className="truncate">
                        {business.location || "Himachal Pradesh"}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="mt-4 text-base font-bold leading-6 text-slate-800 transition-colors group-hover:text-blue-950 sm:text-lg">
                      New business on Himachali Business
                    </h4>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                      {business.short_description ||
                        "Explore this local business and discover the services they offer."}
                    </p>

                    {/* Divider */}
                    <div className="my-4 border-t border-slate-100" />

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                      <CalendarDays size={15} />

                      <span>
                        Added {formatDate(business.created_at)}
                      </span>
                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-semibold text-blue-950">
                No business updates available.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New businesses will appear here when they join the platform.
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
            View All Updates

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

export default BusinessUpdates;
