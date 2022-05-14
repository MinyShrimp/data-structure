
/**
 * 배열 기반 연결 리스트
 * 
 * 
 */

export default class LinkedListByArray<T> {
    private arr               : Array<T> = [];  // 리스트의 저장소인 배열
    private numOfData         : number   = 0;   // 저장된 데이터의 수
    private curPosition       : number   = -1;  // 데이터 참조 위치를 기록
    private readonly LIST_LEN : number   = 100  // 최대 범위

    constructor() {}

    // 데이터 저장
    public insert = ( data: T ): boolean => {
        if( this.numOfData >= this.LIST_LEN ) {
            console.log("저장이 불가능합니다.");
            return false;
        }

        this.arr.push( data );
        this.numOfData += 1;
        return true;
    }

    // 첫 데이터 참조
    // return [ Bool, Data ]
    public fisrt = () : [ boolean, T | null ] => {
        // 저장된 데이터가 하나도 없다면
        if( this.numOfData === 0 ) {
            return [false, null];
        }

        this.curPosition = 0;           // 참조 위치 초기화
        return [true, this.arr[0]];
    }

    // 두 번째 이후 데이터 참조
    public next = () : [ boolean, T | null ] => {
        // 더 이상 참조할 데이터가 없다면
        if( this.curPosition >= this.numOfData - 1 ) {
            return [false, null];
        }

        // 참조 위치 1 증가
        return [ true, this.arr[ ++this.curPosition ] ]; 
    }

    // 참조한 데이터 삭제
    // 중간에 데이터가 삭제되면,
    // 뒤에 저장된 데이터들을 한 칸씩 앞으로 이동시켜서 빈 공간을 메워야 한다.
    public remove = () => {
        // 삭제할 데이터의 인덱스 값 참조
        const rpos  = this.curPosition;
        const count = this.numOfData;

        // 삭제할 데이터 임시 저장
        const rdata = this.arr[rpos];

        // 삭제를 위한 데이터의 이동을 진행하는 반복문
        for( let i = rpos; i < count - 1; i++ ) {
            this.arr[i] = this.arr[i + 1];
        }

        this.numOfData   -= 1;  // 데이터 수 감소
        this.curPosition -= 1;  // 참조 위치를 하나 되돌린다.
        return rdata;           // 삭제된 데이터 반환
    }

    // 데이터 초기화
    public init = () => {
        this.arr         = []; // I Believe GC
        this.numOfData   = 0;
        this.curPosition = 0;
    }

    // 저장된 데이터의 수 반환
    public getCount = () => { return this.numOfData; }
}