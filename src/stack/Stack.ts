
class Stack<T> {
    private array: Array<T> = [];
    private readonly MAX_LENGTH: Number = 100;

    constructor() {}

    public isEmpty = (): Boolean => {
        return this.array.length === 0;
    }

    public isFull = (): Boolean => {
        return this.array.length === this.MAX_LENGTH;
    }

    public push = ( ...value: Array<T> ): void => {
        if( this.isFull() ) { return; }
        this.array.push(...value);
    }

    public pop = (): T | void => {
        if( this.isEmpty() ) { return; }
        return this.array.pop();
    }

    public toString = (): String => {
        return `[${this.array.toString()}]`;
    }
}

export default Stack;