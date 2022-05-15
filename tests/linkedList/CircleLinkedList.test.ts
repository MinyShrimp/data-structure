
import List from "../../src/linkedList/CircleLinkedList";

describe('Testing CircleLinkedList', () => {
    let list: List<number>;

    beforeAll(() => {
        // 모든 테스트가 시작하기 전에 한번 실행된다.
        list = new List();
    });

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        list.init();
    });

    // Insert Tail
    test('Insert Tail', () => {
        list.insertTail(11); list.insertTail(22); list.insertTail(33);
        
        expect( list.first() ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [ false,   11 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );

        expect( list.getCount() ).toEqual(3);
    });

    // Insert Head
    test('Insert Head', () => {
        list.insertHead(11); list.insertHead(22); list.insertHead(33);
        
        expect( list.first() ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [ false,   33 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );

        expect( list.getCount() ).toEqual(3);
    });

    // Insert Error
    test('Insert Error', () => {
        expect( () => list.insert(11) ).toThrow(`Use "insertHead" or "insertTail" instead of "insert"`);
    });

    // Next Error
    test('Next Error', () => {
        list.insertTail(11); list.insertTail(22);
        expect( () => list.next() ).toThrow("Must Call Next after First");
    });

    const remove = ( rData: number ): void => {
        let data: [ boolean, Number | null ] = list.first();
        if( data[0] ) {
            if( data[1] === rData ) {
                list.remove();
            }

            while( true ) {
                data = list.next();
                if( data[0] ) {
                    if( data[1] === rData ) {
                        list.remove();
                    }
                } else {
                    break;
                }
            }
        }  
    }

    // Remove Data
    test('Remove Data', () => {
        list.insertTail(11); list.insertTail(11); 
        list.insertTail(22); list.insertTail(33); list.insertTail(33); 
        list.insertTail(22); list.insertTail(22); 

        remove( 22 );

        expect( list.first() ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [ false,   11 ] );
        expect( list.getCount() ).toEqual(4);
    });

    // Remove Data
    test('Remove Data All', () => {
        list.insertTail(11); list.insertTail(11); 
        list.insertTail(22); list.insertTail(33); list.insertTail(33); 
        list.insertTail(22); list.insertTail(22); 

        remove( 11 );
        remove( 22 );

        expect( () => list.first() ).toThrow(``);
        expect( list.getCount() ).toEqual(0);
    });
})