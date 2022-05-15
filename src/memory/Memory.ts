
/**
 * 범용 Memory Class
 */

export default class Memory {
    private memorys: Map<string, any> = new Map();
    
    constructor() {}

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

    // copy of reperence
    public getReperence = ( key: string ): any => {
        this.isValidKey(key);
        return this.memorys.get( key );
    }

    // copy of value
    public getValue = ( key: string ): Readonly<any> => {
        return this.getReperence( key );
    }
};