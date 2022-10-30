export const DoubleButton = ({ caption1, caption2, cbPressed, children }) => {
  return (
    <>
      <button type="button" onClick={() => cbPressed(1)}>{caption1}</button>
      {children}
      <button type="button" onClick={() => cbPressed(2)}>{caption2}</button>
    </>
  );
};
