import {
  BadgeCheck,
  MapPin,
  Star,
  Tag,
} from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verified Local Businesses",
    description:
      "Discover trusted businesses and professionals from across Himachal Pradesh.",
  },
  {
    icon: MapPin,
    title: "Find Businesses Near You",
    description:
      "Search businesses by city, district, or location and find what you need nearby.",
  },
  {
    icon: Star,
    title: "Real Information & Reviews",
    description:
      "Get useful business information to help you make better and more confident decisions.",
  },
  {
    icon: Tag,
    title: "Local Offers & Updates",
    description:
      "Discover special offers, promotions, and the latest updates from local businesses.",
  },
];

function WhyHimachaliBusiness() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            Section Header
        ========================== */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
            Why Himachali Business?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            We make it easier to discover, connect with, and
            support local businesses across Himachal Pradesh.
          </p>
        </div>

        {/* =========================
            Benefits
        ========================== */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-5
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:bg-white
                  hover:shadow-lg
                  sm:p-6
                "
              >

                {/* Icon */}
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-blue-950
                    transition-all
                    duration-300
                    group-hover:bg-blue-950
                    group-hover:text-white
                  "
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="mt-5 text-base font-bold text-blue-950 sm:text-lg">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* =========================
            Bottom Message
        ========================== */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-5 text-center sm:mt-12 sm:px-8 sm:py-6">

          <p className="text-sm font-medium leading-6 text-blue-950 sm:text-base">
            Supporting local businesses means supporting the
            people, communities, and economy of Himachal Pradesh.
          </p>

        </div>

      </div>
    </section>
  );
}

export default WhyHimachaliBusiness;