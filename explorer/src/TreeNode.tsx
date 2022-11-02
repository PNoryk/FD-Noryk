import { ElementType, Folder } from "./types";
import { Element } from "./Element";
import { Dispatch, SetStateAction, useState } from "react";

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
    <div style={{ marginLeft: 25 }}>
      <div onClick={expand} style={{ display: "flex", marginLeft: root.children.length ? '-16px' : 0 }}>
        {root.children.length ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            viewBox="0 0 16 16"
            style={!isVisible ? { transform: "rotate(-90deg)" } : {}}
          >
            <path
              fill="none"
              stroke="#343a40"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m2 5 6 6 6-6"
            />
          </svg>
        ) : null}
        <Element
          type={ElementType.Folder}
          name={root.name}
          hasFiles={hasFiles}
        />
      </div>
      {isVisible &&
        (root.children.filter((el) => el.type === "FOLDER") as Folder[]).map(
          (child) => <TreeNode root={child} setLastSelected={setLastSelected} />
        )}
    </div>
  );
};