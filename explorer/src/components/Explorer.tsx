import "./Explorer.scss";
import { Folder } from "../types/explorer";
import React, { useState } from "react";
import { Tree } from "./Tree";
import { fileStrategy, folderStrategy } from "../strategies/explorer";

export const Explorer = ({ data }: { data: any }): JSX.Element => {
  // Тут как-то надо преобразовать исходное дерево в нужное для Explorer
  // let foldersTree = {}
  // for (let [k, v] of Object.entries(data)) {
  //   if (v.type === "FOLDER")
  //     (foldersTree as Folder)[k] = v
  // }
  // конец преобразования

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
        {selected && selected.children.length && (
          <Tree element={selected.children} elementStrategy={fileStrategy} />
        )}
      </div>
    </div>
  );
};
