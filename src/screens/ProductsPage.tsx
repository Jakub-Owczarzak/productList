import React from "react";

import ProductTable from "../components/ProductTable/ProductTable";

import classNames from "classnames";
import styles from "./ProductPage.module.scss";

const ProductsPage: React.FC = (): JSX.Element => {
  return (
    <div className={classNames(styles.wrapper)}>
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
