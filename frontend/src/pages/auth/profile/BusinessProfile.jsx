import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Pencil,
  LogOut,
  Save,
  X,
  Camera,
  Upload,
  Tag,
  Plus,
  Settings,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import api from "../../../services/api";

const CATEGORY_OPTIONS = [
  {
    value: "hotel",
    label: "Hotels & Homestays",
  },
  {
    value: "restaurant",
    label: "Food & Restaurants",
  },
  {
    value: "repair",
    label: "Repair & Mechanics",
  },
  {
    value: "home_service",
    label: "Home Services",
  },
  {
    value: "healthcare",
    label: "Healthcare",
  },
  {
    value: "retail",
    label: "Shops & Retail",
  },
  {
    value: "travel",
    label: "Travel & Transport",
  },
  {
    value: "beauty",
    label: "Beauty & Personal Care",
  },
  {
    value: "education",
    label: "Education & Training",
  },
  {
    value: "professional",
    label: "Professional & Digital Services",
  },
];

function BusinessProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [creatingOffer, setCreatingOffer] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    short_description: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    website: "",
  });

  const [offerFormData, setOfferFormData] = useState({
    title: "",
    description: "",
    discount: "",
    valid_from: "",
    valid_until: "",
    is_active: true,
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/businesses/");

        const businesses = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        const ownerBusiness = businesses.find(
          (item) => item.owner === user?.id
        );

        if (ownerBusiness) {
          setBusiness(ownerBusiness);

          setFormData({
            name: ownerBusiness.name || "",
            category: ownerBusiness.category || "",
            short_description: ownerBusiness.short_description || "",
            description: ownerBusiness.description || "",
            location: ownerBusiness.location || "",
            phone: ownerBusiness.phone || "",
            email: ownerBusiness.email || "",
            website: ownerBusiness.website || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch business:", err);
        setError("Unable to load your business profile.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchBusiness();
    }
  }, [user?.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleOfferChange = (event) => {
    const { name, value, type, checked } = event.target;

    setOfferFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateBusiness = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!formData.name.trim()) {
        setError("Business name is required.");
        return;
      }

      if (!formData.category) {
        setError("Please select a business category.");
        return;
      }

      if (!formData.location.trim()) {
        setError("Business location is required.");
        return;
      }

      const response = await api.post("/businesses/", {
        name: formData.name.trim(),
        category: formData.category,
        short_description: formData.short_description.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        website: formData.website.trim(),
      });

      setBusiness(response.data);

      setSuccess("Your business profile has been created successfully.");
    } catch (err) {
      console.error("Failed to create business:", err);

      const backendError = err.response?.data;

      if (backendError && typeof backendError === "object") {
        const firstError = Object.values(backendError).flat()[0];

        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to create your business profile."
        );
      } else {
        setError("Unable to create your business profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateBusiness = async (event) => {
    event.preventDefault();

    if (!business) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!formData.name.trim()) {
        setError("Business name is required.");
        return;
      }

      if (!formData.category) {
        setError("Please select a business category.");
        return;
      }

      if (!formData.location.trim()) {
        setError("Business location is required.");
        return;
      }

      const response = await api.patch(`/businesses/${business.id}/`, {
        name: formData.name.trim(),
        category: formData.category,
        short_description: formData.short_description.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        website: formData.website.trim(),
      });

      setBusiness((previous) => ({
        ...response.data,
        images: previous?.images || [],
        offers: previous?.offers || [],
      }));

      setIsEditing(false);

      setSuccess("Business profile updated successfully.");
    } catch (err) {
      console.error("Failed to update business:", err);

      const backendError = err.response?.data;

      if (backendError && typeof backendError === "object") {
        const firstError = Object.values(backendError).flat()[0];

        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to update your business profile."
        );
      } else {
        setError("Unable to update your business profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setSelectedImage(null);
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedImage(null);
      setError("Image size must be less than 5 MB.");
      return;
    }

    setSelectedImage(file);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!business || !selectedImage) {
      setError("Please select an image first.");
      return;
    }

    try {
      setUploadingImage(true);
      setError("");
      setSuccess("");

      const imageData = new FormData();

      imageData.append("image", selectedImage);

      const response = await api.post(
        `/businesses/${business.id}/images/`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBusiness((previous) => ({
        ...previous,
        images: [...(previous?.images || []), response.data],
      }));

      setSelectedImage(null);

      const fileInput = document.getElementById("business-image-upload");

      if (fileInput) {
        fileInput.value = "";
      }

      setSuccess("Business photo uploaded successfully.");
    } catch (err) {
      console.error("Failed to upload business image:", err);

      const backendError = err.response?.data;

      if (backendError && typeof backendError === "object") {
        const firstError = Object.values(backendError).flat()[0];

        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to upload the image."
        );
      } else {
        setError("Unable to upload the image.");
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateOffer = async (event) => {
    event.preventDefault();

    if (!business) {
      return;
    }

    try {
      setCreatingOffer(true);
      setError("");
      setSuccess("");

      if (!offerFormData.title.trim()) {
        setError("Offer title is required.");
        return;
      }

      if (!offerFormData.description.trim()) {
        setError("Offer description is required.");
        return;
      }

      if (!offerFormData.discount.trim()) {
        setError("Discount is required.");
        return;
      }

      if (!offerFormData.valid_from) {
        setError("Offer start date is required.");
        return;
      }

      if (!offerFormData.valid_until) {
        setError("Offer expiry date is required.");
        return;
      }

      if (offerFormData.valid_until < offerFormData.valid_from) {
        setError("Offer expiry date must be after the start date.");
        return;
      }

      const response = await api.post("/businesses/offers/", {
        business: business.id,
        title: offerFormData.title.trim(),
        description: offerFormData.description.trim(),
        discount: offerFormData.discount.trim(),
        valid_from: offerFormData.valid_from,
        valid_until: offerFormData.valid_until,
        is_active: offerFormData.is_active,
      });

      setBusiness((previous) => ({
        ...previous,
        offers: [...(previous?.offers || []), response.data],
      }));

      setOfferFormData({
        title: "",
        description: "",
        discount: "",
        valid_from: "",
        valid_until: "",
        is_active: true,
      });

      setShowOfferForm(false);

      setSuccess("Offer created successfully.");
    } catch (err) {
      console.error("Failed to create offer:", err);

      const backendError = err.response?.data;

      if (backendError && typeof backendError === "object") {
        const firstError = Object.values(backendError).flat()[0];

        setError(
          typeof firstError === "string"
            ? firstError
            : "Unable to create the offer."
        );
      } else {
        setError("Unable to create the offer.");
      }
    } finally {
      setCreatingOffer(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getCategoryLabel = (categoryValue) => {
    const category = CATEGORY_OPTIONS.find(
      (item) => item.value === categoryValue
    );

    return category?.label || categoryValue;
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading your business profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !business) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-blue-950">
              Unable to load business profile
            </h1>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!business) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-blue-950 px-6 py-8 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Building2 className="h-7 w-7 text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Create Your Business Profile
                  </h1>

                  <p className="mt-1 text-sm text-blue-100">
                    Add your business information to get started.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleCreateBusiness}
              className="space-y-6 p-6 sm:p-8"
            >
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                  {success}
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Business Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your business name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Select a category</option>

                    {CATEGORY_OPTIONS.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Short Description
                  </label>

                  <input
                    type="text"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    placeholder="A short description of your business"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Business Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell customers about your business..."
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Mandi, Himachal Pradesh"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Business phone number"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Business Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="business@example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Website
                  </label>

                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />

                  {saving ? "Creating..." : "Create Business Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  const images = business.images || [];
  const offers = business.offers || [];

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            {success}
          </div>
        )}

        {/* Business Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-blue-950 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                  <Building2 className="h-8 w-8 text-white" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                      {business.name}
                    </h1>

                    {business.is_verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-blue-100">
                    {getCategoryLabel(business.category)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsEditing((previous) => !previous);
                  setError("");
                  setSuccess("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-blue-50"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="h-4 w-4" />
                    Edit Business
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Business Information */}
          <div className="p-6 sm:p-8">
            {isEditing ? (
              <form
                onSubmit={handleUpdateBusiness}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Business Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Category
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    >
                      {CATEGORY_OPTIONS.map((category) => (
                        <option
                          key={category.value}
                          value={category.value}
                        >
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Short Description
                    </label>

                    <input
                      type="text"
                      name="short_description"
                      value={formData.short_description}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Business Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Business Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Website
                    </label>

                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-200 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />

                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    About the Business
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-blue-950">
                    {business.short_description || business.name}
                  </h2>

                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {business.description ||
                      "No business description has been added yet."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Location
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {business.location || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-800">
                          {business.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Business Email
                        </p>

                        <p className="mt-1 break-all text-sm font-medium text-slate-800">
                          {business.email || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-5 w-5 shrink-0 text-blue-900" />

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Website
                        </p>

                        {business.website ? (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block break-all text-sm font-medium text-blue-900 hover:underline"
                          >
                            {business.website}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-medium text-slate-800">
                            Not provided
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Offers Management */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-900" />

                <h2 className="text-xl font-bold text-blue-950">
                  Business Offers
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Create and manage special offers for your customers.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setShowOfferForm((previous) => !previous);
                  setError("");
                  setSuccess("");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
              >
                {showOfferForm ? (
                  <>
                    <X className="h-4 w-4" />
                    Close
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Offer
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard/offers")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-950"
              >
                <Settings className="h-4 w-4" />
                Manage Offers
              </button>
            </div>
          </div>

          {/* Create Offer Form */}
          {showOfferForm && (
            <form
              onSubmit={handleCreateOffer}
              className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6"
            >
              <div className="mb-5">
                <h3 className="text-lg font-bold text-blue-950">
                  Create New Offer
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a special offer that customers can see on your business
                  page.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Offer Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={offerFormData.title}
                    onChange={handleOfferChange}
                    placeholder="e.g. 20% Off Weekend Stay"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Offer Description
                  </label>

                  <textarea
                    name="description"
                    value={offerFormData.description}
                    onChange={handleOfferChange}
                    rows={4}
                    placeholder="Describe what customers will receive with this offer..."
                    className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Discount
                  </label>

                  <input
                    type="text"
                    name="discount"
                    value={offerFormData.discount}
                    onChange={handleOfferChange}
                    placeholder="e.g. 20% OFF"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="valid_from"
                    value={offerFormData.valid_from}
                    onChange={handleOfferChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Valid Until
                  </label>

                  <input
                    type="date"
                    name="valid_until"
                    value={offerFormData.valid_until}
                    onChange={handleOfferChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={offerFormData.is_active}
                      onChange={handleOfferChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-950 focus:ring-blue-800"
                    />

                    <span className="text-sm font-semibold text-slate-700">
                      Make this offer active
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t border-blue-100 pt-5">
                <button
                  type="submit"
                  disabled={creatingOffer}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />

                  {creatingOffer ? "Creating..." : "Create Offer"}
                </button>
              </div>
            </form>
          )}

          {/* Existing Offers */}
          <div className="mt-6">
            {offers.length > 0 ? (
              <div className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-blue-950">
                          {offer.title}
                        </h3>

                        {offer.is_active ? (
                          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                            Active
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                            Inactive
                          </span>
                        )}
                      </div>

                      {offer.discount && (
                        <p className="mt-1 text-sm font-semibold text-blue-900">
                          {offer.discount}
                        </p>
                      )}

                      <p className="mt-1 text-sm text-slate-500">
                        {offer.description}
                      </p>

                      {(offer.valid_from || offer.valid_until) && (
                        <p className="mt-2 text-xs text-slate-500">
                          Valid from{" "}
                          {offer.valid_from || "N/A"} to{" "}
                          {offer.valid_until || "N/A"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                <Tag className="mx-auto h-8 w-8 text-slate-400" />

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No offers yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Create your first offer using the Add Offer button above.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Business Photos */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-900" />

                <h2 className="text-xl font-bold text-blue-950">
                  Business Photos
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Add photos that show customers what your business looks like.
              </p>
            </div>

            <span className="text-sm font-medium text-slate-500">
              {images.length} {images.length === 1 ? "photo" : "photos"}
            </span>
          </div>

          {/* Upload */}
          <form
            onSubmit={handleImageUpload}
            className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <label
                  htmlFor="business-image-upload"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-950">
                    <Camera className="h-5 w-5 text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedImage
                        ? selectedImage.name
                        : "Choose a business photo"}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      JPG, PNG, WEBP — maximum 5 MB
                    </p>
                  </div>
                </label>

                <input
                  id="business-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedImage || uploadingImage}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />

                {uploadingImage ? "Uploading..." : "Upload Photo"}
              </button>
            </div>
          </form>

          {/* Gallery */}
          {images.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  <img
                    src={item.image}
                    alt={`${business.name} business`}
                    className="h-40 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <Camera className="mx-auto h-8 w-8 text-slate-400" />

              <p className="mt-3 text-sm font-medium text-slate-700">
                No business photos yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Upload your first photo using the section above.
              </p>
            </div>
          )}
        </section>

        {/* Account Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-blue-950">
                Business Account
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                You are managing this business as its owner.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account Email
              </p>

              <p className="mt-1 break-all text-sm font-medium text-slate-800">
                {user?.email || "Not available"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                Business
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-center pb-4">
          <Link
            to="/"
            className="text-sm font-semibold text-blue-900 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default BusinessProfile;