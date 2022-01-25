import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanProducts,
  fetchProductsAsync,
} from "../../redux/actions/actionCreator";
import { RootState } from "../../redux/reducers";
import axios from "../../api/api";
import { useNavigate } from "react-router-dom";

import { ColumnNames, Product } from "../../models/product.interface";
import TableHead from "./subComponents/TableHead/TableHead";
import TableRow from "./subComponents/TableRow/TableRow";
import TablePanelController from "./subComponents/TablePanelController/TablePanelController";
import SearchBar from "./subComponents/SearchBar/SearchBar";

import Button from "../UI/Button/Button";
import PerPageSelect from "./subComponents/PerPageSelect/PerPageSelect";

import styles from "./productTable.module.scss";

const ProductTable: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [productCount, setProductCount] = useState<number>(0);
  const [currentProduct, setcurrentProduct] = useState<Product[]>([]);

  const products = useSelector((state: RootState) => state.products.products);
  const sortingOptions = useSelector(
    (state: RootState) => state.products.sortingOptions
  );

  const sortingKeys = Object.keys(sortingOptions) as Array<ColumnNames>;
  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;

  const handleFetchProductCount = async () => {
    const { data } = await axios.get<{ count: number }>("/Products/count");
    setProductCount(data.count);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPerPage(parseInt(value));
    dispatch(cleanProducts());
  };

  useEffect(() => {
    setcurrentProduct(products.slice(indexOfFirstProduct, indexOfLastProduct));
    handleFetchProductCount();
  }, [products, currentPage]);

  useEffect(() => {
    if (
      products.length >= productCount ||
      products.length >= perPage * currentPage ||
      perPage > productCount
    ) {
      return;
    }
    dispatch(fetchProductsAsync(perPage, perPage * currentPage - perPage));
  }, [currentPage]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProductsAsync(perPage, 0));
      setCurrentPage(1);
    }
  }, [, perPage]);
  return (
    <div className={styles.tableWrapper}>
      <section className={styles.searchBarSection}>
        <PerPageSelect perPageState={perPage} setPerPageHandler={setPerPage} />
        <SearchBar perPageState={perPage} />
        <Button
          title={"Create"}
          actionHandler={() => navigate("/create")}
          type="create"
        />
      </section>
      <section className={styles.tableSection}>
        <table className={styles.table}>
          <thead className={styles.tableHeadWrapper}>
            <tr>
              {sortingKeys.map((el) => (
                <TableHead key={el} name={el} />
              ))}
              <th style={{ backgroundColor: "#2d353f" }}></th>
            </tr>
          </thead>
          <tbody className={styles.tableBodyWrapper}>
            {products &&
              currentProduct.map((product, index) => (
                <TableRow key={index} product={product} index={index} />
              ))}
          </tbody>
        </table>
      </section>

      <section className={styles.controllSection}>
        <TablePanelController
          perPageState={perPage}
          productCountState={productCount}
          currentPageState={currentPage}
          setCurrentPageHandler={setCurrentPage}
        />
      </section>
    </div>
  );
};

export default ProductTable;
