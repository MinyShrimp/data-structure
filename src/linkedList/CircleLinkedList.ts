
import Node from "../node/Node";
import LinkedList from "./LinkedList"

export default class CircleLinkedList<T> extends LinkedList<T> {

    private tail: string = "";

    constructor() { super(); }

    public init = (): void => {
        this.memory.clear();
        
        this.head   = this.memory.insert( { data: "HEAD", next: null } );
        this.tail   = this.memory.insert( { data: "TAIL", next: null } );
        this.cur    = null;
        this.before = null;

        this.numOfData = 0;
        this.comp = null;
    }

    // 머리에 노드를 추가
    private __insertHead = ( newKey: string, newNode: Node<T> ) => {
        const tail = this.getReperence( this.tail );
        const tailNode = this.getReperence( tail.next as string );
        const head = this.getReperence( this.head );

        newNode.next = head.next;
        tailNode.next = newKey;
        head.next = newKey;
    }

    // 꼬리에 노드를 추가
    private __insertTail = ( newKey: string, newNode: Node<T> ) => {
        const tail = this.getReperence( this.tail );
        const tailNode = this.getReperence( tail.next as string );

        newNode.next = tailNode.next;
        tailNode.next = newKey;
        tail.next = newKey;
    }

    // 데이터 추가
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
            const head = this.getReperence( this.head );
            const tail = this.getReperence( this.tail );

            head.next = newKey;
            tail.next = newKey;
            newNode.next = newKey;
        } else {
            callBack( newKey, newNode );
        }

        this.numOfData += 1;
    }

    // 머리에 데이터 추가
    public insertHead = ( data: T ): void => {
        this.__insert( data, this.__insertHead );
    }

    // 꼬리에 데이터 추가
    public insertTail = ( data: T ): void => {
        this.__insert( data, this.__insertTail );
    }

    // 데이터 추가
    public insert = ( data: T ): void => { 
        throw new Error(`Use "insertHead" or "insertTail" instead of "insert"`); 
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
        const headNode = this.getValue( this.head );
        return [ cur.next !== headNode.next, nextCur.data ];
    }

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
        const taileNode = this.getReperence( tail.next as string );

        if( key === tail.next ) {
            if( tail.next === taileNode.next ) {
                this.memory.remove( this.tail );
                this.tail = "";
            } else {
                tail.next = this.before;
            }
        }

        before.next = cur.next;
        this.cur = this.before;

        this.memory.remove( key );
        this.numOfData -= 1;

        return data;
    }
};