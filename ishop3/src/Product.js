export const Product = ({
  product,
  children,
  onClickCapture,
  selected,
  headings,
}) => {
  let columns = Object.keys(headings).map((name) => {
    let text = product[name];
    return (
      text && (
        <td key={`${product.id}_${name}`}>
          {name === "image" ? (
            <img alt={product.name} src={text} height={200} />
          ) : (
            text
          )}
        </td>
      )
    );
  });
  columns.push(<td key={`${product.id}_action`}>{children}</td>);
  return (
    <tr
      onClickCapture={onClickCapture}
      className={selected ? "bg-success bg-opacity-25" : null}
    >
      {columns}
    </tr>
  );
};
