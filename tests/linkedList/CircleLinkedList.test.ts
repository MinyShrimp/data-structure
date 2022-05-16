
import List from "../../src/linkedList/CircleLinkedList";

describe('Testing CircleLinkedList', () => {
    let list: List<number>;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        list = new List();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Insert

    // Insert Tail
    test('Insert Tail', () => {
        list.init();
        list.insertTail(11); list.insertTail(22); list.insertTail(33);
        
        expect( list.first() ).toEqual( [  true,      11 ] );
        expect( list.next()  ).toEqual( [  true,      22 ] );
        expect( list.next()  ).toEqual( [  true,      33 ] );
        expect( list.next()  ).toEqual( [ false, "DUMMY" ] );
        expect( list.next()  ).toEqual( [  true,      11 ] );

        expect( list.getCount() ).toEqual(3);
    });

    // Insert Head
    test('Insert Head', () => {
        list.init();
        list.insertHead(11); list.insertHead(22); list.insertHead(33);
        
        expect( list.first() ).toEqual( [  true,      33 ] );
        expect( list.next()  ).toEqual( [  true,      22 ] );
        expect( list.next()  ).toEqual( [  true,      11 ] );
        expect( list.next()  ).toEqual( [ false, "DUMMY" ] );
        expect( list.next()  ).toEqual( [  true,      33 ] );

        expect( list.getCount() ).toEqual(3);
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Errors

    // Insert Error
    test('Insert Error', () => {
        expect( () => list.insert(11) ).toThrow(`Use "insertHead" or "insertTail" instead of "insert"`);
    });

    // Insert Head Error
    test('Insert Head Error', () => {
        expect( () => list.insertHead(11) ).toThrow("Must call insert after init");
    });

    // Insert Tail Error
    test('Insert Tail Error', () => {
        expect( () => list.insertTail(11) ).toThrow("Must call insert after init");
    });

    // Next Error
    test('Next Error', () => {
        list.init();
        list.insertTail(11); list.insertTail(22);
        expect( () => list.next() ).toThrow("Must Call Next after First");
    });

    // Remove Error
    test('Remove Error 1', () => {
        expect( () => list.remove() ).toThrow("Must call remove after init");
    });

    // Remove Error 2
    test('Remove Error 2', () => {
        list.init();
        expect( () => list.remove() ).toThrow("Unvalid Poisition");
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Remove

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
        list.init();
        list.insertTail(11); list.insertTail(11); 
        list.insertTail(22); list.insertTail(33); list.insertTail(33); 
        list.insertTail(22); list.insertTail(22); 

        remove( 22 );

        expect( list.first() ).toEqual( [  true,      11 ] );
        expect( list.next()  ).toEqual( [  true,      11 ] );
        expect( list.next()  ).toEqual( [  true,      33 ] );
        expect( list.next()  ).toEqual( [  true,      33 ] );
        expect( list.next()  ).toEqual( [ false, "DUMMY" ] );
        expect( list.first() ).toEqual( [  true,      11 ] );
        expect( list.getCount() ).toEqual(4);
    });

    // Remove Data All
    test('Remove Data All', () => {
        list.init();
        list.insertTail(11); list.insertTail(11); 
        list.insertTail(22); list.insertTail(33); list.insertTail(33); 
        list.insertTail(22); list.insertTail(22); 

        remove( 11 );
        remove( 22 );
        remove( 33 );

        expect( list.first() ).toEqual([ false, "DUMMY" ]);
        expect( list.getCount() ).toEqual(0);
    });
})