
/**
 * 범용 Memory Class
 * 
 * Map 자료구조에 key값과 value값을 넣어
 * 가상메모리처럼 사용할 수 있도록 제작한 Class
 */

export default class Memory {
    private memorys: Map<string, any> = new Map();
    
    constructor() {}

    // 16진수의 랜덤한 11자리 숫자 반환
    private getRandomKey = (): string => {
        return Math.random().toString(16).substring(2, 11);
    }

    // 메모리에 key값이 존재하는지 검색
    private isValidKey = ( key: string ): boolean => {
        if( this.memorys.has(key) ) {
            return true;
        } else {
            throw new Error( "Key is Unvalid" );
        }
    }

    // 메모리에 변수 추가
    public insert = ( value: any ): string => {
        const key = this.getRandomKey();
        this.memorys.set( key, value );
        return key;
    }

    // 메모리 삭제
    public remove = ( key: string ): any => {
        const value = this.getReperence( key );
        this.memorys.delete( key );
        return value;
    }

    // 메모리 전체 삭제
    public clear = (): void => {
        this.memorys.clear();
    }

    // copy by reperence
    public getReperence = ( key: string ): any => {
        this.isValidKey(key);
        return this.memorys.get( key );
    }

    // copy by value
    public getValue = ( key: string ): Readonly<any> => {
        return this.getReperence( key );
    }

    // get memory readonly
    public getMemory = (): Readonly<Map<string, any>> => {
        return this.memorys;
    }
};