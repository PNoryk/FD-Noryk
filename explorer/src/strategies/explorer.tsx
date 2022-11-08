import "./explorer.scss";
import {
  ElementType,
  File,
  FileStrategy,
  Folder,
  FolderStrategy,
} from "../types/explorer";
import React, { MouseEventHandler } from "react";
import { Element } from "../components/Element";
import { ReactComponent as ToggleIcon } from "../assets/icons/arrow-toggler.svg";
import { ReactComponent as FileIcon } from "../assets/icons/blank-file-outline-icon.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder-desktop-icon.svg";
import { ReactComponent as FolderWithFilesIcon } from "../assets/icons/folder-directory-files-icon.svg";

export const folderStrategy: FolderStrategy = (el, onClick, isOpened) => {
  if ((el as File).type === "FILE") {
    return null;
  }
  let hasFiles = !!(el as Folder).children?.filter(
    (el) => el.type === ElementType.File
  ).length;
  let folderIcon = hasFiles ? FolderWithFilesIcon : FolderIcon;
  let hasFolders = !!(el as Folder).children?.filter(
    (el) => el.type === ElementType.Folder
  ).length;
  return (
    <div
      className={"Folder" + (hasFolders ? " Folder--with-toggle" : "")}
      onClick={(onClick as MouseEventHandler) || ((e) => {})}
    >
      {hasFolders ? (
        <ToggleIcon
          className={
            "Folder__toggle-icon" +
            (isOpened ? " Folder__toggle-icon--is-opened" : "")
          }
        />
      ) : null}
      <Element name={(el as Folder).name} icon={folderIcon} />
    </div>
  );
};

export const fileStrategy: FileStrategy = (el) =>
  (el as File).type === ElementType.File ? (
    <Element name={(el as File).name} icon={FileIcon} />
  ) : null;
