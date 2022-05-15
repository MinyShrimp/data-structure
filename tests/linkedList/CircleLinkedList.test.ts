
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

    test('test jest', () => {
        
    });
})