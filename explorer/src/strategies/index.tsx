import { File, Folder, FolderStrategy as FolderStrategyType } from "../types";
import React from "react";
import { Element } from "./Element";

export const folderStrategy: FolderStrategyType = (
  el,
  folderIcon,
  isVisible: boolean,
  ToggleIcon
) => {
  return (
    <div className={"Folder" + (ToggleIcon ? " Folder--with-toggle" : "")}>
      {ToggleIcon ? (
        <ToggleIcon
          className={
            "Folder__toggle-icon" +
            (isVisible ? " Folder__toggle-icon--is-opened" : "")
          }
        />
      ) : null}
      <Element name={el.name} icon={folderIcon} />
    </div>
  );
};

export const fileStrategy = (
  el: File,
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => <Element name={el.name} icon={icon} />;
