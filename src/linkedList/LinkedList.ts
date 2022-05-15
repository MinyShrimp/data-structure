
/**
 * 메모리 기반 연결 리스트
 * Typescript에서는 Node Class Instanse의 주소값을 알아올 수 있는 방법이 없기 때문에
 * memory 를 활용하여 구현
 */

import Memory from "../memory/Memory";
import Node   from "../node/Node";

import AbstractLinkedList from "./AbstractLinkedList";

export default class LinkedList<T> extends AbstractLinkedList<T> {
    protected memory    : Memory = new Memory();

    protected head      : string = "";
    protected cur       : string | null = null;
    protected before    : string | null = null;

    protected comp      : ( (d1: T, d2: T) => boolean ) | null = null;

    constructor() { super(); }

    protected getValue = ( key: string ): Readonly<Node<T>> => {
        return this.memory.getValue( key );
    }

    protected getReperence = ( key: string ): Node<T> => {
        return this.memory.getReperence( key );
    }

    // 데이터 초기화
    public init = (): void => {
        this.memory.clear();
        
        this.head   = this.memory.insert( { data: "HEAD", next: null } );
        this.cur    = null;
        this.before = null;

        this.numOfData = 0;
        this.comp = null;
    }

    // 맨 앞에 저장
    private FInsert = ( data: T ): void => {
        const head = this.getReperence( this.head );

        const newNode: Node<T> = { data: data, next: head.next };
        const newKey = this.memory.insert( newNode );

        head.next = newKey;

        this.numOfData += 1;
    }

    // 정렬기준으로 저장
    private SInsert = ( data: T ): void => {
        const head = this.getReperence( this.head );

        if( this.comp === null || head.next === null ) { this.FInsert(data); return ; }

        const newNode: Node<T> = { data: data, next: null };
        const newKey = this.memory.insert( newNode );

        let pred : Node<T> = head;
        while( 
            pred.next !== null && 
            this.comp( data, this.getValue( pred.next ).data as T )
        ) {
            pred = this.getReperence( pred.next );
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
    public first = (): [ boolean, T | null ] => {
        const head = this.getReperence( this.head );

        if( head.next === null ) {
            return [ false, null ];
        }

        this.before = this.head;
        this.cur    = head.next;

        const data = this.getValue( this.cur ).data;
        return [ true, data ];
    }

    // 두 번째 이후 데이터 참조
    public next = (): [ boolean, T | null ] => {
        if( this.cur === null ) {
            throw new Error( "Must Call Next after First" );
        }

        const cur = this.getReperence( this.cur );
        if( cur.next === null ) {
            return [ false, null ];
        }

        this.before = this.cur;
        this.cur    = cur.next;

        const data = this.getValue(this.cur).data;
        return [ true, data ];
    }

    // 참조한 데이터 삭제
    public remove = (): T => {
        if( this.before === null || this.cur === null ) {
            throw new Error( "Unvalid Poisition" );
        }

        const before = this.getReperence( this.before );
        const cur    = this.getReperence( this.cur );

        const key  = this.cur;
        const data = cur.data as T;

        before.next = cur.next;
        this.cur = this.before;

        this.memory.remove( key );
        this.numOfData -= 1;

        return data;
    }

    public setSortRule = ( sortRule: (d1: T, d2: T) => boolean ): void => {
        this.comp = sortRule;
    }
};