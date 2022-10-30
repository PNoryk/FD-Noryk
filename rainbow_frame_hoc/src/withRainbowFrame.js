import { RainbowFrame } from "./RainbowFrame";
import { createElement } from "react";

export const withRainbowFrame = (colors) => (component) => (props) =>
  <RainbowFrame colors={colors}>{createElement(component, props)}</RainbowFrame>;
