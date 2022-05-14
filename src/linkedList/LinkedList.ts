
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
    private head      : Node<T> = { data: null, next: null };
    private cur       : Node<T> = { data: null, next: null };
    private before    : Node<T> = { data: null, next: null };

    private memory    : ListType<T> = { "head": this.head };

    private numOfData : number = 0;
    private comp      : ( (d1: T | null, d2: T | null) => boolean ) | null = null;

    constructor() {}

    private FInsert = ( data: T ): void => {
        const newKey  : string  = getRandomKey();
        const newNode : Node<T> = { data: data, next: this.head.next };

        this.head.next = newKey;
        this.memory[newKey] = newNode;

        this.numOfData += 1;
    }

    private SInsert = ( data: T ): void => {
        if( this.comp === null || this.head.next === null ) { this.FInsert(data); return ; }

        const newKey  : string  = getRandomKey();
        const newNode : Node<T> = { data: data, next: null };

        this.memory[newKey] = newNode;

        let pred : Node<T> = this.head;
        while( 
            pred.next !== null && 
            this.comp( data, this.memory[pred.next].data )
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
    public fisrt = () : [ boolean, T | null ] => {
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

        if( key !== null ) {
            this.before.next = this.cur.next;
            this.cur = this.before;

            delete this.memory[key];
            this.numOfData -= 1;
        }

        return data;
    }

    public setSortRule = ( sortRule: (d1: T | null, d2: T | null) => boolean ) => {
        this.comp = sortRule;
    }

    // 데이터 초기화
    public init = () => {
        this.head   = { data: null, next: null };
        this.cur    = { data: null, next: null };
        this.before = { data: null, next: null };

        this.memory = { "head": this.head };

        this.numOfData = 0;
        this.comp = null;
    }

    // 저장된 데이터의 수 반환
    public getCount = () => { return this.numOfData; }
};