
import Queue from "../../src/queue/Queue";

describe('Testing Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        queue = new Queue();
    });

    test('empty pop', () => {
        expect( () => queue.pop() ).toThrowError("Queue is Empty");
    });

    test('empty top', () => {
        expect( () => queue.top() ).toThrowError("Queue is Empty");
    });

    test('push', () => {
        queue.push(1);
        queue.push(2);
        queue.push(3);
        queue.push(4);
        expect( queue.getDatas() ).toEqual( [1,2,3,4] );
    });

    test('pop ok', () => {
        queue.push(1);
        queue.push(2);
        queue.push(3);
        queue.push(4);
        expect( queue.pop() ).toEqual(1);
        expect( queue.top() ).toEqual(2);
        expect( queue.getDatas() ).toEqual( [2,3,4] );
        queue.push(1);
        expect( queue.pop() ).toEqual(2);
        expect( queue.getDatas() ).toEqual( [3,4,1] );
    });

    test('pop empty', () => {
        queue.push(1);
        queue.push(2);
        queue.push(3);
        queue.push(4);
        expect( queue.pop() ).toEqual(1);
        expect( queue.pop() ).toEqual(2);
        expect( queue.pop() ).toEqual(3);
        expect( queue.pop() ).toEqual(4);
        expect( () => queue.pop() ).toThrowError("Queue is Empty");
        expect( () => queue.top() ).toThrowError("Queue is Empty");
        expect( queue.getDatas() ).toEqual( [] );
    });
})