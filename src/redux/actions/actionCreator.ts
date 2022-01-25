import { Dispatch } from "redux";

import {
  ColumnNames,
  Product,
  ProductBase,
  SortingDirection,
} from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";
import axios from "../../api/api";

import {
  Action,
  CleanProducts,
  CreateProduct,
  DeleteProduct,
  EditProduct,
  FetchAllProducts,
  SearchProducts,
  SortProduct,
} from "./actions.interface";
import {
  DeleteResponse,
  ProductResponse,
  ProductsResponse,
} from "../../models/axiosResponse.interfaces";

import { ModalAction, openNotificationModal } from "./modalActionCreator";

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

export const cleanProducts = (): CleanProducts => {
  return {
    type: ActionTypes.CLEAN,
  };
};

export const searchProduct = (results: Product[]): SearchProducts => {
  return {
    type: ActionTypes.SEARCH,
    payload: results,
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
  return async (dispatch: Dispatch<Action | ModalAction>) => {
    try {
      const { data } = await axios.get<ProductsResponse>(
        `/Products?filter[limit]=${limit}&filter[skip]=${skip}`
      );
      dispatch(fetchProducts(data));
    } catch (error) {
      dispatch(openNotificationModal("Error occurred", true));
      console.log(error);
    }
  };
};

export const createProductAsync = (product: ProductBase) => {
  return async (dispatch: Dispatch<Action | ModalAction>) => {
    try {
      const { data } = await axios.post("/Products", product);
      dispatch(createProduct(data));
      dispatch(openNotificationModal("Product created!", false));
    } catch (error) {
      dispatch(openNotificationModal("Refuse to create product!", false));
      console.log(error);
    }
  };
};

export const editProductAsync = (product: Product) => {
  return async (dispatch: Dispatch<Action | ModalAction>) => {
    try {
      const { data } = await axios.put<ProductResponse>("/Products", product);
      if (data) {
        dispatch(editProduct(data));
        dispatch(openNotificationModal("Product edited!", false));
      }
    } catch (error) {
      dispatch(openNotificationModal("Error occurred", true));
      console.log(error);
    }
  };
};

export const deleteProductAsync = (id: number) => {
  return async (dispatch: Dispatch<Action | ModalAction>) => {
    try {
      const { data } = await axios.delete<DeleteResponse>(`/Products/${id}`);
      if (data.count === 1) {
        dispatch(deleteProduct(id));
        dispatch(openNotificationModal("Product deleted!", false));
      } else if (data.count === 0) {
        dispatch(openNotificationModal("Product not found in data base", true));
        throw new Error("Product not found in data base");
      }
    } catch (error) {
      dispatch(openNotificationModal("Error occurred", true));
      console.log(error);
    }
  };
};

export const searchProductAsync = (inputData: string) => {
  return async (dispatch: Dispatch<Action | ModalAction>) => {
    try {
      const { data } = await axios.get<ProductsResponse>(
        `Products?filter[where][name][like]=%${inputData}%`
      );
      if (data) {
        dispatch(searchProduct(data));
      }
    } catch (error) {
      dispatch(openNotificationModal("Error occurred", true));
      console.log(error);
    }
  };
};
