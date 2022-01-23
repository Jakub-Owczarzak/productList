import { Dispatch } from "redux";

import {
  ColumnNames,
  Product,
  ProductBase,
  SortingDirection,
  SortProducts,
} from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";
import axios from "../../api/api";

import {
  Action,
  CreateProduct,
  DeleteProduct,
  EditProduct,
  FetchAllProducts,
  SortProduct,
} from "./actions.interface";
import {
  DeleteResponse,
  ProductResponse,
  ProductsResponse,
} from "../../models/axiosResponse.interfaces";

const fetchProducts = (products: Product[]): FetchAllProducts => {
  return {
    type: ActionTypes.FETCH_PRODUCTS,
    payload: products,
  };
};

const createProduct = (product: Product): CreateProduct => {
  return {
    type: ActionTypes.CREATE,
    payload: product,
  };
};

const editProduct = (product: Product): EditProduct => {
  return {
    type: ActionTypes.EDIT,
    payload: product,
  };
};

const deleteProduct = (id: number): DeleteProduct => {
  return {
    type: ActionTypes.DELETE,
    payload: id,
  };
};

export const sort = (
  columnName: ColumnNames,
  sortDirection: SortingDirection
): SortProduct => {
  return {
    type: ActionTypes.SORT,
    payload: {
      columnName,
      sortDirection,
    },
  };
};

export const fetchProductsAsync = (limit: number, skip: number) => {
  return async (dispatch: Dispatch<Action>) => {
    console.log(limit);
    console.log(skip);
    const { data } = await axios.get<ProductsResponse>(
      `/Products?filter[limit]=${limit}&filter[skip]=${skip}`
    );
    console.log("ACTION PRODUCT", data);
    dispatch(fetchProducts(data));
  };
};

export const createProductAsync = (product: ProductBase) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.post("/Products", product);
      dispatch(createProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProductAsync = (product: Product) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.put<ProductResponse>("/Products", product);
      if (data) {
        dispatch(editProduct(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductAsync = (id: number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.delete<DeleteResponse>(`/Products/${id}`);
      if (data.count === 1) {
        dispatch(deleteProduct(id));
      } else if (data.count === 0) {
        throw new Error("Product not found in data base");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
