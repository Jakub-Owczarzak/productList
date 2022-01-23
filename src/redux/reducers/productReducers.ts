import { Action } from "../actions/actions.interface";
import { Product } from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";

interface State {
    products: Product[]
}

const initialState = {
    products: []
}

const productReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case ActionTypes.FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        case ActionTypes.CREATE:
            const newProducts = [...state.products, action.payload];
            return { ...state, products: newProducts };
        case ActionTypes.EDIT:
            const productIndex = state.products.findIndex(el => el.id === action.payload.id);
            const products = [...state.products];
            products.splice(productIndex, 1, action.payload);
            return { ...state, products }

        case ActionTypes.DELETE:
            return { ...state, products: state.products.filter(el => el.id !== action.payload) }
        default: return state
    }

}

export default productReducer;