
/**
 * 최대 힙
 * 부모의 키값이 자식 노드 키값보다 더 큰 힙
 * 가장 큰 값이 Root에 있음.
 */
export default class Heap {
    private array: Array<number> = [];
    private count: number = 0;

    constructor() {}

    /**
     * 배열값 가져오기
     * @param idx 
     * @param size 
     * @returns idx에 대한 배열의 값 or 없으면 -1
     */
    private __getData = ( idx: number, size: number ): number => {
        return idx >= size ? -1 : this.array[idx];
    }

    /**
     * 두 idx에 대한 배열 값을 바꾸기
     * @param idx 
     * @param idx2 
     */
    private __swap = ( idx: number, idx2: number ): void => {
        [ this.array[ idx2 ], this.array[ idx ] ] = [ this.array[ idx ], this.array[ idx2 ] ];
    }

    /**
     * 아래에서 위로 힙 정리하기
     * O( logN )
     * @param idx 
     * @returns 
     */
    private __heapify_up = ( idx: number ): void => {
        if( idx <= 0 ) { return ; }

        const now_node = this.array[ idx ];
        const parent_idx = Math.floor( ( idx - 1 ) / 2 );
        const parent_node = this.array[parent_idx];
        
        if( now_node > parent_node ) {
            this.__swap( parent_idx, idx );
        }

        this.__heapify_up( parent_idx );
    }

    /**
     * 힙 추가
     * @param data 
     */
    private __insert = ( data: number ): void => {
        if( this.count >= this.array.length ) {
            this.array.push( data );
        } else {
            this.array[this.count] = data;
        }
        this.count += 1;
    }

    /**
     * 사용자 전용 힙 추가 함수
     * O( logN )
     * @param datas 
     */
    public insert = ( ...datas: Array<number> ): void => {
        datas.forEach(v => {
            this.__insert(v);
            this.__heapify_up( this.count - 1 );
        });
    }

    /**
     * 위에서 아래로 힙 정리하기
     * O( logN )
     * @param idx 
     * @param size 
     */
    private __heapify_down = ( idx: number, size: number ): void => {
        let   now_idx   = idx;
        const left_idx  = idx * 2 + 1;
        const right_idx = idx * 2 + 2;
        
        const left_node  = this.__getData( left_idx, size );
        const right_node = this.__getData( right_idx, size );

        if( left_node !== -1 && left_node > this.array[ now_idx ] ) {
            now_idx = left_idx;
        }
        if( right_node !== -1 && right_node > this.array[ now_idx ] ) {
            now_idx = right_idx;
        }
        if( now_idx !== idx ) {
            this.__swap( now_idx, idx );
            this.__heapify_down( now_idx, size );
        }
    }
    
    /**
     * root node의 값을 반환 및 삭제
     * O( logN )
     * @returns 가장 큰 값
     */
    public pop = (): number => {
        if( this.count <= 0 ) { return -1; }

        const top = this.array[0];

        this.array[0] = this.array[this.count - 1];
        this.array[this.count - 1] = -1;
        this.count -= 1;

        this.__heapify_down(0, this.count);

        return top;
    }

    /**
     * 힙 재구성
     * O( NlogN )
     */
    public make_heap = (): void => {
        for(let i = Math.floor((this.count - 1) / 2); i >= 0; i--) {
            this.__heapify_down( i, this.count );
        }
    }

    /**
     * 힙 정렬
     * O( NlogN )
     */
    public sort = (): void => {
        for(let i = this.count - 1; i >= 1; i--) {
            this.__swap( 0, i );
            this.__heapify_down( 0, i );
        }
    }

    /**
     * @returns 힙으로 이루어진 배열
     */
    public getArray = (): Readonly<Array<number>> => {
        return this.array.filter(v => v !== -1);
    }
}