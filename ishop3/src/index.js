import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Shop } from "./Shop";
import products from './initialProducts.json'
import 'bootstrap/dist/css/bootstrap.css'

const headings = {
  id: "id",
  name: "name",
  price: "price",
  image: "image",
  count: "quantity",
  actions: "actions"
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Shop products={products} headings={headings} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
