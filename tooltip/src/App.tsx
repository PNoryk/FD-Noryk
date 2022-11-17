import { Tooltip } from "@/components/tooltip/Tooltip";
import { useRef } from "react";

function App() {
  let tooltipRef = useRef(null);
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
    </>
  );
}

export default App;
