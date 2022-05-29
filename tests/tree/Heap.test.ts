
import Heap from "../../src/tree/Heap";

describe('Testing Stack', () => {
    let heap: Heap;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        heap = new Heap();
    });

    test('push', () => {
        heap.insert(1,2,3,4,5,6,7,8,9,10);
        expect( heap.getArray() ).toEqual([10, 9, 6, 7, 8, 2, 5, 1, 4, 3]);
        heap.pop();
        expect( heap.getArray() ).toEqual([9, 8, 6, 7, 3, 2, 5, 1, 4]);
        heap.pop();
        expect( heap.getArray() ).toEqual([8, 7, 6, 4, 3, 2, 5, 1]);
        heap.pop();
        expect( heap.getArray() ).toEqual([7, 4, 6, 1, 3, 2, 5]);
        heap.pop();
        expect( heap.getArray() ).toEqual([6, 4, 5, 1, 3, 2]);
        heap.pop();
        expect( heap.getArray() ).toEqual([5, 4, 2, 1, 3]);
        heap.pop();
        expect( heap.getArray() ).toEqual([4, 3, 2, 1]);
        heap.pop();
        expect( heap.getArray() ).toEqual([3, 1, 2]);
        heap.pop();
        expect( heap.getArray() ).toEqual([2, 1]);
        heap.pop();
        expect( heap.getArray() ).toEqual([1]);
        heap.pop();
        expect( heap.getArray() ).toEqual([]);
        heap.pop();
        expect( heap.getArray() ).toEqual([]);

        heap.insert(1,2,3,4,5,6,7,8,9,10);
        expect( heap.getArray() ).toEqual([10, 9, 6, 7, 8, 2, 5, 1, 4, 3]);
        heap.sort();
        expect( heap.getArray() ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('many push', () => {
        const arr = Array.from({length : 10000}, (_, i) => i);
        heap.insert( ...arr );

        heap.sort();
        const heap_arr = heap.getArray();
        let flag = true;
        for( let i = 0; i < heap_arr.length - 1; i++ ) {
            if( heap_arr[i] > heap_arr[i + 1] ) {
                flag = false; break;
            }
        }
        
        expect( flag ).toEqual(true);
    });
})