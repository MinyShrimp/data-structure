import Memory from "../memory/Memory";
import Node from "../node/Node";

/**
 * 연결리스트 기반 큐
 */
class Queue<T> {
    private memory = new Memory();
    private head: Node<String> = { data: "HEAD", next: null };
    private tail: Node<String> = { data: "TAIL", next: null };

    constructor() {
        this.memory.insert(this.head);
        this.memory.insert(this.tail);
    }

    private isEmpty = (): boolean => {
        return this.head.next === null && this.tail.next === null;
    };

    /**
     * Data 추가
     * @param data
     * @returns 추가된 data의 ID 값
     *
     * HEAD => Node N => ... => Node 1 <= TAIL
     * HEAD => Node N => ... => Node 1 => NEW <= TAIL
     */
    public push = (data: T): string => {
        const newNode = { data: data, next: null };
        const newHash = this.memory.insert(newNode);

        if( this.head.next === null ) {
            this.head.next = newHash;
        }

        if( this.tail.next !== null ) {
            this.memory.getReperence( this.tail.next as string ).next = newHash;
        }
        
        this.tail.next = newHash;
        return this.tail.next;
    };

    /**
     * 가장 위의 Data 반환
     * @returns 가장 위에 있는 데이터
     */
    public top = (): Readonly<T> => {
        if (this.isEmpty()) {
            throw "Queue is Empty";
        }
        return this.memory.getValue(this.head.next as string).data;
    };

    /**
     * Data 삭제
     * @returns 삭제된 데이터
     *
     * HEAD => Node N => ... => Node 1 <= TAIL
     * HEAD => Node N - 1 => ... => Node 1 <= TAIL
     */
    public pop = (): Readonly<T> => {
        if (this.isEmpty()) {
            throw "Queue is Empty";
        }
        const deleteValue = this.memory.remove(this.head.next as string);
        this.head.next = deleteValue.next;
        if(this.head.next === null) { this.tail.next = null; }
        return deleteValue.data;
    };

    /**
     * 모든 Data 반환
     * @returns 모든 Data
     *
     * HEAD => Node N => ... => Node 1 <= TAIL
     * [ Node N, Node N - 1, ..., Node 1 ]
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

export default Queue;
