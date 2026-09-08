import { Building2, Users, HeartHandshake } from "lucide-react";

function AboutStory() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* =========================
              Left Content
          ========================== */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500 sm:text-sm">
              Our Story
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              Built to Bring Local Businesses Together
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                Himachal Pradesh is home to thousands of talented
                business owners, service providers, shopkeepers,
                professionals, and entrepreneurs.
              </p>

              <p>
                But finding the right local business is not always
                easy. Information is often scattered across
                different platforms, social media pages, and
                word-of-mouth recommendations.
              </p>

              <p>
                Himachali Business aims to bring these businesses
                together in one simple platform where people can
                discover local businesses, explore their services,
                find offers, and connect with them easily.
              </p>
            </div>
          </div>

          {/* =========================
              Right Highlights
          ========================== */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">

            {/* Highlight 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                  <Building2 size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950">
                    Support Local Businesses
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Give local businesses a place to showcase
                    what they offer.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                  <Users size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950">
                    Help People Discover
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Make it easier for customers to find useful
                    businesses and services nearby.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                  <HeartHandshake size={22} strokeWidth={1.8} />
                </div>

                <div>
                  <h3 className="font-semibold text-blue-950">
                    Build Local Connections
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Create stronger connections between businesses
                    and the communities they serve.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutStory;