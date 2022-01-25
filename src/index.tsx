import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import CreateProductPage from "./screens/CreateProductPage";
import EditProductPage from "./screens/EditProductPage";
import ProductsPage from "./screens/ProductsPage";
import { store } from "./redux/store";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<ProductsPage />} />
            <Route path="create" element={<CreateProductPage />} />
            <Route path="edit/:id" element={<EditProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
