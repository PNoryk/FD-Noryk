import { Folder } from "./types";
import "./Explorer.scss";
import { Dispatch, SetStateAction, useState } from "react";

export const Explorer = ({
  data,
  folderStrategy,
  fileStrategy,
}: {
  data: Folder;
  folderStrategy: (
    root: Folder,
    setLastSelected: Dispatch<SetStateAction<Folder | null>>
  ) => JSX.Element | null;
  fileStrategy: (root: Folder | null) => JSX.Element | null;
}) => {
  let [selected, setLastSelected] = useState<Folder | null>(null);
  return (
    <div className="Explorer">
      {folderStrategy(data, setLastSelected)}
      {fileStrategy(selected)}
    </div>
  );
};