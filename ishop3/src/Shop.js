import { useRef, useState } from "react";
import { Product } from "./Product";
import ConfirmModal from "./ConfirmModal";
import { ProductDetail } from "./ProductDetail";
import { ProductForm } from "./ProductForm";

export const Shop = ({ products: initialProducts, headings }) => {
  let [ products, setProducts ] = useState(initialProducts);
  let [ selectedId, setSelectedId ] = useState(null);
  let [ showModal, setShowModal ] = useState(false);
  let removeCountRef = useRef(null);
  let [ countToRemove, setCountToRemove ] = useState(1);
  let [ hasError, setHasError ] = useState(false);

  let [ isProductFormOpened, setIsProductFormOpened ] = useState(false);
  let [ productFormId, setProductFormId ] = useState(null);

  let createHeadings = () =>
    Object.values(headings).map((heading) => <th key={ heading }>{ heading }</th>);

  let selectedProduct = products.find(({ id }) => id === selectedId);

  let createRows = () =>
    products.map((product) => (
      <Product
        onClickCapture={ (e) =>
          !isProductFormOpened &&
          setSelectedId(
            e.target.type !== "button" &&
            selectedId &&
            selectedId === product.id
              ? null
              : product.id
          )
        }
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
          onClick={ () => setShowModal(true) }
          disabled={ isProductFormOpened }
        >
          remove
        </button>
      </Product>
    ));

  let removeProducts = (count) => {
    setProducts(() => {
      let removeProductId = selectedProduct.id;
      if (!(selectedProduct.count - count)) {
        return products.filter(({ id }) => id !== removeProductId);
      }
      return products.map((product) =>
        product.id === removeProductId
          ? { ...product, count: product.count - count }
          : product
      );
    });
    setShowModal(false);
  };

  const onConfirm = () => {
    let value = +countToRemove;
    if (value < 1 || value > selectedProduct.count || value % 1 !== 0) {
      setHasError(true);
      return;
    }
    removeProducts(value);
  };

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
      { selectedProduct && showModal && (
        <ConfirmModal
          onMounted={ () => {
          } }
          // onMounted={ () => {removeCountRef.current.focus();
          //   console.log(removeCountRef.current);} }
          onClose={ () => {
            setShowModal(false);
            setCountToRemove(1);
          } }
          onConfirm={ onConfirm }
        >
          <p>How many { selectedProduct.name } would you like to remove?</p>
          <input
            className={ "form-control" + (hasError ? " is-invalid" : "") }
            type="number"
            min={ 1 }
            max={ selectedProduct.count }
            value={ countToRemove }
            onChange={ (e) => {
              setCountToRemove(e.target.value);
              setHasError(false);
            } }
          />
          { hasError && (
            <div className="invalid-feedback">
              <div>Set a valid integer.</div>
              <div>It should be between 1 and { selectedProduct.count }</div>
            </div>
          ) }
        </ConfirmModal>
      ) }
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
