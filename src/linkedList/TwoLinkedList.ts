
import Node from "../node/PrevNode";
import AbstractLinkedList from "./AbstractLinkedList"

export default class TwoLinkedList<T> extends AbstractLinkedList<T> {
    private head      : string = "";
    private cur       : string | null = null;
    private before    : string | null = null;

    constructor() { super(); }

    // 초기화
    public init = (): void => {
        this.memory.clear();
        
        this.head   = this.memory.insert( { data: "HEAD", next: null } );
        this.cur    = null;
        this.before = null;

        this.numOfData = 0;
    }

    // 주입
    public insert = ( data: T ): void => {
        const head = this.getReperence( this.head );

        const newNode: Node<T> = { data: data, next: head.next, prev: this.head };
        const newKey:  string  = this.memory.insert( newNode );

        if( head.next !== null ) {
            const headNext = this.getReperence( head.next );
            headNext.prev = newKey;
        }

        head.next = newKey;
    }

    // 첫 번째 데이터
    public first = (): [ boolean, T | null ] => {
        const head = this.getReperence( this.head );
        if( head.next === null ) {
            return [ false, null ];    
        }

        this.before = this.head;
        this.cur    = head.next;

        const data = this.getReperence( this.cur as string ).data;
        return [ true, data ];
    }

    // 두 번째 이후 데이터 앞으로 전진
    public next = (): [ boolean, T | null ] => {
        if( this.cur === null || this.before === null ) {
            throw "Must Call Next after First";
        }
        
        const cur = this.memory.getReperence( this.cur );
        if( cur.next === null ) {
            return [ false, null ];    
        }

        this.before = this.cur;
        this.cur = cur.next;

        const data = this.memory.getReperence( this.cur as string ).data;
        return [ true, data ];
    };

    // 두 번째 이후 데이터 뒤로 후퇴
    public prev = (): [ boolean, T | null ] => {
        if( this.cur === null || this.before === null ) {
            throw "Must Call Prev after First";
        }

        if( this.before === this.head ) {
            return [ false, null ];  
        }

        const before = this.memory.getReperence( this.before );

        this.cur = this.before;
        this.before = before.prev;

        const data = this.memory.getReperence( this.cur as string ).data;
        return [ true, data ];
    };

    // 현재 가리키고 있는 대상을 삭제한다
    public remove = (): T | null => {
        if( this.cur === null || this.before === null ) {
            throw "Must Call Remove after First";
        }

        const before = this.memory.getReperence( this.before );
        const cur = this.memory.getReperence( this.cur );
        const curData = cur.data;

        before.next = cur.next;

        if( cur.next !== null ) {
            const curNext = this.memory.getReperence( cur.next );
            curNext.prev = this.before;
        }

        this.memory.remove( this.cur );
        this.cur = this.before;

        return curData;
    }

    public debugShowMemory = () => {
        return this.memory.getMemory();
    }
}