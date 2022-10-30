import { useRef, useState } from "react";
import { Product } from "./Product";
import ConfirmModal from "./ConfirmModal";
import { ProductDetail } from "./ProductDetail";
import { ProductForm } from "./ProductForm";

export const Shop = ({ products: initialProducts, headings }) => {
  let [ products, setProducts ] = useState(initialProducts);
  let [ selectedId, setSelectedId ] = useState(null);
  let [ showModal, setShowModal ] = useState(false);
  let [ productToRemove, setProductToRemove ] = useState(null);
  let removeCountRef = useRef(null);
  let [ hasError, setHasError ] = useState(false);

  let [ isProductFormOpened, setIsProductFormOpened ] = useState(false);
  let [ productFormId, setProductFormId ] = useState(null);

  let createHeadings = () =>
    Object.values(headings).map((heading) => <th key={ heading }>{ heading }</th>);

  const onShowModal = (id) => {
    setProductToRemove(products.find(({ id: productId }) => productId === id));
    setShowModal(true);
    removeCountRef.current.value = 1;
  };

  let createRows = () =>
    products.map((product) => (
      <Product
        onClick={ () => !isProductFormOpened && setSelectedId(product.id) }
        key={ product.id }
        product={ product }
        headings={ headings }
        selected={ product.id === selectedId }
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={ () => {
            setProductFormId(product.id);
            setIsProductFormOpened(true);
          } }
          disabled={ isProductFormOpened }
        >
          edit
        </button>
        <button
          type="button"
          className="btn btn-danger ms-1"
          onClick={ () => onShowModal(product.id) }
          disabled={ isProductFormOpened }
        >
          remove
        </button>
      </Product>
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
    if (value < 1 || value > productToRemove.count || value % 1 !== 0) {
      setHasError(true);
      return;
    }
    removeProducts(value);
  };

  let selectedProduct = products.find(({ id }) => id === selectedId);
  let onProductFormSave = (product) => {
    let isNew = !("id" in product);
    if (isNew) {
      product.id = Math.max(...products.map(({ id }) => id)) + 1;
      setProducts((prev) => [ ...prev, product ]);
    } else {
      setProducts((prev) =>
        prev.map((el) => (el.id !== product.id ? el : product))
      );
    }
    setIsProductFormOpened(false);
  };
  let productForEdit = products.find(({ id }) => id === productFormId);

  return products.length ? (
    <div className="container">
      <table className="table">
        <thead>
        <tr>{ createHeadings() }</tr>
        </thead>
        <tbody>{ createRows() }</tbody>
      </table>
      { !isProductFormOpened && (
        <p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={ () => {
              setIsProductFormOpened(true);
              setProductFormId(null);
              setSelectedId(null);
            } }
          >
            Add new
          </button>
        </p>
      ) }
      <ConfirmModal
        show={ showModal }
        onShow={ () => removeCountRef.current.focus() }
        onClose={ () => {
          setProductToRemove(null);
          setShowModal(false);
          removeCountRef.current.value = "";
        } }
        onConfirm={ onConfirm }
      >
        <p>How many { productToRemove?.name } would you like to remove?</p>
        <input
          className={ "form-control" + (hasError ? " is-invalid" : "") }
          type="number"
          min={ 1 }
          max={ productToRemove?.count }
          ref={ removeCountRef }
          onChange={ () => setHasError(false) }
        />
        { hasError && (
          <div className="invalid-feedback">
            <div>Set a valid integer.</div>
            <div>It should be between 1 and { productToRemove?.count }</div>
          </div>
        ) }
      </ConfirmModal>
      { selectedProduct && <ProductDetail product={ selectedProduct }/> }
      { isProductFormOpened && (
        <ProductForm
          product={ productForEdit }
          onSave={ onProductFormSave }
          onCancel={ () => {
            setIsProductFormOpened(false);
            setProductFormId(null);
          } }
        />
      ) }
    </div>
  ) : null;
};
