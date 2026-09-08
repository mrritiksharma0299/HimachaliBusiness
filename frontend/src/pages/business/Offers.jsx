import { useEffect, useState } from "react";
import api from "../../services/api";

function BusinessOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    business: "1",
    title: "",
    description: "",
    discount: "",
    valid_from: "",
    valid_until: "",
    is_active: true,
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await api.get(
        "/businesses/offers/?mine=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOffers(response.data);
    } catch (error) {
      console.error("Offers API error:", error);
      console.error("Response:", error.response);
      setError("Failed to load your offers.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      await api.post(
        "/businesses/offers/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({
        business: "1",
        title: "",
        description: "",
        discount: "",
        valid_from: "",
        valid_until: "",
        is_active: true,
      });

      setShowForm(false);

      await fetchOffers();
    } catch (error) {
      console.error("Create offer error:", error);
      console.error("Response:", error.response);

      setError("Failed to create offer.");
    }
  };

  const handleDelete = async (offerId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      await api.delete(
        `/businesses/offers/${offerId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOffers((currentOffers) =>
        currentOffers.filter((offer) => offer.id !== offerId)
      );
    } catch (error) {
      console.error("Delete offer error:", error);
      console.error("Response:", error.response);

      setError("Failed to delete offer.");
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-blue-950">
          Business Offers
        </h1>

        <p className="mt-4 text-gray-500">
          Loading offers...
        </p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-950">
            Business Offers
          </h1>

          <p className="mt-2 text-gray-500">
            Manage offers for your business.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-950 px-5 py-3 font-medium text-white hover:bg-blue-900"
        >
          {showForm ? "Cancel" : "Add Offer"}
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-blue-950">
            Create New Offer
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block font-medium">
                Offer Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. 20% Off Weekend Stay"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your offer..."
                required
                rows="4"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Discount
              </label>

              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="e.g. 20%"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">
                  Valid From
                </label>

                <input
                  type="datetime-local"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Valid Until
                </label>

                <input
                  type="datetime-local"
                  name="valid_until"
                  value={formData.valid_until}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-950"
                />
              </div>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4"
              />

              <span className="font-medium">
                Make offer active
              </span>
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-950 px-5 py-3 font-medium text-white hover:bg-blue-900"
            >
              Create Offer
            </button>
          </div>
        </form>
      )}

      {offers.length === 0 ? (
        <p className="mt-8 text-gray-500">
          You don't have any offers yet.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-blue-950">
                    {offer.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {offer.description}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    offer.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {offer.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-4 flex gap-6 text-sm text-gray-600">
                <span>
                  Discount: <strong>{offer.discount}</strong>
                </span>

                <span>
                  Valid until:{" "}
                  <strong>
                    {new Date(
                      offer.valid_until
                    ).toLocaleDateString()}
                  </strong>
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusinessOffers;