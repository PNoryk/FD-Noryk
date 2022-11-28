import { Tooltip } from "@/components/tooltip/Tooltip";
import { forwardRef, useRef } from "react";
import { withTooltip } from "@/components/tooltip/withTooltip";

function App() {
  let tooltipRef = useRef(null);

  let btn = <button onClick={() => alert("hello")}>ok</button>;

  let MyWrappedComponent = forwardRef<HTMLButtonElement>((props, ref) => (
    <button ref={ref}>hover button</button>
  ));

  let ButtonWithTooltip = withTooltip(btn, 2000)(MyWrappedComponent);

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        earum inventore magnam provident voluptate. Accusamus dolorem esse
        explicabo facilis iste minima nobis, non sit sunt veniam. Illum maiores
        sequi sint.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A corporis
        dolor dolorem dolorum ea eius, eligendi facilis fugit iure minima
        nesciunt odio odit quam reiciendis sint soluta veritatis. Eius, ipsa.
      </p>
      <button ref={tooltipRef} type="button">
        hello
      </button>
      <Tooltip target={tooltipRef}>hello</Tooltip>

      <ButtonWithTooltip />
    </>
  );
}

export default App;
