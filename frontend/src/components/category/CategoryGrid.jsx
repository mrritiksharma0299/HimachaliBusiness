import { useEffect, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Car,
  HeartPulse,
  Home,
  Hotel,
  Scissors,
  ShoppingBag,
  Utensils,
  Wrench,
} from "lucide-react";

import CategoryCard from "./CategoryCard";
import api from "../../services/api";

const categoryIcons = {
  hotel: Hotel,
  restaurant: Utensils,
  repair: Wrench,
  home_service: Home,
  healthcare: HeartPulse,
  retail: ShoppingBag,
  travel: Car,
  beauty: Scissors,
  education: BookOpen,
  professional: BriefcaseBusiness,
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

function CategoryGrid({ searchTerm }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/businesses/categories/");

        const formattedCategories = response.data.map((category) => ({
          name: category.label,
          slug: categorySlugs[category.value] || category.value,
          value: category.value,
          icon: categoryIcons[category.value] || BriefcaseBusiness,
        }));

        setCategories(formattedCategories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <section className="bg-slate-50 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-blue-950 sm:text-2xl lg:text-3xl">
            All Categories
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Explore businesses and services by category.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading categories...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-blue-950">
              Unable to load categories
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* Category Grid */}
        {!loading && !error && filteredCategories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.value}
                category={category}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredCategories.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-blue-950">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching for another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryGrid;