
/**
 * 메모리 기반 연결 리스트
 * Typescript에서는 Node Class Instanse의 주소값을 알아올 수 있는 방법이 없기 때문에
 * memory 를 활용하여 구현
 */

import AbstractLinkedList from "./AbstractLinkedList";

interface Node<T> {
    data: T | null,
    next: string | null
};

interface ListType<T> {
    [key: string]: Node<T>
};

const getRandomKey = () => {
    return Math.random().toString(16).substring(2, 11);
}

export default class LinkedList<T> extends AbstractLinkedList<T> {
    private head      : Node<T> = { data: null, next: null };
    private cur       : Node<T> = { data: null, next: null };
    private before    : Node<T> = { data: null, next: null };

    private memory    : ListType<T> = { "head": this.head };

    private comp      : ( (d1: T, d2: T) => boolean ) | null = null;

    constructor() { super(); }

    // 데이터 초기화
    public init = (): void => {
        this.head   = { data: null, next: null };
        this.cur    = { data: null, next: null };
        this.before = { data: null, next: null };

        this.memory = { "head": this.head };

        this.numOfData = 0;
        this.comp = null;
    }

    // 맨 앞에 저장
    private FInsert = ( data: T ): void => {
        const newKey  : string  = getRandomKey();
        const newNode : Node<T> = { data: data, next: this.head.next };

        this.head.next = newKey;
        this.memory[newKey] = newNode;

        this.numOfData += 1;
    }

    // 정렬기준으로 저장
    private SInsert = ( data: T ): void => {
        if( this.comp === null || this.head.next === null ) { this.FInsert(data); return ; }

        const newKey  : string  = getRandomKey();
        const newNode : Node<T> = { data: data, next: null };

        this.memory[newKey] = newNode;

        let pred : Node<T> = this.head;
        while( 
            pred.next !== null && 
            this.comp( data, this.memory[pred.next].data as T )
        ) {
            pred = this.memory[pred.next];
        }

        newNode.next = pred.next;
        pred.next    = newKey;

        this.numOfData += 1;
    }

    // 데이터 저장
    public insert = ( data: T ): void => {
        if( this.comp === null ) {
            this.FInsert( data );
        } else {
            this.SInsert( data );
        }
    }

    // 첫 데이터 참조
    public first = () : [ boolean, T | null ] => {
        if( this.head.next === null ) {
            return [ false, null ];
        }

        this.before = this.head;
        this.cur    = this.memory[this.head.next];

        const data = this.cur.data;
        return [ true, data ];
    }

    // 두 번째 이후 데이터 참조
    public next = () : [ boolean, T | null ] => {
        if( this.cur.next === null ) {
            return [ false, null ];
        }

        this.before = this.cur;
        this.cur    = this.memory[this.cur.next];

        const data = this.cur.data;
        return [ true, data ];
    }

    // 참조한 데이터 삭제
    public remove = (): T | null => {
        const key  = this.before.next;
        const data = this.cur.data;

        this.before.next = this.cur.next;
        this.cur = this.before;

        delete this.memory[key as string];
        this.numOfData -= 1;

        return data;
    }

    public setSortRule = ( sortRule: (d1: T, d2: T) => boolean ): void => {
        this.comp = sortRule;
    }
};