import {
  MapPin,
  Clock3,
  BadgePercent,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function OfferCard({ offer }) {
  const navigate = useNavigate();

  const handleBusinessClick = () => {
    navigate(`/business/${offer.businessId}`);
  };

  const handleOfferClick = () => {
    navigate(`/business/${offer.businessId}`);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">

      {/* =========================
          Offer Image
      ========================== */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
          <BadgePercent size={14} />
          {offer.discount}
        </div>

        {/* Offer Type */}
        <div className="absolute bottom-3 left-3 rounded-full bg-blue-950/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {offer.offerType}
        </div>
      </div>

      {/* =========================
          Offer Information
      ========================== */}
      <div className="p-4 sm:p-5">

        {/* Business */}
        <button
          type="button"
          onClick={handleBusinessClick}
          className="text-left text-xs font-semibold text-amber-500 transition-colors hover:text-blue-950"
        >
          {offer.businessName}
        </button>

        {/* Offer Title */}
        <h3 className="mt-1.5 line-clamp-2 text-lg font-bold leading-6 text-blue-950">
          {offer.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {offer.description}
        </p>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin
            size={16}
            className="shrink-0 text-amber-500"
          />

          <span className="truncate">
            {offer.location}
          </span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Price + Expiry */}
        <div className="flex items-end justify-between gap-3">

          {/* Price */}
          <div>
            <p className="text-xs text-slate-400">
              Offer Price
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-lg font-bold text-blue-950">
                ₹{offer.offerPrice}
              </span>

              <span className="text-xs text-slate-400 line-through">
                ₹{offer.originalPrice}
              </span>
            </div>
          </div>

          {/* Expiry */}
          <div className="flex items-center gap-1 text-right text-xs font-medium text-slate-400">
            <Clock3 size={14} />

            <span>
              {offer.expires}
            </span>
          </div>

        </div>

        {/* View Offer */}
        <button
          type="button"
          onClick={handleOfferClick}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-900 active:scale-[0.98]"
        >
          View Offer

          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

      </div>
    </article>
  );
}

export default OfferCard;