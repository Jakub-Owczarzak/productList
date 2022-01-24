import { Action } from "../actions/actions.interface";
import {
  Product,
  ColumnNames,
  SortingDirection,
  sortingOptions,
} from "../../models/product.interface";
import { ActionTypes } from "../action-types/action-types";

interface State {
  products: Product[];
  sortingOptions: sortingOptions;
}

const initialState: State = {
  products: [],
  sortingOptions: {
    id: "desc",
    name: "desc",
    date: "desc",
    description: "desc",
    quantity: "desc",
    email: "desc",
  },
};

const sortFunc = (
  products: Product[],
  columnName: ColumnNames,
  sortDirection: SortingDirection
) => {
  function compare(a: Product, b: Product) {
    if (a[columnName] < b[columnName]) {
      return -1;
    }
    if (a[columnName] > b[columnName]) {
      return 1;
    }
    return 0;
  }
  if (sortDirection === "asc") {
    const sortedProducts = products.sort(compare);
    return sortedProducts;
  }
  if (sortDirection === "desc") {
    const sortedProducts = products.sort(compare).reverse();
    return sortedProducts;
  }
  return products;
};

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PRODUCTS:
      return { ...state, products: [...state.products, ...action.payload] };
    case ActionTypes.CREATE:
      const newProducts = [...state.products, action.payload];
      return { ...state, products: newProducts };
    case ActionTypes.EDIT:
      const productIndex = state.products.findIndex(
        (el) => el.id === action.payload.id
      );
      const products = [...state.products];
      products.splice(productIndex, 1, action.payload);
      return { ...state, products };
    case ActionTypes.DELETE:
      return {
        ...state,
        products: state.products.filter((el) => el.id !== action.payload),
      };
    case ActionTypes.SORT:
      const newSortedState = sortFunc(
        state.products,
        action.payload.columnName,
        action.payload.sortDirection
      );
      return {
        ...state,
        products: [...newSortedState],
        sortingOptions: {
          ...initialState.sortingOptions,
          [action.payload.columnName]: action.payload.sortDirection,
        },
      };
    case ActionTypes.SEARCH:
      return {
        ...state,
        products: [...action.payload],
      };
    case ActionTypes.CLEAN:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default productReducer;
