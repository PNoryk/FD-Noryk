import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Arrow, Inner, StyledTooltip } from "./styled";
import { TooltipPosition } from "@/types";

interface IProps {
  children: string;
  target: MutableRefObject<HTMLElement | null>;
  preferredPosition?: TooltipPosition;
  timeout?: number;
}

const calculatePosition = (
  tooltipWidth: number,
  tooltipHeight: number,
  targetPosition: DOMRect,
  preferredPosition: TooltipPosition,
  prev?: TooltipPosition
): [number, number, TooltipPosition] => {
  let [xPosition, yPosition, position] = [0, 0, preferredPosition];
  let scroll = document.documentElement.scrollTop;
  switch (preferredPosition) {
    case TooltipPosition.Top:
      xPosition =
        targetPosition.x + targetPosition.width / 2 - tooltipWidth / 2;
      if (xPosition < 0) {
        xPosition = 0;
      }
      yPosition = targetPosition.y + scroll - tooltipHeight;
      position = preferredPosition;
      if (
        prev !== TooltipPosition.Bottom &&
        (yPosition < 0 || yPosition > targetPosition.y - scroll - tooltipHeight)
      ) {
        [xPosition, yPosition] = calculatePosition(
          tooltipWidth,
          tooltipHeight,
          targetPosition,
          TooltipPosition.Bottom,
          preferredPosition
        );
        position = TooltipPosition.Bottom;
      }
      break;
    case TooltipPosition.Bottom:
      xPosition =
        targetPosition.x + targetPosition.width / 2 - tooltipWidth / 2;
      if (xPosition < 0) {
        xPosition = 0;
      }
      yPosition = targetPosition.bottom + scroll;
      let documentHeight =
        document.documentElement.getBoundingClientRect().height;
      if (
        prev !== TooltipPosition.Top &&
        yPosition > documentHeight - targetPosition.height
      ) {
        [xPosition, yPosition] = calculatePosition(
          tooltipWidth,
          tooltipHeight,
          targetPosition,
          TooltipPosition.Top,
          preferredPosition
        );
        position = TooltipPosition.Top;
      }
      break;
  }
  return [xPosition, yPosition, position];
};

export const Tooltip = ({
  children,
  target,
  preferredPosition = TooltipPosition.Top,
  timeout = 1000,
}: IProps) => {
  let [show, setShow] = useState(false);
  let [styles, setStyles] = useState({});
  let [position, setPosition] = useState(preferredPosition);
  let tooltipRef = useRef<HTMLDivElement>(null);

  let [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  const onMouseEnter = () => {
    console.log("enter");
    console.log(timeoutId);
    clearTimeout(timeoutId);
  };

  const onMouseLeave = () => {
    console.log("oldTimer", timeoutId);
    let newTimer = setTimeout(() => setShow(false), timeout);
    setTimeoutId(newTimer);
    console.log("newTimer", newTimer);
  };

  useEffect(() => {
    if (target.current !== null) {
      target.current.onmouseenter = () => {
        onMouseEnter();
        setShow(true);
      };
      target.current.onmouseleave = onMouseLeave;
    }
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (show && tooltipRef.current && target.current) {
      let { width: tooltipWidth, height: tooltipHeight } =
        tooltipRef.current.getBoundingClientRect();
      let targetPosition = target.current.getBoundingClientRect();
      let [xPosition, yPosition, newPosition] = calculatePosition(
        tooltipWidth,
        tooltipHeight,
        targetPosition,
        preferredPosition
      );
      setStyles({ top: yPosition, left: xPosition });
      setPosition(newPosition);
    }
  }, [show]);

  return (
    (show || null) && (
      <StyledTooltip
        style={styles}
        ref={tooltipRef}
        onMouseOver={onMouseEnter}
        onMouseOut={onMouseLeave}
      >
        {position === TooltipPosition.Bottom && (
          <Arrow key="arrow" position={position} />
        )}
        <Inner>{children}</Inner>
        {position === TooltipPosition.Top && (
          <Arrow key="arrow" position={position} />
        )}
      </StyledTooltip>
    )
  );
};
