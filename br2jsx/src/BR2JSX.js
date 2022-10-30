export const BR2JSX = ({ text }) => {
  let newArr = [];
  text.split(/<br\s*\/?>/).forEach((el, i, { length }) => {
    newArr.push(el);
    if (i !== length - 1) {
      newArr.push(<br key={i} />);
    }
  });
  return <div className="br2jsx">{newArr}</div>;
};
