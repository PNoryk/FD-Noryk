import styled from "styled-components";
import {TooltipPosition} from "@/types";

export const StyledTooltip = styled.div`
  position: absolute;
  padding: 0.5rem 0.25rem;
  top: -1000px;
`;

export const Inner = styled.div`
  padding: 0.25rem;
  text-align: center;
  border-radius: 0.25rem;
  background-color: #000;
  color: #fff;
`;

interface ArrowProps {
  position: TooltipPosition
}

export const Arrow = styled.div<ArrowProps>`
  width: 0.8rem;
  height: 0.4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    ${({position}) => position.toLowerCase()}: 0;
    left: 5px;
    border-width: 0.4rem;
    border-color: transparent;
    border-style: solid;
    border-${({position}) => position.toLowerCase()}-color: #000;
  }
`;