
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

export default class LinkedList<T> {
    private list      : ListType<T> = {};

    private head      : Node<T> = { data: null, next: null };
    private cur       : Node<T> = { data: null, next: null };
    private before    : Node<T> = { data: null, next: null };

    private numOfData : number = 0;
    private comp      : Function | null = null;

    constructor() {}

    private FInsert = ( data: T ): void => {
        const newKey:  string = getRandomKey();
        const newNode: Node<T> = { data: data, next: this.head.next };

        this.head.next = newKey;
        this.list[newKey] = newNode;

        this.numOfData += 1;
    }

    private SInsert = ( data: T ): void => {}

    // 데이터 저장
    public insert = ( data: T ): void => {
        if( this.comp === null ) {
            this.FInsert( data );
        } else {
            this.SInsert( data );
        }
    }

    // 첫 데이터 참조
    public fisrt = () : [ boolean, T | null ] => {
        if( this.head.next === null ) {
            return [ false, null ];
        }

        this.before = this.head;
        this.cur    = this.list[this.head.next];

        const data = this.cur.data;
        return [ true, data ];
    }

    // 두 번째 이후 데이터 참조
    public next = () : [ boolean, T | null ] => {
        if( this.cur.next === null ) {
            return [ false, null ];    
        }

        this.before = this.cur;
        this.cur    = this.list[this.cur.next];

        const data = this.cur.data;
        return [ true, data ];
    }

    // 참조한 데이터 삭제
    public remove = (): T | null => {
        const pos  = this.cur;
        const key  = this.before.next;
        const data = pos.data;

        if( key !== null ) {
            this.before.next = this.cur.next;
            this.cur = this.before;

            delete this.list[key];
            this.numOfData -= 1;

            return data;
        }

        return null;
    }

    // 데이터 초기화
    public init = () => {
        this.list = {};
        
        this.head = { data: null, next: null };
        this.cur = { data: null, next: null };
        this.before = { data: null, next: null };

        this.numOfData = 0;
        this.comp = null;
    }

    // 저장된 데이터의 수 반환
    public getCount = () => { return this.numOfData; }

    public getList = () => { return this.list; }
    public getHead = () => { return this.head; }
};