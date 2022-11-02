import { ReactComponent as File } from "./assets/icons/blank-file-outline-icon.svg";
import { ReactComponent as Folder } from "./assets/icons/folder-desktop-icon.svg";
import { ReactComponent as FolderWithFiles } from "./assets/icons/folder-directory-files-icon.svg";
import { ElementType } from "./types";
import { MouseEventHandler } from "react";

export const Element = ({
  name,
  type = ElementType.File,
  hasFiles = false,
  onClick = () => {},
}: {
  name: string;
  type?: ElementType;
  hasFiles?: boolean;
  onClick?: MouseEventHandler;
}) => {
  let Icon = type ? File : hasFiles ? FolderWithFiles : Folder;
  return (
    <div onClick={onClick}>
      <Icon width={20} />
      {name}
    </div>
  );
};