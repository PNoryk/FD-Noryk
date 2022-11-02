import { FilesViewer } from "./FilesViewer";
import { Folder } from "./types";
import {TreeViewer} from "./TreeViewer";
import './Explorer.scss'
import {useState} from "react";

export const Explorer = ({ data }: { data: Folder }) => {
  let [lastSelected, setLastSelected] = useState<Folder | null>(null);
  return (
    <div className="Explorer">
      <TreeViewer root={data} setLastSelected={setLastSelected} />
      <FilesViewer folder={lastSelected} />
    </div>
  );
};