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
