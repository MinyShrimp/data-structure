import Memory from "../memory/Memory";
import Node from "../node/Node";

/**
 * 연결리스트 기반 스택
 */
class Stack<T> {
    private memory = new Memory();
    private head: Node<String> = { data: "HEAD", next: null };

    constructor() {
        this.memory.insert(this.head);
    }

    private isEmpty = (): boolean => {
        return this.head.next === null;
    };

    /**
     * Data 추가
     * @param data
     * @returns 추가된 data의 ID 값
     *
     * HEAD => Node 1 => Node 2 => ...
     * HEAD => NEW => Node 1 => Node 2 => ...
     */
    public push = (data: T): string => {
        const nextHash = this.head.next;
        const newNode = { data: data, next: nextHash };
        this.head.next = this.memory.insert(newNode);

        return this.head.next;
    };

    /**
     * 가장 위의 Data 반환
     * @returns 가장 위에 있는 데이터
     */
    public top = (): Readonly<T> => {
        if (this.isEmpty()) {
            throw "Stack is Empty";
        }
        return this.memory.getValue(this.head.next as string).data;
    };

    /**
     * Data 삭제
     * @returns 삭제된 데이터
     *
     * HEAD => DEL => Node 1 => Node 2 => ...
     * HEAD => Node 1 => Node 2 => ...
     */
    public pop = (): Readonly<T> => {
        if (this.isEmpty()) {
            throw "Stack is Empty";
        }
        const deleteValue = this.memory.remove(this.head.next as string);
        this.head.next = deleteValue.next;
        return deleteValue.data;
    };

    /**
     * 모든 Data 반환
     * @returns 모든 Data
     *
     * HEAD => Node 1 => Node 2 => ...
     * [ Node 1, Node 2, Node 3, ... ]
     */
    public getDatas = (): Readonly<Array<T>> => {
        const result: Array<T> = [];

        let cur = this.head.next;
        while (cur !== null) {
            const value = this.memory.getValue(cur);
            result.push(value.data);
            cur = value.next;
        }

        return result;
    };
}

export default Stack;
