
import Stack from "../../src/stack/Stack";

describe('Testing Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        stack = new Stack();
    });


    test('empty pop', () => {
        expect( () => stack.pop() ).toThrowError("Stack is Empty");
    });

    test('empty top', () => {
        expect( () => stack.top() ).toThrowError("Stack is Empty");
    });

    test('many push', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        expect( stack.getDatas() ).toEqual( [4,3,2,1] );
    });

    test('pop ok', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        expect( stack.pop() ).toEqual(4);
        expect( stack.top() ).toEqual(3);
        expect( stack.getDatas() ).toEqual( [3,2,1] );
        stack.push(4);
        expect( stack.top() ).toEqual(4);
        expect( stack.getDatas() ).toEqual( [4,3,2,1] );
    });
})