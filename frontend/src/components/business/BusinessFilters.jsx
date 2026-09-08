import { SlidersHorizontal } from "lucide-react";

function BusinessFilters({
  category,
  onCategoryChange,
  rating,
  onRatingChange,
  verified,
  onVerifiedChange,
  sortBy,
  onSortChange,
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Filter Label */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={19}
              className="text-blue-950"
            />

            <span className="text-sm font-semibold text-blue-950 sm:text-base">
              Filter Businesses
            </span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">

            {/* Category */}
            <select
              value={category}
              onChange={(event) =>
                onCategoryChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-48"
            >
              <option value="">All Categories</option>
              <option value="hotels-homestays">
                Hotels & Homestays
              </option>
              <option value="food-restaurants">
                Food & Restaurants
              </option>
              <option value="repair-mechanics">
                Repair & Mechanics
              </option>
              <option value="home-services">
                Home Services
              </option>
              <option value="healthcare">
                Healthcare
              </option>
              <option value="shops-retail">
                Shops & Retail
              </option>
              <option value="travel-transport">
                Travel & Transport
              </option>
              <option value="beauty-personal-care">
                Beauty & Personal Care
              </option>
              <option value="education-training">
                Education & Training
              </option>
              <option value="professional-digital-services">
                Professional & Digital Services
              </option>
            </select>

            {/* Rating */}
            <select
              value={rating}
              onChange={(event) =>
                onRatingChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-40"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.8">4.8+ Stars</option>
            </select>

            {/* Verified */}
            <select
              value={verified}
              onChange={(event) =>
                onVerifiedChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-36"
            >
              <option value="">All Businesses</option>
              <option value="verified">
                Verified Only
              </option>
              <option value="unverified">
                Unverified
              </option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) =>
                onSortChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-44"
            >
              <option value="popular">
                Sort: Popular
              </option>
              <option value="rating-high">
                Rating: High to Low
              </option>
              <option value="rating-low">
                Rating: Low to High
              </option>
              <option value="name">
                Name: A to Z
              </option>
            </select>

          </div>
        </div>

      </div>
    </section>
  );
}

export default BusinessFilters;