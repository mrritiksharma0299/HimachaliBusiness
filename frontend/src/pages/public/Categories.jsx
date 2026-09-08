import { useState } from "react";

import CategoryPageHeader from "../../components/category/CategoryPageHeader";
import CategoryGrid from "../../components/category/CategoryGrid";

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <CategoryPageHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <CategoryGrid searchTerm={searchTerm} />
    </>
  );
}

export default Categories;