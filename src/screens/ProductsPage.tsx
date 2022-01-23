import React from "react";

import ProductTable from "../components/ProductTable/ProductTable";
import Button from "../components/UI/Button/Button";

const ProductsPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <ProductTable />
      <Button type="create" />
    </div>
  );
};

export default ProductsPage;
