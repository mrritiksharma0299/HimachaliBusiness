import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import HotelHomestayTemplate from "../../components/BusinessDetail/templates/HotelHomestayTemplate";
import RestaurantTemplate from "../../components/BusinessDetail/templates/RestaurantTemplate";
import RepairMechanicTemplate from "../../components/BusinessDetail/templates/RepairMechanicTemplate";
import HomeServiceTemplate from "../../components/BusinessDetail/templates/HomeServiceTemplate";
import HealthcareTemplate from "../../components/BusinessDetail/templates/HealthcareTemplate";
import RetailShopTemplate from "../../components/BusinessDetail/templates/RetailShopTemplate";
import TravelTransportTemplate from "../../components/BusinessDetail/templates/TravelTransportTemplate";
import BeautyPersonalCareTemplate from "../../components/BusinessDetail/templates/BeautyPersonalCareTemplate";
import EducationTrainingTemplate from "../../components/BusinessDetail/templates/EducationTrainingTemplate";
import ProfessionalDigitalTemplate from "../../components/BusinessDetail/templates/ProfessionalDigitalTemplate";

function BusinessDetails() {
  const { id } = useParams();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/businesses/${id}/`);
        setBusiness(response.data);
      } catch (err) {
        console.error("Failed to fetch business:", err);

        if (err.response?.status === 404) {
          setError("Business not found.");
        } else {
          setError("Unable to load business details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Loading business details...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-blue-950">
              {error}
            </h1>
          </div>
        </div>
      </main>
    );
  }

  if (!business) {
    return null;
  }

  const templateMap = {
    hotel: HotelHomestayTemplate,
    restaurant: RestaurantTemplate,
    repair: RepairMechanicTemplate,
    home_service: HomeServiceTemplate,
    healthcare: HealthcareTemplate,
    retail: RetailShopTemplate,
    travel: TravelTransportTemplate,
    beauty: BeautyPersonalCareTemplate,
    education: EducationTrainingTemplate,
    professional: ProfessionalDigitalTemplate,
  };

  const BusinessTemplate = templateMap[business.category];

  if (!BusinessTemplate) {
    return (
      <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-blue-950">
              Business category not supported
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              This business does not have a matching profile template yet.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <BusinessTemplate business={business} />
      </div>
    </main>
  );
}

export default BusinessDetails;