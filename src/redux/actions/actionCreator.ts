import { Dispatch } from "redux"

import { Product, ProductBase, ProductId } from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";
import axios from "../../api/api"

import { Action, CreateProduct, DeleteProduct, EditProduct, FetchAllProducts } from "./actions.interface";

const fetchAllProducts = (products: Product[]): FetchAllProducts => {
    return {
        type: ActionTypes.FETCH_PRODUCTS,
        payload: products
    }
};

const createProduct = (product: Product): CreateProduct => {
    return {
        type: ActionTypes.CREATE,
        payload: product
    }
};

const editProduct = (product: Product): EditProduct => {
    return {
        type: ActionTypes.EDIT,
        payload: product
    }
};

const deleteProduct = (id: number): DeleteProduct => {
    return {
        type: ActionTypes.DELETE,
        payload: id
    }
};


export const fetchAllProductsAsync = () => {
    return async (dispatch: Dispatch<Action>) => {
        const { data } = await axios.get("/Products");
        console.log(data);
        dispatch(fetchAllProducts(data))
    }
}

export const createProductAsync = (product: ProductBase) => {
    return async (dispatch: Dispatch<Action>) => {
        const { data } = await axios.post("/Products", product);
        dispatch(createProduct(data))
    }
}

export const editProductAsync = (product: Product) => {
    return async (dispatch: Dispatch<Action>) => {
        const { data } = await axios.put("/Products", product);
        console.log(data);
        dispatch(editProduct(data))
    }
}