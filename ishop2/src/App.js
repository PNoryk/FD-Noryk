import "bootstrap/dist/css/bootstrap.css";
import { Component } from "react";
import Shop from "./Shop";

export default class App extends Component {
  initialProducts = [
    {
      id: 1,
      name: "Boots",
      count: 1,
      image:
        "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/ef/P00412272.jpg",
    },
    {
      id: 2,
      name: "Male Boots",
      count: 2,
      image: "https://m.media-amazon.com/images/I/91C1xjwCWNL._UX500_.jpg",
    },
  ];
  headings = ["id", "name", "count", "image", "actions"];

  render = () => (
    <Shop products={this.initialProducts} headings={this.headings} />
  );
}
