
/**
 * 범용 Memory Class
 */

export default class Memory {
    // private memorys: MemoryType = {};
    private memorys: Map<string, any> = new Map();
    
    constructor() {}

    private getRandomKey = (): string => {
        return Math.random().toString(16).substring(2, 11);
    }

    private getKey = ( value: any ): string => {
        for( let [key, v] of this.memorys ) {
            if( value === v ) {
                return key;
            }
        }
        return "";
    }

    public insert = ( value: any ): void => {
        this.memorys.set( this.getRandomKey(), value );
    }

    public remove = ( value: any ): void => {
        const key = this.getKey( value );
        this.memorys.delete( key );
    }
};