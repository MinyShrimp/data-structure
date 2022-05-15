
import List from "../../src/linkedList/LinkedListByArray";

describe('Testing : 배열 기반 연결리스트', () => {
    let list: List<Number>;

    // 모든 테스트가 시작하기 전에 한번 실행된다.
    beforeAll(() => {
        list = new List();
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
        
        expect( list.first() ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   22 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [ false, null ] );

        expect( list.getCount() ).toEqual(3);
    });

    test('Insert Data in Full List', () => {
        while( list.insert(0) );

        expect( list.insert(0) ).toEqual( false );
        expect( list.getCount() ).toEqual(100);
    });

    test('Remove Data', () => {
        const rData = 22;

        list.insert(11); list.insert(11); 
        list.insert(22); list.insert(22); 
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

        expect( list.first() ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   11 ] );
        expect( list.next()  ).toEqual( [  true,   33 ] );
        expect( list.next()  ).toEqual( [ false, null ] );
        expect( list.getCount() ).toEqual(3);
    });
})