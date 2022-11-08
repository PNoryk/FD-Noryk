import "./Explorer.scss";
import { Folder } from "../types/explorer";
import React, { useState } from "react";
import { Tree } from "./Tree";
import { fileStrategy, folderStrategy } from "../strategies/explorer";

export const Explorer = ({ data }: { data: any }): JSX.Element => {
  let [selected, setLastSelected] = useState<Folder | null>(null);
  return (
    <div className="Explorer">
      <div className="Explorer__tree">
        <Tree
          element={data}
          elementStrategy={folderStrategy}
          onElementClick={setLastSelected}
        />
      </div>
      <div className="Explorer__files">
        {selected && selected.children && (
          <Tree element={selected.children} elementStrategy={fileStrategy} />
        )}
      </div>
    </div>
  );
};
