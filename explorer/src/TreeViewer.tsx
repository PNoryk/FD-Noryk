import { Folder } from "./types";
import { TreeNode } from "./TreeNode";
import { Dispatch, SetStateAction } from "react";

export const TreeViewer = ({
  root,
  setLastSelected,
}: {
  root: Folder;
  setLastSelected: Dispatch<SetStateAction<Folder | null>>;
}) => {
  return <TreeNode root={root} setLastSelected={setLastSelected} />;
};