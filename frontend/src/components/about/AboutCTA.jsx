import { ArrowRight, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AboutCTA() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleBusinesses = () => {
    navigate("/businesses");
  };

  return (
    <section className="bg-blue-950 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8 lg:p-12">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* =========================
                Content
            ========================== */}
            <div className="max-w-2xl">

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                <Building2 size={24} strokeWidth={1.8} />
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 sm:text-sm">
                Grow With Us
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Have a Local Business?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                Join Himachali Business and give your business a
                place to be discovered by customers across
                Himachal Pradesh.
              </p>

            </div>

            {/* =========================
                Actions
            ========================== */}
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">

              <button
                type="button"
                onClick={handleRegister}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-amber-500
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-blue-950
                  transition-all
                  duration-200
                  hover:bg-amber-400
                  active:scale-[0.98]
                "
              >
                Register Your Business

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              <button
                type="button"
                onClick={handleBusinesses}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/20
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-white/10
                  active:scale-[0.98]
                "
              >
                Explore Businesses
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutCTA;