import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  cleanProducts,
} from "../../redux/actions/actionCreator";
import { RootState } from "../../redux/reducers";
import axios from "../../api/api";
import { ColumnNames, Product } from "../../models/product.interface";
import TableHead from "./subComponents/TableHead/TableHead";
import TableRow from "./subComponents/TableRow/TableRow";
import TablePanelController from "./subComponents/TablePanelController/TablePanelController";
import SearchBar from "../UI/SearchBar/SearchBar";

const ProductTable: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
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
    <div>
      <SearchBar perPageState={perPage} />
      <table>
        <thead>
          <tr>
            {sortingKeys.map((el) => (
              <TableHead key={el} name={el} />
            ))}
          </tr>
        </thead>
        <tbody>
          {products &&
            currentProduct.map((product, index) => (
              <TableRow key={index} product={product} />
            ))}
        </tbody>
      </table>
      <TablePanelController
        perPageState={perPage}
        productCountState={productCount}
        currentPageState={currentPage}
        setCurrentPageHandler={setCurrentPage}
        setPerPageHandler={setPerPage}
      />
    </div>
  );
};

export default ProductTable;
