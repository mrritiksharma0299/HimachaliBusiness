import { useState } from "react";

import OffersPageHeader from "../../components/offers/OffersPageHeader";
import OfferFilters from "../../components/offers/OfferFilters";
import OfferGrid from "../../components/offers/OfferGrid";

function Offers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [offerType, setOfferType] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  return (
    <>
      <OffersPageHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        location={location}
        onLocationChange={setLocation}
      />

      <OfferFilters
        category={category}
        onCategoryChange={setCategory}
        offerType={offerType}
        onOfferTypeChange={setOfferType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <OfferGrid
        searchTerm={searchTerm}
        location={location}
        category={category}
        offerType={offerType}
        sortBy={sortBy}
      />
    </>
  );
}

export default Offers;