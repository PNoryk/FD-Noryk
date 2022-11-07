import './Tree.scss'
import { TreeNode, TreeNodeStrategy } from "../types";
import React, { useState } from "react";

export const Tree = (props: {
  element: TreeNode | TreeNode[];
  onElementClick?: Function;
  elementStrategy: TreeNodeStrategy;
}) => <InnerTree {...props} />;

const InnerTree = ({
  element,
  onElementClick,
  elementStrategy,
  parentIndex,
}: {
  element: TreeNode | TreeNode[];
  onElementClick?: Function;
  elementStrategy: TreeNodeStrategy;
  parentIndex?: number;
}) => {
  let [isChildrenVisible, setIsChildrenVisible] = useState(false);

  let onClick = () => {
    setIsChildrenVisible(!isChildrenVisible);
    if (onElementClick) {
      onElementClick(isChildrenVisible ? null : element);
    }
  };

  let isArray = Array.isArray(element);

  return (
    <div className="TreeNode">
      {!isArray && elementStrategy(element as TreeNode, onClick, isChildrenVisible)}
      {(isArray ? (element as TreeNode[]) : (element as TreeNode).children).map(
        (el, index) =>
          isChildrenVisible && (
            <InnerTree
              element={el}
              elementStrategy={elementStrategy}
              onElementClick={onElementClick}
              key={`${parentIndex || 0}__child__${index}`}
              parentIndex={index}
            />
          )
      )}
    </div>
  );
};
