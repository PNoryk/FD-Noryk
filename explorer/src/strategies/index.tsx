import { Folder } from "../types";
import { TreeNode } from "./TreeNode";
import { Dispatch, SetStateAction } from "react";
import { Element } from "./Element";

export const folderStrategy = (
  root: Folder,
  setLastSelected: Dispatch<SetStateAction<Folder | null>>
): JSX.Element => <TreeNode root={root} setLastSelected={setLastSelected} />;

export const fileStrategy = (root: Folder | null): JSX.Element | null => (
  <ul>
    {root &&
      (root.children.filter((el) => el.type === "FILE") as File[]).map((el) => (
        <li key={el.name}>
          <Element name={el.name} />
        </li>
      ))}
  </ul>
);