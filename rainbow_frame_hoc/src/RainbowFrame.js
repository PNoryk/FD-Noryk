const RainbowFrameSquare = ({ color, children }) => (
  <div style={{ margin: "10px", border: `10px solid ${color}` }}>
    {children}
  </div>
);

let textStyle = { fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" };

export const RainbowFrame = ({ colors, children }) =>
  colors.reduce(
    (prev, color) => (
      <RainbowFrameSquare color={color}>{prev}</RainbowFrameSquare>
    ),
    <RainbowFrameSquare color={"transparent"}>
      <div style={textStyle}>{children}</div>
    </RainbowFrameSquare>
  );
