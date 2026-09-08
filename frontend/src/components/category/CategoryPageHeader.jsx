import { Search } from "lucide-react";

function CategoryPageHeader({ searchTerm, onSearchChange }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Explore Himachal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Browse Categories
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Find the right businesses and services across
            Himachal Pradesh.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 max-w-2xl">
          <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition focus-within:border-blue-950 focus-within:ring-2 focus-within:ring-blue-100">
            
            <div className="flex min-w-0 flex-1 items-center">
              <Search
                size={20}
                className="ml-4 shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) =>
                  onSearchChange(event.target.value)
                }
                placeholder="Search categories..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default CategoryPageHeader;