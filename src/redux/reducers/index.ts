import { combineReducers } from "redux";
import modalReducer from "./ModalReducer";
import productReducer from "./productReducers";

const rootReducer = combineReducers({
  products: productReducer,
  modal: modalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
