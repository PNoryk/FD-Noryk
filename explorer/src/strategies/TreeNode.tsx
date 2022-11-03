import { ElementType, Folder } from "../types";
import { Element } from "./Element";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as ArrowToggle } from "../assets/icons/arrow-toggler.svg";
import "./TreeNode.scss";

export const TreeNode = ({
  root,
  setLastSelected,
}: {
  root: Folder;
  setLastSelected: Dispatch<SetStateAction<Folder | null>>;
}) => {
  let hasFiles = !!root.children.filter((el) => el.type === "FILE").length;
  const [isVisible, setIsVisible] = useState(false);
  const expand = () => {
    setIsVisible(!isVisible);
    setLastSelected(!isVisible ? root : null);
  };
  return (
    <div className="TreeNode">
      <div
        onClick={expand}
        className={
          "TreeNode__row" +
          (root.children.length ? " TreeNode__row--with-toggle" : "")
        }
      >
        {root.children.length ? (
          <ArrowToggle
            width={16}
            style={!isVisible ? { transform: "rotate(-90deg)" } : {}}
          />
        ) : null}
        <Element
          type={ElementType.Folder}
          name={root.name}
          hasFiles={hasFiles}
        />
      </div>
      {isVisible &&
        (root.children.filter((el) => el.type === "FOLDER") as Folder[]).map(
          (child, i) => (
            <TreeNode
              key={`${root.name}s_children_${i}`}
              root={child}
              setLastSelected={setLastSelected}
            />
          )
        )}
    </div>
  );
};