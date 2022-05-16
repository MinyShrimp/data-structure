
import Node   from "../node/Node";
import AbstractLinkedList from "./AbstractLinkedList";

export default class CircleLinkedList<T> extends AbstractLinkedList<T> {
    private head      : string = "";
    private dummy     : string = "";
    private tail      : string = "";
    private cur       : string | null = null;
    private before    : string | null = null;

    constructor() { super(); }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Init

    // 초기화
    public init = (): void => {
        this.memory.clear();

        const dummyNode: Node<string> = { data: "DUMMY", next: null };
        this.dummy = this.memory.insert( dummyNode );
        dummyNode.next = this.dummy;

        this.head   = this.memory.insert( { data: "HEAD",  next: this.dummy } );
        this.tail   = this.memory.insert( { data: "TAIL",  next: this.dummy } );
        this.cur    = null;
        this.before = null;

        this.numOfData = 0;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Insert

    // 머리에 노드를 추가 ( 내부 )
    private __insertHead = ( newKey: string, newNode: Node<T> ) => {
        const dummy = this.getReperence( this.dummy );

        newNode.next = dummy.next;
        dummy.next = newKey;
    }

    // 꼬리에 노드를 추가 ( 내부 )
    private __insertTail = ( newKey: string, newNode: Node<T> ) => {
        const tail = this.getReperence( this.tail );
        const tailNode = this.getReperence( tail.next as string );

        newNode.next = tailNode.next;
        tailNode.next = newKey;
        tail.next = newKey;
    }

    // 데이터 추가 ( 내부 통합 )
    private __insert = ( 
        data: T, 
        callBack: ( newKey: string, newNode: Node<T> ) => void
    ) => {
        if( this.tail === "" || this.head === "" ) {
            throw new Error("Must call insert after init");
        }

        const newNode : Node<T> = { data: data, next: null };
        const newKey  : string  = this.memory.insert( newNode );

        if( this.numOfData === 0 ) {
            const tail  = this.getReperence( this.tail );
            const dummy = this.getReperence( this.dummy );

            dummy.next = newKey;
            tail.next  = newKey;
            newNode.next = this.dummy;
        } else {
            callBack( newKey, newNode );
        }

        this.numOfData += 1;
    }

    // 머리에 데이터 추가 ( 외부 )
    public insertHead = ( data: T ): void => {
        this.__insert( data, this.__insertHead );
    }

    // 꼬리에 데이터 추가 ( 외부 )
    public insertTail = ( data: T ): void => {
        this.__insert( data, this.__insertTail );
    }

    // 데이터 추가
    public insert = ( data: T ): void => { 
        throw new Error(`Use "insertHead" or "insertTail" instead of "insert"`); 
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Search

    // 첫 데이터 참조
    public first = (): [ boolean, T | null ] => {
        const dummy = this.getReperence( this.dummy );

        if( dummy.next === this.dummy ) {
            return [ false, dummy.data ];
        }
    
        this.before = this.dummy;
        this.cur    = dummy.next as string;

        const data = this.getValue( this.cur ).data;
        return [ true, data ];
    }

    // 두 번째 이후 데이터
    public next = (): [ boolean, T | null ] => {
        if( this.cur === null ) {
            throw new Error( "Must Call Next after First" );
        }

        const cur = this.getReperence( this.cur );

        this.before = this.cur;
        this.cur    = cur.next;

        const nextCur = this.getValue(this.cur as string);
        return [ cur.next !== this.dummy, nextCur.data ];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Remove

    // 데이터 삭제
    public remove = ( ): T => {
        if( this.tail === "" || this.head === "" ) {
            throw new Error("Must call remove after init");
        }

        if( this.before === null || this.cur === null ) {
            throw new Error( "Unvalid Poisition" );
        }

        const before = this.getReperence( this.before );
        const cur    = this.getReperence( this.cur );

        const key  = this.cur;
        const data = cur.data as T;

        const tail = this.getReperence( this.tail );

        if( this.cur === tail.next ) {
            tail.next = this.before;
        }

        before.next = cur.next;
        this.cur = this.before;
        this.memory.remove( key );

        this.numOfData -= 1;

        return data;
    }
};