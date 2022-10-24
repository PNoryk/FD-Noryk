import { Component } from "react";
import Product from "./Product";
import ConfirmModal from "./ConfirmModal";

export default class Shop extends Component {
  state = {
    selectedId: null,
    showModal: false,
    productToRemove: null,
    products: [...this.props.products],
  };
  createHeadings = () =>
    this.props.headings.map((heading) => <th key={heading}>{heading}</th>);

  createRows = () =>
    this.state.products.map((row) => (
      <Product
        onClick={(selectedId) => this.setState({ selectedId })}
        onRemoveProduct={this.removeProduct}
        showModal={this.showModal}
        key={row.id}
        row={row}
        selected={row.id === this.state.selectedId}
      />
    ));

  removeProduct = (id) => {
    this.setState(({ products: previousProducts }) => {
      let selected = previousProducts.find(
        ({ id: productId }) => productId === id
      );
      let products;

      if (!(selected.count - 1)) {
        products = previousProducts.filter(
          ({ id: productId }) => productId !== id
        );
      } else {
        products = previousProducts.map((product) =>
          product.id === id ? { ...product, count: product.count - 1 } : product
        );
      }
      return { products, productToRemove: null, showModal: false };
    });
  };

  showModal = (id) => {
    this.setState(({ products: previousProducts }) => {
      let selected = previousProducts.find(
        ({ id: productId }) => productId === id
      );
      return { productToRemove: selected, showModal: true };
    });
  };
  render = () =>
    this.props.products.length ? (
      <>
        <table className="table">
          <thead>
            <tr>{this.createHeadings()}</tr>
          </thead>
          <tbody>{this.createRows()}</tbody>
        </table>
        <ConfirmModal
          show={this.state.showModal}
          onClose={() =>
            this.setState({ productToRemove: null, showModal: false })
          }
          onConfirm={() => this.removeProduct(this.state.productToRemove.id)}
        >
          <p>Would you like to remove {this.state.productToRemove?.name}</p>
        </ConfirmModal>
      </>
    ) : null;
}
