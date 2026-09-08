
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import BusinessPageHeader from "../../components/business/BusinessPageHeader";
import BusinessFilters from "../../components/business/BusinessFilters";
import BusinessGrid from "../../components/business/BusinessGrid";

function Businesses() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [verified, setVerified] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Keep local state synchronized with the URL.
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const updateUrl = (newSearch, newLocation) => {
    const params = {};

    const trimmedSearch = newSearch.trim();
    const trimmedLocation = newLocation.trim();

    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    if (trimmedLocation) {
      params.location = trimmedLocation;
    }

    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    updateUrl(value, location);
  };

  const handleLocationChange = (value) => {
    setLocation(value);

    updateUrl(searchTerm, value);
  };

  return (
    <>
      <BusinessPageHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        location={location}
        onLocationChange={handleLocationChange}
      />

      <BusinessFilters
        category={category}
        onCategoryChange={setCategory}
        rating={rating}
        onRatingChange={setRating}
        verified={verified}
        onVerifiedChange={setVerified}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <BusinessGrid
        searchTerm={searchTerm}
        location={location}
        category={category}
        rating={rating}
        verified={verified}
        sortBy={sortBy}
      />
    </>
  );
}

export default Businesses;
