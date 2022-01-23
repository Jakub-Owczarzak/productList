import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, sort } from "../../redux/actions/actionCreator";
import { RootState } from "../../redux/reducers";
import Button from "../UI/Button/Button";
import axios from "../../api/api";
import { Product } from "../../models/product.interface";

const ProductTable: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [productCount, setProductCount] = useState<number>(0);
  const [currentProduct, setcurrentProduct] = useState<Product[]>([]);

  const products = useSelector((state: RootState) => state.products.products);
  const sortingOptions = useSelector(
    (state: RootState) => state.products.sortingOptions
  );

  const indexOfLastProduct = currentPage * perPage;
  const indexOfFirstProduct = indexOfLastProduct - perPage;

  const handleNextPage = () => {
    if (currentPage >= Math.ceil(productCount / perPage)) {
      return;
    }
    setCurrentPage((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prevState) => prevState - 1);
  };

  const handleFetchProductCount = async () => {
    const { data } = await axios.get<{ count: number }>("/Products/count");
    setProductCount(data.count);
  };

  useEffect(() => {
    setcurrentProduct(products.slice(indexOfFirstProduct, indexOfLastProduct));
    handleFetchProductCount();
  }, [products, currentPage]);

  useEffect(() => {
    if (products.length === productCount) {
      return;
    }
    dispatch(fetchProductsAsync(perPage, perPage * currentPage - perPage));
  }, [currentPage]);

  // useEffect(() => {
  //   if (
  //     products.length === currentPage * (perPage - 1) &&
  //     Math.ceil(productCount / perPage) > 1
  //   ) {
    
  //     setCurrentPage((prevState) => prevState - 1);
  //   }
  // }, [currentProduct]);

  useEffect(() => {
    if (products.length > 0) {
      return;
    }
    dispatch(fetchProductsAsync(perPage, 0));
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th
              onClick={() =>
                dispatch(
                  sort("id", `${sortingOptions.id === "desc" ? "asc" : "desc"}`)
                )
              }
            >
              ID
            </th>

            <th
              onClick={() =>
                dispatch(
                  sort(
                    "name",
                    `${sortingOptions.name === "desc" ? "asc" : "desc"}`
                  )
                )
              }
            >
              Name
            </th>

            <th
              onClick={() =>
                dispatch(
                  sort(
                    "quantity",
                    `${sortingOptions.quantity === "desc" ? "asc" : "desc"}`
                  )
                )
              }
            >
              Quantity
            </th>

            <th
              onClick={() =>
                dispatch(
                  sort(
                    "date",
                    `${sortingOptions.date === "desc" ? "asc" : "desc"}`
                  )
                )
              }
            >
              Date
            </th>

            <th
              onClick={() =>
                dispatch(
                  sort(
                    "description",
                    `${sortingOptions.description === "desc" ? "asc" : "desc"}`
                  )
                )
              }
            >
              Description
            </th>

            <th
              onClick={() =>
                dispatch(
                  sort(
                    "email",
                    `${sortingOptions.email === "desc" ? "asc" : "desc"}`
                  )
                )
              }
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            currentProduct.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{new Date(product.date).toLocaleDateString()}</td>
                <td>{product.description}</td>
                <td>{product.email}</td>
                <td>
                  <Button id={product.id} type="edit" />
                  <Button id={product.id} type="delete" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button onClick={handlePrevPage}>prev</button>
      <button onClick={handleNextPage}>next</button>
    </div>
  );
};

export default ProductTable;
