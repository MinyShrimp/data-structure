import TreeNode from "./TreeNode";

export default interface HeapNode<T> extends TreeNode<T> {
    root: string | null
};