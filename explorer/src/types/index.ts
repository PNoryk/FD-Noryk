import React from "react";

export type File = {
  name: string;
  type: "FILE";
};

export type Folder = {
  name: string;
  type: "FOLDER";
  children: (Folder | File)[];
};

export enum ElementType {
  Folder,
  File,
}

export type FolderStrategy = (
  el: Folder,
  folderIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
  isVisible: boolean,
  toggleIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => JSX.Element;

export type FileStrategy = (
  el: File,
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
) => JSX.Element;
