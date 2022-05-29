
/**
 * 최대 힙
 * 부모의 키값이 자식 노드 키값보다 더 큰 힙
 * 가장 큰 값이 Root에 있음.
 */
export default class Heap {
    private array: Array<number> = [];
    private count: number = 0;

    constructor() {}

    private __getData = ( idx: number, size: number ): number => {
        return idx >= size ? -1 : this.array[idx];
    }

    private __swap = ( idx: number, idx2: number ): void => {
        [ this.array[ idx2 ], this.array[ idx ] ] = [ this.array[ idx ], this.array[ idx2 ] ];
    }

    private __heapify_up = ( idx: number ): void => {
        if( idx <= 0 ) { return ; }

        const now_node = this.array[ idx ];
        const root_idx = Math.floor( ( idx - 1 ) / 2 );
        const root_node = this.array[root_idx];
        
        if( now_node > root_node ) {
            this.__swap( root_idx, idx );
        }

        this.__heapify_up( root_idx );
    }

    private __insert = ( data: number ): void => {
        if( this.count >= this.array.length ) {
            this.array.push( data );
        } else {
            this.array[this.count] = data;
        }
        this.count += 1;
    }

    public insert = ( ...datas: Array<number> ): void => {
        datas.forEach(v => {
            this.__insert(v);
            this.__heapify_up( this.count - 1 );
        });
    }

    private __make_heap = ( idx: number, size: number ): void => {
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
            this.__make_heap( now_idx, size );
        }
    }
    
    public pop = (): number => {
        if( this.count <= 0 ) { return -1; }

        const top = this.array[0];

        this.array[0] = this.array[this.count - 1];
        this.array[this.count - 1] = -1;
        this.count -= 1;

        // this.__heapify_down(0);
        this.__make_heap(0, this.count);

        return top;
    }

    private __down_heap = ( idx: number, size: number ): void => {
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
            this.__make_heap( now_idx, size );
        }
    }

    public sort = (): void => {
        for(let i = this.count - 1; i >= 0; i--) {
            this.__swap( 0, i );
            this.__down_heap( 0, i - 1 );
        }
    }

    public getArray = (): Readonly<Array<number>> => {
        return this.array.filter(v => v !== -1);
    }
}