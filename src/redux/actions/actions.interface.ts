import { Product, SortProducts } from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";

export interface FetchAllProducts {
  type: ActionTypes.FETCH_PRODUCTS;
  payload: Product[];
}

export interface CreateProduct {
  type: ActionTypes.CREATE;
  payload: Product;
}

export interface EditProduct {
  type: ActionTypes.EDIT;
  payload: Product;
}

export interface DeleteProduct {
  type: ActionTypes.DELETE;
  payload: number;
}

export interface SortProduct {
  type: ActionTypes.SORT;
  payload: SortProducts;
}

export type Action =
  | FetchAllProducts
  | CreateProduct
  | EditProduct
  | DeleteProduct
  | SortProduct;
