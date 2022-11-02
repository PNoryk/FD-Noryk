import React from "react";
import { Explorer } from "./Explorer";
import { Folder } from "./types";

let data: Folder = {
  name: "tree",
  type: "FOLDER",
  children: [
    { name: "folder1", type: "FOLDER", children: [] },
    {
      name: "folder2",
      type: "FOLDER",
      children: [
        {
          name: "folder21",
          type: "FOLDER",
          children: [
            { name: "file211", type: "FILE" },
            { name: "file212", type: "FILE" },
            { name: "file213", type: "FILE" },
          ],
        },
        { name: "folder22", type: "FOLDER", children: [] },
      ],
    },
    {
      name: "folder3",
      type: "FOLDER",
      children: [{ name: "file31", type: "FILE" }],
    },
  ],
};

function App() {
  return <Explorer data={data} />;
}

export default App;
