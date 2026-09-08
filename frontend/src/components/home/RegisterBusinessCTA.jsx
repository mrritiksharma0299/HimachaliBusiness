import {
  ArrowRight,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const benefits = [
  "Reach more local customers",
  "Showcase your business",
  "Share offers and updates",
];

function RegisterBusinessCTA() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleExplore = () => {
    navigate("/businesses");
  };

  return (
    <section className="bg-slate-50 px-4 pb-14 pt-2 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            CTA Container
        ========================== */}
        <div className="relative overflow-hidden rounded-3xl bg-blue-950 px-6 py-12 shadow-xl sm:px-10 sm:py-14 lg:px-16 lg:py-16">

          {/* Decorative background shapes */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-900/60" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-900/50" />

          <div className="absolute right-1/4 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">

            {/* Left Content */}
            <div className="max-w-2xl">

              {/* Icon + Label */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <Building2 size={22} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400 sm:text-sm">
                  Grow With Us
                </p>

              </div>

              {/* Heading */}
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Have a Business in{" "}
                <span className="text-amber-400">
                  Himachal?
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
                Register your business on Himachali Business
                and connect with customers looking for local
                products and services.
              </p>

              {/* Benefits */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">

                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 text-sm text-blue-100"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-amber-400"
                    />

                    <span>{benefit}</span>
                  </div>
                ))}

              </div>

            </div>

            {/* Right Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

              {/* Register */}
              <button
                type="button"
                onClick={handleRegister}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-amber-600 hover:shadow-xl active:scale-[0.98] sm:px-7"
              >
                Register Your Business

                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Explore */}
              <button
                type="button"
                onClick={handleExplore}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15 active:scale-[0.98] sm:px-7"
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

export default RegisterBusinessCTA;