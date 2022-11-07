import React from "react";
import { Explorer } from "./components/Explorer";

let data = {
  name: "tree",
  type: "FOLDER",
  children: [
    { name: "folder1", type: "FOLDER", children: [] },
    { name: "file1", type: "FILE" },
    {
      name: "folder2",
      type: "FOLDER",
      children: [
        { name: "file21", type: "FILE" },
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
