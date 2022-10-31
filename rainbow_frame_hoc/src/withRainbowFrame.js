const makeDiv = (color, children) => (
  <div style={{ margin: "10px", border: `10px solid ${color}` }}>
    {children}
  </div>
);

export const withRainbowFrame = (colors) => (Component) => (props) =>
  colors.reduce(
    (prev, color) => makeDiv(color, prev),
    <Component {...props} />
  );
