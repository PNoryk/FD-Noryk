import { ComponentType, ReactNode, useRef } from "react";
import { Tooltip } from "@/components/tooltip/Tooltip";

export const withTooltip =
  <T extends object>(tooltipInner: ReactNode, timeout: number) =>
  (Component: ComponentType<T>) =>
  (props: any) => {
    let ref = useRef(null);
    return (
      <>
        <Component {...props} ref={ref} />
        <Tooltip target={ref} leaveTimeout={timeout}>
          {tooltipInner}
        </Tooltip>
      </>
    );
  };
