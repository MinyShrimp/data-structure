
import Node from "./Node";
export default interface PrevNode<T> extends Node<T> {
    prev: string | null
};