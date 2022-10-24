import { Component } from "react";
import Product from "./Product";
import ConfirmModal from "./ConfirmModal";

export default class Shop extends Component {
  state = {
    selectedId: null,
    showModal: false,
    productToRemove: null,
    removeCount: 1,
    products: [...this.props.products],
  };
  createHeadings = () =>
    this.props.headings.map((heading) => <th key={heading}>{heading}</th>);

  createRows = () =>
    this.state.products.map((row) => (
      <Product
        onClick={(selectedId) => this.setState({ selectedId })}
        onRemoveProduct={this.removeProducts}
        showModal={this.showModal}
        key={row.id}
        row={row}
        selected={row.id === this.state.selectedId}
      />
    ));

  removeProducts = (id, count) => {
    this.setState(({ products: previousProducts }) => {
      let selected = previousProducts.find(
        ({ id: productId }) => productId === id
      );
      let products;
      if (!(selected.count - count)) {
        products = previousProducts.filter(
          ({ id: productId }) => productId !== id
        );
      } else {
        products = previousProducts.map((product) =>
          product.id === id
            ? { ...product, count: product.count - count }
            : product
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
      return { productToRemove: selected, showModal: true, removeCount: 1 };
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
            this.setState({
              productToRemove: null,
              showModal: false,
              removeCount: 1,
            })
          }
          onConfirm={() =>
            this.removeProducts(
              this.state.productToRemove.id,
              this.state.removeCount
            )
          }
        >
          <p>
            How many {this.state.productToRemove?.name} would you like to
            remove?
          </p>
          <input
            className="form-control"
            type="number"
            min={1}
            max={this.state.productToRemove?.count}
            value={this.state.removeCount}
            onChange={(e) => this.setState({ removeCount: e.target.value })}
          />
        </ConfirmModal>
      </>
    ) : null;
}
