
import AVLTree from "../../src/tree/AVLTree";

describe('Testing Stack', () => {
    let tree: AVLTree;

    beforeEach(() => {
        // 하나의 테스트가 시작하기 전에 매번 실행된다.
        tree = new AVLTree();
    });

    test('many push', () => {
        tree.insert(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        console.log( tree.getMemory() );
    });

    test('many push2', () => {
        tree.insert(10, 9, 8, 7, 6, 5, 4, 3, 2, 1);
        console.log( tree.getMemory() );
    });

    test('many push3', () => {
        tree.insert(1, 10, 2, 9, 3, 8, 4, 7, 5, 6);
        console.log( tree.getMemory() );
    });
})