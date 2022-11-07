import './explorer.scss'
import { File, FileStrategy, Folder, FolderStrategy } from "../types/explorer";
import React, { MouseEventHandler } from "react";
import { Element } from "../components/Element";
import { ReactComponent as ToggleIcon } from "../assets/icons/arrow-toggler.svg";
import { ReactComponent as FileIcon } from "../assets/icons/blank-file-outline-icon.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder-desktop-icon.svg";
import { ReactComponent as FolderWithFilesIcon } from "../assets/icons/folder-directory-files-icon.svg";

export const folderStrategy: FolderStrategy = (
  el,
  onClick,
  isOpened,
) => {
  let hasFiles = !!el.children?.filter(el => !el.children || !el.children?.length).length;
  let folderIcon = hasFiles ? FolderWithFilesIcon : FolderIcon;
  return (
    <div
      className={"Folder" + (hasFiles ? " Folder--with-toggle" : "")}
      onClick={(onClick as MouseEventHandler) || ((e) => {})}
    >
      {hasFiles ? (
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

export const fileStrategy: FileStrategy = (el) => (
  <Element name={(el as File).name} icon={FileIcon} />
);
