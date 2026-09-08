import FeaturedBusinessCard from "./FeaturedBusinessCard";

const featuredBusinesses = [
  {
    id: 1,
    name: "Mountain View Resort",
    category: "Hotels & Homestays",
    location: "Manali, Himachal Pradesh",
    rating: "4.8",
    reviewCount: 124,
    description:
      "A peaceful mountain stay with beautiful valley views and comfortable rooms.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Himachali Rasoi",
    category: "Food & Restaurants",
    location: "Mandi, Himachal Pradesh",
    rating: "4.7",
    reviewCount: 98,
    description:
      "Enjoy authentic Himachali cuisine prepared with traditional local flavors.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Himalayan Auto Care",
    category: "Repair & Mechanics",
    location: "Kullu, Himachal Pradesh",
    rating: "4.6",
    reviewCount: 76,
    description:
      "Reliable vehicle servicing and repair solutions for cars and local transport.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Himalayan Wellness Clinic",
    category: "Healthcare",
    location: "Shimla, Himachal Pradesh",
    rating: "4.9",
    reviewCount: 143,
    description:
      "Professional healthcare services with trusted doctors and modern facilities.",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",
  },
];

function FeaturedBusinesses() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            Section Header
        ========================== */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          {/* Heading */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Discover Local
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Featured Businesses
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              Discover trusted and featured businesses from
              across Himachal Pradesh.
            </p>
          </div>

          {/* View All */}
          <a
            href="/businesses"
            className="hidden shrink-0 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500 sm:inline-flex"
          >
            View All Businesses →
          </a>
        </div>

        {/* =========================
            Business Grid
        ========================== */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredBusinesses.map((business) => (
            <FeaturedBusinessCard
              key={business.id}
              business={business}
            />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center sm:hidden">
          <a
            href="/businesses"
            className="rounded-lg border border-blue-950 px-5 py-2.5 text-sm font-semibold text-blue-950 transition-all hover:bg-blue-950 hover:text-white"
          >
            View All Businesses
          </a>
        </div>

      </div>
    </section>
  );
}

export default FeaturedBusinesses;