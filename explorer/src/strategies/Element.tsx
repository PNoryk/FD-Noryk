import React from "react";

export const Element = ({
  name,
  icon: Icon,
  isIconFirst = true,
}: {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isIconFirst?: boolean;
}) => {
  return (
    <>
      {isIconFirst && <Icon width={20} />}
      {name}
      {!isIconFirst && <Icon width={20} />}
    </>
  );
};
