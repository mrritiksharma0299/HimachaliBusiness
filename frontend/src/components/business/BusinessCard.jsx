import {
  MapPin,
  Star,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function BusinessCard({ business }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/business/${business.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      {/* Business Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={business.image}
          alt={business.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Verified Badge */}
        {business.verified && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-950 shadow-sm backdrop-blur-sm">
            <BadgeCheck
              size={14}
              className="text-blue-600"
            />
            Verified
          </div>
        )}

        {/* Category */}
        <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded-full bg-blue-950/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {business.category}
        </div>
      </div>

      {/* Business Information */}
      <div className="p-4 sm:p-5">

        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate text-base font-bold text-blue-950 transition-colors duration-200 group-hover:text-amber-500 sm:text-lg">
            {business.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-1">
            <Star
              size={14}
              fill="currentColor"
              className="text-amber-400"
            />

            <span className="text-xs font-semibold text-slate-700">
              {business.rating}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-amber-500"
          />

          <span className="line-clamp-1">
            {business.location}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">
          {business.description}
        </p>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-400">
            {business.reviews} Reviews
          </span>

          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-950 transition-colors group-hover:text-amber-500">
            View
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>

      </div>
    </article>
  );
}

export default BusinessCard;