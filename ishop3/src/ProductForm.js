import { useEffect, useState } from "react";

let isValidInitialization = (product) => {
  return {
    name: product ? true : undefined,
    price: product ? true : undefined,
    image: product ? true : undefined,
    count: product ? true : undefined,
  };
};

let productInitial = { name: "", price: "", image: "", count: "" };

export const ProductForm = ({ product: initialProduct, onCancel, onSave }) => {
  let [product, setProduct] = useState(initialProduct || productInitial);

  let [isValid, setIsValid] = useState(() =>
    isValidInitialization(initialProduct)
  );
  let isAllValidated = Object.values(isValid).every((el) => el !== undefined);
  let isAllValid = Object.values(isValid).every(Boolean);

  useEffect(() => {
    setProduct(initialProduct || productInitial);
    setIsValid(isValidInitialization(initialProduct));
  }, [initialProduct]);

  let validate = (name, value) => {
    switch (name) {
      case "name":
        setIsValid((prev) => ({ ...prev, [name]: !!value }));
        break;
      case "price":
        setIsValid((prev) => ({ ...prev, [name]: value > 0 }));
        break;
      case "image":
        setIsValid((prev) => ({
          ...prev,
          [name]:
            !!value &&
            !!value.match(
              /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,})/
            ),
        }));
        break;
      case "count":
        setIsValid((prev) => ({ ...prev, [name]: value >= 1 }));
        break;
      default:
        return;
    }
  };
  let changeProduct = (name, value) => {
    validate(name, value);
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h2>{initialProduct ? "Edit existing product" : "Add new product"}</h2>
      <div className="mb-3 row">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className={
              "form-control" + (isValid.name === false ? " is-invalid" : "")
            }
            id="name"
            value={product.name}
            name="name"
            onChange={(e) => changeProduct(e.target.name, e.target.value)}
          />
          {isValid.name === false && (
            <div className="invalid-feedback">
              <div>Shouldn't be empty</div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="price" className="col-sm-2 col-form-label">
          Price
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className={
              "form-control" + (isValid.price === false ? " is-invalid" : "")
            }
            id="price"
            value={product.price}
            name="price"
            onChange={(e) => changeProduct(e.target.name, e.target.value)}
          />
          {isValid.price === false && (
            <div className="invalid-feedback">
              <div>It should be greater than 0</div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="image" className="col-sm-2 col-form-label">
          Image
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className={
              "form-control" + (isValid.image === false ? " is-invalid" : "")
            }
            id="image"
            value={product.image}
            name="image"
            onChange={(e) => changeProduct(e.target.name, e.target.value)}
          />
          {isValid.image === false && (
            <div className="invalid-feedback">
              <div>It should be a valid url</div>
            </div>
          )}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="quantity" className="col-sm-2 col-form-label">
          Quantity
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className={
              "form-control" + (isValid.count === false ? " is-invalid" : "")
            }
            id="quantity"
            value={product.count}
            name="count"
            onChange={(e) => changeProduct(e.target.name, e.target.value)}
          />
          {isValid.count === false && (
            <div className="invalid-feedback">
              <div>It should be greater than or equal to 1</div>
            </div>
          )}
        </div>
      </div>
      <button
        className="btn btn-primary"
        type="button"
        disabled={!isAllValidated || !isAllValid}
        onClick={() => onSave(product)}
      >
        Save
      </button>
      <button
        className="btn btn-outline-danger ms-1"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </>
  );
};
