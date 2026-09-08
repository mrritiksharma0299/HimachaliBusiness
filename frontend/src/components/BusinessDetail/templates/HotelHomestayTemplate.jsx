import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Tag,
  ImageIcon,
  Building2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function HotelHomestayTemplate({ business }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const mainImage = business.images?.[0]?.image || null;
  const galleryImages = business.images?.slice(1) || [];

  const activeOffers =
    business.offers?.filter((offer) => offer.is_active) || [];

  const allImages = business.images || [];

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const showPreviousImage = () => {
    if (!selectedImage || allImages.length === 0) return;

    const currentIndex = allImages.findIndex(
      (item) => item.image === selectedImage
    );

    const previousIndex =
      currentIndex <= 0 ? allImages.length - 1 : currentIndex - 1;

    setSelectedImage(allImages[previousIndex].image);
  };

  const showNextImage = () => {
    if (!selectedImage || allImages.length === 0) return;

    const currentIndex = allImages.findIndex(
      (item) => item.image === selectedImage
    );

    const nextIndex =
      currentIndex === allImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(allImages[nextIndex].image);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-3 bg-blue-950" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
                    <Building2 size={14} strokeWidth={1.8} />
                    Hotels & Homestays
                  </span>

                  {business.is_verified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      <ShieldCheck size={14} strokeWidth={1.8} />
                      Verified
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
                  {business.name}
                </h1>

                {business.short_description && (
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                    {business.short_description}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin
                    size={17}
                    className="shrink-0 text-blue-900"
                    strokeWidth={1.8}
                  />
                  <span>{business.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Image */}
        {mainImage && (
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => openImage(mainImage)}
              className="group relative block h-[280px] w-full overflow-hidden sm:h-[420px]"
              aria-label={`View ${business.name} main image`}
            >
              <img
                src={mainImage}
                alt={business.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                <span className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-blue-950 opacity-0 shadow-sm transition group-hover:opacity-100">
                  View Image
                </span>
              </div>
            </button>
          </section>
        )}

        {/* About + Contact */}
        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-blue-950">
              About the Business
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {business.description || "No description available."}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-blue-950">
              Contact
            </h2>

            <div className="mt-5 space-y-4">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-blue-50"
                >
                  <Phone
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-900"
                    strokeWidth={1.8}
                  />

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Phone
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {business.phone}
                    </p>
                  </div>
                </a>
              )}

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-blue-50"
                >
                  <Mail
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-900"
                    strokeWidth={1.8}
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                      {business.email}
                    </p>
                  </div>
                </a>
              )}

              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-blue-50"
                >
                  <Globe
                    size={19}
                    className="mt-0.5 shrink-0 text-blue-900"
                    strokeWidth={1.8}
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Website
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-700">
                      {business.website}
                    </p>
                  </div>
                </a>
              )}

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <MapPin
                  size={19}
                  className="mt-0.5 shrink-0 text-blue-900"
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Location
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {business.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offers */}
        {activeOffers.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                <Tag size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-950">
                  Current Offers
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Available offers from this business.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {activeOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-blue-950">
                      {offer.title}
                    </h3>

                    {offer.discount && (
                      <span className="shrink-0 rounded-full bg-blue-950 px-3 py-1 text-xs font-bold text-white">
                        {offer.discount}
                      </span>
                    )}
                  </div>

                  {offer.description && (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {offer.description}
                    </p>
                  )}

                  <p className="mt-4 text-xs text-slate-400">
                    Valid until{" "}
                    {new Date(offer.valid_until).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Photo Gallery */}
        {galleryImages.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-950">
                <ImageIcon size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-950">
                  Photos
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explore photos of {business.name}.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {galleryImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => openImage(image.image)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                  aria-label={`View photo of ${business.name}`}
                >
                  <img
                    src={image.image}
                    alt={`${business.name} gallery`}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/20">
                    <span className="rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-blue-950 opacity-0 shadow-sm transition group-hover:opacity-100">
                      View
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* No Photos */}
        {allImages.length === 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <ImageIcon
              size={32}
              className="mx-auto text-slate-300"
              strokeWidth={1.5}
            />

            <h2 className="mt-3 text-lg font-semibold text-blue-950">
              No Photos Available
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              This business has not added any photos yet.
            </p>
          </section>
        )}
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeImage}
        >
          {/* Close */}
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Close image viewer"
          >
            <X size={24} strokeWidth={1.8} />
          </button>

          {/* Previous */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft size={26} strokeWidth={1.8} />
            </button>
          )}

          {/* Image */}
          <img
            src={selectedImage}
            alt={`${business.name} enlarged`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
          />

          {/* Next */}
          {allImages.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight size={26} strokeWidth={1.8} />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default HotelHomestayTemplate;