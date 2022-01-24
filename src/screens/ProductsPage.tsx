import React from "react";
import { useNavigate } from "react-router-dom";

import ProductTable from "../components/ProductTable/ProductTable";
import Button from "../components/UI/Button/Button";

const ProductsPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <Button title={"Create"} actionHandler={() => navigate("/create")} />
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
