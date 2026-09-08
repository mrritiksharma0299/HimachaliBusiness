import { MapPin } from "lucide-react";

function AboutPageHeader() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="max-w-3xl">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-950 sm:text-sm">
            <MapPin size={15} className="text-amber-500" />
            Made for Himachal Pradesh
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Connecting Himachal,
            <span className="block text-amber-500">
              One Business at a Time.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Himachali Business is a platform designed to help people
            discover trusted local businesses, services, offers, and
            opportunities across Himachal Pradesh.
          </p>
        </div>

      </div>
    </section>
  );
}

export default AboutPageHeader;