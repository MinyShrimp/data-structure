
import Stack from "../../src/stack/Stack";

describe('Testing Stack', () => {
    test('empty pop', () => {
        let stack = new Stack<Number>();
        expect( stack.pop() ).toEqual( undefined );
    });

    test('many push', () => {
        let stack = new Stack<Number>();
        stack.push(1,2,3,4);
        expect( stack.toString() ).toEqual( "1,2,3,4" );
    });

    test('pop ok', () => {
        let stack = new Stack<Number>();

        stack.push(1,2,3,4);
        expect( stack.toString() ).toEqual( "1,2,3,4" );

        expect( stack.pop() ).toEqual(4);
        expect( stack.toString() ).toEqual( "1,2,3" );
    });

    test('push full', () => {
        let stack = new Stack<Number>();
        for(let i = 0; i < 100; i++) { stack.push(i); }
        expect( stack.push(1) ).toEqual( undefined );
    });
})