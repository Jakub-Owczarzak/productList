import { Product } from "./product.interface";

export interface DeleteResponse {
  count: number;
}

export type ProductResponse = Product;

export type ProductsResponse = Product[];
