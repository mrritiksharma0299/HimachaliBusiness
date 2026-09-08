import {
  Search,
  Tags,
  BadgePercent,
  MessageCircle,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discover Local Businesses",
    description:
      "Find hotels, restaurants, shops, professionals, and other local services across Himachal Pradesh.",
  },
  {
    icon: Tags,
    title: "Explore by Category",
    description:
      "Browse businesses through simple categories so you can quickly find what you are looking for.",
  },
  {
    icon: BadgePercent,
    title: "Find Local Offers",
    description:
      "Discover discounts, special deals, and limited-time offers shared by local businesses.",
  },
  {
    icon: MessageCircle,
    title: "Connect Directly",
    description:
      "Get useful business information and connect with local businesses when you need their services.",
  },
];

function AboutFeatures() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            Section Header
        ========================== */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
            What We Offer
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
            Everything You Need to Discover Local
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            A simple platform built to make discovering and
            connecting with Himachal's local businesses easier.
          </p>
        </div>

        {/* =========================
            Feature Grid
        ========================== */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-100
                  hover:shadow-lg
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-950
                    transition-all
                    duration-300
                    group-hover:bg-blue-950
                    group-hover:text-white
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-base font-bold text-blue-950 sm:text-lg">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default AboutFeatures;