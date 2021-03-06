
import Memory from "../memory/Memory";

export default abstract class AbstractLinkedList<T> {

    // Memory
    protected memory: Memory = new Memory();
    // Memory Mapping 함수
    protected getValue = ( key: string ): Readonly<any> => {
        return this.memory.getValue( key );
    }
    protected getReperence = ( key: string ): any => {
        return this.memory.getReperence( key );
    }

    // 현재 저장되어 있는 배열의 갯수
    protected numOfData : number = 0;
    // 현재 저장되어 있는 배열의 갯수를 반환한다.
    public getCount = (): Readonly<number> => { return this.numOfData; }

    // 초기화
    public abstract init(): void;

    // 주입
    public abstract insert( data: T ): void;

    // 첫 번째 데이터
    public abstract first(): [ boolean, T | null ];

    // 두 번째 이후 데이터
    public abstract next(): [ boolean, T | null ];

    // 현재 가리키고 있는 대상을 삭제한다
    public abstract remove(): T | null;
};
