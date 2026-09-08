import { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80";

function LatestOffers() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);

        const response = await api.get("/businesses/offers/");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        const now = new Date();

        const activeOffers = data
          .filter((offer) => offer.is_active)
          .filter((offer) => {
            if (!offer.valid_until) {
              return true;
            }

            return new Date(offer.valid_until) >= now;
          })
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

        setOffers(activeOffers);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleViewAll = () => {
    navigate("/offers");
  };

  const handleOfferClick = (offer) => {
    if (offer.business) {
      navigate(`/business/${offer.business}`);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "No expiry date";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Deals & Savings
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Latest Offers
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              Discover special deals and offers from local
              businesses across Himachal Pradesh.
            </p>
          </div>

          {/* View All */}
          <button
            type="button"
            onClick={handleViewAll}
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500 sm:inline-flex"
          >
            View All Offers

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Offers Grid */}
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

                  <div className="my-4 border-t border-slate-100" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))
          ) : offers.length > 0 ? (
            offers.map((offer) => {
              const business = offer.business_details;

              const image =
                business?.images?.length > 0
                  ? business.images[0].image
                  : FALLBACK_IMAGE;

              const businessName =
                business?.name || "Local Business";

              const location =
                business?.location || "Himachal Pradesh";

              return (
                <article
                  key={offer.id}
                  onClick={() => handleOfferClick(offer)}
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
                    hover:border-amber-200
                    hover:shadow-lg
                  "
                >
                  {/* Offer Image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">

                    <img
                      src={image}
                      alt={businessName}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Offer Badge */}
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-md sm:text-sm">
                      <Tag size={15} />
                      {offer.discount}
                    </div>

                    {/* Offer Label */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs font-medium text-white/80">
                        Special Offer
                      </p>

                      <h3 className="mt-1 line-clamp-2 text-lg font-bold text-white sm:text-xl">
                        {offer.title}
                      </h3>
                    </div>
                  </div>

                  {/* Offer Information */}
                  <div className="p-4 sm:p-5">

                    {/* Business */}
                    <h4 className="truncate text-base font-bold text-blue-950 sm:text-lg">
                      {businessName}
                    </h4>

                    {/* Location */}
                    <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-amber-500"
                      />

                      <span className="line-clamp-1">
                        {location}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-4 border-t border-slate-100" />

                    {/* Valid Until */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
                        <Clock
                          size={15}
                          className="shrink-0 text-slate-400"
                        />

                        <span>
                          Valid until{" "}
                          {formatDate(offer.valid_until)}
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-blue-950 transition-colors group-hover:text-amber-500">
                        View
                      </span>
                    </div>

                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <Tag className="mx-auto h-8 w-8 text-slate-400" />

              <p className="mt-3 text-sm font-semibold text-blue-950">
                No active offers available.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New offers from local businesses will appear here.
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
            View All Offers

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

export default LatestOffers;