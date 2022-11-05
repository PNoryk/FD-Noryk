import {File, FileStrategy, Folder, FolderStrategy} from "./types";
import "./Explorer.scss";
import {ReactComponent as FileIcon} from "./assets/icons/blank-file-outline-icon.svg";
import {ReactComponent as FolderIcon} from "./assets/icons/folder-desktop-icon.svg";
import {ReactComponent as FolderWithFilesIcon} from "./assets/icons/folder-directory-files-icon.svg";
import {ReactComponent as ArrowToggle} from "./assets/icons/arrow-toggler.svg";
import React, {useEffect, useState} from "react";

const createTreeNode =
  (folderStrategy: FolderStrategy, nodeOnClick: Function): FolderStrategy =>
    (el, folderIcon, initialChildrenIsVisible, toggleIcon) => {
      let [childrenIsVisible, setChildrenIsVisible] = useState(false);
      useEffect(() => {
        setChildrenIsVisible(initialChildrenIsVisible);
      }, [initialChildrenIsVisible]);
      let onClick = () => {
        setChildrenIsVisible(!childrenIsVisible);
        if (nodeOnClick) {
          nodeOnClick(el);
        }
      };
      return (
        <div className="TreeNode" onClick={onClick}>
          {folderStrategy(el, folderIcon, childrenIsVisible, toggleIcon)}
          {childrenIsVisible &&
            (
              el.children.filter((child) => child.type === "FOLDER") as Folder[]
            ).map((child) => {
              let hasFiles = !!child.children.filter(
                (child1) => child1.type === "FILE"
              ).length;
              let hasFolders = child.children.filter(
                (child1) => child1.type === "FOLDER"
              ).length;
              return createTreeNode(folderStrategy, nodeOnClick)(
                child,
                hasFiles ? FolderWithFilesIcon : FolderIcon,
                childrenIsVisible,
                hasFolders ? ArrowToggle : undefined
              );
            })}
        </div>
      );
    };

const CreateTree = (
  folderStrategy: FolderStrategy,
  nodeOnClick: Function,
  data: Folder
) => {
  let [rootChildrenIsVisible, setRootChildrenIsVisible] = useState(false);
  let hasFiles = !!data.children.filter((child) => child.type === "FILE")
    .length;
  let hasFolders = data.children.filter((el) => el.type === "FOLDER").length;
  let onClick = () => {
    setRootChildrenIsVisible(!rootChildrenIsVisible);
    nodeOnClick(data);
  };
  return createTreeNode(folderStrategy, onClick)(
    data,
    hasFiles ? FolderWithFilesIcon : FolderIcon,
    rootChildrenIsVisible,
    hasFolders ? ArrowToggle : undefined
  );
};

export const Explorer = ({
                           data,
                           folderStrategy,
                           fileStrategy,
                         }: {
  data: Folder;
  folderStrategy: FolderStrategy;
  fileStrategy: FileStrategy;
}) => {
  let [selected, setLastSelected] = useState<Folder | null>(null);
  return (
    <div className="Explorer">
      <div className="Explorer__tree">
        <div>{CreateTree(folderStrategy, setLastSelected, data)}</div>
      </div>
      <div className="Explorer__files">
        <ul>
          {selected &&
            (
              selected.children.filter((el) => el.type === "FILE") as File[]
            ).map((el) => (
              <li key={`children_${el.name}`}>{fileStrategy(el, FileIcon)}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
