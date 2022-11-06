import { File, FileStrategy, Folder, FolderStrategy } from "./types";
import "./Explorer.scss";
import { ReactComponent as FileIcon } from "./assets/icons/blank-file-outline-icon.svg";
import { ReactComponent as FolderIcon } from "./assets/icons/folder-desktop-icon.svg";
import { ReactComponent as FolderWithFilesIcon } from "./assets/icons/folder-directory-files-icon.svg";
import { ReactComponent as ArrowToggle } from "./assets/icons/arrow-toggler.svg";
import React, { Dispatch, SetStateAction, useState } from "react";

const Tree = ({
  folderStrategy,
  setLastSelected,
  data,
}: {
  folderStrategy: FolderStrategy;
  setLastSelected: Dispatch<SetStateAction<Folder | null>>;
  data: Folder;
}) => {
  let [isVisible, setIsVisible] = useState(false);
  let hasFiles = !!data.children.filter((el) => el.type === "FILE").length;
  let currentIcon = hasFiles ? FolderWithFilesIcon : FolderIcon;

  let folders = data.children.filter((el) => el.type === "FOLDER") as Folder[];
  let hasFolders = !!folders.length;

  let onClick = () => {
    setIsVisible(!isVisible);
    setLastSelected(hasFolders && isVisible ? null : data);
  };

  return (
    <div className="TreeNode">
      {folderStrategy(
        data,
        currentIcon,
        isVisible,
        onClick,
        hasFolders ? ArrowToggle : undefined
      )}
      {folders.map(
        (el, index) =>
          isVisible && (
            <Tree
              folderStrategy={folderStrategy}
              setLastSelected={setLastSelected}
              data={el}
              key={`${data.name}__child__${index}`}
            />
          )
      )}
    </div>
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
}): JSX.Element => {
  let [selected, setLastSelected] = useState<Folder | null>(null);
  return (
    <div className="Explorer">
      <div className="Explorer__tree">
        <Tree
          folderStrategy={folderStrategy}
          setLastSelected={setLastSelected}
          data={data}
        />
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
