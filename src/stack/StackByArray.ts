
/**
 * 배열 기반 스택
 */
class StackByArray<T> {
    private array: Array<T> = [];
    private readonly MAX_LENGTH: Number = 100;

    constructor() {}

    /**
     * 스택이 비어있는지 검사
     * @returns 스택이 비어있는지 여부
     */
    public isEmpty = (): Boolean => {
        return this.array.length === 0;
    }

    /**
     * 스택이 가득차있는지 검사
     * @returns 스택이 가득차있는지 여부
     */
    public isFull = (): Boolean => {
        return this.array.length === this.MAX_LENGTH;
    }

    /**
     * 스택에 데이터 쌓기
     * @param value
     * @returns 성공 여부
     */
    public push = ( ...value: Array<T> ): Boolean => {
        if( this.isFull() ) { return false; }
        this.array.push(...value);
        return true;
    }

    /**
     * 스택 맨 위의 데이터 없애기
     * @returns 꺼낸 데이터
     */
    public pop = (): T | undefined => {
        if( this.isEmpty() ) { return undefined; }
        return this.array.pop();
    }

    /**
     * 스택 맨 위의 데이터 가져오기
     * @returns 맨 위의 데이터
     */
    public top = (): T | undefined => {
        if( this.isEmpty() ) { return undefined; }
        const len = this.array.length;
        return this.array[len - 1];
    }

    public getArray = (): Readonly<Array<T>> => {
        return this.array;
    }
}

export default StackByArray;