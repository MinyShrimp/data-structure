
import Memory from "../memory/Memory";
import Node from "../node/Node";

/**
 * 연결리스트 기반 스택
 */
class Stack<T> {
    private memory = new Memory();
    private head: Node<String> = { data: "HEAD", next: null };

    constructor() {
        this.memory.insert( this.head );
    }

    private isEmpty = (): boolean => {
        return this.head.next === null;
    }

    public push = ( data: T ): string => {
        const nextHash = this.head.next;
        const newNode = { data: data, next: nextHash };
        this.head.next = this.memory.insert( newNode );

        return this.head.next;
    }

    public top = (): Readonly<T> => {
        if( this.isEmpty() ) { throw "Stack is Empty"; }
        return this.memory.getValue( this.head.next as string ).data;
    }

    public pop = (): Readonly<T> => {
        if( this.isEmpty() ) { throw "Stack is Empty"; }
        const deleteValue = this.memory.remove( this.head.next as string );
        this.head.next = deleteValue.next;
        return deleteValue.data;
    }

    public getDatas = (): Readonly<Array<T>> => {
        const result: Array<T> = [];

        let cur = this.head.next;
        while( cur !== null ) {
            const value = this.memory.getValue( cur );
            result.push(value.data)
            cur = value.next;
        }

        return result;
    }
}

export default Stack;