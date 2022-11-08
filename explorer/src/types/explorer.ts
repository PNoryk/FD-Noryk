import { TreeNode, TreeNodeStrategy } from "./index";
import { MouseEventHandler } from "react";

export enum ElementType {
  Folder = "FOLDER",
  File = "FILE",
}

export interface File extends TreeNode {
  name: string;
  type: "FILE";
}

export interface Folder extends TreeNode {
  name: string;
  type: "FOLDER";
  children?: (File | Folder)[];
}

export interface FolderStrategy extends TreeNodeStrategy {
  (
    el: Folder | File,
    onClick: MouseEventHandler<HTMLDivElement>,
    isOpened: boolean
  ): JSX.Element | null;
}

export interface FileStrategy extends TreeNodeStrategy {}
