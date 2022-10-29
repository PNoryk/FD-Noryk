export const BR2JSX = ({ text }) => {
  let newArr = [];
  text.split(/<br\s*\/?>/).forEach((el, i) => newArr.push(el, <br key={i} />));
  return <div className="br2jsx">{ newArr }</div>;
};