import 'bootstrap/dist/css/bootstrap.css'
import "./App.css"
import { Component } from "react";
import Shop from './Shop'
import Product from "./Product";
import ConfirmModal from "./ConfirmModal";

export default class App extends Component {
  initialProducts = [
    {
      id: 1,
      name: "Boots",
      count: 1,
      image: "https://img.mytheresa.com/1088/1088/66/jpeg/catalog/product/ef/P00412272.jpg",
    },
    { id: 2, name: "Male Boots", count: 2, image: "https://m.media-amazon.com/images/I/91C1xjwCWNL._UX500_.jpg" },
  ]
  headings = [ "id", "name", "count", "image", "actions" ]
  state = {
    products: [ ...this.initialProducts ],
    selectedId: null,
    selected: null,
    showModal: false,
    productToRemove: null,
  }

  handleSelect = (selectedId) => {
    this.setState({ selectedId, selected: this.state.products.find(({ id: itemId }) => itemId === selectedId) })
  }

  removeProduct = (id) => {
    this.setState(({ products: previousProducts }) => {
      let selected = previousProducts.find(({ id: productId }) => productId === id)
      let products;

      if (!(selected.count - 1)) {
        products = previousProducts.filter(({ id: productId }) => productId !== id)
      } else {
        products = previousProducts.map((product) =>
          product.id === id ? { ...product, count: product.count - 1 } : product,
        )
      }
      return { products, productToRemove: null, showModal: false }
    })
  }

  showModal = (id) => {
    this.setState(({ products: previousProducts }) => {
      let selected = previousProducts.find(({ id: productId }) => productId === id);
      return { productToRemove: selected, showModal: true }
    })
  }

  render = () => (
    <div className="App">
      <Shop selected={ this.state.selectedId } products={ this.state.products } headings={ this.headings }
            handleSelect={ this.handleSelect }
            showModal={ this.showModal }/>
      <Product product={ this.state.selected }/>
      <ConfirmModal show={ this.state.showModal }
                    onClose={ () => this.setState({ productToRemove: null, showModal: false }) }
                    onConfirm={ () => this.removeProduct(this.state.productToRemove.id) }
      >
        <p>Would you like to remove { this.state.productToRemove?.name }</p>
      </ConfirmModal>
    </div>
  );
}
