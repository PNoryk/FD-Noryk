const makeDiv = (color, children) => (
  <div style={{ margin: "10px", border: `10px solid ${color}` }}>
    {children}
  </div>
);

let textStyle = { fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" };

export const RainbowFrame = ({ colors, children }) =>
  colors.reduce(
    (prev, color) => makeDiv(color, prev),
    makeDiv("transparent", <div style={textStyle}>{children}</div>)
  );
