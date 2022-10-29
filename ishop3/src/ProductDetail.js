export const ProductDetail = ({ product }) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5>{product.name}</h5>
        <dl>
          <dt>count</dt>
          <dd>{product.count}</dd>
        </dl>
      </div>
    </div>
  );
};
