import Memory from "../memory/Memory";
import TreeNode from "../node/TreeNode";

/**
 * 이진 탐색 트리 - BST
 * Binary Search Tree
 *
 * 노드의 왼쪽 하위 트리에는 노드의 키보다 작은 키가 있는 노드만 포함
 * 노드의 오른쪽 하위 트리에는 노드의 키보다 큰 키가 있는 노드만 포함
 * 왼쪽 및 오른쪽 하위 트리도 BST여야한다.
 * 중복된 키를 허용하지 않는다.
 */
export default class BinarySearchTree {
    private memory: Memory = new Memory();
    private root: string | null = null;

    constructor() {}

    private createNewNode = (key: number): string => {
        const newNode: TreeNode<number> = {
            data: key,
            height: 0,
            left: null,
            right: null,
        };
        const newHash: string = this.memory.insert(newNode);
        return newHash;
    };

    /**
     * 새로운 노드 추가
     *
     * [50, 15, 62, 80, 7, 54, 11]
     * 1. 50을 Root 노드에 삽입
     * 2. 다음 요소를 읽고 루트 노드 요소보다 작으면 왼쪽 하위 트리의 루트로 삽입
     * 3. 그렇지 않으면 오른쪽 하위 트리의 오른쪽 루트로 삽입
     * => [ 50, 15, 62, 7, NULL, 54, 80, 11 ]
     */
    private __insert = (rootHash: string | null, key: number): string => {
        if (rootHash === null) {
            return this.createNewNode(key);
        }

        const root = this.memory.getReperence(rootHash);
        if (key > root.data) {
            root.right = this.__insert(root.right, key);
        } else if (key < root.data) {
            root.left = this.__insert(root.left, key);
        } else {
            // 중복된 값은 넣지 않는다.
        }
        return rootHash;
    };

    public insert = (...keys: Array<number>): void => {
        keys.forEach((v, i) => {
            if (this.root === null) {
                this.root = this.__insert(this.root, v);
            } else {
                this.__insert(this.root, v);
            }
        });
    };

    /**
     * 노드 삭제
     *
     * 1. 목표 노드가 리프 노드인 경우,
     *  - 목표 노드 삭제
     * 
     * 2. 목표 노드에 자식이 1개 있는 경우,
     *  - 목표 노드 삭제
     *  - 자식 노드를 부모 노드에 연결
     * 
     * 3. 목표 노드에 자식이 2개 있는 경우,
     *  - 목표 노드 탐색
     *  - 목표 노드의 successor 노드 탐색
     *  - 목표 노드와 successor 노드 위치 교환
     *  - 목표 노드 삭제
     */
    private minValueNode = ( nodeHash: string ): string | null => {
        let curNode: TreeNode<string> = this.memory.getReperence( nodeHash );
        let curHash: string | null = nodeHash;

        while( curHash !== null && curNode.left !== null ) {
            curHash = curNode.left;
            curNode = this.memory.getReperence( curNode.left );

            console.log(curNode, curHash)
        }

        return curHash;
    }

    private __delete = ( rootHash: string | null, key: number ): string | null => {
        // Base Case
        if (rootHash === null) {
            return null;
        }

        // 삭제할 노드를 찾는다
        const root = this.memory.getReperence(rootHash);
        if (key > root.data) {
            root.right = this.__delete(root.right, key);
        } else if (key < root.data) {
            root.left = this.__delete(root.left, key);
        } else {
            // 찾은 경우,
            console.log(rootHash, root)

            // 노드에 자식이 하나이거나 없는 경우
            if( root.left === null ) {
                const rightHash = root.right;
                this.memory.remove( rootHash );
                if( rootHash === this.root ) {
                    this.root = rightHash;
                }
                return rightHash;
            } else if( root.right === null ) {
                const leftHash = root.left;
                this.memory.remove( rootHash );
                if( rootHash === this.root ) {
                    this.root = leftHash;
                }
                return leftHash;
            }

            // 노드에 자식이 둘 있는 경우
            const successorHash = this.minValueNode( root.right );
            const successorNode = this.memory.getReperence( successorHash as string );
            root.data = successorNode.data;
            root.right = this.__delete( root.right, successorNode.data );
        }

        return rootHash;
    } 

    public delete = (key: number): string | null => {
        return this.__delete( this.root, key );
    }

    /**
     * @returns 메모리 반환
     */
    public getMemory = (): Readonly<Map<string, any>> => {
        return this.memory.getMemory();
    };
}

const tree = new BinarySearchTree();
tree.insert(50, 30, 70, 10, 35, 60, 80, 1, 9, 5);
console.log(tree.getMemory());
tree.delete(50);
console.log(tree.getMemory());
tree.delete(30);
console.log(tree.getMemory());
