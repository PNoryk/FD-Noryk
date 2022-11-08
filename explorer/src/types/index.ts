export type TreeNode = {
  children?: TreeNode[];
};

export interface TreeNodeStrategy {
  (
    el: TreeNode,
    onClick: Function,
    isOpened: boolean,
    ...args: any[]
  ): JSX.Element | null;
}
