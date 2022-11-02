import { Element } from "./Element";
import { Folder } from "./types";

export const FilesViewer = ({ folder }: { folder: Folder | null }) => {
  return folder && (
    <ul>
      {folder.children
        .filter((el) => el.type === "FILE")
        .map((el, i) => (
          <li key={i}>
            <Element name={el.name} />
          </li>
        ))}
    </ul>
  );
};