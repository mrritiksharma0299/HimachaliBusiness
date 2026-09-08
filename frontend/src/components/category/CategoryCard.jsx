import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/businesses?category=${category.slug}`);
  };

  const Icon = category.icon;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg sm:p-5"
    >
      {/* Icon */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950 transition-all duration-300 group-hover:bg-blue-950 group-hover:text-white sm:h-[72px] sm:w-[72px]">
        <Icon
          size={32}
          strokeWidth={1.8}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-5 text-blue-950 sm:text-base">
          {category.name}
        </h3>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          <span className="font-semibold text-slate-700">
            {category.businessCount}+
          </span>{" "}
          businesses
        </p>
      </div>

      {/* Arrow */}
      <div className="shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500">
        <ArrowRight size={19} />
      </div>
    </button>
  );
}

export default CategoryCard;