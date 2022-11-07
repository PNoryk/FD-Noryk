import { TreeNode, TreeNodeStrategy } from "./index";
import { MouseEventHandler } from "react";

export enum ElementType {
  Folder = "FOLDER",
  File = "File",
}

export interface File extends TreeNode {
  name: string;
}

export interface Folder extends TreeNode {
  name: string;
  children: (File | Folder)[];
}

export interface FolderStrategy extends TreeNodeStrategy {
  (
    el: Folder,
    onClick: MouseEventHandler<HTMLDivElement>,
    isOpened: boolean
  ): JSX.Element;
}

export interface FileStrategy extends TreeNodeStrategy {}