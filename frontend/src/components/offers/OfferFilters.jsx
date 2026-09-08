import { SlidersHorizontal } from "lucide-react";

function OfferFilters({
  category,
  onCategoryChange,
  offerType,
  onOfferTypeChange,
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
              Filter Offers
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

            {/* Offer Type */}
            <select
              value={offerType}
              onChange={(event) =>
                onOfferTypeChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-40"
            >
              <option value="">All Offers</option>
              <option value="discount">Discounts</option>
              <option value="deal">Special Deals</option>
              <option value="limited">Limited Time</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) =>
                onSortChange(event.target.value)
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-950 focus:ring-2 focus:ring-blue-100 lg:min-w-44"
            >
              <option value="latest">
                Sort: Latest
              </option>

              <option value="discount-high">
                Discount: High to Low
              </option>

              <option value="discount-low">
                Discount: Low to High
              </option>

              <option value="ending-soon">
                Ending Soon
              </option>
            </select>

          </div>
        </div>

      </div>
    </section>
  );
}

export default OfferFilters;