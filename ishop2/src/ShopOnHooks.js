import { useRef, useState } from "react";
import Product from "./Product";
import ConfirmModal from "./ConfirmModal";

export const ShopOnHooks = ({ products: initialProducts, headings }) => {
  let [ products, setProducts ] = useState(initialProducts);
  let [ selectedId, setSelectedId ] = useState(null);
  let [ showModal, setShowModal ] = useState(false);
  let [ productToRemove, setProductToRemove ] = useState(null);
  let removeCountRef = useRef(null);
  let [ hasError, setHasError ] = useState(false);

  let createHeadings = () =>
    headings.map((heading) => <th key={ heading }>{ heading }</th>);

  const onShowModal = (id) => {
    setProductToRemove(products.find(({ id: productId }) => productId === id));
    setShowModal(true);
    removeCountRef.current.value = 1;
  };

  let createRows = () =>
    products.map((row) => (
      <Product
        onClick={ (selectedId) => setSelectedId(selectedId) }
        showModal={ onShowModal }
        key={ row.id }
        row={ row }
        selected={ row.id === selectedId }
      />
    ));

  let removeProducts = (count) => {
    setProducts((previousProducts) => {
      let removeProductId = productToRemove.id;
      let selected = previousProducts.find(({ id }) => id === removeProductId);
      let products;
      if (!(selected.count - count)) {
        products = previousProducts.filter(({ id }) => id !== removeProductId);
      } else {
        products = previousProducts.map((product) =>
          product.id === removeProductId
            ? { ...product, count: product.count - count }
            : product
        );
      }
      return products;
    });
    setProductToRemove(null);
    setShowModal(false);
  };

  const onConfirm = () => {
    let value = +removeCountRef.current.value;
    if (value < 1 || value > productToRemove.count) {
      setHasError(true);
      console.log("errors");
      return;
    }
    removeProducts(productToRemove, value);
  };

  return products.length ? (
    <>
      <table className="table">
        <thead>
        <tr>{ createHeadings() }</tr>
        </thead>
        <tbody>{ createRows() }</tbody>
      </table>
      <ConfirmModal
        show={ showModal }
        onClose={ () => {
          setProductToRemove(null);
          setShowModal(false);
          removeCountRef.current.value = "";
        } }
        onConfirm={ onConfirm }
      >
        <p>How many { productToRemove?.name } would you like to remove?</p>
        <input
          className={"form-control" + (hasError ? " is-invalid" : "")}
          type="number"
          min={ 1 }
          max={ productToRemove?.count }
          ref={ removeCountRef }
          onChange={ () => setHasError(false) }
        />
        { hasError ? (
          <div className="invalid-feedback">
            Should be between 1 and { productToRemove?.count }
          </div>
        ) : null }
      </ConfirmModal>
    </>
  ) : null;
};
