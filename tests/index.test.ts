
import { testFunction } from "../src/index";

describe('Testing JEST', () => {
    beforeAll(() => {
        // 모든 테스트가 시작하기 전에 한번 실행된다.
    });

    afterAll(() => {
        // 모든 테스트가 끝나고 실행된다.
    });

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
    });

    afterEach(() => {
        // 하나의 테스트가 끝날 때마다 실행된다.
    });

    test('test jest', () => {
        expect(
            testFunction()
        ).toEqual("hello world");
    });
})