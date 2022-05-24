
import Stack from "../../src/stack/StackByArray";

describe('Testing Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        stack = new Stack();
    });

    test('empty pop', () => {
        expect( stack.pop() ).toEqual( undefined );
    });

    test('empty top', () => {
        expect( stack.top() ).toEqual( undefined );
    });

    test('many push', () => {
        stack.push(1,2,3,4);
        expect( stack.getArray() ).toEqual( [1,2,3,4] );
    });

    test('pop ok', () => {
        stack.push(1,2,3,4);
        expect( stack.pop() ).toEqual(4);
        expect( stack.top() ).toEqual(3);
        expect( stack.getArray() ).toEqual( [1,2,3] );
    });

    test('push full', () => {
        for(let i = 0; i < 100; i++) { stack.push(i); }
        expect( stack.push(1) ).toEqual( false );
    });
})