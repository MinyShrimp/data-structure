
import List from "../../src/linkedList/LinkedList";

describe('Testing : 연결리스트', () => {
    let list: List<number>;

    // 모든 테스트가 시작하기 전에 한번 실행된다.
    beforeAll(() => {
        list = new List<number>();
    });

    // 하나의 테스트가 시작하기 전에 매번 실행된다.
    beforeEach(() => {
        list.init();
    });

    /////////////////////////////////////////////////////////

    // 빈 list 에서 첫 번째 값 추출하기
    test('Get First Data in Empty List', () => {
        expect( list.first() ).toEqual([ false, null ]);
        expect( list.getCount() ).toEqual(0);
    });

    // Get Next Datas
    test('Get Next Datas', () => {
        list.insert(11); list.insert(22); list.insert(33); 
        
        expect( list.first() ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [ false, null ] );

        expect( list.getCount() ).toEqual(3);
    });
    
    test('', () => {
        list.setSortRule( ( d1: number, d2: number ): boolean => d1 >= d2);

        list.insert(11); list.insert(22); list.insert(33); 
        list.insert(10); list.insert(15); list.insert(25);

        expect( list.first() ).toEqual( [  true,   10 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   15 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );
        expect( list.next()  ).toEqual( [  true,   25 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [ false, null ] );

        expect( list.getCount() ).toEqual(6);
    });


    test('Remove Data', () => {
        const rData = 22;

        list.insert(11); list.insert(11); 
        list.insert(22); list.insert(22); list.insert(22); 
        list.insert(33); 

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

        expect( list.first() ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [ false, null ] );
        expect( list.getCount() ).toEqual(3);
    });
})