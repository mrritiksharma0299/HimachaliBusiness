import {
  Hotel,
  Utensils,
  Wrench,
  House,
  HeartPulse,
  ShoppingBag,
  BusFront,
  Sparkles,
  GraduationCap,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Hotels & Homestays",
    count: "120+",
    icon: Hotel,
  },
  {
    name: "Food & Restaurants",
    count: "85+",
    icon: Utensils,
  },
  {
    name: "Repair & Mechanics",
    count: "42+",
    icon: Wrench,
  },
  {
    name: "Home Services",
    count: "65+",
    icon: House,
  },
  {
    name: "Healthcare",
    count: "38+",
    icon: HeartPulse,
  },
  {
    name: "Shops & Retail",
    count: "95+",
    icon: ShoppingBag,
  },
  {
    name: "Travel & Transport",
    count: "54+",
    icon: BusFront,
  },
  {
    name: "Beauty & Personal Care",
    count: "47+",
    icon: Sparkles,
  },
  {
    name: "Education & Training",
    count: "31+",
    icon: GraduationCap,
  },
  {
    name: "Professional & Digital Services",
    count: "29+",
    icon: Laptop,
  },
];

function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate("/businesses");
  };

  const handleViewAll = () => {
    navigate("/categories");
  };

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            Section Header
        ========================== */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          {/* Heading */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Explore
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Browse Categories
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base">
              Explore trusted local businesses and services
              across Himachal Pradesh.
            </p>
          </div>

          {/* Desktop / Tablet View All */}
          <button
            type="button"
            onClick={handleViewAll}
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500 sm:inline-flex"
          >
            View All Categories

            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* =========================
            Category Grid
        ========================== */}
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-3
            sm:mt-10
            sm:grid-cols-2
            sm:gap-4
            md:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={handleCategoryClick}
                className="
                  group
                  flex
                  min-h-[104px]
                  w-full
                  items-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-3
                  text-left
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-md
                  active:translate-y-0
                  sm:min-h-[112px]
                  sm:p-4
                "
              >

                {/* =========================
                    Icon
                ========================== */}
                <div className="flex w-[30%] shrink-0 items-center justify-center">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-950
                      transition-all
                      duration-200
                      group-hover:bg-blue-950
                      group-hover:text-white
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="sm:h-6 sm:w-6"
                    />
                  </div>
                </div>

                {/* =========================
                    Information
                ========================== */}
                <div className="min-w-0 flex-1 pl-2.5 sm:pl-3">

                  <h3
                    className="
                      text-sm
                      font-semibold
                      leading-5
                      text-slate-800
                      transition-colors
                      duration-200
                      group-hover:text-blue-950
                      sm:text-[15px]
                    "
                  >
                    {category.name}
                  </h3>

                  <p className="mt-1.5 text-xs font-medium text-slate-500 sm:mt-2">
                    {category.count} Businesses
                  </p>

                </div>
              </button>
            );
          })}
        </div>

        {/* =========================
            Mobile View All
        ========================== */}
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
            View All Categories

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

export default CategorySection;